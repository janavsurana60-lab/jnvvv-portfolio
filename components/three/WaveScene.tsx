"use client";

import { RefObject, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { getContainerProgress } from "@/lib/scrollProgress";
import { ACCENTS, SmallProject } from "@/lib/content";

const SPACING = 0.62;
const TRAVEL = 26; // world units the camera covers across the field

/** Layered sines — cheap, stable, and reads as open water. */
function waveHeight(x: number, z: number, t: number) {
  return (
    Math.sin(x * 0.28 + t * 0.75) * 0.38 +
    Math.sin(z * 0.21 - t * 0.5) * 0.3 +
    Math.sin((x + z) * 0.15 + t * 0.35) * 0.2
  );
}

/** Where a project's buoy sits on the field. */
function buoyPosition(i: number) {
  return {
    x: i % 2 === 0 ? -3.4 : 3.4,
    z: 6 - i * 9,
  };
}

function WaveField({
  cols,
  rows,
  reduced,
}: {
  cols: number;
  rows: number;
  reduced: boolean;
}) {
  const ref = useRef<THREE.Points>(null);
  const count = cols * rows;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    let i = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        pos[i * 3] = (c - cols / 2) * SPACING;
        pos[i * 3 + 1] = 0;
        pos[i * 3 + 2] = (r - rows / 2) * SPACING;
        col[i * 3] = 0.6;
        col[i * 3 + 1] = 0.6;
        col[i * 3 + 2] = 0.58;
        i++;
      }
    }
    return [pos, col];
  }, [cols, rows, count]);

  const crest = useMemo(
    () => new THREE.Color(ACCENTS.lime).convertSRGBToLinear(),
    []
  );
  const trough = useMemo(
    () => new THREE.Color("#6b6a63").convertSRGBToLinear(),
    []
  );

  useFrame((state) => {
    const geo = ref.current?.geometry;
    if (!geo) return;

    const t = reduced ? 0 : state.clock.elapsedTime;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const col = geo.attributes.color as THREE.BufferAttribute;
    const parr = pos.array as Float32Array;
    const carr = col.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const x = parr[i * 3];
      const z = parr[i * 3 + 2];
      const h = waveHeight(x, z, t);
      parr[i * 3 + 1] = h;

      // crest catches the accent, troughs fall back to warm grey
      const k = Math.min(1, Math.max(0, (h + 0.6) / 1.4));
      const lift = k * k;
      carr[i * 3] = trough.r + (crest.r - trough.r) * lift;
      carr[i * 3 + 1] = trough.g + (crest.g - trough.g) * lift;
      carr[i * 3 + 2] = trough.b + (crest.b - trough.b) * lift;
    }

    pos.needsUpdate = true;
    col.needsUpdate = true;

    if (reduced) return;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </points>
  );
}

function Buoy({
  project,
  order,
  reduced,
}: {
  project: SmallProject;
  order: number;
  reduced: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const { x, z } = buoyPosition(order);
  const accent = ACCENTS[project.accent];

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = reduced ? 0 : state.clock.elapsedTime;
    g.position.y = waveHeight(x, z, t);
    if (!reduced) g.rotation.y = t * 0.3;
  });

  return (
    <group ref={group} position={[x, 0, z]}>
      {/* mast */}
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 1.8, 6]} />
        <meshBasicMaterial color={accent} transparent opacity={0.7} />
      </mesh>
      {/* waterline ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.42, 0.006, 8, 48]} />
        <meshBasicMaterial color={accent} transparent opacity={0.55} />
      </mesh>
      {/* marker at the masthead */}
      <mesh position={[0, 1.8, 0]}>
        <octahedronGeometry args={[0.12, 0]} />
        <meshBasicMaterial color={accent} transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

function Rig({
  containerRef,
  reduced,
}: {
  containerRef: RefObject<HTMLElement | null>;
  reduced: boolean;
}) {
  const { camera, pointer } = useThree();

  useFrame(() => {
    const p = containerRef.current
      ? getContainerProgress(containerRef.current)
      : 0;

    // skim forward across the water
    const z = 12 - p * TRAVEL;
    const ty = 2.4 + (reduced ? 0 : pointer.y * 0.4);
    const tx = reduced ? 0 : pointer.x * 1.2;

    camera.position.z += (z - camera.position.z) * 0.08;
    camera.position.y += (ty - camera.position.y) * 0.05;
    camera.position.x += (tx - camera.position.x) * 0.05;
    camera.lookAt(0, 0.2, camera.position.z - 9);
  });

  return null;
}

export default function WaveScene({
  containerRef,
  projects,
}: {
  containerRef: RefObject<HTMLElement | null>;
  projects: SmallProject[];
}) {
  const reduced = usePrefersReducedMotion();
  const [grid, setGrid] = useState({ cols: 78, rows: 62 });

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) {
      setGrid({ cols: 52, rows: 42 });
    }
  }, []);

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 2.4, 12], fov: 55 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      frameloop={reduced ? "demand" : "always"}
      performance={{ min: 0.5 }}
      style={{ pointerEvents: "none" }}
    >
      <AdaptiveDpr />
      <fog attach="fog" args={["#080808", 12, 34]} />
      <WaveField cols={grid.cols} rows={grid.rows} reduced={reduced} />
      {projects.map((p, i) => (
        <Buoy key={p.slug} project={p} order={i} reduced={reduced} />
      ))}
      <Rig containerRef={containerRef} reduced={reduced} />
    </Canvas>
  );
}

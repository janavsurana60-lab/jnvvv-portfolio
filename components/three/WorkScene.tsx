"use client";

import { RefObject, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr } from "@react-three/drei";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { getContainerProgress } from "@/lib/scrollProgress";
import { ACCENTS, Project } from "@/lib/content";

const PALETTE = ["#f4f2ec", "#f4f2ec", "#f4f2ec", "#c8f135", "#9a7bff", "#4d74ff"];

/** Soft round sprite so points render as glow dots, not squares. */
function useDotTexture() {
  const tex = useMemo(() => {
    const size = 64;
    const cnv = document.createElement("canvas");
    cnv.width = cnv.height = size;
    const ctx = cnv.getContext("2d")!;
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.3, "rgba(255,255,255,0.55)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(cnv);
  }, []);

  useEffect(() => () => tex.dispose(), [tex]);
  return tex;
}

function ParticleField({ count, reduced }: { count: number; reduced: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const dot = useDotTexture();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const c = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      pos[i * 3 + 2] = r * Math.cos(phi);
      c.set(PALETTE[Math.floor(Math.random() * PALETTE.length)]).convertSRGBToLinear();
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((_, delta) => {
    if (reduced || !ref.current) return;
    ref.current.rotation.y += delta * 0.012;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={dot}
        alphaMap={dot}
        size={0.085}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.85}
        alphaTest={0.001}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function WireframeCore({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);

  const geometry = useMemo(() => new THREE.OctahedronGeometry(1.05, 0), []);
  const edges = useMemo(() => new THREE.EdgesGeometry(geometry), [geometry]);

  useEffect(() => {
    return () => {
      geometry.dispose();
      edges.dispose();
    };
  }, [geometry, edges]);

  useFrame((state, delta) => {
    if (reduced || !group.current) return;
    group.current.rotation.y += delta * 0.18;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.18;
  });

  return (
    <group ref={group}>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#f4f2ec" transparent opacity={0.32} />
      </lineSegments>
      <mesh geometry={geometry}>
        <meshBasicMaterial
          color="#c8f135"
          transparent
          opacity={0.018}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

const RINGS = [
  { r: 1.9, rot: [Math.PI / 2.4, 0, 0], speed: 0.1, opacity: 0.16 },
  { r: 2.5, rot: [Math.PI / 3, Math.PI / 5, 0], speed: -0.07, opacity: 0.11 },
  { r: 3.1, rot: [Math.PI / 2.1, -Math.PI / 6, 0], speed: 0.05, opacity: 0.07 },
] as const;

function Ring({
  r,
  rot,
  speed,
  opacity,
  reduced,
}: {
  r: number;
  rot: readonly [number, number, number];
  speed: number;
  opacity: number;
  reduced: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (reduced || !ref.current) return;
    ref.current.rotation.z += delta * speed;
  });

  return (
    <mesh ref={ref} rotation={rot as unknown as [number, number, number]}>
      <torusGeometry args={[r, 0.006, 8, 160]} />
      <meshBasicMaterial color="#f4f2ec" transparent opacity={opacity} />
    </mesh>
  );
}

function Rig({
  reduced,
  containerRef,
}: {
  reduced: boolean;
  containerRef: RefObject<HTMLElement | null>;
}) {
  const { camera, pointer } = useThree();

  useFrame(() => {
    const scroll = containerRef.current
      ? getContainerProgress(containerRef.current)
      : 0;
    if (reduced) {
      camera.position.set(0, scroll * 1.2, 9 - scroll * 2.2);
      camera.lookAt(0, 0, 0);
      return;
    }
    const tx = pointer.x * 0.6;
    const ty = pointer.y * 0.35 + scroll * 1.2;
    camera.position.x += (tx - camera.position.x) * 0.04;
    camera.position.y += (ty - camera.position.y) * 0.04;
    camera.position.z = 9 - scroll * 2.2;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

/** Neutral "app window" so flying panels read as product work without
 *  inventing fake product UI — swap for a real screenshot per project later. */
function makeWorkWindowTexture(accentHex: string) {
  const w = 512;
  const h = 320;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const x = c.getContext("2d")!;
  const r = 18;

  const rounded = (rx: number, ry: number, rw: number, rh: number, rad: number) => {
    x.beginPath();
    x.moveTo(rx + rad, ry);
    x.arcTo(rx + rw, ry, rx + rw, ry + rh, rad);
    x.arcTo(rx + rw, ry + rh, rx, ry + rh, rad);
    x.arcTo(rx, ry + rh, rx, ry, rad);
    x.arcTo(rx, ry, rx + rw, ry, rad);
    x.closePath();
  };

  x.fillStyle = "#0d0d0d";
  rounded(0, 0, w, h, r);
  x.fill();
  x.lineWidth = 3;
  x.strokeStyle = accentHex;
  x.globalAlpha = 0.6;
  rounded(1.5, 1.5, w - 3, h - 3, r);
  x.stroke();
  x.globalAlpha = 1;

  x.fillStyle = "#161616";
  x.fillRect(0, 0, w, 38);
  ["#3a3a3a", "#3a3a3a", accentHex].forEach((col, i) => {
    x.fillStyle = col;
    x.beginPath();
    x.arc(22 + i * 18, 19, 5, 0, Math.PI * 2);
    x.fill();
  });

  x.fillStyle = accentHex;
  x.fillRect(40, 66, 140, 10);
  x.fillStyle = "#2a2a2a";
  for (let i = 0; i < 4; i++) {
    x.fillRect(40, 96 + i * 20, 340 - i * 40, 7);
  }

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Real project screenshot when available, generated mockup otherwise. */
function useProjectTexture(project: Project) {
  const accentHex = ACCENTS[project.accent];
  const fallback = useMemo(() => makeWorkWindowTexture(accentHex), [accentHex]);
  const [real, setReal] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    if (!project.image) return;
    let cancelled = false;
    const loader = new THREE.TextureLoader();
    loader.load(project.image, (tex) => {
      if (cancelled) return;
      tex.colorSpace = THREE.SRGBColorSpace;
      setReal(tex);
    });
    return () => {
      cancelled = true;
    };
  }, [project.image]);

  useEffect(() => () => fallback.dispose(), [fallback]);
  useEffect(() => () => real?.dispose(), [real]);

  return real ?? fallback;
}

function ProjectWindow({
  project,
  segStart,
  segEnd,
  containerRef,
  reduced,
}: {
  project: Project;
  segStart: number;
  segEnd: number;
  containerRef: RefObject<HTMLElement | null>;
  reduced: boolean;
}) {
  const ref = useRef<THREE.Group>(null);
  const texture = useProjectTexture(project);

  useFrame(() => {
    const g = ref.current;
    if (!g) return;
    const scroll = containerRef.current
      ? getContainerProgress(containerRef.current)
      : 0;

    // local progress: 0 well before this project's turn, 1 well after
    const span = segEnd - segStart;
    const local = (scroll - segStart) / span;
    const clamped = Math.max(-1, Math.min(2, local));

    // fly in from far, pass near camera, exit — z goes -18 -> 4 -> 10
    const z = THREE.MathUtils.lerp(-18, 10, clamped);
    const x = Math.sin(clamped * Math.PI) * 1.4;
    const y = Math.cos(clamped * 0.6) * 0.4;
    g.position.set(x, y, z);
    g.rotation.y = (1 - Math.min(1, Math.max(0, clamped))) * 0.5;

    const distFromCenter = Math.abs(clamped - 0.5);
    const opacity = reduced
      ? clamped >= 0 && clamped <= 1
        ? 1
        : 0
      : Math.max(0, 1 - distFromCenter * 1.6);
    g.visible = opacity > 0.01;
    const mat = (g.children[0] as THREE.Mesh)?.material as THREE.MeshBasicMaterial;
    if (mat) mat.opacity = opacity;
  });

  return (
    <group ref={ref}>
      <mesh>
        <planeGeometry args={[3.2, 1.68]} />
        <meshBasicMaterial
          map={texture}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function ProjectWindows({
  projects,
  containerRef,
  reduced,
}: {
  projects: Project[];
  containerRef: RefObject<HTMLElement | null>;
  reduced: boolean;
}) {
  const n = projects.length;
  return (
    <>
      {projects.map((p, i) => (
        <ProjectWindow
          key={p.slug}
          project={p}
          segStart={i / n}
          segEnd={(i + 1) / n}
          containerRef={containerRef}
          reduced={reduced}
        />
      ))}
    </>
  );
}

const SPINE_RINGS = 7;

function Spine({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (reduced || !group.current) return;
    group.current.rotation.y += delta * 0.06;
  });

  return (
    <group ref={group}>
      <mesh>
        <cylinderGeometry args={[0.012, 0.012, 6, 8]} />
        <meshBasicMaterial color="#f4f2ec" transparent opacity={0.14} />
      </mesh>
      {Array.from({ length: SPINE_RINGS }, (_, i) => {
        const y = -3 + (i / (SPINE_RINGS - 1)) * 6;
        return (
          <mesh key={i} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.16, 0.008, 8, 24]} />
            <meshBasicMaterial color="#f4f2ec" transparent opacity={0.22} />
          </mesh>
        );
      })}
    </group>
  );
}

export default function WorkScene({
  containerRef,
  projects,
}: {
  containerRef: RefObject<HTMLElement | null>;
  projects: Project[];
}) {
  const reduced = usePrefersReducedMotion();
  const [count, setCount] = useState(1400);

  useEffect(() => {
    setCount(window.matchMedia("(max-width: 768px)").matches ? 550 : 1400);
  }, []);

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 9], fov: 50 }}
      gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
      frameloop={reduced ? "demand" : "always"}
      performance={{ min: 0.5 }}
      style={{ pointerEvents: "none" }}
    >
      <AdaptiveDpr />
      <ParticleField count={count} reduced={reduced} />
      <WireframeCore reduced={reduced} />
      <Spine reduced={reduced} />
      {RINGS.map((ring) => (
        <Ring key={ring.r} {...ring} reduced={reduced} />
      ))}
      <ProjectWindows projects={projects} containerRef={containerRef} reduced={reduced} />
      <Rig reduced={reduced} containerRef={containerRef} />
    </Canvas>
  );
}

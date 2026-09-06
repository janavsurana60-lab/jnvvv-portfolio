"use client";

import { RefObject, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { projects } from "@/lib/content";

const PANEL_COUNT = 14;
const ACCENTS = ["#c8f135", "#ff6a2c", "#9a7bff", "#4d74ff", "#ff3b5c"];

/** Draws a neutral "app window" so the archive reads as product work
 *  without inventing fake product UI. Swap for real screenshots later. */
function makeWindowTexture(accent: string, seed: number) {
  const w = 512;
  const h = 330;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const x = c.getContext("2d")!;

  const r = 14;
  const rect = (rx: number, ry: number, rw: number, rh: number, rad: number) => {
    x.beginPath();
    x.moveTo(rx + rad, ry);
    x.arcTo(rx + rw, ry, rx + rw, ry + rh, rad);
    x.arcTo(rx + rw, ry + rh, rx, ry + rh, rad);
    x.arcTo(rx, ry + rh, rx, ry, rad);
    x.arcTo(rx, ry, rx + rw, ry, rad);
    x.closePath();
  };

  x.fillStyle = "#0d0d0d";
  rect(0, 0, w, h, r);
  x.fill();

  // title bar
  x.fillStyle = "#161616";
  rect(0, 0, w, 40, r);
  x.fill();
  x.fillRect(0, 30, w, 10);

  // traffic lights
  ["#3a3a3a", "#3a3a3a", accent].forEach((col, i) => {
    x.fillStyle = col;
    x.beginPath();
    x.arc(24 + i * 20, 20, 5, 0, Math.PI * 2);
    x.fill();
  });

  // sidebar
  x.fillStyle = "#121212";
  x.fillRect(0, 40, 120, h - 40);
  for (let i = 0; i < 6; i++) {
    x.fillStyle = i === seed % 6 ? accent : "#2a2a2a";
    x.fillRect(16, 64 + i * 26, i === seed % 6 ? 76 : 60, 7);
  }

  // content blocks
  x.fillStyle = accent;
  x.fillRect(148, 66, 120, 12);
  x.fillStyle = "#2e2e2e";
  for (let i = 0; i < 5; i++) {
    x.fillRect(148, 96 + i * 22, 300 - (i % 3) * 60, 8);
  }

  // chart bars
  for (let i = 0; i < 7; i++) {
    const bh = 20 + ((seed * (i + 3)) % 60);
    x.fillStyle = i === 3 ? accent : "#242424";
    x.fillRect(148 + i * 34, h - 40 - bh, 20, bh);
  }

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function fibonacciSphere(i: number, n: number, radius: number) {
  const phi = Math.acos(1 - (2 * (i + 0.5)) / n);
  const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi) * 0.72,
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function cylinderPoint(i: number, n: number, radius: number) {
  const perRing = Math.ceil(n / 3);
  const ring = Math.floor(i / perRing);
  const k = i % perRing;
  const theta = (k / perRing) * Math.PI * 2;
  return new THREE.Vector3(
    radius * Math.cos(theta),
    (ring - 1) * 2.2,
    radius * Math.sin(theta)
  );
}

function Panels({
  layout,
  reduced,
  rotRef,
}: {
  layout: "sphere" | "cylinder";
  reduced: boolean;
  rotRef: RefObject<HTMLElement | null>;
}) {
  const group = useRef<THREE.Group>(null);
  const scroll = useRef(0);
  const last = useRef(-1);

  const withImages = useMemo(() => projects.filter((p) => p.image), []);

  const [panels, setPanels] = useState<
    { accent: string; texture: THREE.Texture }[]
  >(() =>
    Array.from({ length: PANEL_COUNT }, (_, i) => ({
      accent: ACCENTS[i % ACCENTS.length],
      texture: makeWindowTexture(ACCENTS[i % ACCENTS.length], i + 1),
    }))
  );

  // Swap in real project screenshots for the first few panels once loaded.
  useEffect(() => {
    let cancelled = false;
    const loader = new THREE.TextureLoader();

    withImages.forEach((project, i) => {
      if (i >= PANEL_COUNT || !project.image) return;
      loader.load(project.image, (tex) => {
        if (cancelled) return;
        tex.colorSpace = THREE.SRGBColorSpace;
        setPanels((prev) => {
          const next = [...prev];
          next[i].texture.dispose();
          next[i] = { accent: next[i].accent, texture: tex };
          return next;
        });
      });
    });

    return () => {
      cancelled = true;
    };
  }, [withImages]);

  useEffect(
    () => () => panels.forEach((p) => p.texture.dispose()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const targets = useMemo(
    () =>
      Array.from({ length: PANEL_COUNT }, (_, i) =>
        layout === "sphere"
          ? fibonacciSphere(i, PANEL_COUNT, 5.2)
          : cylinderPoint(i, PANEL_COUNT, 4.6)
      ),
    [layout]
  );

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      scroll.current = el.scrollTop / Math.max(1, el.scrollHeight - el.clientHeight);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;

    if (!reduced) {
      g.rotation.y = scroll.current * Math.PI * 4 + state.clock.elapsedTime * 0.05;
    }

    // ease each panel toward its layout target
    g.children.forEach((child, i) => {
      const t = targets[i];
      if (!t) return;
      child.position.lerp(t, reduced ? 1 : Math.min(1, delta * 2.4));
      child.lookAt(0, child.position.y * 0.35, 0);
      child.rotateY(Math.PI);
    });

    const normalized = (((g.rotation.y * 180) / Math.PI) % 360 + 360) % 360;
    const deg = Math.round(normalized);
    if (deg !== last.current) {
      last.current = deg;
      if (rotRef.current) {
        rotRef.current.textContent = `${String(deg).padStart(3, "0")}°`;
      }
    }
  });

  return (
    <group ref={group}>
      {panels.map((p, i) => (
        <mesh key={i} position={targets[i]}>
          <planeGeometry args={[2.6, 1.365]} />
          <meshBasicMaterial
            map={p.texture}
            side={THREE.DoubleSide}
            transparent
            opacity={0.96}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function ArchiveScene({
  layout,
  rotRef,
}: {
  layout: "sphere" | "cylinder";
  rotRef: RefObject<HTMLElement | null>;
}) {
  const reduced = usePrefersReducedMotion();

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 11], fov: 46 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={reduced ? "demand" : "always"}
      style={{ pointerEvents: "none" }}
    >
      <Panels layout={layout} reduced={reduced} rotRef={rotRef} />
    </Canvas>
  );
}

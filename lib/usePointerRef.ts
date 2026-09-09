"use client";

import { RefObject, useEffect, useRef } from "react";

/**
 * Pointer position as normalised -1..1 coords, kept in a ref so reads in a
 * useFrame loop never trigger React renders.
 *
 * R3F's own `useThree().pointer` is dead whenever the <Canvas> carries
 * `pointer-events: none` — which the scroll-through scenes need so the page
 * keeps scrolling over them. This listens on `window` instead. When `enabled`
 * is false (e.g. prefers-reduced-motion) the ref stays pinned at { 0, 0 }.
 */
export function usePointerRef(
  enabled = true,
): RefObject<{ x: number; y: number }> {
  const ref = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) {
      ref.current.x = 0;
      ref.current.y = 0;
      return;
    }
    const onMove = (e: PointerEvent) => {
      ref.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      ref.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled]);

  return ref;
}

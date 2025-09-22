"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import * as THREE from "three";

type VantaEffectId =
  | "BIRDS"
  | "FOG"
  | "NET"
  | "WAVES"
  | "GLOBE"
  | "HALO"
  | "CELLS"
  | "RINGS"
  | "CLOUDS"
  | "TRUNK"
  | "TOPOLOGY";

export type VantaBackgroundProps = {
  effect: VantaEffectId;
  options?: Record<string, unknown>;
  className?: string;
  style?: CSSProperties;
};

const loaders: Record<VantaEffectId, () => Promise<any>> = {
  BIRDS: () => import("vanta/dist/vanta.birds.min"),
  FOG: () => import("vanta/dist/vanta.fog.min"),
  NET: () => import("vanta/dist/vanta.net.min"),
  WAVES: () => import("vanta/dist/vanta.waves.min"),
  GLOBE: () => import("vanta/dist/vanta.globe.min"),
  HALO: () => import("vanta/dist/vanta.halo.min"),
  CELLS: () => import("vanta/dist/vanta.cells.min"),
  RINGS: () => import("vanta/dist/vanta.rings.min"),
  CLOUDS: () => import("vanta/dist/vanta.clouds.min"),
  TRUNK: () => import("vanta/dist/vanta.trunk.min"),
  TOPOLOGY: () => import("vanta/dist/vanta.topology.min"),
  DOTS: () => import("vanta/dist/vanta.dots.min"),
};

export default function VantaBackground({ effect, options, className, style }: VantaBackgroundProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [instance, setInstance] = useState<any>(null);
  const instanceRef = useRef<any>(null);
  const optionsRef = useRef<Record<string, unknown> | undefined>(options);
  const mountedRef = useRef<boolean>(false);

  function destroyInstance() {
    const current = instanceRef.current || instance;
    if (current && typeof current.destroy === "function") {
      try { current.destroy(); } catch { /* ignore */ }
    }
    const el = containerRef.current;
    if (el) {
      try {
        const canvases = el.querySelectorAll("canvas");
        canvases.forEach(c => {
          try {
            const gl = (c as HTMLCanvasElement).getContext("webgl2") || (c as HTMLCanvasElement).getContext("webgl") || (c as HTMLCanvasElement).getContext("experimental-webgl");
            const ext = (gl && (gl as any).getExtension) ? (gl as any).getExtension("WEBGL_lose_context") : null;
            if (ext && typeof ext.loseContext === "function") ext.loseContext();
          } catch { /* ignore */ }
          try { c.remove(); } catch { /* ignore */ }
        });
        // Remove any remaining nodes Vanta added
        el.textContent = "";
      } catch { /* ignore */ }
    }
    instanceRef.current = null;
    setInstance(null);
  }

  // Preload heavy deps once to reduce first-use latency
  useEffect(() => {
    (async () => {
      try {
        (window as any).THREE = THREE;
        const mod = await import("three/examples/jsm/misc/GPUComputationRenderer.js");
        const GPGPU = (mod as any).GPUComputationRenderer || (mod as any).default;
        (THREE as any).GPUComputationRenderer = GPGPU;
        (window as any).GPUComputationRenderer = GPGPU;
      } catch { /* ignore */ }
      try {
        await import("p5");
      } catch { /* ignore */ }
    })();
    mountedRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function start() {
      if (cancelled || !containerRef.current) return;
      // Ensure element is attached to DOM before Vanta inspects it
      let el = containerRef.current as HTMLDivElement | null;
      let frames = 0;
      while (el && !el.isConnected && frames < 5) {
        await new Promise(r => requestAnimationFrame(r));
        el = containerRef.current;
        frames += 1;
      }
      if (!el) return;
      if (typeof window !== "undefined") {
        (window as any).THREE = THREE;
        if (effect === "BIRDS") {
          try {
            const mod = await import("three/examples/jsm/misc/GPUComputationRenderer.js");
            const GPGPU = (mod as any).GPUComputationRenderer || (mod as any).default;
            (THREE as any).GPUComputationRenderer = GPGPU;
            (window as any).GPUComputationRenderer = GPGPU;
          } catch { /* ignore */ }
        }
      }
      const create = (await loaders[effect]()).default;
      const extra: Record<string, unknown> = {};
      if (effect === "TRUNK" || effect === "TOPOLOGY") {
        const p5 = (await import("p5")).default;
        extra.p5 = (p5 as unknown as { default?: any }) || p5;
      }
      // Clean up any previous canvases/effects before creating new
      destroyInstance();

      // Reduce GPU load on high-DPR screens
      const dpr = (typeof window !== "undefined" && window.devicePixelRatio) ? window.devicePixelRatio : 1;
      const scaled = dpr > 1.75 ? 0.7 : dpr > 1.25 ? 0.85 : 1.0;

      const vanta = create({
        el,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: scaled,
        scaleMobile: scaled,
        ...(optionsRef.current || {}),
        ...extra,
      });
      instanceRef.current = vanta;
      setInstance(vanta);
    }

    start();

    return () => {
      cancelled = true;
      destroyInstance();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effect]);

  // Live update options without re-creating the effect
  useEffect(() => {
    optionsRef.current = options;
    const current = instanceRef.current;
    if (current && typeof current.setOptions === "function") {
      try { current.setOptions(options || {}); } catch { /* ignore */ }
    }
  }, [JSON.stringify(options)]);

  return <div ref={containerRef} className={className} style={style} suppressHydrationWarning />;
}



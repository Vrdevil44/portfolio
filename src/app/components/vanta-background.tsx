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
  | "TOPOLOGY"
  | "DOTS";

type VantaInstance = {
  destroy: () => void;
  setOptions?: (options: Record<string, unknown>) => void;
};

type VantaCreate = (options: Record<string, unknown>) => VantaInstance;

export type VantaBackgroundProps = {
  effect: VantaEffectId;
  options?: Record<string, unknown>;
  className?: string;
  style?: CSSProperties;
};

const loaders: Record<VantaEffectId, () => Promise<{ default: VantaCreate }>> = {
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
  const [instance, setInstance] = useState<VantaInstance | null>(null);
  const instanceRef = useRef<VantaInstance | null>(null);
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
            const canvas = c as HTMLCanvasElement;
            const gl = (canvas.getContext("webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl")) as (WebGL2RenderingContext | WebGLRenderingContext | null);
            const ext = gl ? (gl.getExtension("WEBGL_lose_context") as { loseContext?: () => void } | null) : null;
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
        (globalThis as unknown as { THREE?: typeof THREE }).THREE = THREE;
        const mod = await import("three/examples/jsm/misc/GPUComputationRenderer.js");
        const GPGPU = (mod as { GPUComputationRenderer?: unknown; default?: unknown }).GPUComputationRenderer ?? (mod as { default?: unknown }).default;
        (THREE as unknown as { GPUComputationRenderer?: unknown }).GPUComputationRenderer = GPGPU;
        (globalThis as unknown as { GPUComputationRenderer?: unknown }).GPUComputationRenderer = GPGPU;
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
        (globalThis as unknown as { THREE?: typeof THREE }).THREE = THREE;
        if (effect === "BIRDS" || effect === "DOTS") {
          try {
            const mod = await import("three/examples/jsm/misc/GPUComputationRenderer.js");
            const GPGPU = (mod as { GPUComputationRenderer?: unknown; default?: unknown }).GPUComputationRenderer ?? (mod as { default?: unknown }).default;
            (THREE as unknown as { GPUComputationRenderer?: unknown }).GPUComputationRenderer = GPGPU;
            (globalThis as unknown as { GPUComputationRenderer?: unknown }).GPUComputationRenderer = GPGPU;
          } catch { /* ignore */ }
        }
      }
      const mod = await loaders[effect]();
      const create = mod.default;
      const extra: Record<string, unknown> = {};
      if (effect === "TRUNK" || effect === "TOPOLOGY") {
        const p5mod = await import("p5");
        const p5 = (p5mod as { default?: unknown }).default ?? p5mod;
        extra.p5 = p5 as unknown;
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



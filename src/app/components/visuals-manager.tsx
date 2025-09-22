"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import VantaBackground from "./vanta-background";

type EffectId = "BIRDS" | "FOG" | "NET" | "WAVES" | "GLOBE" | "HALO" | "CELLS" | "RINGS" | "CLOUDS" | "TRUNK" | "TOPOLOGY" | "DOTS";

const storageKey = "portfolio.visuals";

type OptionsByEffect = Partial<Record<EffectId, Record<string, any>>>;

type VisualState = {
  effect: EffectId;
  optionsByEffect: OptionsByEffect;
};

const defaultsByEffect: OptionsByEffect = {
  BIRDS: {
    backgroundAlpha: 1.0,
    backgroundColor: 0x0b1020,
    color1: 0x1e3aff,
    color2: 0x8a2be2,
    colorMode: "varianceGradient",
    quantity: 5,
    birdSize: 1.0,
    wingSpan: 30.0,
    speedLimit: 5.0,
    separation: 20.0,
    alignment: 20.0,
    cohesion: 20.0,
  },
  FOG: {
    backgroundAlpha: 1.0,
    backgroundColor: 0x0b1020,
    highlightColor: 0xffc300,
    midtoneColor: 0xff1f00,
    lowlightColor: 0x2d00ff,
    baseColor: 0xffebeb,
    blurFactor: 0.6,
    zoom: 1.0,
    speed: 1.0,
  },
  WAVES: {
    color: 0x005588,
    shininess: 30,
    waveHeight: 15,
    waveSpeed: 1,
    zoom: 1,
  },
  CLOUDS: {
    backgroundColor: 0xffffff,
    skyColor: 0x68b8d7,
    cloudColor: 0xadc1de,
    cloudShadowColor: 0x183550,
    sunColor: 0xff9919,
    sunGlareColor: 0xff6633,
    sunlightColor: 0xff9933,
    speed: 1.0,
  },
  GLOBE: {
    backgroundColor: 0x23153c,
    color: 0xff3f81,
    color2: 0xffffff,
    size: 1.0,
  },
  NET: {
    color: 0xff3f81,
    backgroundColor: 0x23153c,
    points: 10,
    maxDistance: 20,
    spacing: 15,
    showDots: true,
  },
  CELLS: {
    color1: 0x008c8c,
    color2: 0xf2e735,
    size: 1.5,
    speed: 1.0,
  },
  TRUNK: {
    backgroundColor: 0x222426,
    color: 0x98465f,
    spacing: 0,
    chaos: 1.0,
  },
  TOPOLOGY: {
    backgroundColor: 0x002222,
    color: 0x89964e,
  },
  DOTS: {
    backgroundColor: 0x222222,
    color: 0xff8820,
    color2: 0xff8820,
    size: 3,
    spacing: 35,
    showLines: true,
  },
  RINGS: {
    color: 0x88ff00,
    backgroundColor: 0x202428,
    backgroundAlpha: 1,
  },
  HALO: {
    backgroundColor: 0x131a43,
    baseColor: 0x001a59,
    size: 1,
    amplitudeFactor: 1,
    xOffset: 0,
    yOffset: 0,
  },
};

const defaultState: VisualState = {
  effect: "BIRDS",
  optionsByEffect: defaultsByEffect,
};

export default function VisualsManager() {
  const [open, setOpen] = useState(false);
  // Start with deterministic default to match SSR markup
  const [state, setState] = useState<VisualState>(defaultState);
  // After mount, hydrate from localStorage to avoid hydration mismatch
  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(storageKey) : null;
      if (!raw) return;
      const parsed = JSON.parse(raw);
      let effect: EffectId = (parsed.effect as EffectId) || "BIRDS";
      if ((effect as any) === "CLOUDS2") effect = "CLOUDS";
      const optionsByEffect = { ...defaultsByEffect, ...(parsed.optionsByEffect || {}) } as OptionsByEffect;
      delete (optionsByEffect as any).CLOUDS2;
      setState({ effect, optionsByEffect });
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state]);

  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const effectOptions = useMemo(() => ({
    ...(defaultsByEffect[state.effect] || {}),
    ...((state.optionsByEffect[state.effect] as Record<string, any>) || {}),
  }), [state.effect, state.optionsByEffect]);

  const [mountKey, setMountKey] = useState(0);
  useEffect(() => {
    setMountKey(prev => prev + 1);
  }, [state.effect]);

  function handleEffectChange(next: EffectId) {
    setState(prev => ({
      effect: next,
      optionsByEffect: {
        ...prev.optionsByEffect,
        [next]: { ...(defaultsByEffect[next] || {}) },
      },
    }));
    setMountKey(prev => prev + 1);
  }

  function updateOptForCurrent(key: string, value: any) {
    setState(prev => ({
      ...prev,
      optionsByEffect: {
        ...prev.optionsByEffect,
        [prev.effect]: {
          ...(prev.optionsByEffect[prev.effect] || {}),
          [key]: value,
        },
      },
    }));
  }

  function resetCurrent() {
    setState(prev => ({
      ...prev,
      optionsByEffect: {
        ...prev.optionsByEffect,
        [prev.effect]: { ...(defaultsByEffect[prev.effect] || {}) },
      },
    }));
  }

  return (
    <>
      {/* Vanta background layer */}
      <VantaBackground
        key={`${state.effect}-${mountKey}`}
        effect={state.effect}
        options={effectOptions}
        className="pointer-events-none fixed inset-0 -z-10"
      />

      {/* Toggle button */}
      <button
        aria-expanded={open}
        aria-controls="visuals-panel"
        onClick={() => setOpen(!open)}
        className={`fixed top-6 right-6 z-40 glass focus-ring px-4 py-2 text-sm glass-shine transition-transform duration-200 ${open ? "scale-95" : "scale-100"}`}
      >
        Customize
      </button>

      {/* Panel */}
      <div
        id="visuals-panel"
        ref={panelRef}
        className={`fixed top-16 right-6 z-40 w-[min(92vw,360px)] glass p-4 transition-[transform,opacity] duration-300 backdrop-blur-xl ${
          open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0 pointer-events-none"
        }`}
        role="dialog"
        aria-label="Customize visuals"
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium">Visuals</h3>
          <button aria-label="Close" className="focus-ring text-sm opacity-80" onClick={() => setOpen(false)}>✕</button>
        </div>

        {/* Effect selector */}
        <label className="block text-xs opacity-80" suppressHydrationWarning>Effect</label>
        <select
          className="w-full mt-1 mb-3 bg-transparent border border-[color:var(--highlight)]/40 rounded-md px-2 py-1 text-sm"
          value={state.effect}
          onChange={e => handleEffectChange(e.target.value as EffectId)}
          suppressHydrationWarning
        >
          {(["BIRDS","FOG","NET","WAVES","GLOBE","HALO","CELLS","RINGS","CLOUDS","TRUNK","TOPOLOGY","DOTS"] as EffectId[]).map(id => (
            <option key={id} value={id}>{id}</option>
          ))}
        </select>

        {/* Effect-specific controls */}
        {state.effect === "BIRDS" && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs opacity-80">Color 1</label>
                <input
                  type="color"
                  className="w-full h-8 bg-transparent border border-[color:var(--highlight)]/40 rounded-md"
                  value={hexFrom(effectOptions.color1 ?? 0x1e3aff)}
                  onChange={e => updateOptForCurrent("color1", parseHex(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-xs opacity-80">Color 2</label>
                <input
                  type="color"
                  className="w-full h-8 bg-transparent border border-[color:var(--highlight)]/40 rounded-md"
                  value={hexFrom(effectOptions.color2 ?? 0x8a2be2)}
                  onChange={e => updateOptForCurrent("color2", parseHex(e.target.value))}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs opacity-80">Background</label>
                <input
                  type="color"
                  className="w-full h-8 bg-transparent border border-[color:var(--highlight)]/40 rounded-md"
                  value={hexFrom(effectOptions.backgroundColor ?? 0x0b1020)}
                  onChange={e => updateOptForCurrent("backgroundColor", parseHex(e.target.value))}
                />
              </div>
            </div>
            <div className="mt-3 grid gap-3">
              {slider("Quantity", effectOptions.quantity ?? 5, 0, 5, 1, v => updateOptForCurrent("quantity", v))}
              {slider("Bird size", effectOptions.birdSize ?? 1, 0.2, 2, 0.1, v => updateOptForCurrent("birdSize", v))}
              {slider("Wing span", effectOptions.wingSpan ?? 30, 5, 60, 1, v => updateOptForCurrent("wingSpan", v))}
              {slider("Speed limit", effectOptions.speedLimit ?? 5, 0, 8, 0.5, v => updateOptForCurrent("speedLimit", v))}
              {slider("Separation", effectOptions.separation ?? 20, 0, 50, 1, v => updateOptForCurrent("separation", v))}
              {slider("Alignment", effectOptions.alignment ?? 20, 0, 50, 1, v => updateOptForCurrent("alignment", v))}
              {slider("Cohesion", effectOptions.cohesion ?? 20, 0, 50, 1, v => updateOptForCurrent("cohesion", v))}
            </div>
          </>
        )}

        {state.effect === "DOTS" && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs opacity-80">Background</label>
                <input type="color" className="w-full h-8 bg-transparent border border-[color:var(--highlight)]/40 rounded-md"
                  value={hexFrom(effectOptions.backgroundColor ?? 0x222222)}
                  onChange={e => updateOptForCurrent("backgroundColor", parseHex(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-xs opacity-80">Color</label>
                <input type="color" className="w-full h-8 bg-transparent border border-[color:var(--highlight)]/40 rounded-md"
                  value={hexFrom(effectOptions.color ?? 0xff8820)}
                  onChange={e => updateOptForCurrent("color", parseHex(e.target.value))}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs opacity-80">Color 2</label>
                <input type="color" className="w-full h-8 bg-transparent border border-[color:var(--highlight)]/40 rounded-md"
                  value={hexFrom(effectOptions.color2 ?? 0xff8820)}
                  onChange={e => updateOptForCurrent("color2", parseHex(e.target.value))}
                />
              </div>
            </div>
            <div className="mt-3 grid gap-3">
              {slider("Size", effectOptions.size ?? 3, 1, 8, 1, v => updateOptForCurrent("size", v))}
              {slider("Spacing", effectOptions.spacing ?? 35, 5, 80, 1, v => updateOptForCurrent("spacing", v))}
              <label className="flex items-center gap-2 text-xs">
                <input type="checkbox" checked={Boolean(effectOptions.showLines ?? true)} onChange={e => updateOptForCurrent("showLines", e.target.checked)} />
                <span className="opacity-80">Show lines</span>
              </label>
            </div>
          </>
        )}

        {state.effect === "RINGS" && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs opacity-80">Color</label>
                <input type="color" className="w-full h-8 bg-transparent border border-[color:var(--highlight)]/40 rounded-md"
                  value={hexFrom(effectOptions.color ?? 0x88ff00)}
                  onChange={e => updateOptForCurrent("color", parseHex(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-xs opacity-80">Background</label>
                <input type="color" className="w-full h-8 bg-transparent border border-[color:var(--highlight)]/40 rounded-md"
                  value={hexFrom(effectOptions.backgroundColor ?? 0x202428)}
                  onChange={e => updateOptForCurrent("backgroundColor", parseHex(e.target.value))}
                />
              </div>
            </div>
            <div className="mt-3 grid gap-3">
              {slider("Background alpha", effectOptions.backgroundAlpha ?? 1, 0, 1, 0.05, v => updateOptForCurrent("backgroundAlpha", v))}
            </div>
          </>
        )}

        {state.effect === "HALO" && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs opacity-80">Background</label>
                <input type="color" className="w-full h-8 bg-transparent border border-[color:var(--highlight)]/40 rounded-md"
                  value={hexFrom(effectOptions.backgroundColor ?? 0x131a43)}
                  onChange={e => updateOptForCurrent("backgroundColor", parseHex(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-xs opacity-80">Base color</label>
                <input type="color" className="w-full h-8 bg-transparent border border-[color:var(--highlight)]/40 rounded-md"
                  value={hexFrom(effectOptions.baseColor ?? 0x001a59)}
                  onChange={e => updateOptForCurrent("baseColor", parseHex(e.target.value))}
                />
              </div>
            </div>
            <div className="mt-3 grid gap-3">
              {slider("Size", effectOptions.size ?? 1.0, 0.2, 2.0, 0.1, v => updateOptForCurrent("size", v))}
              {slider("Amplitude", effectOptions.amplitudeFactor ?? 1.0, 0.1, 4.0, 0.1, v => updateOptForCurrent("amplitudeFactor", v))}
              {slider("x offset", effectOptions.xOffset ?? 0, -2.0, 2.0, 0.1, v => updateOptForCurrent("xOffset", v))}
              {slider("y offset", effectOptions.yOffset ?? 0, -2.0, 2.0, 0.1, v => updateOptForCurrent("yOffset", v))}
            </div>
          </>
        )}

        {state.effect === "CELLS" && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs opacity-80">Color 1</label>
                <input type="color" className="w-full h-8 bg-transparent border border-[color:var(--highlight)]/40 rounded-md"
                  value={hexFrom(effectOptions.color1 ?? 0x008c8c)}
                  onChange={e => updateOptForCurrent("color1", parseHex(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-xs opacity-80">Color 2</label>
                <input type="color" className="w-full h-8 bg-transparent border border-[color:var(--highlight)]/40 rounded-md"
                  value={hexFrom(effectOptions.color2 ?? 0xf2e735)}
                  onChange={e => updateOptForCurrent("color2", parseHex(e.target.value))}
                />
              </div>
            </div>
            <div className="mt-3 grid gap-3">
              {slider("Size", effectOptions.size ?? 1.5, 0.5, 3.0, 0.1, v => updateOptForCurrent("size", v))}
              {slider("Speed", effectOptions.speed ?? 1.0, 0, 3.0, 0.1, v => updateOptForCurrent("speed", v))}
            </div>
          </>
        )}

        {state.effect === "TRUNK" && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs opacity-80">Background</label>
                <input type="color" className="w-full h-8 bg-transparent border border-[color:var(--highlight)]/40 rounded-md"
                  value={hexFrom(effectOptions.backgroundColor ?? 0x222426)}
                  onChange={e => updateOptForCurrent("backgroundColor", parseHex(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-xs opacity-80">Color</label>
                <input type="color" className="w-full h-8 bg-transparent border border-[color:var(--highlight)]/40 rounded-md"
                  value={hexFrom(effectOptions.color ?? 0x98465f)}
                  onChange={e => updateOptForCurrent("color", parseHex(e.target.value))}
                />
              </div>
            </div>
            <div className="mt-3 grid gap-3">
              {slider("Spacing", effectOptions.spacing ?? 0, 0, 40, 1, v => updateOptForCurrent("spacing", v))}
              {slider("Chaos", effectOptions.chaos ?? 1.0, 0, 3.0, 0.1, v => updateOptForCurrent("chaos", v))}
            </div>
          </>
        )}

        {state.effect === "TOPOLOGY" && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs opacity-80">Background</label>
                <input type="color" className="w-full h-8 bg-transparent border border-[color:var(--highlight)]/40 rounded-md"
                  value={hexFrom(effectOptions.backgroundColor ?? 0x002222)}
                  onChange={e => updateOptForCurrent("backgroundColor", parseHex(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-xs opacity-80">Color</label>
                <input type="color" className="w-full h-8 bg-transparent border border-[color:var(--highlight)]/40 rounded-md"
                  value={hexFrom(effectOptions.color ?? 0x89964e)}
                  onChange={e => updateOptForCurrent("color", parseHex(e.target.value))}
                />
              </div>
            </div>
          </>
        )}
        {state.effect === "FOG" && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs opacity-80">Highlight</label>
                <input type="color" className="w-full h-8 bg-transparent border border-[color:var(--highlight)]/40 rounded-md"
                  value={hexFrom(effectOptions.highlightColor ?? 0xffc300)}
                  onChange={e => updateOptForCurrent("highlightColor", parseHex(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-xs opacity-80">Midtone</label>
                <input type="color" className="w-full h-8 bg-transparent border border-[color:var(--highlight)]/40 rounded-md"
                  value={hexFrom(effectOptions.midtoneColor ?? 0xff1f00)}
                  onChange={e => updateOptForCurrent("midtoneColor", parseHex(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-xs opacity-80">Lowlight</label>
                <input type="color" className="w-full h-8 bg-transparent border border-[color:var(--highlight)]/40 rounded-md"
                  value={hexFrom(effectOptions.lowlightColor ?? 0x2d00ff)}
                  onChange={e => updateOptForCurrent("lowlightColor", parseHex(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-xs opacity-80">Base</label>
                <input type="color" className="w-full h-8 bg-transparent border border-[color:var(--highlight)]/40 rounded-md"
                  value={hexFrom(effectOptions.baseColor ?? 0xffebeb)}
                  onChange={e => updateOptForCurrent("baseColor", parseHex(e.target.value))}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs opacity-80">Background</label>
                <input type="color" className="w-full h-8 bg-transparent border border-[color:var(--highlight)]/40 rounded-md"
                  value={hexFrom(effectOptions.backgroundColor ?? 0x0b1020)}
                  onChange={e => updateOptForCurrent("backgroundColor", parseHex(e.target.value))}
                />
              </div>
            </div>
            <div className="mt-3 grid gap-3">
              {slider("Blur", effectOptions.blurFactor ?? 0.6, 0, 1, 0.05, v => updateOptForCurrent("blurFactor", v))}
              {slider("Zoom", effectOptions.zoom ?? 1.0, 0.5, 2.0, 0.1, v => updateOptForCurrent("zoom", v))}
              {slider("Speed", effectOptions.speed ?? 1.0, 0, 2.0, 0.1, v => updateOptForCurrent("speed", v))}
            </div>
          </>
        )}

        {state.effect === "WAVES" && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="block text-xs opacity-80">Color</label>
                <input
                  type="color"
                  className="w-full h-8 bg-transparent border border-[color:var(--highlight)]/40 rounded-md"
                  value={hexFrom(effectOptions.color ?? 0x005588)}
                  onChange={e => updateOptForCurrent("color", parseHex(e.target.value))}
                />
              </div>
            </div>
            <div className="mt-3 grid gap-3">
              {slider("Shininess", effectOptions.shininess ?? 30, 0, 100, 1, v => updateOptForCurrent("shininess", v))}
              {slider("Wave height", effectOptions.waveHeight ?? 15, 0, 50, 1, v => updateOptForCurrent("waveHeight", v))}
              {slider("Wave speed", effectOptions.waveSpeed ?? 1, 0, 3, 0.1, v => updateOptForCurrent("waveSpeed", v))}
              {slider("Zoom", effectOptions.zoom ?? 1, 0.5, 2, 0.1, v => updateOptForCurrent("zoom", v))}
            </div>
          </>
        )}

        {state.effect === "CLOUDS" && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs opacity-80">Background</label>
                <input type="color" className="w-full h-8 bg-transparent border border-[color:var(--highlight)]/40 rounded-md"
                  value={hexFrom(effectOptions.backgroundColor ?? 0xffffff)}
                  onChange={e => updateOptForCurrent("backgroundColor", parseHex(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-xs opacity-80">Sky</label>
                <input type="color" className="w-full h-8 bg-transparent border border-[color:var(--highlight)]/40 rounded-md"
                  value={hexFrom(effectOptions.skyColor ?? 0x68b8d7)}
                  onChange={e => updateOptForCurrent("skyColor", parseHex(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-xs opacity-80">Cloud</label>
                <input type="color" className="w-full h-8 bg-transparent border border-[color:var(--highlight)]/40 rounded-md"
                  value={hexFrom(effectOptions.cloudColor ?? 0xadc1de)}
                  onChange={e => updateOptForCurrent("cloudColor", parseHex(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-xs opacity-80">Cloud shadow</label>
                <input type="color" className="w-full h-8 bg-transparent border border-[color:var(--highlight)]/40 rounded-md"
                  value={hexFrom(effectOptions.cloudShadowColor ?? 0x183550)}
                  onChange={e => updateOptForCurrent("cloudShadowColor", parseHex(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-xs opacity-80">Sun</label>
                <input type="color" className="w-full h-8 bg-transparent border border-[color:var(--highlight)]/40 rounded-md"
                  value={hexFrom(effectOptions.sunColor ?? 0xff9919)}
                  onChange={e => updateOptForCurrent("sunColor", parseHex(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-xs opacity-80">Sun glare</label>
                <input type="color" className="w-full h-8 bg-transparent border border-[color:var(--highlight)]/40 rounded-md"
                  value={hexFrom(effectOptions.sunGlareColor ?? 0xff6633)}
                  onChange={e => updateOptForCurrent("sunGlareColor", parseHex(e.target.value))}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs opacity-80">Sunlight</label>
                <input type="color" className="w-full h-8 bg-transparent border border-[color:var(--highlight)]/40 rounded-md"
                  value={hexFrom(effectOptions.sunlightColor ?? 0xff9933)}
                  onChange={e => updateOptForCurrent("sunlightColor", parseHex(e.target.value))}
                />
              </div>
            </div>
            <div className="mt-3 grid gap-3">
              {slider("Speed", effectOptions.speed ?? 1.0, 0, 3, 0.1, v => updateOptForCurrent("speed", v))}
            </div>
          </>
        )}

        {state.effect === "GLOBE" && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs opacity-80">Background</label>
                <input
                  type="color"
                  className="w-full h-8 bg-transparent border border-[color:var(--highlight)]/40 rounded-md"
                  value={hexFrom(effectOptions.backgroundColor ?? 0x23153c)}
                  onChange={e => updateOptForCurrent("backgroundColor", parseHex(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-xs opacity-80">Color</label>
                <input
                  type="color"
                  className="w-full h-8 bg-transparent border border-[color:var(--highlight)]/40 rounded-md"
                  value={hexFrom(effectOptions.color ?? 0xff3f81)}
                  onChange={e => updateOptForCurrent("color", parseHex(e.target.value))}
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs opacity-80">Color 2</label>
                <input
                  type="color"
                  className="w-full h-8 bg-transparent border border-[color:var(--highlight)]/40 rounded-md"
                  value={hexFrom(effectOptions.color2 ?? 0xffffff)}
                  onChange={e => updateOptForCurrent("color2", parseHex(e.target.value))}
                />
              </div>
            </div>
            <div className="mt-3 grid gap-3">
              {slider("Size", effectOptions.size ?? 1.0, 0.5, 2.0, 0.1, v => updateOptForCurrent("size", v))}
            </div>
          </>
        )}

        {state.effect === "NET" && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs opacity-80">Color</label>
                <input
                  type="color"
                  className="w-full h-8 bg-transparent border border-[color:var(--highlight)]/40 rounded-md"
                  value={hexFrom(effectOptions.color ?? 0xff3f81)}
                  onChange={e => updateOptForCurrent("color", parseHex(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-xs opacity-80">Background</label>
                <input
                  type="color"
                  className="w-full h-8 bg-transparent border border-[color:var(--highlight)]/40 rounded-md"
                  value={hexFrom(effectOptions.backgroundColor ?? 0x23153c)}
                  onChange={e => updateOptForCurrent("backgroundColor", parseHex(e.target.value))}
                />
              </div>
            </div>
            <div className="mt-3 grid gap-3">
              {slider("Points", effectOptions.points ?? 10, 1, 30, 1, v => updateOptForCurrent("points", v))}
              {slider("Max distance", effectOptions.maxDistance ?? 20, 5, 80, 1, v => updateOptForCurrent("maxDistance", v))}
              {slider("Spacing", effectOptions.spacing ?? 15, 5, 60, 1, v => updateOptForCurrent("spacing", v))}
              <label className="flex items-center gap-2 text-xs">
                <input
                  type="checkbox"
                  checked={Boolean(effectOptions.showDots ?? true)}
                  onChange={e => updateOptForCurrent("showDots", e.target.checked)}
                />
                <span className="opacity-80">Show dots</span>
              </label>
            </div>
          </>
        )}

        <div className="mt-4 flex justify-end gap-2">
          <button className="focus-ring text-sm opacity-80" onClick={() => randomizeFor(state.effect, setState, () => setMountKey(prev => prev + 1))}>Random</button>
          <button className="focus-ring text-sm" onClick={resetCurrent}>Reset</button>
        </div>
      </div>
    </>
  );
}

function slider(label: string, value: number, min: number, max: number, step: number, onChange: (v: number) => void) {
  return (
    <label className="block text-xs">
      <span className="opacity-80">{label}</span>
      <input
        className="w-full mt-1"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number((e.target as HTMLInputElement).value))}
      />
    </label>
  );
}

function parseHex(hex: string): number {
  return Number.parseInt(hex.replace("#", "0x"));
}

function hexFrom(n: number): string {
  const s = (n >>> 0).toString(16).padStart(6, "0");
  return `#${s}`;
}

function randomizeFor(effect: EffectId, setState: React.Dispatch<React.SetStateAction<VisualState>>, after?: () => void) {
  const base = defaultsByEffect[effect] || {};
  const next: Record<string, any> = { ...base };
  Object.keys(base).forEach(k => {
    const v = (base as any)[k];
    if (typeof v === "number") {
      // randomize within a reasonable range
      if (k.toLowerCase().includes("color")) {
        next[k] = Math.floor(Math.random() * 0xffffff);
      } else if (k.toLowerCase().includes("alpha")) {
        next[k] = Math.max(0, Math.min(1, (Math.random() * 1.2)));
      } else {
        next[k] = Number((v * (0.6 + Math.random() * 0.8)).toFixed(2));
      }
    }
  });
  setState(prev => ({
    ...prev,
    optionsByEffect: {
      ...prev.optionsByEffect,
      [effect]: next,
    },
  }));
  if (after) after();
}



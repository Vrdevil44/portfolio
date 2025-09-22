"use client";

import { useEffect, useState } from "react";

type ThemeId = "theme-tron" | "theme-aurora" | "theme-grid" | "theme-light";

const themeOrder: ThemeId[] = ["theme-tron", "theme-aurora", "theme-grid", "theme-light"];
const storageKey = "portfolio.theme";

function getInitialTheme(): ThemeId {
  if (typeof window === "undefined") return "theme-tron";
  const stored = window.localStorage.getItem(storageKey) as ThemeId | null;
  if (stored && themeOrder.includes(stored)) return stored;
  return "theme-tron";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeId>(getInitialTheme);

  useEffect(() => {
    const html = document.documentElement;
    themeOrder.forEach(t => html.classList.remove(t));
    html.classList.add(theme);
    window.localStorage.setItem(storageKey, theme);
  }, [theme]);

  function cycleTheme() {
    const idx = themeOrder.indexOf(theme);
    const next = themeOrder[(idx + 1) % themeOrder.length];
    setTheme(next);
  }

  const label = {
    "theme-tron": "Tron",
    "theme-aurora": "Aurora",
    "theme-grid": "Grid",
    "theme-light": "Light",
  }[theme];

  return (
    <button
      aria-label="Change background theme"
      onClick={cycleTheme}
      className="fixed bottom-6 right-6 z-40 glass focus-ring px-4 py-2 text-sm"
    >
      {label}
    </button>
  );
}



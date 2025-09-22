# Project Handover — Portfolio (Next.js)

## Overview
- **Purpose**: Personal/portfolio site with interactive, GPU-accelerated backgrounds and a Tron/neo-glass UI.
- **Tech stack**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4 (via @tailwindcss/postcss), ESLint 9, Vanta.js + Three.js, optional p5.
- **Hosting**: Static export (Next `output: export`) — suitable for GitHub Pages, Vercel static, Netlify, or any static host.
- **Status**: Basic content placeholders are in place; visual customization UI is implemented; theming is wired.

## Quick Start
```bash
# Install
npm install

# Develop
npm run dev

# Build static site to ./out
npm run build

# Preview ./out locally
npx serve out

# Lint
npm run lint
```

## Deployment
- Project is configured for static export and GitHub Pages friendly base paths.
- `next.config.ts` auto-computes `basePath` and `assetPrefix` when running under GitHub Actions:
  - If repository is a project page (e.g., `user/repo` not ending in `.github.io`), base path becomes `/<repo>`.
  - For user/org pages (`user.github.io`), base path is empty.
- Images are unoptimized (`images.unoptimized: true`) to suit static hosting.
- Output has `trailingSlash: true` for cleaner relative paths.

### GitHub Pages quick guide
1. Build: `npm run build` (generates `out/`)
2. Publish `out/` directory to `gh-pages` branch or enable Pages from the `out/` directory via action.
3. Ensure Actions set `GITHUB_REPOSITORY` and `GITHUB_ACTIONS` env (done by default in GH Actions).

## Repository Structure
- `src/app/`
  - `layout.tsx`: Root HTML shell, loads fonts and `VisualsManager`.
  - `page.tsx`: Home page with hero, projects/about/contact placeholders.
  - `globals.css`: Tailwind v4 + theme tokens (Tron, Aurora, Grid, Light) and glass utilities.
  - `components/`
    - `visuals-manager.tsx`: UI to pick and tune Vanta effects; persists settings in `localStorage`.
    - `vanta-background.tsx`: Lazy-loads Vanta effects; manages Three.js/p5 integration and cleanup.
  - `theme-toggle.tsx`: Cycles theme classes on `<html>`; persists selection in `localStorage`.
- `public/`: Static assets (icons/svgs).
- `out/`: Build output for static hosting.
- `next.config.ts`: Static export and GitHub Pages basePath logic.
- `postcss.config.mjs`: Tailwind v4 via `@tailwindcss/postcss`.
- `eslint.config.mjs`: ESLint 9 flat config using Next presets.
- `tsconfig.json`: Path alias `@/*` → `src/*` and strict TS options.

## Dependencies
- Runtime:
  - `next@15.5.3`, `react@19`, `react-dom@19`
  - `three@^0.134.0` (Vanta peer)
  - `vanta@^0.5.24` (background effects)
  - `p5@^2.0.5` (needed for some Vanta modes)
  - `framer-motion@^12.23.16` (installed; currently unused — candidate for removal or future animations)
  - `zustand@^5.0.8` (installed; currently unused — candidate for removal or future global state)
- Dev:
  - `eslint@^9`, `eslint-config-next@15.5.3`
  - `typescript@^5`, `@types/*`
  - `tailwindcss@^4`, `@tailwindcss/postcss@^4`

## Key Behaviors
- Visuals are client-only; `VisualsManager` renders a fixed, pointer-events-none `VantaBackground` and a customizable control panel.
- Selected effect and tuning options persist in `localStorage` (`portfolio.visuals`).
- Theme selection persists in `localStorage` (`portfolio.theme`) and applied as class on `<html>` to drive CSS tokens.
- GPU load scaled down on high-DPR screens to improve perf.
- Safe cleanup of WebGL contexts when switching effects or unmounting.

## Environment Variables
- `GITHUB_REPOSITORY` (ex: `vibhu/portfolio`) — used to compute `basePath` in CI.
- `GITHUB_ACTIONS` — presence toggles GitHub Pages behavior.
- No other required env vars for local dev.

## Accessibility & Performance Notes
- Buttons have ARIA labels; panel has `role="dialog"`.
- Respect `prefers-reduced-motion` to limit animated backgrounds.
- Consider adding a fallback background for low-end devices or a "Disable effects" toggle if perf is an issue.

## Roadmap / Next Steps
- Content
  - Replace placeholders in `page.tsx` with real copy, project cards, and contact form.
  - Add routes/sections for detailed case studies.
- UI/UX
  - Implement `ThemeToggle` button in layout and ensure discoverability.
  - Add navbar and smooth scroll to anchors.
  - Add responsive image/video assets.
- Effects
  - Preconfigure curated presets for 2–3 themes and constrain ranges for consistency.
  - Provide an accessible "Turn off background" switch that sets a static theme.
- Tech
  - Remove unused packages if not needed (`framer-motion`, `zustand`) or adopt them.
  - Add unit tests for helpers; integrate CI lint/build.
  - Consider upgrading Three.js to a newer minor if compatible with Vanta version.

## Known Issues / Considerations
- Vanta effect list in `vanta-background.tsx` includes `DOTS` loader, but the `VantaEffectId` union excludes `"DOTS"`. Align the union or remove the loader to match available options.
- Static export implies no server-side features; any forms should use third-party form handlers (e.g., Formspree) or edge functions if deploying on Vercel.

## Ownership & Contacts
- **Primary Owner**: Vibhu Dikshit
- **Handover To**: <new PM name>
- **Design/UX**: <owner>
- **Infra/DevOps**: <owner>

## Runbooks
- **Update content**: Edit `src/app/page.tsx` and add assets in `public/`.
- **Change background defaults**: Update `defaultsByEffect` in `src/app/components/visuals-manager.tsx`.
- **Add/remove effects**: Update both `EffectId` in `visuals-manager.tsx` and `VantaEffectId` + `loaders` in `vanta-background.tsx`.
- **Change theme tokens**: Edit CSS variables in `src/app/globals.css` theme sections.
- **Deploy to GitHub Pages**: Build → publish `out/` to Pages. Ensure basePath is correct for project/user pages.

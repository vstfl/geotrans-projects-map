# Embeddable Research Map — GitHub Pages Deployment

## 🎯 Objective
Develop a **self-contained, embeddable web map** using **SvelteKit**, **Tailwind CSS**, and **Leaflet**, hosted directly on **GitHub Pages**.  
The goal is to provide an **interactive and standalone visualization tool** that can be embedded within the research group’s Google Site via an `<iframe>` while also remaining accessible through its public GitHub Pages URL.

---

## 🧩 Framework Stack
- **Framework:** [SvelteKit](https://kit.svelte.dev/) — modern, lightweight reactive framework.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) — utility-first CSS for rapid styling.
- **Mapping Library:** [Leaflet](https://leafletjs.com/) — lightweight, open-source interactive map.
- **Build Adapter:** [`@sveltejs/adapter-static`](https://kit.svelte.dev/docs/adapter-static) — generates a static output suitable for GitHub Pages.
- **Hosting:** [GitHub Pages](https://pages.github.com/) — serves directly from a `/build` directory on the `main` branch.

---

## 🧠 High-Level Implementation Logic

### 1. Project Setup
- Initialize a new SvelteKit project with Tailwind CSS integrated.
- Install Leaflet and import its CSS assets.
- Add a simple Leaflet map to the root route (`src/routes/+page.svelte`).

### 2. Map Logic
- Initialize the map within `onMount()` to ensure it only runs client-side.
- Add a base tile layer (e.g., OpenStreetMap).
- Optionally add markers, GeoJSON layers, or data overlays for research-specific visualization.

### 3. Styling and Responsiveness
- Use Tailwind classes to ensure consistent map height, width, and responsiveness.
- The container should fit within an `<iframe>` environment while also scaling when accessed directly.
- Typical height: `600px` fixed or `80vh` relative.

### 4. Static Build Configuration
- Configure `@sveltejs/adapter-static` in `svelte.config.js`:
  - Set `paths.base` to the repo name (e.g., `/my-map`) for GitHub Pages compatibility.
  - Output build files to the `/build` directory.
- Update the build script in `package.json` to:
  ```bash
  npm run build

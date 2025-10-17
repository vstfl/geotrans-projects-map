# Geotrans Projects Map

A SvelteKit + Tailwind CSS application that renders a fullscreen Leaflet basemap. The app is designed to ship as static files so it can be embedded via `<iframe>` (e.g., on a Google Site) or served directly from GitHub Pages.

## Prerequisites
- Node.js 20+
- npm 10+

Install dependencies once:

```sh
npm install
```

## Local Development
Run the dev server and open the map at `http://localhost:5173`:

```sh
npm run dev -- --open
```

## Build for GitHub Pages
Generate the static site and copy it to `/docs`, which is the folder GitHub Pages can publish from (`Settings → Pages → Deploy from branch → main /docs`).

```sh
npm run build:docs
```

`npm run build` still writes to `/build` only. Run `npm run sync:docs` if you just need to re-copy the latest build artifacts without rebuilding.

After running the build command, commit the updated `build` and `docs` directories alongside your source changes and push to `main` to refresh the published site.

## Deployment Notes
- Asset paths automatically switch to `/geotrans-projects-map` in production builds so the site loads correctly from `https://vstfl.github.io/geotrans-projects-map/` and inside an iframe.
- Leaflet is only initialized in the browser. Static builds prerender cleanly without server-side access to the DOM.
- The current map is an OpenStreetMap basemap centered on `[20, 0]` with global zoom. Add markers or GeoJSON layers later as data becomes available.

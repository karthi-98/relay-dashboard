# Relay dashboard

A standalone developer operations mockup built with HTML, CSS, and vanilla JavaScript. No dependencies, package installation, or build step.

## Open

Open `index.html` directly in a modern browser. Alternatively, run `python -m http.server 4173` from this directory and visit `http://localhost:4173`.

## Files

- `index.html`: dashboard structure, navigation, filters, and accessible dialogs.
- `styles.css`: responsive dark theme, component styles, and motion tokens.
- `app.js`: sample data, SVG charts, views, and interactions.

## Interactions

- Overview, Performance, Activity, Services, Deployments, Logs, and Incidents views.
- Project, environment, time range, service status, and text filters.
- Sort services by name, request count, or latency; select individual or all visible rows.
- Inspect services and deployments; follow incidents into filtered logs.
- Create simulated deployments and acknowledge the sample incident.
- Export the visible service list to CSV and copy commit hashes.
- Search the workspace with Ctrl/Cmd+K; search services with `/`; go to Overview with G then O.
- Filter dropdowns support arrow keys, Home/End, type-to-jump, and Escape.
- Pages enter with a short rise and fade; tabs slide in from their side, and the sidebar highlight and tab underline glide to the new selection. Keyboard navigation is instant, and reduced motion uses a plain fade.
- Scrub the main chart with a pointer, or focus it and use the arrow keys (Shift for larger steps), to compare each point with the previous period.
- Save workspace name and table density in browser local storage.

All metrics, incidents, logs, and deployments are simulated. Changes to deployments and incident state reset on reload; workspace preferences persist in the current browser. Inter and JetBrains Mono load from Google Fonts and fall back to system fonts offline; icons and charts are inline SVG. The layout includes a mobile navigation drawer, scrollable data tables, keyboard focus states, native dialog focus handling, and reduced-motion support.

Design follows the Relay concept, with inspiration from the Kargul Studio Sales CRM reference. Motion guidance combines emil-design-eng, better-ui, and transitions-polish; frequent actions stay immediate, while overlays use purpose-specific motion tokens.

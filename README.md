# Alto City Limits

Private development repository for the Alto City Limits WordPress site and its alternate display modes.

## Theme status

| Mode | Status | GitHub Pages source |
| --- | --- | --- |
| Light | Approved Editorial direction | `site/light/` |
| Dark | Current Campaign/D&D production baseline | `site/dark/` |
| Dark Ages | Active work in progress | `site/dark-ages/` |
| Terminal | Approved high-contrast direction | `site/terminal/` |

## Repository layout

- `site/` — static GitHub Pages theme lab.
- `wordpress/current-dark-theme/` — preserved source snapshot of the current WordPress Campaign/Dark theme.
- `docs/GITHUB-PAGES.md` — one-time Pages setup and testing routes.
- `.github/workflows/pages.yml` — deploys `site/` to GitHub Pages.

## Locked baselines

### Light / Editorial
The approved Editorial homepage is the Light-mode source of truth. Do not redesign or blend it with Dark Ages. Only shared integration mechanics, such as the compact mode selector, should be added unless a specific design change is requested.

### Dark / Campaign
The current WordPress Campaign/D&D design is the production baseline. Preserve its copy, layout, styling, and random interactions. `wordpress/current-dark-theme/MANIFEST.sha256` records the source hashes for integrity checking.

## Dark Ages
Dark Ages is still being developed. The current direction uses the more spacious Editorial-style information architecture, parchment/manuscript styling, medieval diagrams and bestiary imagery, and responsive reflow rather than a compressed single-folio layout.

## GitHub Pages
GitHub Pages is the visual testing platform. The repo owner must enable **Settings → Pages → Source: GitHub Actions** once before the deployment workflow can publish. See `docs/GITHUB-PAGES.md`.

Expected Pages URL after enablement:

`https://mattsimoto.github.io/altocitylimits/`

## GitHub Pages vs. WordPress

GitHub Pages is static hosting and does not execute PHP. The `site/` versions are visual/responsive prototypes. WordPress queries, dynamic case studies, forms, menus, custom fields, and server-side behavior still require WordPress staging before production deployment.

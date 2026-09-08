# Alto City Limits

Private development repository for the Alto City Limits WordPress site and its alternate display modes.

## Theme status

| Mode | Status | GitHub Pages source |
| --- | --- | --- |
| Light | Approved Editorial direction | `site/light/` |
| Dark | Current Campaign/D&D production baseline | `site/dark/` |
| Dark Ages | Work in progress | `site/dark-ages/` |
| Terminal | Approved high-contrast direction | `site/terminal/` |

## Repository layout

- `site/` — static GitHub Pages test harness.
- `wordpress/current-dark-theme/` — source extracted from the current WordPress theme ZIP. This is the Dark/Campaign baseline and should remain unchanged unless explicitly intended.
- `.github/workflows/pages.yml` — deploys `site/` to GitHub Pages.

## GitHub Pages vs. WordPress

GitHub Pages is static hosting and does not execute PHP. The `site/` versions are responsive visual prototypes. WordPress-specific behavior, queries, forms, and dynamic content still need to be tested in a WordPress staging environment before production deployment.

## Preservation rule

The Dark/Campaign WordPress theme is the baseline. Alternate modes should be built around it rather than rewriting its content or design.
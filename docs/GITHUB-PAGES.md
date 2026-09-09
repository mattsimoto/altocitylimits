# GitHub Pages Theme Lab

This repository uses GitHub Pages as the static visual-testing platform for Alto City Limits theme development.

## One-time repository setting

The GitHub App used from ChatGPT can update repository files and workflows, but it cannot create/enable a Pages site for the repository. The repository owner must do this once in GitHub:

1. Open the `mattsimoto/altocitylimits` repository.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Save/confirm if GitHub presents a confirmation control.
5. Open **Actions → Deploy theme lab to GitHub Pages** and run the workflow, or push any change under `site/`.

Expected project Pages URL after deployment:

`https://mattsimoto.github.io/altocitylimits/`

## Theme lab routes

- Light / Editorial: `/altocitylimits/light/`
- Dark / Campaign: `/altocitylimits/dark/`
- Dark Ages WIP: `/altocitylimits/dark-ages/`
- Terminal / High Contrast: `/altocitylimits/terminal/`

The root Pages URL opens the Theme Lab launcher.

## Status

- **Light / Editorial**: approved and should be treated as locked except for shared integration mechanics such as the small mode selector.
- **Dark / Campaign**: current WordPress production baseline. Preserve its copy, layout, interactions, and styling unless a change is explicitly requested.
- **Dark Ages**: active work in progress. Current direction uses the more spacious Editorial-derived structure with medieval manuscript imagery and responsive reflow.
- **Terminal**: approved high-contrast direction; not the current focus.

## Important limitation

GitHub Pages is static hosting and does not execute WordPress/PHP. It is for visual and responsive testing. Dynamic WordPress queries, case-study data, forms, menus, and server-side behavior still require WordPress staging before production deployment.

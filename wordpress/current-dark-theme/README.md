# Current Dark / Campaign Theme Baseline

This directory preserves the current Alto City Limits WordPress Dark/Campaign theme as the baseline for the multimode project.

The Dark design, copy, section structure, and interactions are considered frozen unless a change is explicitly requested.

## Source snapshot

The text source from the user-provided `altocitylimits 3.zip` is stored as a compressed archive split into text-safe chunks under `source-archive/`. The archive contains the PHP, CSS, JavaScript, JSON, and documentation files from the current theme without modifying them.

To reconstruct the text-source archive locally:

```bash
cat source-archive/part-* | base64 --decode > current-dark-text-source.tar.gz
tar -xzf current-dark-text-source.tar.gz
```

The theme's self-hosted WOFF2 font files are binary assets and are not duplicated in this text-safe archive. Their original filenames remain documented in the theme CSS and the original uploaded theme package remains the authoritative binary source until we add those assets directly to GitHub.

## GitHub Pages

`/site/dark/` is a static visual test rendering of this theme. GitHub Pages cannot execute WordPress/PHP, so WordPress queries, dynamic case studies, forms, and other server-side behavior still require WordPress staging.

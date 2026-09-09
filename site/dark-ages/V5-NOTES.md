# Dark Ages v5 WIP — Native Asset Library

This pass replaces borrowed manuscript scans with an original Alto City Limits medieval asset system.

Included reusable asset types:
- dragon and snail marginalia;
- manicules;
- vine flourishes;
- illuminated initials;
- cosmology and diagram motifs;
- border fragments and corners;
- grotesques and bestiary figures.

Implementation details:
- one optimized transparent atlas is loaded once;
- each item is exposed as an independent responsive SVG crop, so it can be positioned and scaled separately;
- hero, folio markers, capability cards, Selected Work, project marks, Field Notes, and surprise interactions now use native artwork;
- large marginal figures appear only on wide desktop and disappear below 1400px;
- ornamental dividers and initials simplify on smaller screens;
- remaining Wikimedia manuscript imagery is replaced at runtime by native assets;
- the asset gallery is available at `assets/medieval/`.

This remains a work in progress and is not the locked production theme.

# Dark Ages v5 WIP — Original Medieval Asset Library

This pass replaces borrowed manuscript scans and the later simplified SVG approximations with the actual original illuminated-manuscript artwork generated for Alto City Limits.

Included reusable asset types:
- dragon and snail marginalia;
- three manicules;
- vine flourishes;
- illuminated initials;
- cosmology and diagram motifs;
- border fragments and corners;
- grotesques and bestiary figures.

Implementation details:
- the original transparent artwork is preserved in one optimized WebP atlas;
- each piece is exposed through a tight SVG viewBox crop so its original shape, proportions, color, line work, and transparency remain intact;
- no multiply blending, recoloring, geometric redrawing, or non-uniform image stretching is applied;
- hero, folio markers, capability cards, analysis imagery, Selected Work, project marks, Field Notes, and surprise interactions use the original generated art;
- asset choices are more intentional: diagrams are used for strategy/systems, manicules for editorial/action cues, initials for folios/About, and creatures for marginalia/bestiary moments;
- large marginal figures appear only on wide desktop and disappear below 1400px;
- the asset gallery at `assets/medieval/` renders the same exact source artwork used by the Dark Ages page;
- the malformed hand-built SVG approximations have been removed from the repository.

This remains a work in progress and is not the locked production theme.

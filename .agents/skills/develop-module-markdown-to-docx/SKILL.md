## When to Use

Use when changing the Markdown to Docx tool: conversion rules, templates, image embedding, or Mermaid diagrams.

## Key locations

- `pages/tools/markdown-to-docx/index.vue` — paste/upload UI, template selector, sample markdown, download
- `utils/markdown-to-docx.ts` — marked lexer → `docx` Document; images and Mermaid become PNG `ImageRun`
- `utils/markdown-to-docx-templates.ts` — `default` and `laporan-indonesia` page/font/spacing presets
- `composables/useToolsRegistry.ts` — tool listing under Converters

## References

- (none)

## Learned user preferences

- Mermaid fenced blocks (` ```mermaid `) must become a diagram image in the Word file, not a gray code block
- If a diagram cannot render, keep the source as a normal code block so the download still succeeds

## Learned Workspace Facts

- Conversion is browser-only: remote images, SVG rasterization, and Mermaid all need `document` / canvas
- Mermaid: set root `htmlLabels: false`, photograph the inner host (not the off-screen wrapper), reject mostly-blank PNGs, then rasterize the SVG. Do not put `left:-12000` or `opacity:0` on the node passed to `modern-screenshot`
- Image and Mermaid paragraphs must set `indent.firstLine = 0` and must not set `spacing.line`
- Default template follows the docx skill: US Letter 12240×15840, 1" (1440) margins, Arial 12 pt, H1 16 pt gap 240/240, H2 14 pt gap 180/180, figure gap 240/240
- Tables: `WidthType.DXA` on table + each cell, `columnWidths` that sum to content width, `ShadingType.CLEAR`, cell margins 80/80/120/120
- Lists: `LevelFormat.BULLET` / `DECIMAL` with indent left `720 * (level + 1)` and hanging 360 — never unicode bullets in the paragraph text
- Heading styles and heading paragraphs use before/after only — do not set `spacing.line` on headings
- This tool lived on `main` before it was brought onto `development`; `docx`, `mermaid`, and `modern-screenshot` are required dependencies

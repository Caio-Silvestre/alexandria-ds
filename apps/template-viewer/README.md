<!-- Copyright (c) Meta Platforms, Inc. and affiliates. -->

# Template Viewer

A tiny Vite app that renders any template from `packages/cli/templates` in the
browser. Replaces the heavier `apps/sandbox` for previewing templates.

## Usage

```bash
pnpm -F @pharos-ds/template-viewer dev
```

Then open the path to a template directory as the URL, e.g.:

- http://localhost:5173/packages/cli/templates/pages/ai-chat
- http://localhost:5173/packages/cli/templates/blocks/components/Avatar

Opening `/` lists every available template.

## How it works

`src/App.tsx` globs every `.tsx` under `packages/cli/templates`, matches the one
in the directory named by the URL path, and lazy-renders it inside `<Theme>`.
StyleX is compiled from `@pharos-ds/core` source by `pharosStylex()` — no
codegen, no Babel/PostCSS/Next.js.

## Prerequisites

The `@pharos-ds/build`, `@pharos-ds/core`, and `@pharos-ds/theme-pharos`
packages must be built once (they ship from `dist`):

```bash
pnpm -F @pharos-ds/build build
pnpm -F @pharos-ds/core build
pnpm -F @pharos-ds/theme-pharos build
```

# @pharos-ds/core

Core UI components, theme system, and utilities for the Pharos design system. For project setup, see [Quick Start](#quick-start) below.

> **Building with an AI agent?** Add the CLI, then run `init`:
>
> ```bash
> npm install -D @pharos-ds/cli   # or: pnpm add -D / yarn add -D / bun add -d
> npx pharos init                    # resolves to the CLI you just installed
> ```
>
> `init` writes the Pharos component index into your `AGENTS.md`/`CLAUDE.md` so your agent discovers components, templates, and design tokens instead of guessing. Need a single command without installing? Use the scoped package directly — `npx @pharos-ds/cli <cmd>` (or `pnpm dlx`/`bunx @pharos-ds/cli`). Bare `npx pharos` only works once `@pharos-ds/cli` is a dependency; before that npm resolves it to an unrelated package. See [XDS CLI](#xds-cli).

## Component Docs

Look up any component's full API (props, variants, examples, best practices, and theming) via the Pharos CLI:

```bash
npx @pharos-ds/cli init                   # one-time: writes the component guide into AGENTS.md / CLAUDE.md
npx @pharos-ds/cli component Button        # full docs for a component
npx @pharos-ds/cli component --list        # list all components
```

> Use the scoped `@pharos-ds/cli` to run without installing; bare `npx pharos` only resolves once the CLI is a dependency.

## Page Layouts

Building a full page? Start with a template rather than composing from scratch.
Templates are content-only; they compose `Layout` with header, content, and
panel slots into common page patterns (dashboards, settings, forms, detail pages).
Wrap them in your own app chrome (`AppShell`, `TopNav`, `SideNav`) to add
global navigation.

Requires `@pharos-ds/cli` (`npm install -D @pharos-ds/cli`):

```bash
pharos template --list              # browse all page and block templates
pharos template dashboard           # emit full page source
pharos template settings --skeleton # layout skeleton with spatial annotations
```

## Pharos CLI

The CLI (`@pharos-ds/cli`) provides additional tooling:

```bash
pharos --help                       # full listing of all commands
pharos component Button             # full docs + related block templates
pharos docs                         # reference docs (principles, tokens, theming, styling)
pharos docs theme                   # theming guide (Theme, defineTheme, light/dark)
pharos docs tokens                  # spacing, color, radius, typography token reference
pharos init                         # initialize Pharos in your project
pharos theme build                  # build theme CSS for production
pharos swizzle Button               # eject component source for customization
pharos upgrade --apply              # run codemods to migrate between versions
pharos discover                     # discover external Pharos packages
pharos gap-report                   # report a missing capability
```

> Prefix these with your runner: `npx pharos …` / `pnpm exec pharos …` once the CLI is installed, or `npx @pharos-ds/cli …` to run without installing.

## Related Packages

| Package                                                                                               | Description                                                   |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| [`@pharos-ds/cli`](https://github.com/Caio-Silvestre/alexandria-ds/tree/main/packages/cli)                      | CLI tooling: component docs, templates, scaffolding, codemods |
| [`@pharos-ds/theme-pharos`](https://github.com/Caio-Silvestre/alexandria-ds/tree/main/packages/themes/pharos) | Official Alexandria / Pharos theme (Lucide icons) |

## Resources

- [Component Storybook](https://pharos-ds.vercel.app/)
- [GitHub Repository](https://github.com/Caio-Silvestre/alexandria-ds)

---

## Quick Start

Install Pharos and a theme:

```bash
npm install @pharos-ds/core @pharos-ds/theme-pharos
```

Then pick your setup below based on your framework and styling approach.

### Next.js (simplest)

The fastest way to get started. No build plugins, no PostCSS, no Babel config — Pharos ships pre-built CSS and JS, so you import three stylesheets (order matters) and wrap your app in a theme provider.

**`src/app/globals.css`**

```css
@import '@pharos-ds/core/reset.css';
@import '@pharos-ds/core/pharos.css';
@import '@pharos-ds/theme-pharos/theme.css';
```

The import order maps to the layer cascade: `reset.css` (`@layer reset`) → `pharos.css` component styles (`@layer pharos-base`) → `theme.css` token overrides (`@layer pharos-theme`).

**`src/app/providers.tsx`**

```tsx
'use client';

import Link from 'next/link';
import {Theme} from '@pharos-ds/core/theme';
import {LinkProvider} from '@pharos-ds/core/Link';
import {neutralTheme} from '@pharos-ds/theme-pharos/built';

export function Providers({children}: {children: React.ReactNode}) {
  return (
    <Theme theme={pharosTheme}>
      <LinkProvider component={Link}>{children}</LinkProvider>
    </Theme>
  );
}
```

**`src/app/layout.tsx`**

```tsx
import './globals.css';
import {Providers} from './providers';

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

### Next.js + Tailwind

No build plugins needed; Pharos ships pre-built CSS that works alongside Tailwind.

**`src/app/globals.css`**

```css
@layer reset, theme, base, pharos-base, pharos-theme, components, utilities;

@import 'tailwindcss/theme.css' layer(theme);
@import 'tailwindcss/preflight.css' layer(base);
@import '@pharos-ds/core/reset.css';
@import '@pharos-ds/core/pharos.css';
@import '@pharos-ds/theme-pharos/theme.css';
@import '@pharos-ds/core/tailwind-theme.css';
@import 'tailwindcss/utilities.css' layer(utilities);
```

The `tailwind-theme.css` import maps system tokens to Tailwind utilities via `@theme inline`:

```tsx
// Without the bridge — verbose:
<div className="rounded-[var(--radius-container)] bg-[var(--color-background-surface)] text-[var(--color-text-primary)]">

// With the bridge — just works:
<div className="rounded-lg bg-surface text-primary">
```

Some useful mappings:

| Tailwind class                                            | Pharos token                                      |
| --------------------------------------------------------- | ------------------------------------------------- |
| `text-primary` / `text-secondary`                         | `--color-text-primary` / `--color-text-secondary` |
| `bg-surface` / `bg-card` / `bg-body`                      | `--color-background-surface` / `card` / `body`    |
| `border-border` / `border-strong`                         | `--color-border` / `--color-border-emphasized`    |
| `bg-success` / `text-error` / `text-warning`              | Status tokens                                     |
| `bg-blue-subtle` / `border-blue-ring` / `text-blue-vivid` | Hue palette (×10 hues)                            |
| `rounded-sm` / `rounded-md` / `rounded-lg`                | `--radius-inner` / `element` / `container`        |
| `shadow-sm` / `shadow-md` / `shadow-lg`                   | `--shadow-low` / `med` / `high`                   |

Spacing references `var(--spacing-1)` as the base unit, so `p-4` = 16px, matching Pharos's `--spacing-4`. Arbitrary values still work as an escape hatch: `bg-[var(--color-background-surface)]`.

**`src/app/providers.tsx`**

```tsx
'use client';

import Link from 'next/link';
import {Theme} from '@pharos-ds/core/theme';
import {LinkProvider} from '@pharos-ds/core/Link';
import {neutralTheme} from '@pharos-ds/theme-pharos/built';

export function Providers({children}: {children: React.ReactNode}) {
  return (
    <Theme theme={pharosTheme}>
      <LinkProvider component={Link}>{children}</LinkProvider>
    </Theme>
  );
}
```

**`src/app/layout.tsx`**

```tsx
import './globals.css';
import {Providers} from './providers';

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

That's it. Start using components:

```tsx
import {Button} from '@pharos-ds/core/Button';

export default function Page() {
  return <Button label="Hello Pharos" variant="primary" />;
}
```

### Next.js + StyleX

Use the pre-built dist alongside StyleX for your own styles.

```bash
npm install @pharos-ds/core @pharos-ds/theme-pharos
```

**`src/app/globals.css`**

```css
@import '@pharos-ds/core/reset.css';
@import '@pharos-ds/core/pharos.css';
@import '@pharos-ds/theme-pharos/theme.css';
```

Providers and layout are the same as the Tailwind example (use `@pharos-ds/theme-pharos/built`).

### Vite

```bash
npm install @pharos-ds/core @pharos-ds/theme-pharos
```

Same CSS imports and providers as above. No build plugins needed; Pharos ships pre-built.

### No build step (CDN)

For prototypes, embeds, or pages without a bundler, load the components straight
from a public CDN. Two delivery options ship in the published package:

**1. UMD global (`<script>` tag).** A single pre-bundled file exposes every export
on `window.Pharos`. React and ReactDOM are peer dependencies — load them yourself.
Pair it with the precompiled stylesheet.

```html
<!doctype html>
<html data-pharos-theme="neutral">
  <head>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@pharos-ds/core/src/reset.css" />
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@pharos-ds/core/dist/pharos.css" />
  </head>
  <body>
    <div id="root"></div>
    <script
      crossorigin
      src="https://unpkg.com/react@19/umd/react.production.min.js"></script>
    <script
      crossorigin
      src="https://unpkg.com/react-dom@19/umd/react-dom.production.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@pharos-ds/core/dist/pharos.umd.js"></script>
    <script>
      const {Button, Card} = window.Pharos;
      const e = React.createElement;
      ReactDOM.createRoot(document.getElementById('root')).render(
        e(Card, null, e(Button, {variant: 'primary'}, 'Hello from a CDN')),
      );
    </script>
  </body>
</html>
```

**2. ES modules (no UMD, no globals).** Use [esm.sh](https://esm.sh), which rewrites
bare imports to browser-resolvable URLs. An import map keeps a single React instance.

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@pharos-ds/core/dist/pharos.css" />
<script type="importmap">
  {
    "imports": {
      "react": "https://esm.sh/react@19",
      "react-dom/client": "https://esm.sh/react-dom@19/client",
      "@pharos-ds/core": "https://esm.sh/@pharos-ds/core?external=react,react-dom"
    }
  }
</script>
<script type="module">
  import {createRoot} from 'react-dom/client';
  import {Button} from '@pharos-ds/core';
  // ...render as usual
</script>
```

> Pin a version in production (e.g. `@pharos-ds/core@0.1.1`) — unversioned CDN URLs
> resolve to the latest release and are cached aggressively. The raw ESM entry
> (`dist/index.js`) uses bare `react` imports and will **not** run from a plain
> `<script src>`; use the UMD global or esm.sh as shown above.

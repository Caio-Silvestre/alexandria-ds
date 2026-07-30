# Pharos Example: Next.js (Dist)

Reference application for consuming **@pharos-ds/core** as a pre-built dist package in a Next.js project.

No StyleX build plugin needed; Pharos ships pre-compiled CSS and JS. This is the simplest way to get started.

## Setup Steps

### 1. Install dependencies

```bash
npm install @pharos-ds/core @pharos-ds/theme-pharos next react react-dom
npm install --save-dev @types/react @types/react-dom typescript
```

### 2. CSS imports

In `src/app/globals.css`, import the reset, component styles, and theme:

```css
@import '@pharos-ds/core/reset.css';
@import '@pharos-ds/core/pharos.css';
@import '@pharos-ds/theme-pharos/theme.css';
```

The CSS import order matters:

1. `reset.css`: baseline resets (`@layer reset`)
2. `pharos.css`: all component styles (`@layer pharos-base`)
3. `theme.css`: theme token overrides (`@layer pharos-theme`)

Import the CSS file in your root layout:

```tsx
import './globals.css';
```

### 3. Theme + Link provider (client boundary)

```tsx
// src/app/providers.tsx
'use client';
import Link from 'next/link';
import {Theme} from '@pharos-ds/core/theme';
import {LinkProvider} from '@pharos-ds/core/Link';
import {neutralTheme} from '@pharos-ds/theme-pharos/built';

export function Providers({children}) {
  return (
    <Theme theme={neutralTheme}>
      <LinkProvider component={Link}>{children}</LinkProvider>
    </Theme>
  );
}
```

`LinkProvider` wires up Next.js client-side navigation for all Pharos link-based components (Link, Button with href, TopNav, SideNav, Breadcrumbs, TabList).

## Gotchas

| Issue                         | Symptom                                     | Fix                                         |
| ----------------------------- | ------------------------------------------- | ------------------------------------------- |
| Wrong CSS import order        | Missing theme tokens or broken layers       | Import reset → pharos → theme in that order |
| No `'use client'` on provider | Server component error from `createContext` | Mark the provider file with `'use client'`  |

## Testing outside the monorepo

This example lives in the Pharos monorepo for convenience, but it should be representative of a real app consuming `@pharos-ds/core` from npm. Monorepo workspace resolution can silently bypass issues that external consumers hit.

**Before merging changes to this example, test it as an external consumer.** See the [Testing Example Apps](https://github.com/Caio-Silvestre/alexandria-ds/wiki/Testing-Example-Apps) wiki page for the full procedure.

## Related

- [Issue #145: Add example-nextjs project](https://github.com/Caio-Silvestre/alexandria-ds/issues/145)
- [Pharos + Tailwind example](../example-nextjs-tailwind/): same dist approach with Tailwind for custom layout styles

# Pharos Example: Next.js + StyleX (Dist)

Reference application for consuming **@pharos-ds/core** as a pre-built dist package with **StyleX** for product-level styles.

Pharos component CSS comes pre-built; there is no need to compile Pharos source. StyleX is only used for your own app-level layout and custom styles, compiled at build time via the PostCSS plugin.

## CSS Layer Integration

This example uses StyleX's `useCSSLayers.before` option to declare Pharos dist layers before the StyleX app layers:

```js
// postcss.config.js
useCSSLayers: {
  before: ['reset', 'pharos-base', 'pharos-theme'],
}
```

This produces a layer order of:

```
reset < pharos-base < pharos-theme < stylex.base < stylex.1 < stylex.2 < ...
```

Product-level StyleX styles always win over Pharos component defaults without needing `!important` or extra specificity.

## Key Difference from Source Build

|                     | This example (dist + StyleX)                            | Source build                                        |
| ------------------- | ------------------------------------------------------- | --------------------------------------------------- |
| Pharos CSS          | Pre-built via `@import "@pharos-ds/core/pharos.css"` | Compiled from source via StyleX babel plugin        |
| PostCSS `include`   | `src/**/*` only (your code)                             | `src/**/*` + `node_modules/@pharos-ds/core/**/*` |
| StyleX `aliases`    | Not needed                                              | Required for `createTheme` resolution               |
| `transpilePackages` | Not needed                                              | Required in next.config                             |
| Layer ordering      | `useCSSLayers.before` declares Pharos layers            | `useCSSLayers: true` (Pharos layers mixed in)       |

## Setup Steps

### 1. Install dependencies

```bash
npm install @stylexjs/stylex @pharos-ds/core @pharos-ds/theme-pharos next react react-dom
npm install --save-dev @stylexjs/babel-plugin @stylexjs/postcss-plugin \
  @babel/preset-react @babel/preset-typescript typescript @types/react @types/react-dom
```

### 2. Browserslist

```json
{
  "browserslist": ["last 1 Chrome version"]
}
```

### 3. Babel config

`babel.config.js`: StyleX for app-level styles only:

```js
module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      '@stylexjs/babel-plugin',
      {
        dev: process.env.NODE_ENV === 'development',
        runtimeInjection: false,
        genConditionalClasses: true,
        treeshakeCompensation: true,
        unstable_moduleResolution: {
          type: 'commonJS',
          rootDir: __dirname,
        },
      },
    ],
  ],
};
```

> No `aliases` config needed; we're not compiling Pharos source.

### 4. PostCSS config

`postcss.config.js`: scan your app source, declare Pharos layers before StyleX layers:

```js
module.exports = {
  plugins: {
    '@stylexjs/postcss-plugin': {
      include: ['src/**/*.{js,jsx,ts,tsx}'],
      babelConfig: {
        /* ... */
      },
      useCSSLayers: {
        before: ['reset', 'pharos-base', 'pharos-theme'],
      },
    },
  },
};
```

### 5. CSS entry point

`src/app/globals.css`:

```css
@import '@pharos-ds/core/reset.css';
@import '@pharos-ds/core/pharos.css';
@import '@pharos-ds/theme-pharos/theme.css';

@stylex;
```

### 6. Theme + Link provider

```tsx
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

## Related

- [Plain dist example](../example-nextjs/): no CSS framework, inline styles for layout
- [Dist + Tailwind example](../example-nextjs-tailwind/): Tailwind for layout styles

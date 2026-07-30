# @pharos-ds/build

Build plugins for XDS source builds. Provides babel, PostCSS, and Vite integrations that compile XDS library and product code with separate class name prefixes, which enables independent CSS layers:

```
reset < pharos-base (library, pharos prefix) < pharos-theme < product (app, x prefix)
```

## Why?

StyleX generates atomic CSS: same declaration = same class name. Without separate prefixes, library and product classes collide and can't be placed in independent CSS layers, which breaks theme overrides.

`@pharos-ds/build` solves this by:

1. Compiling XDS library code with `pharos` prefix (`.pharos78zum5`)
2. Compiling product code with default `x` prefix (`.x78zum5`)
3. Placing each group in its own CSS `@layer`

## Packages

| Export                     | Purpose                                      | Platform                    |
| -------------------------- | -------------------------------------------- | --------------------------- |
| `@pharos-ds/build/babel`   | Babel plugin: splits class prefixes per file | Next.js, any babel pipeline |
| `@pharos-ds/build/postcss` | PostCSS plugin: compiles + splits CSS layers | Next.js                     |
| `@pharos-ds/build/vite`    | Vite plugin: wraps unplugin + splits layers  | Vite, Storybook             |

## Install

```bash
npm install -D @pharos-ds/build @stylexjs/babel-plugin @babel/core
```

For Vite, also install:

```bash
npm install -D @stylexjs/unplugin
```

---

## Next.js Setup

### 1. babel.config.js

```js
const path = require('path');

module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      '@pharos-ds/build/babel',
      {
        dev: process.env.NODE_ENV !== 'production',
        runtimeInjection: false,
        treeshakeCompensation: true,
        enableInlinedConditionalMerge: true,
        aliases: {
          '@pharos-ds/core/*': [
            path.join(__dirname, 'node_modules/@pharos-ds/core/*'),
          ],
          '@pharos-ds/core': [
            path.join(__dirname, 'node_modules/@pharos-ds/core'),
          ],
        },
        unstable_moduleResolution: {type: 'commonJS'},
      },
    ],
  ],
};
```

### 2. postcss.config.js

```js
const path = require('path');

module.exports = {
  plugins: {
    '@pharos-ds/build/postcss': {
      appDir: 'src',
      babelPlugins: [
        [
          '@stylexjs/babel-plugin',
          {
            dev: process.env.NODE_ENV !== 'production',
            runtimeInjection: false,
            treeshakeCompensation: true,
            enableInlinedConditionalMerge: true,
            aliases: {
              '@pharos-ds/core/*': [
                path.join(__dirname, 'node_modules/@pharos-ds/core/*'),
              ],
              '@pharos-ds/core': [
                path.join(__dirname, 'node_modules/@pharos-ds/core'),
              ],
            },
            unstable_moduleResolution: {type: 'commonJS'},
          },
        ],
      ],
    },
  },
};
```

### 3. next.config.mjs

```js
const nextConfig = {
  transpilePackages: ['@pharos-ds/core', '@pharos-ds/theme-pharos'],
  webpack: config => {
    // Resolve to source TypeScript instead of dist
    config.resolve.conditionNames = ['source', 'import', 'require', 'default'];
    return config;
  },
};

export default nextConfig;
```

### 4. CSS files

`src/app/layers.css`:

```css
@layer reset, pharos-base, pharos-theme, product;
```

`src/app/globals.css`:

```css
@import './layers.css';
@import '@pharos-ds/core/reset.css';
@import '@pharos-ds/theme-pharos/theme.css';

@stylex;
```

> `layers.css` must be a separate file because webpack hoists `@import` content above inline CSS.

### 5. Browserslist

```json
{
  "browserslist": ["last 1 Chrome version"]
}
```

---

## Vite Setup

```ts
import {pharosStylex} from '@pharos-ds/build/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    ...pharosStylex({
      stylexOptions: {
        dev: process.env.NODE_ENV === 'development',
        runtimeInjection: false,
        treeshakeCompensation: true,
        unstable_moduleResolution: {
          type: 'commonJS',
          rootDir: __dirname,
        },
      },
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@pharos-ds/core': path.resolve(
        __dirname,
        'node_modules/@pharos-ds/core/src',
      ),
    },
  },
  optimizeDeps: {
    exclude: ['@pharos-ds/core', '@pharos-ds/theme-pharos'],
  },
});
```

---

## How it works

### Babel plugin (`@pharos-ds/build/babel`)

Wraps `@stylexjs/babel-plugin` with two internal instances: one with `classNamePrefix: 'pharos'` for library files, one with default `'x'` for product files. Routes each file to the correct instance based on its path.

Library patterns (configurable):

- `packages/core/`
- `packages/themes/`
- `node_modules/@pharos-ds/`

### PostCSS plugin (`@pharos-ds/build/postcss`)

Compiles StyleX from both library and product source files in two separate passes with different prefixes. Wraps the results in named `@layer` blocks:

- Library rules → `@layer pharos-base`
- Product rules → `@layer product`

### Vite plugin (`@pharos-ds/build/vite`)

Wraps `@stylexjs/unplugin` and intercepts the dev CSS endpoint (`/virtual:stylex.css`). Partitions the collected rules by file path and serves split-layer CSS.

---

## Advanced Options

### Babel plugin

```js
[
  '@pharos-ds/build/babel',
  {
    // Patterns to identify library files (default shown)
    libraryPatterns: [
      'packages/core/',
      'packages/themes/',
      'node_modules/@pharos-ds/',
    ],

    // Class name prefix for library styles (default: 'pharos')
    libraryPrefix: 'pharos',

    // Class name prefix for product styles (default: 'x')
    classNamePrefix: 'x',

    // ... all @stylexjs/babel-plugin options
  },
];
```

### PostCSS plugin

```js
'@pharos-ds/build/postcss': {
  appDir: 'src',           // Your app source directory
  babelPlugins: [...],     // StyleX babel plugin config
  libraryPrefix: 'pharos',   // Prefix for library CSS (default: 'pharos')
  extraInclude: [...],     // Additional glob patterns
  layers: {                // Layer names (defaults shown)
    library: 'pharos-base',
    product: 'product',
  },
}
```

## Related

- [example-nextjs-source](../../apps/example-nextjs-source/): full Next.js source build example
- [`@stylexjs/babel-plugin`](https://github.com/facebook/stylex): the underlying StyleX compiler

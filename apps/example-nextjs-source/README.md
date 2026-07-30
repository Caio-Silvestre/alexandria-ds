# Pharos Example: Next.js (Source Build)

Reference application for compiling **@pharos-ds/core** from raw TypeScript + StyleX source alongside product code. Uses `@pharos-ds/build` for independent CSS layer separation.

## Why source build?

|               | Source build                                       | Dist build                   |
| ------------- | -------------------------------------------------- | ---------------------------- |
| CSS output    | Only styles for components you import (~22KB)      | All component styles (~77KB) |
| Layer control | Full: reset < pharos-base < pharos-theme < product | Basic: import order          |
| Build time    | Slower (compiles Pharos source through Babel)      | Fast (pre-built CSS)         |
| Setup         | More config (babel + postcss + next.config)        | Minimal (CSS imports)        |

## How it works

`@pharos-ds/build` provides two plugins that work together:

1. **`@pharos-ds/build/babel`**: wraps the StyleX babel plugin, routing Pharos library files to `pharos` class prefix and product files to default `x` prefix
2. **`@pharos-ds/build/postcss`**: compiles StyleX CSS in two passes with different prefixes, wrapping each in its own `@layer`

This creates completely independent class namespaces:

- `.pharos78zum5 { display: flex }` in `@layer pharos-base`
- `.x78zum5 { display: flex }` in `@layer product`

Theme sits between them in `@layer pharos-theme`, so:

- Theme overrides library defaults ✓
- Product overrides theme when needed ✓
- No `!important` needed ✓

## Setup

### 1. Install

```bash
npm install @stylexjs/stylex @pharos-ds/core @pharos-ds/theme-pharos next react react-dom
npm install -D @pharos-ds/build @stylexjs/babel-plugin @babel/core autoprefixer typescript
```

### 2. babel.config.js

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
        enableInlinedConditionalMerge: true,
        treeshakeCompensation: true,
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

### 3. postcss.config.js

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
            enableInlinedConditionalMerge: true,
            treeshakeCompensation: true,
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
    autoprefixer: {},
  },
};
```

### 4. next.config.mjs

```js
const nextConfig = {
  transpilePackages: ['@pharos-ds/core', '@pharos-ds/theme-pharos'],
  webpack: config => {
    config.resolve.conditionNames = ['source', 'import', 'require', 'default'];
    return config;
  },
};

export default nextConfig;
```

### 5. CSS files

`src/app/layers.css` must be a separate file (webpack hoists `@import` content):

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

## Layer Demo

This example includes a visual demo showing:

1. **pharos-base**: default Pharos component styles
2. **pharos-theme**: theme overrides (secondary button background)
3. **product**: app overrides (pill shape, green background, full-width)
4. **Class prefix verification**: Pharos components use `pharos` prefix, product uses `x`

Open devtools → CSS layers panel to see the separation.

## Gotchas

| Issue                    | Symptom                                      | Fix                                                                |
| ------------------------ | -------------------------------------------- | ------------------------------------------------------------------ |
| Missing `conditionNames` | Pharos resolves to dist (no `pharos` prefix) | Add `['source', 'import', 'require', 'default']` to webpack config |
| Missing `aliases`        | `defineVars` resolution fails                | Add aliases for `@pharos-ds/core` and `@pharos-ds/core/*`    |
| `layers.css` inline      | Layer order ignored                          | Keep as separate file (webpack hoists `@import`)                   |
| Missing `browserslist`   | `light-dark()` gets lowered                  | Add `["last 1 Chrome version"]`                                    |

## Related

- [Plain dist example](../example-nextjs/): simplest setup
- [Dist + Tailwind](../example-nextjs-tailwind/): Tailwind for layout
- [Dist + StyleX](../example-nextjs-stylex/): StyleX for product only
- [`@pharos-ds/build`](../../packages/build/): the build plugin source

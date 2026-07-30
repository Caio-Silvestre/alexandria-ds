# @xds/build

# 0.1.9

#### Fixes

- Scope the `source` resolve condition to @pharos-ds packages in withPharos
  `withPharos` set webpack's `conditionNames` to `['source', …]` globally, which resolved _any_ dependency shipping a `source` export to its raw TypeScript — not just Pharos packages. Third-party deps that ship a `source` export (e.g. `lexical`, pulled in by the new RichTextEditor lab component) were then fed untranspiled `.ts` through Next's babel and failed on syntax like `declare` class fields.

#### Contributors

Thanks to everyone who contributed to this release:

- @potatowagon

---

# 0.1.8

---

# 0.1.7

---

# 0.1.6

---

# 0.1.5

#### Other Changes

- Use node: protocol prefix for Node.js builtin imports (#3737)

#### Contributors

Thanks to everyone who contributed to this release:

- @Han5991

---

# 0.1.4

---

# 0.1.3

#### Fixes

- Use `pnpm build` in the `prepack` script so publishing no longer fails the `devEngines` package-manager check (#3564).

#### Contributors

Thanks to everyone who contributed to this release:

- @cixzhang

---

# 0.1.2

#### Fixes

- ship TypeScript declarations for the `@pharos-ds/build/vite` export

#### Contributors

Thanks to everyone who contributed to this release:

- @benjipeng

---

# 0.1.1

#### Breaking Changes

- Rename `@xds/build` exports off the xds name
  The Vite integration's public exports are renamed: `xdsStylex` -> `pharosStylex`,
  and the option types `XDSVitePluginOptions` / `XDSVitePluginLegacyOptions` ->
  `PharosVitePluginOptions` / `PharosVitePluginLegacyOptions`. Update imports from
  `@xds/build/vite` accordingly. Internal plugin names and the babel wrapper are
  also rebranded. Part of removing `xds` naming from the public API.
- Rename Next.js helper `withXDS` to `withPharos`
  The Next.js configuration wrapper is renamed `withXDS` -> `withPharos`
  (exported from `@pharos-ds/build/next`). Update your `next.config.mjs`:
  `import {withPharos} from '@pharos-ds/build/next'`. Part of removing xds
  naming from the public API.

#### Contributors

Thanks to everyone who contributed to this release:

- @ejhammond

---

# 0.1.0

#### Breaking Changes

- Default the StyleX library atomic-class prefix to `pharos` (was `xds`)
  `@pharos-ds/build`'s babel/Vite integrations now emit library atomic classes as
  `.pharos78zum5` by default instead of `.xds78zum5` (the `libraryPrefix` /
  `stylexPrefix` option default flips `xds` -> `pharos`). This is an opaque,
  StyleX-generated namespace — consumers don't target these classes directly —
  but it completes the removal of `xds` naming from build output. Consumers that
  explicitly configured `libraryPrefix`/`stylexPrefix` are unaffected.
- Remove the XDS-prefix compatibility layer — pharos is now the only public surface
  This release erases all `xds` naming from the public API; there is no compatibility
  window. Consumers must migrate (we own all consumers pre-OSS):
- Remove the daily, brutalist, and default themes; neutral is the new baseline
  Three theme packages are removed from the repo and will no longer be published:

#### Other Changes

- **Component names:** the `XDS*` aliases are gone — use bare names (`Button` not
  `XDSButton`, `useTheme` not `useXDSTheme`, `ButtonProps` not `XDSButtonProps`). The
  `drop-xds-prefix-imports` codemod automates this.
- **CSS classes:** components emit only `.pharos-*` (the dual `.xds-*` class is gone).
  Update custom CSS selectors `.xds-button` -> `.pharos-button` (prop/state value classes
  like `.primary`/`.sm` are unchanged).
- **data attributes:** only `data-pharos-theme` / `data-pharos-media` are written; update
  custom selectors and SSR root attributes off `data-xds-*`.
- **CSS layers:** `@layer xds-base` / `xds-theme` are renamed to `pharos-base` /
  `pharos-theme`; update your `@layer` order line and any PostCSS `layersBefore` config.
  `@pharos-ds/build`'s default library layer is now `pharos-base`.
- **Pre-compiled stylesheet:** the `@pharos-ds/core/xds.css` export is removed — import
  `@pharos-ds/core/pharos.css`.
- **CSS custom properties:** the `--xds-*` padding fallback is gone; set `--pharos-*`.
- **CLI config key:** `@pharos-ds/cli` reads the package.json `"pharos"` field (was `"xds"`).
  Rename the block; a stale `"xds"` key silently drops the package from discovery.
- `@pharos-ds/theme-daily`
- `@pharos-ds/theme-brutalist`
- `@pharos-ds/theme-default`
- import {defaultTheme} from '@pharos-ds/theme-default/built';
  - import {neutralTheme} from '@pharos-ds/theme-neutral/built';
- <Theme theme={defaultTheme}>...</Theme>
  - <Theme theme={neutralTheme}>...</Theme>

  ```

  ```

- Rename the npm package scope from `@xds/*` to `@pharos-ds/*`
  All published packages move to the new `@pharos-ds` scope (e.g. `@xds/core` → `@pharos-ds/core`), along with the workspace lockfile, build/runtime scope-directory scans, and docsite slug derivation. Consumers must update their imports and dependency names. The internal ESLint plugin namespace (`@xds/*` rules) is intentionally untouched and tracked separately. Existing `@xds/*` codemods continue to target the old scope so projects still on `@xds/*` can migrate.

#### Contributors

Thanks to everyone who contributed to this release:

- @cixzhang
- @ejhammond

---

# 0.0.15

#### Fixes

- **Unprefix migration alignment** — Build output and Vite plugin updated for the XDS-prefix migration (bare names canonical, `XDS*` compat aliases) so generated CSS stays in sync with `@xds/core` (#2941).

#### Contributors

Thanks to everyone who contributed to this release:

- @cixzhang
- @czarandy
- @ejhammond
- @josephfarina

---

# 0.0.14

_First public release_ — `@xds/build` is now published to the npm registry.

#### New Features

- **Streamlined `xdsStylex()` Vite API** — Simplified configuration for Vite projects (#2227)
- **Build step for Vite plugin** — Proper dist output for the Vite integration (#2205)

#### Internal

- **Migrated to pnpm** (#2197)
- **Bumped esbuild** from 0.24.2 to 0.28.0 (#2246)

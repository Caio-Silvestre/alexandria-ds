# @xds/theme-neutral

# 1.0.1

#### Fixes

- Accent/primary passa a usar laranja Alexandria `#F26641` (dark `#FF8A5C`); azul `#034694` permanece na escala categórica / badge info

---

# 1.0.0

#### New Features

- Theme Pharos: alinhar accent, texto e tons categóricos à paleta oficial da Alexandria (#034694 azul, #383838 chumbo, destaques roxo/laranja/amarelo)

#### Contributors

Thanks to everyone who contributed to this release:

- @Caio-Silvestre

---

# 0.1.9

---

# 0.1.8

---

# 0.1.7

#### Fixes

- StatusDot now uses the same vivid fills as the filled Badge in the neutral theme. Previously the dots mapped to the dark text/icon stops (dark green, maroon, brown), which read muddy in light mode; success/warning/error/accent now match their badge counterparts so a dot and its badge share one status color.

#### Contributors

Thanks to everyone who contributed to this release:

- @ernestt

---

# 0.1.6

---

# 0.1.5

---

# 0.1.4

---

# 0.1.3

---

# 0.1.2

---

# 0.1.1

---

# 0.1.0

---

# 0.0.15

#### Changes

- Tracks `@xds/core@0.0.15` (bare-name migration + data-attribute selector surface).

# 0.0.13

#### Changes

- Icon renames: `checkCircle`/`xCircle` → `success`/`error` (#1503)

#### Patch Changes

- Updated dependencies
  - @xds/core@0.0.13

---

# 0.0.5

#### Changes

- Updated token names to match naming audit (shadow, radius, elevation renames)
- Motion token primitives: duration and easing values
- Dynamic radius and type scale support via `defineTheme` config

#### Patch Changes

- Updated dependencies
  - @xds/core@0.0.5

---

# 0.0.4

#### Patch Changes

- Updated dependencies — aligned with @xds/core@0.0.4

---

# 0.0.3

#### Patch Changes

- Fix theme package to produce proper JS/TS module output via tsup (#541)

---

# 0.0.2

#### Changes

- Migrated to CSS-based theming with `defineTheme()`

---

# 0.0.1

- Initial release — neutral theme with Lucide icons

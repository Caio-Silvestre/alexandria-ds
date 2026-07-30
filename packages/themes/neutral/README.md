# @pharos-ds/theme-neutral

Muted, minimal aesthetic with system fonts. Uses [Lucide](https://lucide.dev) icons.

> Private / experimental in Pharos v1. Prefer [`@pharos-ds/theme-pharos`](../pharos) for public apps.

## Install

```bash
npm install @pharos-ds/theme-neutral
```

## Usage

```tsx
import {XDSTheme} from '@pharos-ds/core/theme';
import {neutralTheme} from '@pharos-ds/theme-neutral/built';

function App() {
  return <XDSTheme theme={neutralTheme}>{/* your app */}</XDSTheme>;
}
```

### Import paths

| Path | Use case |
| --- | --- |
| `@pharos-ds/theme-neutral` | Source build (StyleX via `@pharos-ds/build`) |
| `@pharos-ds/theme-neutral/built` | Pre-built dist |
| `@pharos-ds/theme-neutral/theme.css` | Pre-built CSS file |

```css
@import '@pharos-ds/theme-neutral/theme.css';
```

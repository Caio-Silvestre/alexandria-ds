# @pharos-ds/theme-pharos

Tema oficial Pharos (marca Alexandria). Usa [Lucide](https://lucide.dev) icons.

## Install

```bash
npm install @pharos-ds/theme-pharos
```

## Usage

```tsx
import {XDSTheme} from '@pharos-ds/core/theme';
import {pharosTheme} from '@pharos-ds/theme-pharos/built';

function App() {
  return <XDSTheme theme={pharosTheme}>{/* your app */}</XDSTheme>;
}
```

### Import paths

| Path | Use case |
| --- | --- |
| `@pharos-ds/theme-pharos` | Source build (StyleX via `@pharos-ds/build`) |
| `@pharos-ds/theme-pharos/built` | Pre-built dist |
| `@pharos-ds/theme-pharos/theme.css` | Pre-built CSS |

```css
@import '@pharos-ds/theme-pharos/theme.css';
```

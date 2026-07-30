# @pharos-ds/theme-chocolate

Warm chocolate theme with rich brown tones and cozy beige backgrounds. Uses Fraunces for headings, Albert Sans for body text, and [Lucide](https://lucide.dev) icons.

## Install

```bash
npm install @pharos-ds/theme-chocolate
```

## Usage

Wrap your app with `XDSTheme` and pass the theme:

```tsx
import {XDSTheme} from '@pharos-ds/core/theme';
import {chocolateTheme} from '@pharos-ds/theme-chocolate/built';

function App() {
  return <XDSTheme theme={chocolateTheme}>{/* your app */}</XDSTheme>;
}
```

### Import paths

| Path                             | Use case                                               |
| -------------------------------- | ------------------------------------------------------ |
| `@pharos-ds/theme-chocolate`           | Source build (StyleX compilation via `@pharos-ds/build`)     |
| `@pharos-ds/theme-chocolate/built`     | Pre-built dist (Tailwind, plain CSS, or no build step) |
| `@pharos-ds/theme-chocolate/theme.css` | Pre-built CSS file (import in your stylesheet)         |

If you're using `@pharos-ds/build` for StyleX source compilation, import from the bare path. Otherwise, use `/built`.

### CSS import

Add the theme CSS to your stylesheet:

```css
@import '@pharos-ds/theme-chocolate/theme.css';
```

## Fonts

This theme uses custom typefaces:

| Role    | Font           |
| ------- | -------------- |
| Body    | Albert Sans    |
| Heading | Fraunces       |
| Code    | JetBrains Mono |

**These fonts must be loaded separately.** The theme references them by name but does not bundle the font files.

Add this to your HTML `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" />
```

Without this, the theme falls back to system fonts.

# Pharos

This project uses Pharos components. Use the CLI to look up component props and usage before writing code:

```bash
npx pharos component --list              # list all available components
npx pharos component Button              # look up props, variants, and usage
npx pharos component IconButton          # each component has its own entry
```

If the CLI is not available, install dependencies first:

```bash
npm install --include=dev
```

Components use:

- StyleX (`@stylexjs/stylex`) for styling
- React 19

## Styling with StyleX

Custom styles must use `stylex.create()`. Plain objects are not valid:

```tsx
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
});

// Apply to components via the xstyle prop:
<Card xstyle={styles.container}>...</Card>

// Apply to HTML elements via stylex.props():
<div {...stylex.props(styles.container)}>...</div>
```

**Important:** Never pass plain `{padding: '16px'}` objects to `xstyle`. Always use `stylex.create()`.

## Import Pattern

Each component is imported from its own subpath:

```tsx
import {Button} from '@pharos-ds/core/Button';
import {IconButton} from '@pharos-ds/core/IconButton';
import {Card} from '@pharos-ds/core/Card';
import {Text, Heading} from '@pharos-ds/core/Text';
import {useTheme} from '@pharos-ds/core/theme';
```

# Pharos + Tailwind CSS

This project uses Pharos components with Tailwind CSS. Use the CLI to look up component props and usage before writing code:

```bash
npx pharos component --list              # list all available components
npx pharos component Button              # look up props, variants, and usage
npx pharos component IconButton          # each component has its own entry
```

Components use:

- Tailwind CSS utility classes for layout and custom styling
- Pharos Tailwind bridge tokens (`bg-surface`, `text-primary`) for design tokens
- React 19

## Import Pattern

Each component is imported from its own subpath:

```tsx
import {Button} from '@pharos-ds/core/Button';
import {IconButton} from '@pharos-ds/core/IconButton';
import {Card} from '@pharos-ds/core/Card';
import {Text, Heading} from '@pharos-ds/core/Text';
import {ToggleButton, ToggleButtonGroup} from '@pharos-ds/core/ToggleButton';
import {Theme} from '@pharos-ds/core/theme';
```

## Event Handlers

Pharos is a React DOM library. Use standard React DOM event handler props such as
`onClick`, `onChange`, and `onKeyDown`. For button activation, use `onClick`:

```tsx
<Button label="Save" onClick={() => handleSave()} />
```

Do NOT use cross-platform activation props like `onPress` unless a component
explicitly documents them.

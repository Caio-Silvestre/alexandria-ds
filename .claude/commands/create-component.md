# Create Pharos Component

Create a new Pharos component following the established protocols.

## Component Name

$ARGUMENTS

## Instructions

Follow the full component lifecycle documented on the Pharos wiki:

- **Lifecycle Overview**: https://github.com/Caio-Silvestre/alexandria-ds/wiki/Component-Lifecycle
- **Specification Protocol**: https://github.com/Caio-Silvestre/alexandria-ds/wiki/Component-Specification-Protocol
- **Build Protocol**: https://github.com/Caio-Silvestre/alexandria-ds/wiki/Component-Build-Protocol

### Quick reference

- Read the spec thoroughly — it's the contract
- Study sibling components in the same family for patterns
- Create files in `packages/core/src/{ComponentName}/`:
  - `{ComponentName}.tsx` — main component
  - `{ComponentName}.test.tsx` — unit tests
  - `{ComponentName}.doc.mjs` — typed docs (ComponentDoc)
  - `index.ts` — public exports
- Create `apps/storybook/stories/{ComponentName}.stories.tsx`
- Create showcase block in `packages/cli/templates/blocks/components/{ComponentName}/`:
  - `{ComponentName}Showcase.tsx` — visual preview (renders the component in a representative state)
  - `{ComponentName}Showcase.doc.mjs` — must set `isShowcase: true` and `componentsUsed: ['{ComponentName}']`
- Wire up: add to `packages/core/src/index.ts`
- Run `node scripts/sync-exports.js` to update package.json exports
- Run `pnpm build && pnpm test && pnpm lint`

### Key conventions

- **API Conventions**: https://github.com/Caio-Silvestre/alexandria-ds/wiki/API-Conventions
- **Theming**: Use `stableClassName()` (or the `themeProps()` helper) for theme targets — see https://github.com/Caio-Silvestre/alexandria-ds/wiki/Theming-Infrastructure
- **Compose, don't rebuild** — use existing Pharos components (Field, Icon, etc.)
- **displayName** — always set it
- **:hover guards** — all `:hover` in `@media (hover: hover)`
- **Spacing/elevation tokens** — never raw px or boxShadow strings

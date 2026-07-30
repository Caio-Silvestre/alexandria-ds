# @pharos-ds/cli

The CLI is the primary interface for working with the design system, for humans and machines alike. It provides component documentation, design tokens, page templates, theming tools, and upgrade codemods, all accessible via terminal commands, a typed JSON API, or programmatic imports. AI agents and build tools use the same API that powers the CLI, enabling end-to-end frontend development loops.

Run it one-off with the scoped package (works whether or not it's installed):

```bash
npx @pharos-ds/cli --help
npx @pharos-ds/cli search button
npx @pharos-ds/cli component Button
npx @pharos-ds/cli docs tokens
npx @pharos-ds/cli docs migration
npx @pharos-ds/cli template --list
```

Once it's a project dependency (`npm install -D @pharos-ds/cli`), drop the scope and use the shorter `pharos` — e.g. `npx pharos component Button` or `pnpm exec pharos component Button`. Bare `pharos` resolves to an unrelated npm package until the CLI is installed, so prefer the scoped form above for first-run/one-off use.

## Finding things: `pharos search`

When you don't know whether what you need is a component, a hook, a docs topic,
or a template, search across all of them at once. Results are ranked by
relevance (name and keyword matches outrank incidental prose mentions, with
fuzzy matching for typos) and tagged with their domain plus the follow-up
command to run:

```bash
$ pharos search button

Results for "button" (20):

  [component]  Button
               Button triggers an action when clicked. Use it for form submissions…
               → pharos component Button

  [component]  IconButton
               A button that shows only an icon with no visible text…
               → pharos component IconButton

  [hook]       useClickableContainer
               Makes a container element clickable while preserving nested…
               → pharos hook useClickableContainer

  [template]   Banner — Collapsible
               Combine an action button, dismiss control, and expandable detail area…
               → pharos template BannerCollapsibleContent
```

(The CLI prints the follow-up commands with your actual runner — `npx pharos …` when installed, or `npx @pharos-ds/cli …` when run one-off.)

Options:

- `--type <component|hook|doc|template>`: restrict to a single domain
- `--limit <n>`: cap the number of results (default 20)
- `--detail`: include the import path and the match reason/score
- `--json`: typed `{ type: 'search', data: { query, results } }` envelope

## Commands

| Command       | Description                                                                                          |
| ------------- | ---------------------------------------------------------------------------------------------------- |
| `init`        | Initialize the design system in your project: installs packages, sets up theming, adds AI agent docs |
| `component`   | List components or print detailed docs, props, usage examples, and source                            |
| `search`      | Find components, hooks, docs, and templates in one ranked, cross-domain result set                   |
| `docs`        | Print reference documentation (tokens, theme, color, typography, spacing, etc.)                      |
| `template`    | Inject page or block templates into your project                                                     |
| `hook`        | List hooks and print hook documentation                                                              |
| `swizzle`     | Copy component source into your project for deep customization                                       |
| `upgrade`     | Run codemods to migrate between versions                                                             |
| `theme build` | Compile a defineTheme file to production CSS and JS                                                  |
| `discover`    | Discover external packages and components                                                            |
| `doctor`      | Diagnose your Pharos setup and report problems with fixes (CI-friendly via exit code)                |

### Global options

These flags work with any command:

- `--json`: Output as typed JSON envelope: `{ type, data }` (errors: `{ error, code, suggestions? }`)
- `--detail <level>`: Detail level for list views, increasing in size: `brief` (names only, default for `--list`) < `compact` (names + 1-line descriptions) < `full` (full docs per entry). Single-item views default to `full`.
- `--zh`: Output docs in Chinese Simplified
- `--dense`: Compressed format (token-efficient, useful for AI agents)
- `--lang <locale>`: Language/format shorthand (`en`, `zh`, `dense`)

## JSON API

Every command supports `--json` for machine-readable output. Responses are typed envelopes:

```json
{"type": "component.detail", "data": {"name": "Button", ...}}
```

Errors:

```json
{
  "error": "No component named \"Buttn\"",
  "code": "ERR_UNKNOWN_COMPONENT",
  "suggestions": [{"name": "Button", "reason": "similar name"}]
}
```

The `code` field is a **stable, machine-readable identifier**. Branch on it,
never on the human-readable `error` string, which changes freely as we improve
wording. Every error envelope carries a `code` (falling back to `ERR_UNKNOWN`
when no more specific code applies). The same `code` is exposed on thrown
`PharosError` instances from the programmatic API, so both surfaces agree.

Codes are **append-only**: once shipped, a code's meaning never changes and a
code is never removed. New error conditions get new codes.

```typescript
import {isError} from '@pharos-ds/cli/json';

const result = parseResponse(raw);
if (isError(result)) {
  switch (result.code) {
    case 'ERR_UNKNOWN_COMPONENT':
      // suggest the closest match
      break;
    case 'ERR_CORE_NOT_FOUND':
      // prompt the user to install @pharos-ds/core
      break;
    default:
      console.error(result.error);
  }
}
```

### Error codes

| Code                     | Meaning                                                                                |
| ------------------------ | -------------------------------------------------------------------------------------- |
| `ERR_UNKNOWN`            | Generic fallback for any error without a more specific code.                           |
| `ERR_UNKNOWN_COMMAND`    | A top-level command name was not recognized (e.g. `pharos bogus`).                     |
| `ERR_UNKNOWN_SUBCOMMAND` | A subcommand under a group was not recognized (e.g. `pharos theme bogus`).             |
| `ERR_INVALID_OPTION`     | An unknown flag was passed, or `--json` was used on a command that doesn't support it. |
| `ERR_INVALID_ARGUMENT`   | An option/argument value was rejected, or required flags were missing.                 |
| `ERR_MISSING_ARGUMENT`   | A required positional argument was omitted (e.g. `pharos theme build` with no file).   |
| `ERR_INVALID_LANG`       | `--lang` was given a value outside its choices (`en`, `zh`, `dense`).                  |
| `ERR_INVALID_DETAIL`     | `--detail` was given a value outside its choices (`full`, `compact`, `brief`).         |
| `ERR_NODE_VERSION`       | The running Node.js version is below the supported minimum.                            |
| `ERR_CORE_NOT_FOUND`     | `@pharos-ds/core` could not be located (not installed / not in a monorepo).            |
| `ERR_UNKNOWN_COMPONENT`  | No component matched the requested name.                                               |
| `ERR_UNKNOWN_HOOK`       | No hook matched the requested name.                                                    |
| `ERR_UNKNOWN_TOPIC`      | No docs topic matched the requested name.                                              |
| `ERR_UNKNOWN_SECTION`    | A docs topic exists but the requested section within it does not.                      |
| `ERR_UNKNOWN_CATEGORY`   | A `--category` filter value did not match any known category.                          |
| `ERR_UNKNOWN_TEMPLATE`   | No template matched the requested name.                                                |
| `ERR_UNKNOWN_PACKAGE`    | No package matched the requested name (discover).                                      |
| `ERR_UNKNOWN_AGENT`      | An unrecognized `--agent` value was passed (agent docs / init).                        |
| `ERR_UNKNOWN_FEATURE`    | An unrecognized `--features` value was passed to `init`.                               |
| `ERR_UNKNOWN_CODEMOD`    | A `--codemod` value did not match any registered codemod (upgrade).                    |
| `ERR_NOT_FOUND`          | A discover/lookup query matched nothing in any package.                                |
| `ERR_NO_DOC`             | A component exists but has no typed `.doc.mjs` file.                                   |
| `ERR_NO_SHOWCASE`        | No showcase exists for the requested component.                                        |
| `ERR_NO_SOURCE`          | No source file could be located for the component/template.                            |
| `ERR_INVALID_DOC`        | A component's docs failed validation (malformed `.doc.mjs`).                           |
| `ERR_FILE_NOT_FOUND`     | A required input file did not exist.                                                   |
| `ERR_FILE_EXISTS`        | Refused to overwrite an existing file in non-interactive mode.                         |
| `ERR_PATH_TRAVERSAL`     | A path escaped its allowed root, or a name contained traversal markers.                |
| `ERR_WRITE_FAILED`       | Writing output files failed (and was rolled back).                                     |
| `ERR_THEME_INVALID`      | A theme definition was missing a required property (e.g. `name`).                      |
| `ERR_THEME_LOAD`         | A theme file could not be loaded / parsed into a `defineTheme` result.                 |
| `ERR_TEMPLATE_CONFIG`    | `template.get` is not configured in `pharos.config.mjs` (fetch-by-id).                 |
| `ERR_TEMPLATE_GET`       | A configured `template.get` threw or returned an invalid value.                        |
| `ERR_VERSION_DETECT`     | The current `@pharos-ds/core` version could not be detected.                           |
| `ERR_INVALID_VERSION`    | A `--from`/`--to` value was not a valid semver string.                                 |
| `ERR_DEP_MISSING`        | A required external dependency (e.g. jscodeshift) is missing.                          |
| `ERR_GH_CLI`             | GitHub CLI (`gh`) is not installed or not authenticated.                               |

## Capability manifest (agent discovery)

Agents don't have to scrape `--help` to learn the CLI. A single call returns a
**self-describing manifest**: every command, its arguments, flags (with types,
choices, and defaults), whether it supports `--json`, and the response `type`
discriminators each command can emit. Think of it as an OpenAPI spec for the CLI.

```bash
pharos manifest --json        # dedicated surface — type: "manifest"
pharos --json                 # bare invocation — embeds the same payload under data.manifest
```

Shape:

```jsonc
{
  "apiVersion": 1,
  "type": "manifest",
  "data": {
    "name": "pharos",
    "version": "0.0.14",
    "description": "Design system CLI — components, themes, and tooling",
    "globalOptions": [
      {
        "flag": "--json",
        "type": "boolean",
        "description": "Output as typed JSON…",
      },
      {
        "flag": "--lang <locale>",
        "type": "enum",
        "choices": ["en", "zh", "dense"],
      },
      {
        "flag": "--detail <level>",
        "type": "enum",
        "choices": ["full", "compact", "brief"],
        "default": "full",
      },
    ],
    "commands": [
      {
        "name": "component",
        "description": "List components or print component docs",
        "arguments": [
          {
            "name": "name",
            "required": false,
            "variadic": false,
            "description": "",
          },
        ],
        "options": [
          {
            "flag": "--props",
            "type": "boolean",
            "description": "Print only the props table",
          },
        ],
        "json": true,
        "responseTypes": [
          "component.list",
          "component.detail",
          "component.detail.props",
          "…",
        ],
        "examples": ["pharos component Button --props --json"],
      },
      // …one entry per command; subcommands (e.g. `theme build`) nest under `subcommands`
    ],
    "jsonSupported": ["component", "docs", "…"],
    "responseTypes": {
      "component": ["component.list", "…"],
      "theme build": ["theme.build"],
    },
  },
}
```

The manifest is **derived from Commander metadata** (commands, arguments, options)
so it can't drift from the real command definitions. The two facts Commander
doesn't track (`--json` support and emitted response types) are layered on from
the `JSON_SUPPORTED` allowlist and a small declarative `RESPONSE_TYPES` map in
`src/lib/manifest.mjs`, guarded by a drift test (`manifest.test.mjs`) so adding a
command without describing it fails CI.

**Backwards-compat:** the bare `pharos --json` envelope keeps `type: "help"` and its
original shallow fields (`name`, `version`, `commands` as a `string[]` of names,
`jsonSupported`); the full structured manifest is additive under `data.manifest`.
For the standalone manifest envelope (`type: "manifest"`), use `pharos manifest --json`.

## Programmatic API

The same logic that powers `pharos --json` is available as importable, type-safe functions:

```typescript
import {
  component,
  docs,
  discover,
  template,
  hook,
  search,
  PharosError,
} from '@pharos-ds/cli/api';

// Same result as: pharos --json component Button
const btn = await component('Button');
btn.type; // 'component.detail'
btn.data.name; // 'Button' (typed as ComponentDoc)

// Same result as: pharos --json component --list
const list = await component(undefined, {list: true});
list.data; // Record<string, string[]>

// Same result as: pharos --json docs principles
const principles = await docs('principles');
principles.data.title; // 'Principles'

// Same result as: pharos --json hook useMediaQuery
const useMediaQuery = await hook('useMediaQuery');
useMediaQuery.data.params; // typed as HookParamDoc[]

// Errors throw PharosError with a stable .code and optional .suggestions
try {
  await component('Buttn');
} catch (e) {
  e.message; // 'No component named "Buttn"'
  e.code; // 'ERR_UNKNOWN_COMPONENT' (stable; branch on this)
  e.suggestions; // [{ name: 'Button', reason: 'similar name' }]
}
```

The CLI command handlers are thin wrappers around these functions: they parse args, call the API, then format the output (JSON or text). This guarantees that `@pharos-ds/cli/api` and `pharos --json` always return identical data.

### Consumer utilities

If you're spawning the CLI as a subprocess rather than importing the API directly:

```typescript
import {parseResponse, isError} from '@pharos-ds/cli/json';
import type {
  ComponentDetailResponse,
  ComponentListResponse,
  DocsListResponse,
  // ...import the response types for the commands you consume
} from '@pharos-ds/cli/json';

// parseResponse returns the structural { type, data, meta? } envelope; `data`
// is `unknown` until you narrow it. Reconstruct the union you care about from
// the per-command response types, then narrow on `type`:
type MyResponse =
  ComponentDetailResponse | ComponentListResponse | DocsListResponse;

const result = parseResponse(stdout);
if (isError(result)) {
  console.error(result.error);
} else {
  const r = result as MyResponse;
  switch (r.type) {
    case 'component.detail':
      r.data.name; // narrowed to ComponentDoc
      break;
  }
}
```

Prefer narrowing at the call site? Wrap `assertResponse` (which throws on
error/mismatch) with your reconstructed union:

```typescript
import {assertResponse} from '@pharos-ds/cli/json';
import type {ComponentDetailResponse} from '@pharos-ds/cli/json';

type MyResponse = ComponentDetailResponse; /* | ...others */

function assertTyped<T extends MyResponse['type']>(raw: unknown, type: T) {
  return assertResponse(raw, type) as Extract<MyResponse, {type: T}>;
}

const detail = assertTyped(stdout, 'component.detail');
detail.data.name; // narrowed
```

> **Migration (removed in the structural-`jsonOut` release):** the central
> `CLIAnyResponse`, `CLIResponseType`, and `CLIResponseDataMap` exports were
> removed. `parseResponse` / `assertResponse` no longer auto-narrow `.data`.
> Rebuild the union from the individual `*Response` types as shown above — they
> are all still exported from `@pharos-ds/cli/json`.

### Type discriminators

Every response has a `type` string that uniquely identifies it:

| Command                                                            | Type                                 | Response                          |
| ------------------------------------------------------------------ | ------------------------------------ | --------------------------------- |
| `pharos --json component [--list] [--detail names\|compact\|full]` | `component.list` (see `data.detail`) | `ComponentListResponse`           |
| `pharos --json component <name>`                                   | `component.detail`                   | `ComponentDetailResponse`         |
| `pharos --json component <name> --props`                           | `component.detail.props`             | `ComponentDetailPropsResponse`    |
| `pharos --json component <name> --source`                          | `component.detail.source`            | `ComponentDetailSourceResponse`   |
| `pharos --json component <name> --showcase`                        | `component.detail.showcase`          | `ComponentDetailShowcaseResponse` |
| `pharos --json component <name> --blocks`                          | `component.detail.blocks`            | `ComponentDetailBlocksResponse`   |
| `pharos --json discover`                                           | `discover.list`                      | `DiscoverListResponse`            |
| `pharos --json discover @scope/name`                               | `discover.detail`                    | `DiscoverDetailResponse`          |
| `pharos --json discover @scope/name/Comp`                          | `discover.detail.doc`                | `DiscoverDetailDocResponse`       |
| `pharos --json discover <search>`                                  | `discover.search`                    | `DiscoverSearchResponse`          |
| `pharos --json docs`                                               | `docs.list`                          | `DocsListResponse`                |
| `pharos --json docs <topic>`                                       | `docs.detail`                        | `DocsDetailResponse`              |
| `pharos --json docs <topic> <section>`                             | `docs.detail.section`                | `DocsDetailSectionResponse`       |
| `pharos --json template [--list]`                                  | `template.list`                      | `TemplateListResponse`            |
| `pharos --json template <name>`                                    | `template.show`                      | `TemplateShowResponse`            |
| `pharos --json template <name> --skeleton`                         | `template.skeleton`                  | `TemplateSkeletonResponse`        |
| `pharos --json template <name> [path]`                             | `template.copy`                      | `TemplateCopyResponse`            |
| `pharos --json hook [--list] [--detail names\|compact\|full]`      | `hook.list` (see `data.detail`)      | `HookListResponse`                |
| `pharos --json hook <name>`                                        | `hook.detail`                        | `HookDetailResponse`              |
| `pharos --json hook <name> --params`                               | `hook.detail.params`                 | `HookDetailParamsResponse`        |
| `pharos --json search <query>`                                     | `search`                             | `SearchResponse`                  |
| `pharos --json swizzle [--list]`                                   | `swizzle.list`                       | `SwizzleListResponse`             |
| `pharos --json swizzle <component>`                                | `swizzle.copy`                       | `SwizzleCopyResponse`             |
| `pharos --json theme build <file>`                                 | `theme.build`                        | `ThemeBuildResponse`              |
| `pharos --json upgrade --list`                                     | `upgrade.list`                       | `UpgradeListResponse`             |
| `pharos --json upgrade [--apply]`                                  | `upgrade.run`                        | `UpgradeRunResponse`              |
| `pharos --json doctor`                                             | `doctor`                             | `DoctorResponse`                  |
| any error                                                          | —                                    | `CLIError`                        |
| unsupported command                                                | —                                    | `CLIUnsupportedError`             |

## Doctor

`pharos doctor` runs a series of health checks against your project and
environment and reports `PASS` / `WARN` / `FAIL` for each, with an actionable
fix for anything that isn't passing. It's read-only; it never installs or
mutates anything, so it's safe to run anywhere, including CI.

```
$ pharos doctor
pharos doctor — diagnosing your setup

  ✓ Node.js version
      Node v22.13.0 meets the minimum (>=22.13.0).
  ✓ @pharos-ds/core installed
      @pharos-ds/core resolved (v0.0.14).
  ✓ @pharos-ds/core <-> @pharos-ds/cli alignment
      @pharos-ds/core v0.0.14 is in step with @pharos-ds/cli v0.0.14.
  ⚠ Theme packages
      No @pharos-ds/theme-* packages are installed.
      → fix: Install a theme, e.g. `npm install @pharos-ds/theme-pharos`, then import its CSS or set pharos.theme.
  ℹ pharos.config.mjs
      No pharos.config.mjs found — using defaults.
  ℹ AI agent docs
      No agent docs (CLAUDE.md / AGENTS.md / .cursorrules) found.
      → fix: Generate agent docs with `pharos init --features agents`.
  ✓ @pharos-ds/core peer dependencies
      All peer dependencies satisfied (react, react-dom).
  ℹ Package manager
      Detected package manager: yarn.

Summary: 4 passed, 1 warning, 0 failures, 3 info

No failures — but review the ⚠ warnings above when you can.
```

### Checks

| Check                     | Status it can return | What it verifies                                                  |
| ------------------------- | -------------------- | ----------------------------------------------------------------- |
| Node.js version           | pass / fail          | Running Node meets the CLI's minimum                              |
| @pharos-ds/core installed | pass / fail          | `@pharos-ds/core` is resolvable from the project                  |
| Version alignment         | pass / warn / info   | Installed `@pharos-ds/core` is in step with `@pharos-ds/cli`      |
| Theme packages            | pass / warn          | An `@pharos-ds/theme-*` package is installed and a theme is wired |
| pharos.config.mjs         | pass / fail / info   | Config (if present) loads cleanly with a valid shape              |
| AI agent docs             | pass / warn / info   | Agent docs exist and contain the Pharos section markers           |
| Peer dependencies         | pass / warn / info   | `@pharos-ds/core`'s peer deps (react, …) are installed            |
| Package manager           | info                 | Reports the detected package manager                              |

### CI gate

The exit code is the contract: `pharos doctor` exits `0` when there are no
failures (warnings are fine) and `1` when any check fails. That makes it
usable directly as a CI step:

```yaml
- run: npx @pharos-ds/cli doctor
```

Use `--json` for a structured envelope (`{ apiVersion, type: "doctor",
data: { checks, summary } }`) that AI agents and scripts can parse.

## Configuration

The CLI reads an optional `pharos.config.{ts,mjs,js}` from your project root
(a sibling of `package.json`). Every field is optional; with no config file the
CLI runs on defaults.

```typescript
import {createConfig} from '@pharos-ds/core/config';

export default createConfig({
  integrations: ['@acme/pharos-widgets'],
  issuesUrl: 'https://github.com/your-org/your-repo/issues',
});
```

`createConfig` is a type-preserving helper: it returns its argument unchanged
and exists only to give the config file editor autocomplete and type-checking. A
plain `export default {}` object works identically. It's exported from
`@pharos-ds/core` (not the CLI) so your config file gets type feedback
without depending on the CLI; the same helper is re-exported from
`@pharos-ds/cli/config` for back-compat.

| Field                         | Type                           | Purpose                                                                                         |
| ----------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------- |
| `integrations`                | `string[]`                     | Integration package names to load (see [Integrations](#integrations)).                          |
| `issuesUrl`                   | `string`                       | Where "report an issue" links point for your project. Defaults to the core issue tracker.       |
| `hooks.postCodemod`           | `PostCodemodHook[]`            | Commands to run after `pharos upgrade` applies codemods (e.g. reinstall, rebuild, reformat).    |
| `experimental.xle.components` | `Record<string, XleComponent>` | Register app-local components so layout (XLE) expressions can reference them by name. Unstable. |

The config is validated against a strict schema when the CLI loads it, so an
unknown field is a hard error rather than a silent no-op. `pharos doctor`
reports whether the config loads cleanly.

## Integrations

An **integration** is any npm package that contributes its own components,
templates, and upgrade codemods to Pharos. The CLI surfaces them next to core's,
through the same commands, so a consumer can `pharos component`,
`pharos template`, and `pharos upgrade` across core and every integration
uniformly. Use it to ship a first-party add-on, publish a third-party component
library, or share an internal design-system package across apps.

The system runs on two files, each with a small typed API:

| File                             | Written by | Role                                      |
| -------------------------------- | ---------- | ----------------------------------------- |
| `pharos.config.{ts,mjs,js}`      | Consumer   | Lists which integration packages to load. |
| `pharos.integration.{ts,mjs,js}` | Author     | Declares what a package contributes.      |

The consumer side is the `integrations` field of [`pharos.config`](#configuration).
The author side is the integration manifest below.

### The integration manifest

A package becomes an integration by exporting a manifest from
`pharos.integration.{ts,mjs,js}` at its root (a sibling of `package.json`). The
manifest points at where each kind of contribution lives; identity (name,
version) comes from `package.json`, not the manifest.

```typescript
import {createIntegration} from '@pharos-ds/core/authoring';

export default createIntegration({
  components: './components',
  templates: './templates',
  codemods: './codemods',
  issuesUrl: 'https://github.com/acme/widgets/issues',
});
```

| Field        | Type     | Purpose                                                               |
| ------------ | -------- | --------------------------------------------------------------------- |
| `components` | `string` | Directory holding the package's components and their `.doc.*` files.  |
| `templates`  | `string` | Directory holding the package's page/block templates.                 |
| `codemods`   | `string` | Directory holding upgrade codemods run by `pharos upgrade`.           |
| `issuesUrl`  | `string` | Where "report an issue" links for this package's contributions point. |

Every field is optional; declare only the roots the package ships.
`createIntegration` is a type-preserving helper (editor autocomplete and
type-checking); it lives in `@pharos-ds/core/authoring` and is re-exported
from `@pharos-ds/cli/integration` for back-compat.

### How it works

Every command loads the consumer's `pharos.config`, resolves each listed
integration's manifest from `node_modules`, and discovers its contributions.
Everything is validated against one strict schema at the load boundary, so the
CLI presents core and integration contributions through a single, uniform
surface.

Discovery is resilient: a broken or misconfigured integration is skipped with a
one-line warning on stderr instead of crashing the CLI, and it never corrupts a
`--json` envelope. To inspect problems, run
`pharos validate-integration <package>` for a detailed report on one package, or
`pharos doctor` for an overall health check.

For the full authoring walkthrough (component doc format, template packaging
and `exports` requirements, and codemod authoring), see the guide:

```bash
pharos docs cli-integrations
```

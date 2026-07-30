// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file index.ts
 * @input None (barrel).
 * @output The Pharos integration-authoring surface: the stamp-only factories an
 *   integration package uses to describe what it contributes (integrations,
 *   templates, docs), plus their TypeScript input/output types.
 * @position Producer-facing authoring surface, exported as
 *   `@pharos-ds/core/authoring`.
 *
 * ## Why these live in core
 *
 * These factories are tiny, zero-runtime-dependency identity functions whose
 * value is their TypeScript surface. Hosting them in `@pharos-ds/core` (the
 * base of the dependency graph) means core's own docs can adopt them without a
 * core -> cli -> core cycle, and integration authors get the types without a
 * hard dependency on the CLI. The CLI re-exports every factory from its
 * existing subpaths (`@pharos-ds/cli/integration|template|doc`) for
 * back-compat; the CLI keeps the Zod validation schemas at its load boundary.
 *
 * `createConfig` is intentionally NOT here — it is a consumer surface (every app
 * with an `pharos.config`), exported separately as `@pharos-ds/core/config`.
 */

export {createIntegration} from './integration';
export type {PharosIntegration} from './integration';

export {createPageTemplate, createBlockTemplate} from './template';
export type {
  PharosTemplatePreview,
  PharosTemplateInput,
  PharosPageTemplateInput,
  PharosBlockTemplateInput,
  PharosPageTemplate,
  PharosBlockTemplate,
  PharosTemplate,
} from './template';

export {createComponentDoc, createFunctionDoc, createDoc} from './doc';
export type {
  PharosBaseDocInput,
  PharosPropInput,
  PharosParamInput,
  PharosReturnInput,
  PharosComponentDocInput,
  PharosFunctionDocInput,
  PharosGenericDocInput,
  PharosComponentDoc,
} from './doc';

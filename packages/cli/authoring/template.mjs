// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file Static template authoring API (public `@pharos-ds/cli/template`).
 *
 * The `createPageTemplate`/`createBlockTemplate` authoring helpers now live in
 * `@pharos-ds/core/authoring` and are re-exported here so existing
 * `@pharos-ds/cli/template` imports keep working. The Zod load-boundary
 * schemas live in `./schemas/template-schema.mjs` (core-free) and are
 * re-exported here for back-compat; internal hot-path code imports them from
 * the schema module directly so it never depends on core's built `dist/`.
 */

export {createPageTemplate, createBlockTemplate} from '@pharos-ds/core/authoring';
export {BaseTemplateSchema, TemplateEnvelopeSchema} from '../schemas/template-schema.mjs';

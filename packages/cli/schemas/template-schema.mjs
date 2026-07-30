// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file Template load-boundary schemas.
 *
 * The Zod schemas that integration template discovery runs a module's default
 * export through (see `loadModuleWithSchema`). Kept free of any
 * `@pharos-ds/core` import so the hot path that loads them (template
 * discovery, `pharos init`) does not require core's built `dist/`. The
 * authoring factories live in `@pharos-ds/core/authoring` and are re-exported
 * from `../template.mjs` for the public `@pharos-ds/cli/template` surface.
 */

import {z} from 'zod';

const PreviewSchema = z
  .object({
    image: z.string().optional(),
    aspectRatio: z.string().optional(),
  })
  .strict();

/**
 * Shared authored-template shape. `type` is injected by the create* helpers,
 * so authors never write it. Inline source/sourceFile are intentionally NOT
 * part of v1 — a template's source is the required same-stem sibling file.
 * Exported so integration template discovery can validate the stamped result.
 */
export const BaseTemplateSchema = z
  .object({
    name: z.string().min(1, 'name is required'),
    description: z.string().min(1, 'description is required'),
    category: z.string().optional(),
    componentsUsed: z.array(z.string()).optional(),
    preview: PreviewSchema.optional(),
  })
  .strict();

/**
 * The metadata envelope integration template discovery validates: a stamped
 * template doc. This is the LOAD-boundary contract — a hand-written plain
 * object that matches this shape is accepted (discovery does not check "was it
 * made by the factory", only the shape).
 */
export const TemplateEnvelopeSchema = BaseTemplateSchema.extend({
  type: z.enum(['page', 'block']),
});

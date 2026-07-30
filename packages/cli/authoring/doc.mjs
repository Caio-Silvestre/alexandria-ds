// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file Doc-authoring API (public `@pharos-ds/cli/doc`).
 *
 * The `createComponentDoc`/`createFunctionDoc`/`createDoc` authoring helpers now
 * live in `@pharos-ds/core/authoring` and are re-exported here so existing
 * `@pharos-ds/cli/doc` imports keep working. The Zod load-boundary schemas
 * live in `./schemas/doc-schema.mjs` (core-free) and are re-exported here for
 * back-compat; internal hot-path code imports them from the schema module
 * directly so it never depends on core's built `dist/`.
 */

export {
  createComponentDoc,
  createFunctionDoc,
  createDoc,
} from '@pharos-ds/core/authoring';

export {
  ComponentDocKindSchema,
  FunctionDocKindSchema,
  GenericDocKindSchema,
  StampedDocSchema,
  LegacyDocSchema,
  ComponentDocSchema,
} from '../schemas/doc-schema.mjs';

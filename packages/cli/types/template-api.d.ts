// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * The template-authoring surface moved to `@pharos-ds/core/authoring`.
 * Re-exported here so existing `@pharos-ds/cli/template` type imports keep
 * resolving.
 */
export type {
  PharosTemplatePreview,
  PharosTemplateInput,
  PharosPageTemplateInput,
  PharosBlockTemplateInput,
  PharosPageTemplate,
  PharosBlockTemplate,
  PharosTemplate,
} from '@pharos-ds/core/authoring';

export {
  createPageTemplate,
  createBlockTemplate,
} from '@pharos-ds/core/authoring';

// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * The doc-authoring surface moved to `@pharos-ds/core/authoring`. Re-exported
 * here so existing `@pharos-ds/cli/doc` type imports keep resolving. The Zod
 * load-boundary schemas remain in the CLI (see `src/doc.mjs`).
 */
export type {
  PharosBaseDocInput,
  PharosPropInput,
  PharosParamInput,
  PharosReturnInput,
  PharosComponentDocInput,
  PharosFunctionDocInput,
  PharosGenericDocInput,
  PharosComponentDoc,
} from '@pharos-ds/core/authoring';

export {
  createComponentDoc,
  createFunctionDoc,
  createDoc,
} from '@pharos-ds/core/authoring';

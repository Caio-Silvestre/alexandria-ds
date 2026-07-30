// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * The integration-manifest authoring surface moved to
 * `@pharos-ds/core/authoring`. `PharosIntegration` and `createIntegration`
 * are re-exported here so existing `@pharos-ds/cli/integration` type imports
 * keep resolving. `PharosIntegrationIssue` stays in the CLI — it is an internal
 * validation type, not part of the authoring surface.
 */
export type {PharosIntegration} from '@pharos-ds/core/authoring';
export {createIntegration} from '@pharos-ds/core/authoring';

/** An issue surfaced by an integration. */
export interface PharosIntegrationIssue {
  code: string;
  severity: 'warning' | 'error';
  message: string;
}

// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * The config-authoring surface moved to `@pharos-ds/core/config` so an app's
 * config file gets type feedback without depending on the CLI. Re-exported here
 * so existing `@pharos-ds/cli/config` type imports keep resolving.
 */
export type {
  PostCodemodCommand,
  PostCodemodHook,
  XleComponent,
  PharosConfig,
} from '@pharos-ds/core/config';

export {createConfig} from '@pharos-ds/core/config';

// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * Re-export of the config-authoring helper, which now lives in
 * `@pharos-ds/core/config` so an app's config file gets type feedback
 * without depending on the CLI. Kept here so existing
 * `@pharos-ds/cli/config` imports continue to work unchanged.
 */
export {createConfig} from '@pharos-ds/core/config';

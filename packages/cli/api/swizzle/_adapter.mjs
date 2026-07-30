// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file swizzle adapter — the single fs + resolution seam the swizzle leaves
 * share.
 *
 * Both leaves need the consumer's @pharos-ds/core package dir and the list
 * of swizzlable components: `list` returns the names directly, `copy` uses them
 * for its "component not found" suggestions. Resolving core + listing lives
 * here once so neither leaf re-walks the filesystem. Throws PharosError
 * (ERR_CORE_NOT_FOUND) when core can't be located.
 */

import {findCoreDir, listComponents} from '../../utils/paths.mjs';
import {ERROR_CODES} from '../../lib/error-codes.mjs';
import {PharosError} from '../error.mjs';

/**
 * Locate @pharos-ds/core for `cwd` and list its swizzlable components.
 * @param {string} cwd
 * @returns {{coreDir: string, components: string[]}}
 */
export function resolveCore(cwd) {
  const coreDir = findCoreDir(cwd);
  if (!coreDir) {
    throw new PharosError(
      'Could not find @pharos-ds/core package. Make sure you are inside the design system monorepo or have @pharos-ds/core installed.',
      [],
      ERROR_CODES.ERR_CORE_NOT_FOUND,
    );
  }

  const components = listComponents(coreDir);
  return {coreDir, components};
}

// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * validate-integration command JSON responses.
 *
 * Invocation                              -> type discriminator
 * ------------------------------------------------------------
 * pharos --json validate-integration       -> integration.validate
 * pharos --json validate-integration <pkg> -> integration.validate
 */

import type {PharosIntegrationIssue} from './integration';

/** pharos --json validate-integration [package] */
export interface ValidateIntegrationResponse {
  type: 'integration.validate';
  data: {
    /** Integration package name, or null when no manifest was located. */
    name: string | null;
    /** Integration package version, or null when unavailable. */
    version: string | null;
    issues: PharosIntegrationIssue[];
  };
}

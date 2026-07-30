// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file Regression coverage for integration-template discovery error surfacing.
 *
 * discoverIntegrationTemplates() used to wrap Project.load() in a bare
 * `catch {}` that silently dropped a broken pharos.config — hiding both the
 * user's config error AND any unexpected bug. It now records the failure in the
 * TemplateDiscoveryError channel that discoverAllWithErrors() exposes. The
 * no-error variant (discoverAll, used by `pharos template`) still ignores it,
 * so the command's behavior is unchanged; these tests lock the surfacing.
 */

import {describe, it, expect, beforeEach, afterEach} from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';
import {discoverAllWithErrors} from './template.mjs';

let tmpDir;

beforeEach(() => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'pharos-tmpl-errors-'));
});

afterEach(() => {
  fs.rmSync(tmpDir, {recursive: true, force: true});
});

describe('discoverAllWithErrors — config-load failures are surfaced, not swallowed', () => {
  it('records an pharos.config error when the config cannot load', async () => {
    // Two configs → findConfigPath throws "Multiple Pharos config files",
    // which Project.load propagates. Previously swallowed by a bare catch {};
    // now it must appear in the errors channel.
    fs.writeFileSync(
      path.join(tmpDir, 'pharos.config.mjs'),
      'export default {integrations: []};\n',
    );
    fs.writeFileSync(
      path.join(tmpDir, 'pharos.config.js'),
      'module.exports = {integrations: []};\n',
    );

    const {errors} = await discoverAllWithErrors(tmpDir);
    const configErr = errors.find(e => e.package === 'pharos.config');
    expect(configErr).toBeDefined();
    expect(configErr.message).toMatch(/Multiple Pharos config files/i);
  });

  it('records no config error for a clean project with no config', async () => {
    // Baseline: no config → Project.load returns an empty project, so nothing
    // is recorded against pharos.config (the common case must stay quiet).
    const {errors} = await discoverAllWithErrors(tmpDir);
    expect(errors.find(e => e.package === 'pharos.config')).toBeUndefined();
  });
});

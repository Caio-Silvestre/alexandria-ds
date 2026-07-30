// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file Validates that every CLI-discoverable component produces a correct
 * import hint that matches an actual package.json export subpath.
 *
 * This guards against:
 * - Import paths pointing to non-existent exports
 * - Case mismatches (Theme vs theme)
 * - Group names leaking as import paths
 * - resolveImportPath regressions
 *
 * Runs against the real packages/core source, not mocks.
 */

import {describe, it, expect} from 'vitest';
import * as fs from 'node:fs';
import * as path from 'node:path';
import {fileURLToPath} from 'node:url';
import {
  resolveImportPath,
  discoverComponents,
  findComponentSource,
} from './component/index.mjs';
import {findCoreDir} from '../../utils/paths.mjs';
import {runCli} from '../../test-utils/run-cli.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '../../../..');

describe('import hint correctness', () => {
  const coreDir = findCoreDir();
  const pkg = JSON.parse(
    fs.readFileSync(path.join(coreDir, 'package.json'), 'utf-8'),
  );
  const validExports = new Set(
    Object.keys(pkg.exports || {})
      .filter(k => k !== '.' && k !== './package.json')
      .map(k => k.replace('./', '')),
  );

  const componentMap = discoverComponents(coreDir);
  const groupNames = Object.keys(componentMap);

  // Collect all individual component names (non-group)
  const individualComponents = [];
  for (const [group, members] of Object.entries(componentMap)) {
    for (const member of members) {
      individualComponents.push(member);
    }
  }

  describe('every component resolves to a tree-shakeable subpath (not bare @pharos-ds/core)', () => {
    for (const name of individualComponents) {
      it(`${name} resolves to @pharos-ds/core/<subpath>, not bare @pharos-ds/core`, () => {
        const importPath = resolveImportPath(coreDir, name);

        // Must never be empty
        expect(importPath).toBeTruthy();

        // Must resolve to a specific subpath — bare @pharos-ds/core is not tree-shakeable
        expect(importPath).not.toBe('@pharos-ds/core');

        // The subpath must exist in package.json exports
        const subpath = importPath.replace('@pharos-ds/core/', '');
        expect(validExports.has(subpath)).toBe(true);
      });
    }
  });

  describe('import hint case matches package.json exports exactly', () => {
    for (const name of individualComponents) {
      it(`${name} import path has correct casing`, () => {
        const importPath = resolveImportPath(coreDir, name);
        if (importPath === '@pharos-ds/core') return; // skip bare fallback

        const subpath = importPath.replace('@pharos-ds/core/', '');

        // Must be an exact (case-sensitive) match to an export key
        const exportKeys = Object.keys(pkg.exports || {}).map(k =>
          k.replace('./', ''),
        );
        expect(exportKeys).toContain(subpath);
      });
    }
  });

  describe('CLI --detail brief shows correct import path', () => {
    // Test a representative set across different patterns
    const representative = [
      {name: 'Button', expected: '@pharos-ds/core/Button'},
      {name: 'Theme', expected: '@pharos-ds/core/theme'},
      {name: 'CheckboxInput', expected: '@pharos-ds/core/CheckboxInput'},
      {name: 'Table', expected: '@pharos-ds/core/Table'},
      {name: 'TextInput', expected: '@pharos-ds/core/TextInput'},
      {name: 'Layout', expected: '@pharos-ds/core/Layout'},
      {name: 'AppShell', expected: '@pharos-ds/core/AppShell'},
      {name: 'Card', expected: '@pharos-ds/core/Card'},
      {name: 'Dialog', expected: '@pharos-ds/core/Dialog'},
      {name: 'TabList', expected: '@pharos-ds/core/TabList'},
    ];

    for (const {name, expected} of representative) {
      it(`npx pharos component ${name} --detail brief shows ${expected}`, async () => {
        const result = await runCli(['component', name, '--detail', 'brief'], REPO_ROOT);
        expect(result.code).toBe(0);
        expect(result.stdout).toContain(expected);
      });
    }
  });

  describe('CLI --detail full shows import hint', () => {
    const representative = ['Button', 'Theme', 'Table', 'CheckboxInput'];

    for (const name of representative) {
      it(`npx pharos component ${name} (full) includes import statement`, async () => {
        const result = await runCli(['component', name], REPO_ROOT);
        expect(result.code).toBe(0);
        // The PR adds: **Import:** `import {XDS...} from '...';`
        expect(result.stdout).toMatch(/import\s*\{/);
        expect(result.stdout).toContain('@pharos-ds/core');
      });
    }
  });

  describe('group names do NOT resolve to incorrect import paths', () => {
    const groups = ['Checkbox', 'Radio', 'Chat', 'Tabs', 'Resizable', 'Utilities'];

    for (const group of groups) {
      it(`group "${group}" does not produce a subpath import`, () => {
        // Groups should either fail to find a source file (returning bare @pharos-ds/core)
        // or correctly return the group-level export if one exists
        const importPath = resolveImportPath(coreDir, group);
        if (importPath !== '@pharos-ds/core') {
          // If it does resolve, it must be a valid export
          const subpath = importPath.replace('@pharos-ds/core/', '');
          expect(validExports.has(subpath)).toBe(true);
        }
      });
    }
  });

  describe('import path matches actual source file location', () => {
    for (const name of individualComponents) {
      it(`${name} import path leads to its source directory`, () => {
        const source = findComponentSource(coreDir, name);
        if (!source) return; // some sub-components don't have direct source

        const importPath = resolveImportPath(coreDir, name);
        if (importPath === '@pharos-ds/core') return;

        const subpath = importPath.replace('@pharos-ds/core/', '');
        const srcDir = path.join(coreDir, 'src');
        const relToSrc = path.relative(srcDir, source);
        const topDir = relToSrc.split(path.sep)[0];

        // The import subpath should match the top-level src directory
        // (case-insensitive check since theme/Theme is valid)
        expect(subpath.toLowerCase()).toBe(topDir.toLowerCase());
      });
    }
  });
});

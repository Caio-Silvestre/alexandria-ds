// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file Detect the project's package manager from lockfiles.
 *
 * Returns the correct command prefix for running package binaries
 * (e.g. 'npx pharos', 'yarn pharos', 'pnpm exec pharos').
 */

import * as fs from 'node:fs';
import * as path from 'node:path';

/**
 * A package manager we can install with and run binaries through.
 * @typedef {'yarn' | 'pnpm' | 'bun' | 'npm'} PackageManager
 */

/**
 * Result of package-manager detection. `'npx'` is the sentinel for "nothing
 * detected" — no lockfile, no `packageManager` field, no runner user-agent —
 * so callers fall back to npm/npx. It is a distinct value from {@link PackageManager}
 * because it means "undetected", not "npm was chosen".
 * @typedef {PackageManager | 'npx'} DetectedPackageManager
 */

/** @type {readonly PackageManager[]} */
const KNOWN_PMS = ['yarn', 'pnpm', 'bun', 'npm'];

/**
 * Narrow an arbitrary string to a known {@link PackageManager}.
 * @param {string} name
 * @returns {name is PackageManager}
 */
function isKnownPackageManager(name) {
  return /** @type {readonly string[]} */ (KNOWN_PMS).includes(name);
}

/**
 * Detect the package manager used in a project directory.
 * Walks up from targetDir looking for lockfiles.
 *
 * Returns `'npx'` when nothing can be detected — see {@link DetectedPackageManager}.
 *
 * @param {string} [targetDir=process.cwd()]
 * @returns {DetectedPackageManager}
 */
export function detectPackageManager(targetDir = process.cwd()) {
  let dir = path.resolve(targetDir);
  const root = path.parse(dir).root;

  while (dir !== root) {
    // 1. Lockfiles (highest priority)
    if (fs.existsSync(path.join(dir, 'yarn.lock'))) return 'yarn';
    if (fs.existsSync(path.join(dir, 'pnpm-lock.yaml'))) return 'pnpm';
    if (fs.existsSync(path.join(dir, 'bun.lockb')) || fs.existsSync(path.join(dir, 'bun.lock'))) return 'bun';
    if (fs.existsSync(path.join(dir, 'package-lock.json'))) return 'npm';

    // 2. packageManager field in package.json
    const pkgPath = path.join(dir, 'package.json');
    if (fs.existsSync(pkgPath)) {
      try {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
        if (pkg.packageManager) {
          const name = pkg.packageManager.split('@')[0];
          if (isKnownPackageManager(name)) return name;
        }
      } catch {
        // Best-effort: unreadable/invalid package.json — keep walking up.
      }
    }

    dir = path.dirname(dir);
  }

  // 3. npm_config_user_agent env var (set by all PMs when running scripts)
  const ua = process.env.npm_config_user_agent;
  if (ua) {
    const name = ua.split('/')[0];
    if (isKnownPackageManager(name)) return name;
  }

  return 'npx';
}

/**
 * Get the command prefix for running a package binary.
 *
 * @param {string} [targetDir]
 * @returns {string} e.g. 'npx', 'yarn', 'pnpm exec', 'bunx'
 */
export function getRunPrefix(targetDir) {
  const pm = detectPackageManager(targetDir);
  switch (pm) {
    case 'yarn': return 'yarn';
    case 'pnpm': return 'pnpm exec';
    case 'bun': return 'bunx';
    case 'npm':
    default: return 'npx';
  }
}

/** The published CLI package name — used for one-off (uninstalled) invocations. */
export const CLI_PACKAGE = '@pharos-ds/cli';

/** The CLI binary name — only resolves once the CLI is installed (or run via CLI_PACKAGE). */
export const CLI_BIN = 'pharos';

/**
 * Get the one-off ("dlx") runner for the detected package manager.
 *
 * Unlike {@link getRunPrefix} (which runs an *installed* binary), this fetches
 * and runs a package on demand — so it is always paired with the scoped
 * {@link CLI_PACKAGE}, never the bare `pharos` bin. Running bare `npx pharos`
 * without the CLI installed resolves to an unrelated package on the registry.
 *
 * @param {string} [targetDir]
 * @returns {string} e.g. 'npx', 'pnpm dlx', 'yarn dlx', 'bunx'
 */
export function getDlxPrefix(targetDir) {
  const pm = detectPackageManager(targetDir);
  switch (pm) {
    case 'yarn': return 'yarn dlx';
    case 'pnpm': return 'pnpm dlx';
    case 'bun': return 'bunx';
    case 'npm':
    default: return 'npx';
  }
}

/**
 * Heuristic: was the running CLI launched one-off via a package runner
 * (npx / pnpm dlx / yarn dlx / bunx) rather than from an installed dependency?
 *
 * We sniff the entry path (`process.argv[1]`) for well-known runner-cache
 * markers. This errs safe in both directions: a false negative falls back to
 * the installed form (`<prefix> pharos`, the historical behavior), and a false
 * positive emits the always-valid scoped form (`<dlx> @pharos-ds/cli`).
 *
 * @returns {boolean}
 */
export function isCliOneOff() {
  const entry = String(process.argv[1] || '').replace(/\\/g, '/');
  return /\/_npx\/|\/dlx[-/]|\/\.bun\/install\/cache\/|\/bunx-/.test(entry);
}

/**
 * The safe, install-aware CLI invocation stem to suggest to users.
 *
 * - Installed / global / dev: `<run-prefix> pharos` (e.g. `pnpm exec pharos`).
 *   Bare `pharos` resolves to the local (or global) binary.
 * - One-off (npx/dlx cache): `<dlx-prefix> @pharos-ds/cli` — the bare
 *   `pharos` name isn't on disk, so npm would fetch an unrelated registry
 *   package; the scoped package always resolves to us.
 *
 * @param {string} [targetDir]
 * @returns {string}
 */
export function getCliInvocation(targetDir) {
  if (isCliOneOff()) return `${getDlxPrefix(targetDir)} ${CLI_PACKAGE}`;
  return `${getRunPrefix(targetDir)} ${CLI_BIN}`;
}

/**
 * Format a full, runnable CLI command from a subcommand string.
 *
 * Accepts either `pharos component Button` or `component Button` (a leading
 * `pharos` token is stripped) and prepends the install-aware invocation stem
 * from {@link getCliInvocation}.
 *
 * @param {string} command e.g. 'pharos component Button' | 'docs tokens'
 * @param {string} [targetDir]
 * @returns {string}
 */
export function formatCliCommand(command, targetDir) {
  const sub = String(command).replace(/^\s*pharos\b\s*/, '').trim();
  const stem = getCliInvocation(targetDir);
  return sub ? `${stem} ${sub}` : stem;
}

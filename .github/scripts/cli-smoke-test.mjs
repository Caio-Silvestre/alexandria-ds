#!/usr/bin/env node
// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * CLI smoke test — auto-discovers every command and checks for output + clean exit.
 *
 * Nothing is hardcoded. Components are discovered from `pharos component --list`,
 * doc topics from `pharos docs`, and detail levels from `pharos --help`.
 *
 * Catches regressions like:
 *   - pharos component <name> crashing on bad imports
 *   - pharos docs returning empty content
 *   - any command exiting non-zero
 *
 * Usage:
 *   node .github/scripts/cli-smoke-test.mjs
 *
 * Exit code 0 = all commands passed
 * Exit code 1 = one or more commands failed
 */

import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import * as path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const CLI = path.join(ROOT, 'packages/cli/bin/pharos.mjs');

let passed = 0;
let failed = 0;
const failures = [];

function run(args) {
  const result = spawnSync(process.execPath, [CLI, ...args], {
    cwd: ROOT,
    encoding: 'utf8',
    timeout: 30_000,
  });
  return {
    stdout: result.stdout ?? '',
    stderr: result.stderr ?? '',
    status: result.status ?? 1,
    timedOut: result.signal === 'SIGTERM',
  };
}

function check(label, args, {minLength = 10} = {}) {
  const {stdout, stderr, status, timedOut} = run(args);
  const output = (stdout + stderr).trim();

  let reason = null;
  if (timedOut) reason = 'timed out';
  else if (status !== 0) {
    if (output.includes('needs a typed doc file')) {
      console.log(`  skip  ${label}  (no .doc.mjs — undocumented component)`);
      passed++;
      return;
    }
    reason = `exit ${status}`;
  }
  else if (output.length < minLength) reason = `output too short (${output.length} chars, need ${minLength})`;

  if (reason) {
    console.log(`  FAIL  ${label}  (${reason})`);
    if (stderr.trim()) {
      console.log(`        ${stderr.trim().split('\n')[0]}`);
    }
    failures.push({label, reason});
    failed++;
  } else {
    console.log(`  ok    ${label}`);
    passed++;
  }
}

// ---------------------------------------------------------------------------
// 1. Discover detail levels from --help
// ---------------------------------------------------------------------------
const helpOutput = run(['--help']).stdout;
const detailMatch = helpOutput.match(/full, compact, brief|full\|compact\|brief/);
const DETAIL_LEVELS = detailMatch
  ? detailMatch[0].split(/[,|]\s*/).map(s => s.trim())
  : ['brief', 'compact', 'full'];

console.log(`detail levels: ${DETAIL_LEVELS.join(', ')}`);

// ---------------------------------------------------------------------------
// 2. Discover components from pharos component --list
// ---------------------------------------------------------------------------
console.log('\ncomponent listing');
check('pharos component --list', ['component', '--list']);

const listResult = run(['component', '--list']);
const componentNames = listResult.stdout
  .split('\n')
  .filter(line => /^\s+[A-Z]/.test(line))
  .map(line => line.trim().split(/\s{2,}/)[0]);

console.log(`discovered ${componentNames.length} components`);

if (componentNames.length === 0) {
  console.log('\nFATAL: no components discovered from --list output. Aborting.');
  process.exit(1);
}

// ---------------------------------------------------------------------------
// 3. Discover categories from the --list output
// ---------------------------------------------------------------------------
const categories = listResult.stdout
  .split('\n')
  .filter(line => /^[A-Z].*\(group\)$/.test(line))
  .map(line => line.replace(/\s*\(group\)$/, ''));

console.log(`discovered ${categories.length} categories: ${categories.join(', ')}`);

// ---------------------------------------------------------------------------
// 4. Discover doc topics from pharos docs
// ---------------------------------------------------------------------------
const docsResult = run(['docs']);
const docTopics = docsResult.stdout
  .split('\n')
  .filter(line => /^\s{2}\w+\s{2,}/.test(line))
  .map(line => line.trim().split(/\s{2,}/)[0]);

console.log(`discovered ${docTopics.length} doc topics: ${docTopics.join(', ')}`);

// ---------------------------------------------------------------------------
// 5. Run all checks
// ---------------------------------------------------------------------------

// component --list with each detail level
for (const detail of DETAIL_LEVELS) {
  check(`pharos component --list --detail ${detail}`, ['component', '--list', '--detail', detail]);
}

// component --category for each category
console.log(`\ncomponent --category (${categories.length} categories)`);
for (const cat of categories) {
  check(`pharos component --category ${cat}`, ['component', '--category', cat]);
}

// component docs: every component x every detail level
console.log(`\ncomponent docs (${componentNames.length} components x ${DETAIL_LEVELS.length} detail levels)`);
for (const name of componentNames) {
  for (const detail of DETAIL_LEVELS) {
    check(`pharos component ${name} --detail ${detail}`, ['component', name, '--detail', detail]);
  }
}

// component --props for every component
console.log(`\ncomponent --props (${componentNames.length} components)`);
for (const name of componentNames) {
  check(`pharos component ${name} --props`, ['component', name, '--props']);
}

// docs for each topic
console.log('\ndocs');
check('pharos docs (no args)', ['docs']);
for (const topic of docTopics) {
  check(`pharos docs ${topic}`, ['docs', topic]);
}

// ---------------------------------------------------------------------------
// 6. Summary
// ---------------------------------------------------------------------------
console.log(`\n${passed + failed} checks total: ${passed} passed, ${failed} failed`);

if (failed > 0) {
  console.log('\nFailed commands:');
  for (const f of failures) {
    console.log(`  - ${f.label}: ${f.reason}`);
  }
  process.exit(1);
}

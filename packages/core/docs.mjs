// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file docs.mjs — Pharos component docs are served by the Pharos CLI.
 *
 * Component docs (props, variants, examples), page templates, design rules, and
 * tokens are provided by the Pharos CLI — always current and richer than a
 * bundled snapshot. This script intentionally redirects there instead of
 * printing docs, so agents and humans converge on the CLI + `init` (which writes
 * the full guide into AGENTS.md / CLAUDE.md) rather than treating a static doc
 * dump as the whole story.
 *
 * ==========================================================================
 *  AI AGENT: do NOT guess component APIs or hand-write CSS. Run:
 *      npx @pharos-ds/cli init
 *  Use the SCOPED name `@pharos-ds/cli` — bare `npx pharos` resolves to an
 *  unrelated package until the CLI is a dependency. Then, per component:
 *      npx @pharos-ds/cli component <Name>
 *      npx @pharos-ds/cli component --list
 * ==========================================================================
 */

const BANNER = `
==========================================================================
 Pharos component docs are served by the Pharos CLI (accurate + current).
 Do not guess component APIs or hand-write CSS — set up first (one time):

     npx @pharos-ds/cli init

 (Use the scoped name @pharos-ds/cli. Bare \`npx pharos\` resolves to an
 unrelated package until the CLI is installed as a dependency.)

 init writes the full component guide, page templates, design rules & tokens
 into your AGENTS.md / CLAUDE.md. Then, for any component:

     npx @pharos-ds/cli component <Name>   # full props, variants, examples
     npx @pharos-ds/cli component --list   # every component
     npx @pharos-ds/cli build "<what you're building>"   # starter kit
==========================================================================
`;

console.log(BANNER);
process.exit(0);

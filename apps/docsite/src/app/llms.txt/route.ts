// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file /llms.txt route
 *
 * Next.js serves this at /llms.txt (the llmstxt.org convention).
 *
 * @output text/plain
 */

export function GET() {
  const body = `# Pharos

An open source design system that's fully customizable and agent ready. Pharos
has grown inside Meta over the last eight years, shaped by the engineers,
designers, and product teams who depend on it every day, and now powers over
13,000 apps. Built on React and StyleX.

Everything on this docs site (component docs, props, variants, tokens, page
templates, and design rules) is also available through the Pharos CLI, in a
form built for agents to read. Instead of crawling these pages, use the CLI to
learn about Pharos directly. Some examples:

    npx @pharos-ds/cli search "<what you're looking for>"   # search components, hooks, docs, templates
    npx @pharos-ds/cli docs                                 # list reference docs, then: docs <topic>
    npx @pharos-ds/cli component <Name>                     # props, variants, examples for one component
    npx @pharos-ds/cli component --list                     # every component
    npx @pharos-ds/cli blog                                 # read the Pharos blog

Use the scoped name @pharos-ds/cli. Bare "npx pharos" resolves to an
unrelated package until the CLI is installed as a dependency.
`;

  return new Response(body, {
    headers: {'content-type': 'text/plain; charset=utf-8'},
  });
}

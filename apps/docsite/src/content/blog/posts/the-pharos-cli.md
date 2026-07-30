---
title: 'The best CLI is one you never run'
description: 'What the Pharos CLI is, why it is docs-first, and a tour of every command.'
date: '2026-07-10'
type: 'engineering'
authors:
  - 'josephfarina'
tags:
  - 'CLI'
  - 'AI'
  - 'Docs'
coverImage: '/blog/the-pharos-cli/cover.gif'
coverAlt: 'A terminal running pharos init'
relatedDocs:
  - title: 'AI is a copycat, so we gave it good examples to copy'
    href: '/blog/pharos-cli-build-command'
  - title: 'How Pharos works'
    href: '/blog/how-pharos-works'
  - title: 'CLI'
    href: '/docs/cli'
---

This is the first in a series on the Pharos CLI. It is the tool an agent uses to build with Pharos or as we like to think of it the interface for the machine. We put a lot of thought into getting it right.

## The CLI is the docs

Agents live in the terminal now. Give one a good tool and it uses it well. But most tools we hand agents are not good enough. So we made a call that the CLI is the docs. That is where every doc, example, and reference starts. The docs site you are reading is a consumer of the CLI and not the other way around. The CLI is the source of truth. An agent always reads the exact source we wrote and maintain. There is no second copy to fall out of sync. Nothing goes stale.

Docs are only part of it. The CLI also serves templates that show an agent how to build a real page. It builds themes. It searches across all of it. The best CLI is one you never run. The agent runs it. It is all open source so [have a look for yourself](https://github.com/Caio-Silvestre/alexandria-ds/blob/main/apps/docsite/scripts/generate-data.mjs). Or do not read this post at all. Tell your agent to run `pharos blog` and it will read it for you.

## The tour

Here is the fun part. You do not really need any of it. Your agent will know it all. But in case you are curious, I will walk you through every part of the CLI you might reach for. We go from an empty folder to a shipped app. I am keeping it high level.

**Set up.** `pharos init` installs the packages and writes your agent file. You do not even need to maintain that file. We do. You can still change it if you want. And `upgrade` keeps it current as the system changes.

**Learn.** `pharos search` ranks results across components, hooks, docs, and templates at once. `pharos component` prints the props, examples, and source for a component. `pharos hook` does the same for hooks. `pharos docs` covers reference topics like tokens, color, type, motion, and our principles.

**Compose.** `pharos build` is going to be your best friend. Tell it what you are making. It points your agent at the closest template, the right blocks, and the components to fill the gaps. `pharos template` drops a page template straight into your project. `pharos layout` sketches a page's structure from a short expression before you fill it in.

**Make it yours.** `pharos theme build` compiles a theme to production CSS and JS. `pharos swizzle` ejects a component's full source when you want to own it.

**Keep it current.** `pharos upgrade` runs codemods that migrate your code between versions. It refreshes the agent docs too. `pharos doctor` finds problems and tells you the fix.

## One surface, many readers

We enforce a JSON interface across every command. We enforce stable error codes too. Agents can rely on both and work programmatically. A manifest describes the whole tool in one call if an agent needs it. Most commands describe themselves. An agent can find its way through on its own. And there is a dense mode for fewer tokens.

## The whole point

An agent building with Pharos should not have to guess. Everything is one command away.

Read part two: [AI is a copycat, so we gave it good examples to copy](/blog/pharos-cli-build-command).

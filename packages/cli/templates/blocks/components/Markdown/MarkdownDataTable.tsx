// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Center} from '@pharos-ds/core/Center';
import {Markdown} from '@pharos-ds/core/Markdown';

const content = [
  '## Comparison Table',
  '',
  '| Feature | React | Vue | Svelte |',
  '|:--------|:-----:|:---:|-------:|',
  '| Virtual DOM | Yes | Yes | No |',
  '| Bundle Size | ~40KB | ~30KB | ~2KB |',
  '| TypeScript | Native | Plugin | Native |',
  '| Learning Curve | Medium | Easy | Easy |',
].join('\n');

export default function MarkdownDataTable() {
  return (
    <Center width="100%" style={{maxWidth: 450}}>
      <Markdown>{content}</Markdown>
    </Center>
  );
}

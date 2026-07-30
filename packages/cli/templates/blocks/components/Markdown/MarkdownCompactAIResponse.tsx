// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Center} from '@pharos-ds/core/Center';
import {Markdown} from '@pharos-ds/core/Markdown';

const content = [
  '## Design Tokens',
  '',
  'Tokens are the **shared language** between design and code.',
  '',
  '```typescript',
  'const tokens = {',
  "  primary: '#0066FF',",
  "  spacing: '8px',",
  '};',
  '```',
  '',
  '- **Composable** — small pieces',
  '- **Accessible** — built-in a11y',
  '',
  '> Opinionated enough for consistency, *flexible* enough for edge cases.',
].join('\n');

export default function MarkdownCompactAIResponse() {
  return (
    <Center style={{maxWidth: 450}}>
      <Markdown density="compact" headingLevelStart={3}>
        {content}
      </Markdown>
    </Center>
  );
}

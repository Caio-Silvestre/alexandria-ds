// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {CodeBlock} from '@pharos-ds/core/CodeBlock';
import {VStack} from '@pharos-ds/core/Stack';

export default function CodeBlockBashCommand() {
  return (
    <VStack gap={4} style={{width: '100%', maxWidth: 400}}>
      <CodeBlock
        code="npm install @pharos-ds/core"
        language="bash"
        hasCopyButton
        style={{width: '100%'}}
      />
      <CodeBlock
        code="yarn add @pharos-ds/theme-neutral"
        language="bash"
        hasCopyButton
        style={{width: '100%'}}
      />
    </VStack>
  );
}

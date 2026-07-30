// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {SyntaxTheme} from '@pharos-ds/core/theme';
import {dracula} from '@pharos-ds/core/theme/syntax';
import {CodeBlock} from '@pharos-ds/core/CodeBlock';

const code = `function greet(name: string) {
  return \`Hello, \${name}!\`;
}`;

export default function SyntaxThemeDarkPreset() {
  return (
    <SyntaxTheme theme={dracula}>
      <CodeBlock code={code} language="tsx" title="Dracula preset" />
    </SyntaxTheme>
  );
}

// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {SyntaxTheme} from '@pharos-ds/core/theme';
import {githubDark} from '@pharos-ds/core/theme/syntax';
import {CodeBlock} from '@pharos-ds/core/CodeBlock';

const commands = `$ pharos init --features agents
✓ AI agent docs installed → AGENTS.md
$ pnpm pharos component CodeBlock --dense`;

export default function CodeBlockTerminal() {
  return (
    <SyntaxTheme theme={githubDark}>
      <CodeBlock
        code={commands}
        language="bash"
        hasCopyButton
        style={{width: '100%', maxWidth: 480}}
      />
    </SyntaxTheme>
  );
}

// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {SyntaxTheme} from '@pharos-ds/core/theme';
import {oneDarkPro} from '@pharos-ds/core/theme/syntax';
import {CodeBlock} from '@pharos-ds/core/CodeBlock';
import {Stack} from '@pharos-ds/core/Layout';
import {Text} from '@pharos-ds/core/Text';

const sampleCode = `async function save() {
  await api.update(values);
  toast.show('Saved');
}`;

export default function SyntaxThemeShowcase() {
  return (
    <SyntaxTheme theme={oneDarkPro}>
      <Stack
        direction="vertical"
        gap={2}
        style={{width: 360, maxWidth: '100%'}}>
        <Text type="supporting" weight="bold" color="secondary">
          One Dark Pro preset
        </Text>
        <CodeBlock code={sampleCode} language="tsx" />
      </Stack>
    </SyntaxTheme>
  );
}

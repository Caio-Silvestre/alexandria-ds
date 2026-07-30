// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import * as stylex from '@stylexjs/stylex';
import {VStack} from '@pharos-ds/core/Layout';
import {Text} from '@pharos-ds/core/Text';
import {CodeBlock as CoreCodeBlock} from '@pharos-ds/core/CodeBlock';
import {Card} from '@pharos-ds/core/Card';

const styles = stylex.create({
  root: {
    width: '100%',
  },
});

export function CodeBlock({
  lang,
  code,
  label,
}: {
  lang: string;
  code: string;
  label?: string;
}) {
  return (
    <VStack gap={1}>
      {label && (
        <Text type="supporting" color="secondary">
          {label}
        </Text>
      )}
      <Card variant="muted" xstyle={styles.root}>
        <CoreCodeBlock
          code={code}
          language={lang}
          hasCopyButton
          style={
            {
              '--color-syntax-background': 'transparent',
              width: '100%',
            } satisfies React.CSSProperties
          }
        />
      </Card>
    </VStack>
  );
}

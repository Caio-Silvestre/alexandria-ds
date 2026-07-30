// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {ClickableCard} from '@pharos-ds/core/ClickableCard';
import {Stack} from '@pharos-ds/core/Layout';
import {Text, Heading} from '@pharos-ds/core/Text';

export default function ClickableCardShowcase() {
  return (
    <ClickableCard label="Settings" href="#" width={320}>
      <Stack direction="vertical" gap={2}>
        <Heading level={4}>Settings</Heading>
        <Text type="body" color="secondary">
          Click anywhere on this card to navigate. Nested buttons and links work
          independently.
        </Text>
      </Stack>
    </ClickableCard>
  );
}

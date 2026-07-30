// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {ClickableCard} from '@pharos-ds/core/ClickableCard';
import {Stack} from '@pharos-ds/core/Layout';
import {Text, Heading} from '@pharos-ds/core/Text';

export default function ClickableCardElevated() {
  return (
    <ClickableCard label="Open report" href="#" elevation="med" width={320}>
      <Stack direction="vertical" gap={2}>
        <Heading level={4}>Quarterly report</Heading>
        <Text type="body" color="secondary">
          A raised shadow signals the whole card is clickable, lifting it above
          the surrounding content.
        </Text>
      </Stack>
    </ClickableCard>
  );
}

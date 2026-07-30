// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Center} from '@pharos-ds/core/Center';
import {Stack} from '@pharos-ds/core/Layout';
import {Text, Heading} from '@pharos-ds/core/Text';

export default function CenterShowcase() {
  return (
    <Center axis="both" width="100%" height={240}>
      <Stack direction="vertical" gap={2} hAlign="center">
        <Heading level={4}>Centered content</Heading>
        <Text type="body" color="secondary">
          Horizontally and vertically aligned.
        </Text>
      </Stack>
    </Center>
  );
}

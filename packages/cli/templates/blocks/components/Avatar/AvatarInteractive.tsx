// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Avatar} from '@pharos-ds/core/Avatar';
import {Stack} from '@pharos-ds/core/Layout';
import {Text} from '@pharos-ds/core/Text';

export default function AvatarInteractive() {
  return (
    <Stack direction="horizontal" gap={6} vAlign="start">
      <Stack direction="vertical" gap={2} hAlign="center">
        <Avatar
          src="https://pharos-ds.vercel.app/assets/DATA-Itai-Jordaan.png"
          name="Itai Jordaan"
          size="xl"
          href="https://example.com/people/itai-jordaan"
        />
        <Text type="supporting" color="secondary">
          Link (href)
        </Text>
      </Stack>
      <Stack direction="vertical" gap={2} hAlign="center">
        <Avatar
          src="https://pharos-ds.vercel.app/assets/DATA-Margot-Schroder.png"
          name="Margot Schroder"
          size="xl"
          onClick={() => window.alert('Opening Margot Schroder’s profile')}
        />
        <Text type="supporting" color="secondary">
          Button (onClick)
        </Text>
      </Stack>
    </Stack>
  );
}

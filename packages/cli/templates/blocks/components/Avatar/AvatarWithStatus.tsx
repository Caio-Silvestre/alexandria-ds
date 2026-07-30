// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Avatar, AvatarStatusDot} from '@pharos-ds/core/Avatar';
import {Stack} from '@pharos-ds/core/Layout';

export default function AvatarWithStatus() {
  return (
    <Stack direction="horizontal" gap={4} vAlign="center">
      <Avatar
        src="https://pharos-ds.vercel.app/assets/DATA-Itai-Jordaan.png"
        name="Itai Jordaan"
        size="xl"
        status={<AvatarStatusDot variant="success" label="Online" />}
      />
      <Avatar
        src="https://pharos-ds.vercel.app/assets/DATA-Margot-Schroder.png"
        name="Margot Schroder"
        size="xl"
        status={<AvatarStatusDot variant="neutral" label="Offline" />}
      />
      <Avatar
        src="https://pharos-ds.vercel.app/assets/DATA-Pablo-Morales.png"
        name="Pablo Morales"
        size="xl"
        status={<AvatarStatusDot variant="error" label="Busy" />}
      />
    </Stack>
  );
}

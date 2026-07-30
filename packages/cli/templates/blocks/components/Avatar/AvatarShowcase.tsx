// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Avatar, AvatarStatusDot} from '@pharos-ds/core/Avatar';
import {Stack} from '@pharos-ds/core/Layout';

export default function AvatarShowcase() {
  return (
    <Stack direction="horizontal" gap={4} vAlign="center">
      <Avatar
        src="https://pharos-ds.vercel.app/assets/DATA-Ana-Thomas.png"
        name="Ana Thomas"
        size="xl"
        status={<AvatarStatusDot variant="success" label="Online" />}
      />
      <Avatar
        src="https://pharos-ds.vercel.app/assets/DATA-Drew-Young.png"
        name="Drew Young"
        size="xl"
      />
      <Avatar
        src="https://pharos-ds.vercel.app/assets/DATA-Jihoo-Song.png"
        name="Jihoo Song"
        size="xl"
      />
      <Avatar
        src="https://pharos-ds.vercel.app/assets/DATA-Nam-Tran.png"
        name="Nam Tran"
        size="xl"
        status={<AvatarStatusDot variant="error" label="Busy" />}
      />
    </Stack>
  );
}

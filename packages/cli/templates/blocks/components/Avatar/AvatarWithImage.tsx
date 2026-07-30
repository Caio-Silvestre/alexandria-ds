// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Avatar} from '@pharos-ds/core/Avatar';
import {Stack} from '@pharos-ds/core/Layout';

export default function AvatarWithImage() {
  return (
    <Stack direction="horizontal" gap={4} vAlign="center">
      <Avatar
        src="https://pharos-ds.vercel.app/assets/DATA-Ami-Pena.png"
        name="Ami Pena"
        size="xsm"
      />
      <Avatar
        src="https://pharos-ds.vercel.app/assets/DATA-Ana-Thomas.png"
        name="Ana Thomas"
        size="md"
      />
      <Avatar
        src="https://pharos-ds.vercel.app/assets/DATA-Daniela-Gimenez.png"
        name="Daniela Gimenez"
        size="lg"
      />
      <Avatar
        src="https://pharos-ds.vercel.app/assets/DATA-Gabriela-Fernandez.png"
        name="Gabriela Fernandez"
        size="xl"
      />
    </Stack>
  );
}

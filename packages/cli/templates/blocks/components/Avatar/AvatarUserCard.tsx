// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Avatar, AvatarStatusDot} from '@pharos-ds/core/Avatar';
import {Stack} from '@pharos-ds/core/Layout';
import {Text} from '@pharos-ds/core/Text';

const USERS = [
  {
    name: 'Itai Jordaan',
    src: 'https://pharos-ds.vercel.app/assets/DATA-Itai-Jordaan.png',
    role: 'Engineering Lead',
    variant: 'success' as const,
  },
  {
    name: 'Margot Schroder',
    src: 'https://pharos-ds.vercel.app/assets/DATA-Margot-Schroder.png',
    role: 'Product Designer',
    variant: 'neutral' as const,
  },
  {
    name: 'Daniela Gimenez',
    src: 'https://pharos-ds.vercel.app/assets/DATA-Daniela-Gimenez.png',
    role: 'Engineering Manager',
    variant: 'error' as const,
  },
];

export default function AvatarUserCard() {
  return (
    <Stack direction="vertical" gap={4}>
      {USERS.map(user => (
        <Stack key={user.name} direction="horizontal" gap={3} vAlign="center">
          <Avatar
            src={user.src}
            name={user.name}
            size="lg"
            status={
              <AvatarStatusDot variant={user.variant} label={user.variant} />
            }
          />
          <Stack direction="vertical" gap={0}>
            <Text type="body" weight="bold">
              {user.name}
            </Text>
            <Text type="supporting" color="secondary">
              {user.role}
            </Text>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
}

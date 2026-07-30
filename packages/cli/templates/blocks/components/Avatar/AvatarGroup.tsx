// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Avatar} from '@pharos-ds/core/Avatar';
import {AvatarGroup, AvatarGroupOverflow} from '@pharos-ds/core/AvatarGroup';
import {Stack} from '@pharos-ds/core/Layout';
import {Text} from '@pharos-ds/core/Text';

const USERS = [
  {
    name: 'Ami Pena',
    src: 'https://pharos-ds.vercel.app/assets/DATA-Ami-Pena.png',
  },
  {
    name: 'Drew Young',
    src: 'https://pharos-ds.vercel.app/assets/DATA-Drew-Young.png',
  },
  {
    name: 'Gabriela Fernandez',
    src: 'https://pharos-ds.vercel.app/assets/DATA-Gabriela-Fernandez.png',
  },
  {
    name: 'Jihoo Song',
    src: 'https://pharos-ds.vercel.app/assets/DATA-Jihoo-Song.png',
  },
  {
    name: 'Nam Tran',
    src: 'https://pharos-ds.vercel.app/assets/DATA-Nam-Tran.png',
  },
];

export default function AvatarGroupBlock() {
  return (
    <Stack direction="vertical" gap={8}>
      <Stack direction="vertical" gap={3}>
        <Text type="supporting" color="secondary">
          Team members
        </Text>
        <AvatarGroup size="lg">
          {USERS.map(user => (
            <Avatar key={user.name} src={user.src} name={user.name} />
          ))}
          <AvatarGroupOverflow count={3} />
        </AvatarGroup>
      </Stack>
      <Stack direction="vertical" gap={3}>
        <Text type="supporting" color="secondary">
          Larger group
        </Text>
        <AvatarGroup size="lg">
          {USERS.slice(0, 3).map(user => (
            <Avatar key={user.name} src={user.src} name={user.name} />
          ))}
          <AvatarGroupOverflow count={8} />
        </AvatarGroup>
      </Stack>
    </Stack>
  );
}

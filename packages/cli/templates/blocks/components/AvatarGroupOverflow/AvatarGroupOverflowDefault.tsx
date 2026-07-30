// Copyright (c) Meta Platforms, Inc. and affiliates.
'use client';

import {Avatar} from '@pharos-ds/core/Avatar';
import {AvatarGroup, AvatarGroupOverflow} from '@pharos-ds/core/AvatarGroup';
import {Stack} from '@pharos-ds/core/Layout';
import {Text} from '@pharos-ds/core/Text';

const REVIEWERS = [
  {
    name: 'Alex Daniels',
  },
  {
    name: 'Ann Smith',
  },
  {
    name: 'Carol Davis',
  },
];

export default function AvatarGroupOverflowDefault() {
  return (
    <Stack direction="vertical" gap={3}>
      <Text type="supporting" color="secondary">
        Reviewers
      </Text>
      <AvatarGroup size="lg">
        {REVIEWERS.map(reviewer => (
          <Avatar key={reviewer.name} name={reviewer.name} />
        ))}
        <AvatarGroupOverflow count={2} />
      </AvatarGroup>
    </Stack>
  );
}

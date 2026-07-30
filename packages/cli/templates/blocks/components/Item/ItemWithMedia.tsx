// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Avatar} from '@pharos-ds/core/Avatar';
import {Badge} from '@pharos-ds/core/Badge';
import {Icon} from '@pharos-ds/core/Icon';
import {Item} from '@pharos-ds/core/Item';
import {Stack} from '@pharos-ds/core/Layout';
import {Text} from '@pharos-ds/core/Text';

export default function ItemWithMedia() {
  return (
    <Stack gap={0}>
      <Item
        startContent={<Avatar name="Ada Lovelace" size="sm" />}
        label="Ada Lovelace"
        description="Design systems engineer"
        endContent={<Badge label="Owner" variant="purple" />}
        onClick={() => {}}
      />
      <Item
        startContent={<Avatar name="Grace Hopper" size="sm" />}
        label="Grace Hopper"
        description="Compiler platform"
        endContent={<Text color="secondary">Online</Text>}
        onClick={() => {}}
      />
      <Item
        startContent={<Icon icon="info" size="sm" color="secondary" />}
        label="Review handoff notes"
        description="Updated guidance is ready for the team"
        endContent={<Badge label="New" variant="blue" />}
        onClick={() => {}}
      />
    </Stack>
  );
}

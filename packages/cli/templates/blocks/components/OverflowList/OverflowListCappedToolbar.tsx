// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {OverflowList} from '@pharos-ds/core/OverflowList';
import {Button} from '@pharos-ds/core/Button';
import {DropdownMenu} from '@pharos-ds/core/DropdownMenu';
import {Card} from '@pharos-ds/core/Card';
import {Center} from '@pharos-ds/core/Center';

const actions = ['Save', 'Edit', 'Duplicate', 'Share', 'Archive', 'Delete'];

export default function OverflowListCappedToolbar() {
  return (
    <Center width={420}>
      <Card padding={2}>
        <OverflowList
          gap={2}
          maxVisibleItems={3}
          overflowRenderer={overflowItems => (
            <DropdownMenu
              button={{
                label: `+${overflowItems.length}`,
                variant: 'ghost',
                size: 'sm',
              }}
              items={overflowItems.map(({index}) => ({
                label: actions[index],
              }))}
            />
          )}>
          {actions.map(action => (
            <Button key={action} label={action} size="sm" />
          ))}
        </OverflowList>
      </Card>
    </Center>
  );
}

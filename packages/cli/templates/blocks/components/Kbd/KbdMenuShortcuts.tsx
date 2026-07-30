// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Kbd} from '@pharos-ds/core/Kbd';
import {Card} from '@pharos-ds/core/Card';
import {List, ListItem} from '@pharos-ds/core/List';

const menuItems = [
  {label: 'Cut', keys: 'mod+x'},
  {label: 'Copy', keys: 'mod+c'},
  {label: 'Paste', keys: 'mod+v'},
  {label: 'Undo', keys: 'mod+z'},
  {label: 'Redo', keys: 'mod+shift+z'},
] as const;

export default function KbdMenuShortcuts() {
  return (
    <Card padding={0}>
      <List density="compact">
        {menuItems.map(item => (
          <ListItem
            key={item.label}
            label={item.label}
            endContent={<Kbd keys={item.keys} />}
          />
        ))}
      </List>
    </Card>
  );
}

// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Badge} from '@pharos-ds/core/Badge';
import {Icon} from '@pharos-ds/core/Icon';
import {List, ListItem} from '@pharos-ds/core/List';
import {Text} from '@pharos-ds/core/Text';

export default function ListItemWithMetadata() {
  return (
    <List header="Inbox" density="compact" hasDividers>
      <ListItem
        label="Launch checklist"
        description="3 tasks still need an owner"
        startContent={<Icon icon="check" size="sm" color="success" />}
        endContent={<Badge label="3" variant="blue" />}
        isSelected
        onClick={() => {}}
      />
      <ListItem
        label="Security review"
        description="Waiting on approval"
        startContent={<Icon icon="warning" size="sm" color="warning" />}
        endContent={<Text color="secondary">Yesterday</Text>}
        onClick={() => {}}
      />
      <ListItem
        label="Old incident report"
        description="Archived and read-only"
        startContent={<Icon icon="copy" size="sm" color="secondary" />}
        endContent={<Text color="secondary">Apr 12</Text>}
        isDisabled
      />
    </List>
  );
}

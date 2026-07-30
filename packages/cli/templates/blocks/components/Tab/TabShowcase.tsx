// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {useState} from 'react';
import {TabList, Tab} from '@pharos-ds/core/TabList';
import {Badge} from '@pharos-ds/core/Badge';

export default function TabShowcase() {
  const [value, setValue] = useState('inbox');
  return (
    <TabList value={value} onChange={setValue}>
      <Tab
        value="inbox"
        label="Inbox"
        endContent={<Badge label="3" variant="info" />}
      />
    </TabList>
  );
}

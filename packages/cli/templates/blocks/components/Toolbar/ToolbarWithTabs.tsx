// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {useState, type CSSProperties} from 'react';
import {Toolbar} from '@pharos-ds/core/Toolbar';
import {Button} from '@pharos-ds/core/Button';
import {Icon} from '@pharos-ds/core/Icon';
import {TabList, Tab} from '@pharos-ds/core/TabList';
import {Card} from '@pharos-ds/core/Card';
import {Section} from '@pharos-ds/core/Section';
import {PlusIcon} from '@heroicons/react/24/outline';

const card: CSSProperties = {
  width: '100%',
  maxWidth: 500,
  height: '100%',
  marginTop: 200,
};

export default function ToolbarWithTabs() {
  const [tab, setTab] = useState('overview');
  return (
    <Card style={card}>
      <Toolbar
        label="Section navigation"
        dividers={['bottom']}
        startContent={
          <TabList value={tab} onChange={setTab}>
            <Tab value="overview" label="Overview" />
            <Tab value="analytics" label="Analytics" />
            <Tab value="settings" label="Settings" />
          </TabList>
        }
        endContent={
          <Button label="New item" icon={<Icon icon={PlusIcon} />} isIconOnly />
        }
      />
      <Section />
    </Card>
  );
}

// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {OverflowList} from '@pharos-ds/core/OverflowList';
import {Badge} from '@pharos-ds/core/Badge';
import {Card} from '@pharos-ds/core/Card';

export default function OverflowListOverflowBadges() {
  return (
    <Card
      padding={2}
      style={{
        resize: 'horizontal',
        overflow: 'hidden',
        minWidth: 80,
        width: 300,
      }}>
      <OverflowList
        gap={1}
        overflowRenderer={overflowItems => (
          <Badge variant="neutral" label={`+${overflowItems.length}`} />
        )}>
        <Badge variant="info" label="React" />
        <Badge variant="success" label="TypeScript" />
        <Badge variant="warning" label="StyleX" />
        <Badge variant="neutral" label="Storybook" />
        <Badge variant="error" label="Vitest" />
      </OverflowList>
    </Card>
  );
}

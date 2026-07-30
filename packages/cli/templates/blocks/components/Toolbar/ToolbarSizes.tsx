// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Toolbar} from '@pharos-ds/core/Toolbar';
import {Button} from '@pharos-ds/core/Button';
import {Icon} from '@pharos-ds/core/Icon';
import {Heading} from '@pharos-ds/core/Text';
import {Stack} from '@pharos-ds/core/Layout';
import {Card} from '@pharos-ds/core/Card';
import {FunnelIcon, PlusIcon} from '@heroicons/react/24/outline';

const SIZES = [
  {size: 'sm' as const, label: 'Small'},
  {size: 'md' as const, label: 'Medium'},
  {size: 'lg' as const, label: 'Large'},
];

export default function ToolbarSizes() {
  return (
    <Stack direction="vertical" gap={4} style={{width: 500}}>
      {SIZES.map(({size, label}) => (
        <Card key={size}>
          <Toolbar
            label={`${label} toolbar`}
            size={size}
            startContent={<Heading level={4}>{label}</Heading>}
            endContent={
              <>
                <Button
                  label="Filter"
                  variant="ghost"
                  icon={<Icon icon={FunnelIcon} />}
                  isIconOnly
                />
                <Button label="Add" icon={<Icon icon={PlusIcon} />} />
              </>
            }
          />
        </Card>
      ))}
    </Stack>
  );
}

// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Tooltip} from '@pharos-ds/core/Tooltip';
import {Button} from '@pharos-ds/core/Button';
import {HStack} from '@pharos-ds/core/Layout';
import {Center} from '@pharos-ds/core/Center';

export default function TooltipActionBarTooltips() {
  return (
    <Center>
      <HStack gap={4}>
        <Tooltip content="Save your changes" placement="above">
          <Button label="Save" />
        </Tooltip>
        <Tooltip content="Discard changes" placement="above">
          <Button label="Cancel" />
        </Tooltip>
        <Tooltip content="Delete permanently" placement="above">
          <Button label="Delete" variant="destructive" />
        </Tooltip>
      </HStack>
    </Center>
  );
}

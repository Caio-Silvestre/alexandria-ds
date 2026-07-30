// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {usePopover} from '@pharos-ds/core/Popover';
import {Button} from '@pharos-ds/core/Button';
import {Card} from '@pharos-ds/core/Card';
import {Center} from '@pharos-ds/core/Center';
import {VStack} from '@pharos-ds/core/Layout';
import {Text} from '@pharos-ds/core/Text';

export default function PopoverHookUsage() {
  const popover = usePopover({dialogLabel: 'Quick actions'});

  return (
    <Center height={240}>
      <Button
        label="Open actions"
        ref={popover.triggerRef}
        onClick={popover.toggle}
        {...popover.triggerProps}
      />
      {popover.render(
        <Card width={220} padding={3} variant="transparent">
          <VStack gap={2}>
            <Text type="body" weight="bold">
              Quick actions
            </Text>
            <Button label="Create task" size="sm" />
            <Button label="Share report" variant="secondary" size="sm" />
          </VStack>
        </Card>,
        {placement: 'below', alignment: 'center'},
      )}
    </Center>
  );
}

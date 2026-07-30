// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Popover} from '@pharos-ds/core/Popover';
import {Button} from '@pharos-ds/core/Button';
import {VStack, HStack} from '@pharos-ds/core/Layout';
import {Heading, Text} from '@pharos-ds/core/Text';
import {Divider} from '@pharos-ds/core/Divider';
const shortcuts = [
  {key: '⌘K', action: 'Command palette'},
  {key: '⌘/', action: 'Toggle sidebar'},
  {key: '⌘.', action: 'Quick actions'},
];

export default function PopoverKeyboardShortcuts() {
  return (
    <Popover
      placement="below"
      label="Keyboard shortcuts"
      width={260}
      content={
        <VStack gap={2}>
          <Heading level={4}>Keyboard shortcuts</Heading>
          <Divider />
          {shortcuts.map(s => (
            <HStack key={s.key} gap={3}>
              <Text type="body" weight="bold">
                {s.key}
              </Text>
              <Text type="body">{s.action}</Text>
            </HStack>
          ))}
        </VStack>
      }>
      <Button label="Shortcuts">Shortcuts</Button>
    </Popover>
  );
}

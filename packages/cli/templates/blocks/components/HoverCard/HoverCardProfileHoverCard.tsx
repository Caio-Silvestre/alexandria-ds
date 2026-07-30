// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {HoverCard} from '@pharos-ds/core/HoverCard';
import {Avatar} from '@pharos-ds/core/Avatar';
import {Button} from '@pharos-ds/core/Button';
import {Icon} from '@pharos-ds/core/Icon';
import {VStack, HStack} from '@pharos-ds/core/Layout';
import {Text, Heading} from '@pharos-ds/core/Text';
import {CalendarIcon} from '@heroicons/react/24/outline';

export default function HoverCardProfileHoverCard() {
  return (
    <HoverCard
      placement="below"
      content={
        <HStack gap={3} vAlign="start" style={{maxWidth: 280}}>
          <Avatar name="Jane Doe" size={48} style={{flexShrink: 0}} />
          <VStack gap={1}>
            <Heading level={3}>@janedoe</Heading>
            <Text type="body" color="secondary">
              Crafting accessible, scalable design systems for modern teams.
            </Text>
            <HStack gap={1} vAlign="center">
              <Icon icon={CalendarIcon} size="xsm" color="secondary" />
              <Text type="supporting" color="secondary">
                March 2024
              </Text>
            </HStack>
          </VStack>
        </HStack>
      }>
      <Button label="@janedoe" variant="ghost" />
    </HoverCard>
  );
}

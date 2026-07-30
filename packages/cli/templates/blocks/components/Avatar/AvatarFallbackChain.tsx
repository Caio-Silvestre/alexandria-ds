// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Avatar} from '@pharos-ds/core/Avatar';
import {HStack, VStack} from '@pharos-ds/core/Layout';
import {Text} from '@pharos-ds/core/Text';

export default function AvatarFallbackChain() {
  return (
    <VStack gap={4}>
      <HStack gap={3} vAlign="center">
        <Avatar
          src="https://pharos-ds.vercel.app/assets/DATA-Daniela-Gimenez.png"
          name="Daniela Gimenez"
          size="lg"
        />
        <Text type="supporting">Valid src</Text>
      </HStack>
      <HStack gap={3} vAlign="center">
        <Avatar
          src="https://pharos-ds.vercel.app/assets/does-not-exist-primary.jpg"
          fallbackSrc="https://pharos-ds.vercel.app/assets/DATA-Ami-Pena.png"
          name="Invalid User"
          size="lg"
        />
        <Text type="supporting">Invalid src, valid fallbackSrc</Text>
      </HStack>
      <HStack gap={3} vAlign="center">
        <Avatar
          src="https://pharos-ds.vercel.app/assets/does-not-exist-primary.jpg"
          fallbackSrc="https://pharos-ds.vercel.app/assets/does-not-exist-fallback.jpg"
          name="Test User"
          size="lg"
        />
        <Text type="supporting">Both invalid, has name</Text>
      </HStack>
      <HStack gap={3} vAlign="center">
        <Avatar
          src="https://pharos-ds.vercel.app/assets/does-not-exist-primary.jpg"
          size="lg"
        />
        <Text type="supporting">All invalid, no name</Text>
      </HStack>
    </VStack>
  );
}

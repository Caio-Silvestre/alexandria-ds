// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {AppShell} from '@pharos-ds/core/AppShell';
import {VStack} from '@pharos-ds/core/Stack';
import {Heading, Text} from '@pharos-ds/core/Text';

export default function AppShellContentOnly() {
  return (
    <AppShell contentPadding={6} style={{height: '100%', minHeight: 0}}>
      <VStack gap={4}>
        <Heading level={3}>Page Content</Heading>
        <Text type="body">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris.
        </Text>
      </VStack>
    </AppShell>
  );
}

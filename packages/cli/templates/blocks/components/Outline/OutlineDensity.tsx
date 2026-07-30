// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Outline} from '@pharos-ds/core/Outline';
import type {OutlineItem} from '@pharos-ds/core/Outline';
import {HStack, VStack} from '@pharos-ds/core/Layout';
import {Text} from '@pharos-ds/core/Text';

const items: OutlineItem[] = [
  {id: 'density-getting-started', label: 'Getting started', level: 2},
  {id: 'density-configuration', label: 'Configuration', level: 2},
  {id: 'density-api', label: 'API reference', level: 3},
  {id: 'density-examples', label: 'Examples', level: 3},
  {id: 'density-faq', label: 'FAQ', level: 2},
];

export default function OutlineDensity() {
  return (
    <HStack gap={10} vAlign="start">
      <VStack gap={3} style={{width: 200}}>
        <Text type="supporting" color="secondary" weight="medium">
          Default
        </Text>
        <Outline
          items={items}
          density="default"
          activeId="density-configuration"
        />
      </VStack>
      <VStack gap={3} style={{width: 200}}>
        <Text type="supporting" color="secondary" weight="medium">
          Compact
        </Text>
        <Outline
          items={items}
          density="compact"
          activeId="density-configuration"
        />
      </VStack>
    </HStack>
  );
}

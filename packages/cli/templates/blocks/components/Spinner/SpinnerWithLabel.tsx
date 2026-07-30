// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Spinner} from '@pharos-ds/core/Spinner';
import {Text} from '@pharos-ds/core/Text';
import {HStack, VStack} from '@pharos-ds/core/Layout';

export default function SpinnerWithLabel() {
  return (
    <HStack gap={8} vAlign="start">
      <Spinner size="lg" label="Loading..." />
      <Spinner
        size="lg"
        label={
          <VStack gap={0} hAlign="center">
            <Text type="body" weight="bold">
              Fetching data
            </Text>
            <Text type="supporting" color="secondary">
              This may take a moment
            </Text>
          </VStack>
        }
        aria-label="Fetching data"
      />
    </HStack>
  );
}

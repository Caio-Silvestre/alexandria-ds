// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {VisuallyHidden} from '@pharos-ds/core/VisuallyHidden';
import {Card} from '@pharos-ds/core/Card';
import {HStack, VStack} from '@pharos-ds/core/Layout';
import {Text} from '@pharos-ds/core/Text';
import {Badge} from '@pharos-ds/core/Badge';

const items = [
  {name: 'pharos-core', status: 'Passing', variant: 'success'},
  {name: 'pharos-charts', status: 'Failing', variant: 'error'},
  {name: 'pharos-cli', status: 'Passing', variant: 'success'},
] as const;

export default function VisuallyHiddenStructuralHeading() {
  return (
    <VStack gap={3} hAlign="start">
      <Text type="supporting" color="secondary">
        The layout makes this group obvious to sighted users. A hidden heading
        gives screen-reader users the same landmark to jump to.
      </Text>
      {/* No visible heading is needed here, but AT users navigate by heading. */}
      <VisuallyHidden as="h2">Build status</VisuallyHidden>
      <VStack gap={2}>
        {items.map(({name, status, variant}) => (
          <Card key={name} variant="muted" padding={3}>
            <HStack gap={3} vAlign="center">
              <Text type="body">{name}</Text>
              <Badge label={status} variant={variant} />
            </HStack>
          </Card>
        ))}
      </VStack>
    </VStack>
  );
}

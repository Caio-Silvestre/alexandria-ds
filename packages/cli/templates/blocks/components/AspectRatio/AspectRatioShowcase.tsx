// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {AspectRatio} from '@pharos-ds/core/AspectRatio';
import {HStack, VStack} from '@pharos-ds/core/Layout';
import {Text} from '@pharos-ds/core/Text';

const items = [
  {
    ratio: 1,
    label: '1 : 1',
    src: 'https://pharos-ds.vercel.app/assets/light-home-square-1.png',
    alt: '1:1 square',
  },
  {
    ratio: 4 / 3,
    label: '4 : 3',
    src: 'https://pharos-ds.vercel.app/assets/illustrative-horizontal-1.png',
    alt: '4:3 standard',
  },
  {
    ratio: 16 / 9,
    label: '16 : 9',
    src: 'https://pharos-ds.vercel.app/assets/light-scene-horizontal-1.png',
    alt: '16:9 widescreen',
  },
];

export default function AspectRatioShowcase() {
  return (
    <HStack gap={4} vAlign="start">
      {items.map(({ratio, label, src, alt}) => (
        <VStack key={label} gap={2} hAlign="center">
          <AspectRatio
            ratio={ratio}
            fit="cover"
            style={{
              height: 120,
              width: 'auto',
              borderRadius: 'var(--radius-container)',
            }}>
            <img src={src} alt={alt} />
          </AspectRatio>
          <Text type="supporting" color="secondary">
            {label}
          </Text>
        </VStack>
      ))}
    </HStack>
  );
}

// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Carousel} from '@pharos-ds/core/Carousel';
import {Card} from '@pharos-ds/core/Card';
import {Stack} from '@pharos-ds/core/Layout';
import {Text} from '@pharos-ds/core/Text';

const FEATURES = [
  {
    title: 'Design System',
    desc: 'Tokens, components, and patterns',
  },
  {
    title: 'Documentation',
    desc: 'API reference and usage guides',
  },
  {
    title: 'Sandbox',
    desc: 'Visual testing and previews',
  },
  {
    title: 'Library',
    desc: 'Component and hook information',
  },
  {
    title: 'Contributing',
    desc: 'Open source development',
  },
];

export default function CarouselCards() {
  return (
    <Stack direction="vertical" gap={3} style={{maxWidth: 520, padding: 8}}>
      <Text type="body" weight="bold">
        Browse features
      </Text>
      <Carousel gap={2} hasSnap aria-label="Feature cards">
        {FEATURES.map(item => (
          <Card key={item.title} width={200} minHeight={100}>
            <Stack direction="vertical" gap={1}>
              <Text type="body" weight="bold">
                {item.title}
              </Text>
              <Text type="supporting" color="secondary">
                {item.desc}
              </Text>
            </Stack>
          </Card>
        ))}
      </Carousel>
    </Stack>
  );
}

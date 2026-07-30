// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {MediaTheme} from '@pharos-ds/core/theme';
import {Section} from '@pharos-ds/core/Section';
import {Stack} from '@pharos-ds/core/Layout';
import {Text} from '@pharos-ds/core/Text';
import {Button} from '@pharos-ds/core/Button';
import {Badge} from '@pharos-ds/core/Badge';
import {Icon} from '@pharos-ds/core/Icon';

const SHOWCASE_IMAGE_URL =
  'https://pharos-ds.vercel.app/assets/light-scene-horizontal-1.png';

export default function MediaThemeShowcase() {
  return (
    <Section
      variant="transparent"
      padding={4}
      style={{
        width: 360,
        maxWidth: '100%',
        minHeight: 230,
        display: 'flex',
        alignItems: 'flex-end',
        backgroundImage: `linear-gradient(180deg, rgba(10,19,23,0.05) 0%, rgba(10,19,23,0.82) 100%), url(${SHOWCASE_IMAGE_URL})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: 'var(--radius-container)',
        boxShadow: 'var(--shadow-med)',
      }}>
      <MediaTheme mode="dark">
        <Stack direction="vertical" gap={3}>
          <Stack direction="horizontal" gap={2} vAlign="center">
            <Icon icon="info" size="md" />
            <Text type="body" weight="bold">
              Media overlay
            </Text>
            <Badge label="Live" />
          </Stack>
          <Text type="supporting" color="secondary">
            Text, icons, badges, and button variants inherit legible colors on
            top of the dark image treatment.
          </Text>
          <Stack direction="horizontal" gap={2} wrap="wrap">
            <Button label="Primary" variant="primary" size="sm" />
            <Button label="Secondary" variant="secondary" size="sm" />
            <Button label="Ghost" variant="ghost" size="sm" />
          </Stack>
        </Stack>
      </MediaTheme>
    </Section>
  );
}

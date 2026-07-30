// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Section} from '@pharos-ds/core/Section';
import {Stack} from '@pharos-ds/core/Layout';
import {Text} from '@pharos-ds/core/Text';
import {Button} from '@pharos-ds/core/Button';
import {Icon} from '@pharos-ds/core/Icon';
import {CheckIcon} from '@heroicons/react/24/solid';

const FEATURES = [
  '10 team members',
  'Unlimited projects',
  'Priority support',
  'Advanced analytics',
];

export default function SectionDefaultWithWash() {
  return (
    <Stack direction="vertical" gap={2}>
      <Section variant="section" padding={4}>
        <Stack direction="vertical" gap={3} hAlign="center">
          <Stack direction="vertical" gap={1} hAlign="center">
            <Text type="display-3">Pro Plan</Text>
            <Text type="body" color="secondary">
              Everything you need to scale your team.
            </Text>
          </Stack>
          <Stack direction="vertical" gap={2}>
            {FEATURES.map(feature => (
              <Stack
                key={feature}
                direction="horizontal"
                gap={2}
                vAlign="center">
                <Icon icon={CheckIcon} size="sm" />
                <Text type="body">{feature}</Text>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Section>
      <Section variant="muted" padding={6}>
        <Stack direction="vertical" gap={2} hAlign="center">
          <Stack direction="horizontal" gap={2} vAlign="center">
            <Text type="display-3">$49</Text>
            <Text type="supporting" color="secondary">
              / month
            </Text>
          </Stack>
          <Button label="Upgrade" variant="primary" />
        </Stack>
      </Section>
    </Stack>
  );
}

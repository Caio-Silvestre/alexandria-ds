// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Collapsible, CollapsibleGroup} from '@pharos-ds/core/Collapsible';
import {Section} from '@pharos-ds/core/Section';
import {Text} from '@pharos-ds/core/Text';
import {VStack} from '@pharos-ds/core/Layout';

export default function CollapsibleSingleAccordion() {
  return (
    <CollapsibleGroup type="single" defaultValue="general">
      <VStack gap={2} style={{width: '100%', maxWidth: 400}}>
        <Section>
          <Collapsible trigger="General Settings" value="general">
            <Text type="body">
              Configure your general preferences including language, timezone,
              and display options.
            </Text>
          </Collapsible>
        </Section>
        <Section>
          <Collapsible trigger="Privacy Settings" value="privacy">
            <Text type="body">
              Manage who can see your profile, activity, and personal
              information.
            </Text>
          </Collapsible>
        </Section>
        <Section>
          <Collapsible trigger="Notification Settings" value="notifications">
            <Text type="body">
              Choose which notifications you receive and how they are delivered.
            </Text>
          </Collapsible>
        </Section>
      </VStack>
    </CollapsibleGroup>
  );
}

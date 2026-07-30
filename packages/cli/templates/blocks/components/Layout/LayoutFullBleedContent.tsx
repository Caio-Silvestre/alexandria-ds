// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {
  Layout,
  LayoutHeader,
  LayoutContent,
  LayoutFooter,
  HStack,
} from '@pharos-ds/core/Layout';
import {Card} from '@pharos-ds/core/Card';
import {Button} from '@pharos-ds/core/Button';
import {Section} from '@pharos-ds/core/Section';
import {Heading, Text} from '@pharos-ds/core/Text';

export default function LayoutFullBleedContent() {
  return (
    <Card width="100%" style={{maxWidth: 400}}>
      <Layout
        header={
          <LayoutHeader hasDivider>
            <Heading level={4}>Full Bleed Example</Heading>
          </LayoutHeader>
        }
        content={
          <LayoutContent padding={0}>
            <Section variant="muted">
              <Text type="body">
                Section automatically escapes the parent container padding to
                fill edge-to-edge. Useful for wash backgrounds, tables, or
                images that need to span the full width.
              </Text>
            </Section>
          </LayoutContent>
        }
        footer={
          <LayoutFooter hasDivider>
            <HStack gap={2} hAlign="end">
              <Button label="Close" variant="secondary">
                Close
              </Button>
            </HStack>
          </LayoutFooter>
        }
      />
    </Card>
  );
}

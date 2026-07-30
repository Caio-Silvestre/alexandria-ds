// Copyright (c) Meta Platforms, Inc. and affiliates.

import {useState} from 'react';
import {Theme} from '@pharos-ds/core/theme';
import {neutralTheme} from '@pharos-ds/theme-neutral/built';
import {VStack, HStack} from '@pharos-ds/core/Layout';
import {Button} from '@pharos-ds/core/Button';
import {Text, Heading} from '@pharos-ds/core/Text';
import {TextInput} from '@pharos-ds/core/TextInput';
import {Badge} from '@pharos-ds/core/Badge';
import {Card} from '@pharos-ds/core/Card';
import {Divider} from '@pharos-ds/core/Divider';
import {Avatar} from '@pharos-ds/core/Avatar';

/**
 * Pharos + Vite + Tailwind Example
 *
 * Demonstrates:
 * - Pharos components for UI (buttons, cards, inputs, badges)
 * - Tailwind utilities for page layout and custom spacing
 * - Tailwind Bridge: Pharos tokens as native Tailwind utilities
 *   (bg-surface, text-primary, text-secondary, etc.)
 */
export default function App() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  return (
    <Theme theme={neutralTheme}>
      <main className="min-h-screen bg-body p-8">
        <div className="mx-auto max-w-3xl">
          <VStack gap={8}>
            {/* Header */}
            <VStack gap={2}>
              <Heading level={1}>Pharos + Vite + Tailwind</Heading>
              <Text type="body" color="secondary">
                Pharos handles components and design tokens. Tailwind handles
                page layout and custom styling, powered by the token bridge.
              </Text>
            </VStack>

            <Divider />

            {/* Token Bridge — Tailwind using Pharos tokens */}
            <VStack gap={3}>
              <Heading level={2}>Token Bridge</Heading>
              <Text type="supporting" color="secondary">
                Pharos tokens available as Tailwind utilities via{' '}
                <code className="rounded-sm bg-muted px-1 py-0.5 text-xs">
                  @pharos-ds/core/tailwind-theme.css
                </code>
              </Text>

              {/* Semantic surfaces using bridge utilities */}
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col gap-1 rounded-lg bg-surface p-4 shadow-sm">
                  <Text type="label">bg-surface</Text>
                  <Text type="supporting" color="secondary">
                    Cards, panels
                  </Text>
                </div>
                <div className="flex flex-col gap-1 rounded-lg bg-body p-4 shadow-sm border border-border">
                  <Text type="label">bg-body</Text>
                  <Text type="supporting" color="secondary">
                    Page background
                  </Text>
                </div>
                <div className="flex flex-col gap-1 rounded-lg bg-muted p-4 shadow-sm">
                  <Text type="label">bg-muted</Text>
                  <Text type="supporting" color="secondary">
                    Subtle emphasis
                  </Text>
                </div>
              </div>

              {/* Status colors */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-md bg-success/10 px-3 py-2">
                  <div className="h-2 w-2 rounded-full bg-success" />
                  <Text type="supporting" weight="bold">
                    Success
                  </Text>
                </div>
                <div className="flex items-center gap-2 rounded-md bg-error/10 px-3 py-2">
                  <div className="h-2 w-2 rounded-full bg-error" />
                  <Text type="supporting" weight="bold">
                    Error
                  </Text>
                </div>
                <div className="flex items-center gap-2 rounded-md bg-warning/10 px-3 py-2">
                  <div className="h-2 w-2 rounded-full bg-warning" />
                  <Text type="supporting" weight="bold">
                    Warning
                  </Text>
                </div>
              </div>
            </VStack>

            <Divider />

            {/* Profile cards using Pharos components in Tailwind grid */}
            <VStack gap={3}>
              <Heading level={2}>Components + Layout</Heading>
              <Text type="supporting" color="secondary">
                Pharos components arranged with Tailwind grid utilities.
              </Text>

              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <VStack gap={3}>
                    <HStack gap={2} vAlign="center">
                      <Avatar name="Alice Chen" size="md" />
                      <VStack gap={0}>
                        <Text type="label">Alice Chen</Text>
                        <Text type="supporting" color="secondary">
                          Design Engineer
                        </Text>
                      </VStack>
                    </HStack>
                    <HStack gap={2}>
                      <Badge variant="info" label="Design Systems" />
                      <Badge variant="success" label="React" />
                    </HStack>
                    <Button label="View Profile" variant="secondary" />
                  </VStack>
                </Card>

                <Card>
                  <VStack gap={3}>
                    <HStack gap={2} vAlign="center">
                      <Avatar name="Bob Park" size="md" />
                      <VStack gap={0}>
                        <Text type="label">Bob Park</Text>
                        <Text type="supporting" color="secondary">
                          Frontend Engineer
                        </Text>
                      </VStack>
                    </HStack>
                    <HStack gap={2}>
                      <Badge variant="info" label="TypeScript" />
                      <Badge variant="warning" label="Infra" />
                    </HStack>
                    <Button label="View Profile" variant="secondary" />
                  </VStack>
                </Card>
              </div>
            </VStack>

            <Divider />

            {/* Form section */}
            <VStack gap={3}>
              <Heading level={2}>Contact Form</Heading>
              <Card>
                <VStack gap={4}>
                  <div className="grid grid-cols-2 gap-4">
                    <TextInput
                      label="Name"
                      placeholder="Your name"
                      value={name}
                      onChange={setName}
                    />
                    <TextInput
                      label="Email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={setEmail}
                    />
                  </div>
                  <HStack gap={2}>
                    <Button label="Submit" variant="primary" />
                    <Button label="Cancel" variant="ghost" />
                  </HStack>
                </VStack>
              </Card>
            </VStack>

            <Divider />

            {/* Hue palette using bridge */}
            <VStack gap={3}>
              <Heading level={2}>Color Palette</Heading>
              <Text type="supporting" color="secondary">
                Hue tokens from Pharos, accessible as Tailwind utilities.
              </Text>
              <div className="grid grid-cols-5 gap-3">
                <div className="rounded-md border border-blue-ring bg-blue-subtle p-3 text-center">
                  <Text type="supporting" weight="bold">
                    Blue
                  </Text>
                </div>
                <div className="rounded-md border border-green-ring bg-green-subtle p-3 text-center">
                  <Text type="supporting" weight="bold">
                    Green
                  </Text>
                </div>
                <div className="rounded-md border border-purple-ring bg-purple-subtle p-3 text-center">
                  <Text type="supporting" weight="bold">
                    Purple
                  </Text>
                </div>
                <div className="rounded-md border border-orange-ring bg-orange-subtle p-3 text-center">
                  <Text type="supporting" weight="bold">
                    Orange
                  </Text>
                </div>
                <div className="rounded-md border border-red-ring bg-red-subtle p-3 text-center">
                  <Text type="supporting" weight="bold">
                    Red
                  </Text>
                </div>
              </div>
            </VStack>
          </VStack>
        </div>
      </main>
    </Theme>
  );
}

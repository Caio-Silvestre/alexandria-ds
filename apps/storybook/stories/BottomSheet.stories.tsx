// Copyright (c) Meta Platforms, Inc. and affiliates.

import type {Meta, StoryObj} from '@storybook/react';
import {useState} from 'react';
import {BottomSheet} from '@pharos-ds/lab';
import {Button} from '@pharos-ds/core/Button';
import {Divider} from '@pharos-ds/core/Divider';
import {Heading} from '@pharos-ds/core/Heading';
import {Section} from '@pharos-ds/core/Section';
import {VStack} from '@pharos-ds/core/Stack';
import {Text} from '@pharos-ds/core/Text';
import {TextInput} from '@pharos-ds/core/TextInput';
import {TextArea} from '@pharos-ds/core/TextArea';
import {CheckboxInput} from '@pharos-ds/core/CheckboxInput';

const meta: Meta<typeof BottomSheet> = {
  title: 'Lab/BottomSheet',
  component: BottomSheet,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    Story => (
      <div style={{minHeight: 480, padding: 32}}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BottomSheet>;

export const Showcase: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button label="Open sheet" onClick={() => setIsOpen(true)} />
        <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen} label="Filters">
          <Section padding={4}>
            <VStack gap={4}>
              <Heading level={3}>Filters</Heading>
              <Divider />
              <VStack gap={2}>
                <CheckboxInput label="In stock" value={false} />
                <CheckboxInput label="On sale" value={false} />
                <CheckboxInput label="Free shipping" value={false} />
              </VStack>
              <Button label="Apply" onClick={() => setIsOpen(false)} />
            </VStack>
          </Section>
        </BottomSheet>
      </>
    );
  },
};

export const TallSheet: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button label="Open nearby places" onClick={() => setIsOpen(true)} />
        <BottomSheet
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          label="Nearby places"
          height="tall">
          <Section padding={4}>
            <VStack gap={3}>
              <Text type="supporting" color="secondary">
                Drag the handle down or press Escape to dismiss.
              </Text>
              <Divider />
              {Array.from({length: 12}, (_, i) => (
                <VStack key={i} gap={1}>
                  <Text type="label">Place {i + 1}</Text>
                  <Text type="supporting" color="secondary">
                    {(0.2 + i * 0.3).toFixed(1)} mi away
                  </Text>
                </VStack>
              ))}
            </VStack>
          </Section>
        </BottomSheet>
      </>
    );
  },
};

export const AutoHeight: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button label="Add a comment" onClick={() => setIsOpen(true)} />
        <BottomSheet
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          label="Add a comment"
          height="auto">
          <Section padding={4}>
            <VStack gap={4}>
              <Heading level={3}>Add a comment</Heading>
              <Text type="supporting" color="secondary">
                The sheet fits its content up to the tall budget.
              </Text>
              <Divider />
              <TextInput label="Title" value="" />
              <TextArea label="Comment" rows={4} value="" />
              <Button label="Post" onClick={() => setIsOpen(false)} />
            </VStack>
          </Section>
        </BottomSheet>
      </>
    );
  },
};

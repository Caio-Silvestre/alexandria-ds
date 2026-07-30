// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {
  ChatMessageList,
  ChatMessage,
  ChatMessageBubble,
  ChatMessageMetadata,
} from '@pharos-ds/core/Chat';
import {Avatar} from '@pharos-ds/core/Avatar';
import {Timestamp} from '@pharos-ds/core/Timestamp';
import {Text} from '@pharos-ds/core/Text';
import {Button} from '@pharos-ds/core/Button';
import {Icon} from '@pharos-ds/core/Icon';
import {HStack} from '@pharos-ds/core/Layout';

export default function ChatMessageBubbleMetadata() {
  return (
    <ChatMessageList style={{maxWidth: 500}}>
      <ChatMessage
        sender="assistant"
        avatar={<Avatar name="Agent" size="md" />}>
        <ChatMessageBubble
          name={
            <Text type="supporting" weight="semibold" color="secondary">
              Agent
            </Text>
          }
          metadata={
            <ChatMessageMetadata
              timestamp={
                <Timestamp value="2026-04-10T09:15:00" format="time" />
              }
              footer={
                <HStack gap={1}>
                  <Button
                    label="Copy"
                    variant="ghost"
                    size="sm"
                    icon={<Icon icon="copy" size="sm" />}
                    isIconOnly
                    onClick={() => {}}
                  />
                  <Text type="supporting" color="secondary">
                    Claude Opus 4.6
                  </Text>
                </HStack>
              }
            />
          }>
          Your deployment finished successfully. All 14 checks passed.
        </ChatMessageBubble>
      </ChatMessage>
      <ChatMessage sender="user">
        <ChatMessageBubble
          metadata={
            <ChatMessageMetadata
              timestamp={
                <Timestamp value="2026-04-10T09:16:00" format="time" />
              }
              status="read"
            />
          }>
          Great, can you send me the production URL?
        </ChatMessageBubble>
      </ChatMessage>
    </ChatMessageList>
  );
}

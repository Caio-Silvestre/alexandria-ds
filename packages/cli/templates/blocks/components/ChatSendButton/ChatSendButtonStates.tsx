// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {ChatSendButton} from '@pharos-ds/core/Chat';
import {Stack} from '@pharos-ds/core/Layout';
import {Text} from '@pharos-ds/core/Text';

export default function ChatSendButtonStates() {
  return (
    <Stack direction="vertical" gap={2}>
      <Text type="supporting" color="secondary">
        Disabled → Ready → Streaming
      </Text>
      <Stack direction="horizontal" gap={3} vAlign="center">
        <ChatSendButton isDisabled onSend={() => {}} />
        <ChatSendButton isDisabled={false} onSend={() => {}} />
        <ChatSendButton isStopShown onStop={() => {}} />
      </Stack>
    </Stack>
  );
}

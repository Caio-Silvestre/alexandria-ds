// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {ChatSendButton} from '@pharos-ds/core/Chat';
import {Icon} from '@pharos-ds/core/Icon';
import {Stack} from '@pharos-ds/core/Layout';
import {SparklesIcon} from '@heroicons/react/24/solid';

export default function ChatSendButtonShowcase() {
  return (
    <Stack direction="horizontal" gap={3} vAlign="center">
      <ChatSendButton isDisabled={false} onSend={() => {}} />
      <ChatSendButton
        isDisabled={false}
        onSend={() => {}}
        sendIcon={<Icon icon={SparklesIcon} size="sm" />}
      />
      <ChatSendButton isStopShown onStop={() => {}} />
    </Stack>
  );
}

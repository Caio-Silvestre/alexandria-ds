// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {useState} from 'react';
import {ChatComposer, ChatComposerInput} from '@pharos-ds/core/Chat';
import {Stack} from '@pharos-ds/core/Layout';
import {Text} from '@pharos-ds/core/Text';

export default function ChatComposerInputControlledInput() {
  const [value, setValue] = useState('');
  return (
    <Stack direction="vertical" gap={3} width={450} maxWidth="100%">
      <ChatComposer
        onSubmit={() => setValue('')}
        value={value}
        onChange={setValue}
        input={
          <ChatComposerInput
            value={value}
            onChange={setValue}
            placeholder="Type a message..."
          />
        }
      />
      <Text type="supporting" color="secondary">
        Value: {JSON.stringify(value)}
      </Text>
    </Stack>
  );
}

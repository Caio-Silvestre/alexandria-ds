// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {ChatComposer} from '@pharos-ds/core/Chat';
import {Stack} from '@pharos-ds/core/Layout';

export default function ChatComposerShowcase() {
  return (
    <Stack direction="vertical" width={450} maxWidth="100%">
      <ChatComposer onSubmit={() => {}} placeholder="Type a message…" />
    </Stack>
  );
}

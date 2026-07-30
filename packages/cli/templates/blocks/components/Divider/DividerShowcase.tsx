// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Divider} from '@pharos-ds/core/Divider';
import {Stack} from '@pharos-ds/core/Layout';

export default function DividerShowcase() {
  return (
    <Stack direction="vertical" gap={4} style={{width: 500}}>
      <Divider variant="subtle" />
      <Divider variant="strong" />
      <Divider label="or" />
    </Stack>
  );
}

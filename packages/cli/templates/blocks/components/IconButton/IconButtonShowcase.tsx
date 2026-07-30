// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {IconButton} from '@pharos-ds/core/IconButton';
import {Icon} from '@pharos-ds/core/Icon';

export default function IconButtonShowcase() {
  return (
    <IconButton
      label="Settings"
      icon={<Icon icon="wrench" color="inherit" />}
    />
  );
}

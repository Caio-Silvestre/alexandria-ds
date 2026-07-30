// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {NavIcon} from '@pharos-ds/core/NavIcon';
import {Icon} from '@pharos-ds/core/Icon';
import {HStack} from '@pharos-ds/core/Layout';

export default function NavIconBasic() {
  return (
    <HStack gap={4} vAlign="center">
      <NavIcon icon={<Icon icon="search" />} />
      <NavIcon icon={<Icon icon="calendar" />} />
    </HStack>
  );
}

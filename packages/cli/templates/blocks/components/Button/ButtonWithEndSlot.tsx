// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Button} from '@pharos-ds/core/Button';
import {Badge} from '@pharos-ds/core/Badge';
import {Stack} from '@pharos-ds/core/Layout';
import {Text} from '@pharos-ds/core/Text';

export default function ButtonWithEndSlot() {
  return (
    <Stack direction="vertical" gap={4}>
      <Text type="supporting" color="secondary">
        Trailing badges for counts or status
      </Text>
      <Stack direction="horizontal" gap={3} vAlign="center">
        <Button
          label="Messages"
          variant="primary"
          endContent={<Badge variant="info" label={3} />}
        />
        <Button
          label="Notifications"
          variant="secondary"
          endContent={<Badge variant="warning" label={12} />}
        />
        <Button
          label="Updates"
          variant="ghost"
          endContent={<Badge variant="neutral" label="New" />}
        />
      </Stack>
    </Stack>
  );
}

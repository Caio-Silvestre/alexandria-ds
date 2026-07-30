// Copyright (c) Meta Platforms, Inc. and affiliates.

// In production, use useToast() hook for proper positioning, stacking, and lifecycle.
'use client';

import {Toast} from '@pharos-ds/core/Toast';
import {useToast} from '@pharos-ds/core/Toast';
import {Button} from '@pharos-ds/core/Button';
import {Link} from '@pharos-ds/core/Link';
import {VStack} from '@pharos-ds/core/Layout';

export default function ToastAction() {
  const toast = useToast();

  return (
    <VStack gap={3}>
      <Toast
        type="info"
        body="Item deleted"
        endContent={
          <Button
            label="Undo"
            variant="secondary"
            size="sm"
            onClick={() => toast({body: 'Undo successful', type: 'info'})}
          />
        }
        isAutoHide={false}
        autoHideDuration={5000}
        isExiting={false}
        onDismiss={() => {}}
      />
      <Toast
        type="info"
        body="Your report is ready."
        endContent={
          <Link href="#" hasUnderline>
            View report
          </Link>
        }
        isAutoHide={false}
        autoHideDuration={5000}
        isExiting={false}
        onDismiss={() => {}}
      />
    </VStack>
  );
}

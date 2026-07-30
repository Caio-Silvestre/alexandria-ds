// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Dialog, DialogHeader} from '@pharos-ds/core/Dialog';
import {Layout, LayoutContent} from '@pharos-ds/core/Layout';
import {Text} from '@pharos-ds/core/Text';

// Remove isInline for production — dialogs should be modal.
export default function DialogShowcase() {
  return (
    <Dialog isOpen isInline onOpenChange={() => {}}>
      <Layout
        header={<DialogHeader title="Modal Title" onOpenChange={() => {}} />}
        content={
          <LayoutContent>
            <Text type="body">Dialog content goes here.</Text>
          </LayoutContent>
        }
      />
    </Dialog>
  );
}

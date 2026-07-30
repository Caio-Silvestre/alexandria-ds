// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Dialog, DialogHeader} from '@pharos-ds/core/Dialog';
import {Layout, LayoutContent, Card} from '@pharos-ds/core/Layout';
import {Text} from '@pharos-ds/core/Text';

export default function DialogHeaderShowcase() {
  return (
    <Dialog isOpen isInline onOpenChange={() => {}}>
      <Layout
        header={
          <DialogHeader
            title="Edit Profile"
            subtitle="Update your personal information"
            onOpenChange={() => {}}
          />
        }
        content={
          <LayoutContent>
            <Card variant="muted">
              <Text type="body" color="secondary">
                Dialog body content goes here.
              </Text>
            </Card>
          </LayoutContent>
        }
      />
    </Dialog>
  );
}

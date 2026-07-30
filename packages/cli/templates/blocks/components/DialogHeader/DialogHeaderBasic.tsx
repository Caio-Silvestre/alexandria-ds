// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Dialog, DialogHeader} from '@pharos-ds/core/Dialog';
import {Layout, LayoutContent} from '@pharos-ds/core/Layout';
import {Text} from '@pharos-ds/core/Text';

export default function DialogHeaderBasic() {
  return (
    <Dialog isOpen isInline onOpenChange={() => {}}>
      <Layout
        header={
          <DialogHeader
            title="Invite teammates"
            subtitle="Send invitations to join your workspace"
            onOpenChange={() => {}}
          />
        }
        content={
          <LayoutContent>
            <Text type="body" color="secondary">
              Dialog body content goes here.
            </Text>
          </LayoutContent>
        }
      />
    </Dialog>
  );
}

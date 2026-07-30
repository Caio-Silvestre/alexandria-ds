// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Layout, LayoutContent} from '@pharos-ds/core';
import {Text} from '@pharos-ds/core';

export default function Page() {
  return (
    <Layout
      content={
        <LayoutContent>
          <Text type="large">New Page</Text>
        </LayoutContent>
      }
    />
  );
}

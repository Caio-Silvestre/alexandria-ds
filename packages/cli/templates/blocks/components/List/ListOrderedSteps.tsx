// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {List, ListItem} from '@pharos-ds/core/List';

export default function ListOrderedSteps() {
  return (
    <List listStyle="decimal">
      <ListItem
        label="Install the package"
        description="npm install @pharos-ds/core"
      />
      <ListItem
        label="Import components"
        description="import { List } from '@pharos-ds/core'"
      />
      <ListItem
        label="Start building"
        description="Use components in your app"
      />
    </List>
  );
}

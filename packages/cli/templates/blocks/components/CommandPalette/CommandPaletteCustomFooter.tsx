// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {useMemo} from 'react';
import {
  CommandPalette,
  CommandPaletteFooter,
} from '@pharos-ds/core/CommandPalette';
import {Text} from '@pharos-ds/core/Text';
import {createStaticSource} from '@pharos-ds/core/Typeahead';

export default function CommandPaletteCustomFooter() {
  const source = useMemo(
    () =>
      createStaticSource([
        {id: 'home', label: 'Home'},
        {id: 'settings', label: 'Settings'},
      ]),
    [],
  );

  return (
    <CommandPalette
      isOpen
      isInline
      onOpenChange={() => {}}
      searchSource={source}
      footer={
        <CommandPaletteFooter>
          <Text type="supporting">Pro tip: use ⌘K to open anywhere</Text>
        </CommandPaletteFooter>
      }
    />
  );
}

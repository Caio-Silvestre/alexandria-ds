// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {useMemo} from 'react';
import {CommandPalette} from '@pharos-ds/core/CommandPalette';
import {Text} from '@pharos-ds/core/Text';
import {createStaticSource} from '@pharos-ds/core/Typeahead';

export default function CommandPaletteEmptyBasic() {
  const emptySource = useMemo(() => createStaticSource([]), []);

  return (
    <CommandPalette
      isOpen
      isInline
      onOpenChange={() => {}}
      searchSource={emptySource}
      emptyBootstrapText={
        <Text type="supporting" color="secondary">
          No commands available
        </Text>
      }
    />
  );
}

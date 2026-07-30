// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {ButtonGroup} from '@pharos-ds/core/ButtonGroup';
import {Button} from '@pharos-ds/core/Button';

export default function ButtonGroupBasic() {
  return (
    <ButtonGroup label="Text editing actions">
      <Button label="Copy" />
      <Button label="Cut" />
      <Button label="Paste" />
    </ButtonGroup>
  );
}

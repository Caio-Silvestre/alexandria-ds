// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Link} from '@pharos-ds/core/Link';
import {Text} from '@pharos-ds/core/Text';

export default function LinkInlineLink() {
  return (
    <Text type="body">
      Read the <Link href="#">documentation</Link> for more information about
      using Pharos components.
    </Text>
  );
}

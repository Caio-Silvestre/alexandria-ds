// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Link} from '@pharos-ds/core/Link';
import {VStack} from '@pharos-ds/core/Layout';

export default function LinkExternalLinks() {
  return (
    <VStack gap={2}>
      <Link href="https://github.com" isExternalLink isStandalone>
        GitHub
      </Link>
      <Link href="https://developer.mozilla.org" isExternalLink isStandalone>
        MDN Web Docs
      </Link>
      <Link href="https://react.dev" isExternalLink hasUnderline isStandalone>
        React Documentation
      </Link>
    </VStack>
  );
}

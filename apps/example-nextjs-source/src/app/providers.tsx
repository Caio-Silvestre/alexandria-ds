// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import Link from 'next/link';
import {Theme} from '@pharos-ds/core/theme';
import {LinkProvider} from '@pharos-ds/core/Link';
import {neutralTheme} from '@pharos-ds/theme-neutral';

export function Providers({children}: {children: React.ReactNode}) {
  return (
    <Theme theme={neutralTheme}>
      <LinkProvider component={Link}>{children}</LinkProvider>
    </Theme>
  );
}

// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {TopNav, TopNavHeading} from '@pharos-ds/core/TopNav';
import {NavIcon} from '@pharos-ds/core/NavIcon';
import {Icon} from '@pharos-ds/core/Icon';

export default function TopNavHeadingBasic() {
  return (
    <TopNav
      label="Product navigation"
      heading={
        <TopNavHeading
          heading="Acme Platform"
          logo={<NavIcon icon={<Icon icon="viewColumns" />} />}
          headingHref="/"
        />
      }
    />
  );
}

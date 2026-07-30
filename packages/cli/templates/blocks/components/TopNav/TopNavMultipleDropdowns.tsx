// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {
  TopNav,
  TopNavHeading,
  TopNavItem,
  TopNavMenu,
} from '@pharos-ds/core/TopNav';
import {NavIcon} from '@pharos-ds/core/NavIcon';
import {Icon} from '@pharos-ds/core/Icon';
import {
  CubeIcon,
  ChartBarIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';

export default function TopNavMultipleDropdowns() {
  return (
    <TopNav
      label="Main navigation"
      heading={
        <TopNavHeading
          heading="My App"
          logo={<NavIcon icon={<Icon icon={CubeIcon} size="sm" />} />}
          href="#"
        />
      }
      startContent={
        <>
          <TopNavMenu
            label="Products"
            items={[
              {
                title: 'Analytics',
                description: 'Track behavior',
                icon: <ChartBarIcon />,
                href: '#',
              },
              {
                title: 'Security',
                description: 'Enterprise protection',
                icon: <ShieldCheckIcon />,
                href: '#',
              },
            ]}
          />
          <TopNavMenu
            label="Resources"
            items={[
              {title: 'Documentation', href: '#'},
              {title: 'API Reference', href: '#'},
              {title: 'Community Forum', href: '#'},
            ]}
          />
          <TopNavItem label="Pricing" href="#" />
        </>
      }
    />
  );
}

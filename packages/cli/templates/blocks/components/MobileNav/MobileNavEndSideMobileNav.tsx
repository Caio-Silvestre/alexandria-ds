// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {useState} from 'react';
import {MobileNav} from '@pharos-ds/core/MobileNav';
import {SideNavSection, SideNavItem} from '@pharos-ds/core/SideNav';
import {Button} from '@pharos-ds/core/Button';
import {Cog6ToothIcon, UsersIcon} from '@heroicons/react/24/outline';

export default function MobileNavEndSideMobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button label="Open from Right" onClick={() => setIsOpen(true)} />
      <MobileNav
        isOpen={isOpen}
        onOpenChange={open => setIsOpen(open)}
        header="Settings"
        side="end">
        <SideNavSection title="Settings">
          <SideNavItem label="General" icon={Cog6ToothIcon} href="/settings" />
          <SideNavItem label="Team" icon={UsersIcon} href="/team" />
        </SideNavSection>
      </MobileNav>
    </>
  );
}

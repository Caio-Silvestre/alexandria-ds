// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {useState} from 'react';
import {Popover} from '@pharos-ds/core/Popover';
import {Button} from '@pharos-ds/core/Button';
import {VStack} from '@pharos-ds/core/Layout';
import {Heading} from '@pharos-ds/core/Text';
import {Switch} from '@pharos-ds/core/Switch';
import {Divider} from '@pharos-ds/core/Divider';
export default function PopoverSettingsPanel() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [sounds, setSounds] = useState(true);

  return (
    <Popover
      placement="below"
      label="Settings"
      width={280}
      content={
        <VStack gap={3}>
          <Heading level={4}>Settings</Heading>
          <Divider />
          <Switch
            label="Notifications"
            description="Receive push notifications"
            value={notifications}
            onChange={setNotifications}
          />
          <Switch
            label="Dark mode"
            description="Use dark color theme"
            value={darkMode}
            onChange={setDarkMode}
          />
          <Switch
            label="Sounds"
            description="Play sounds for actions"
            value={sounds}
            onChange={setSounds}
          />
        </VStack>
      }>
      <Button label="Settings">Settings</Button>
    </Popover>
  );
}

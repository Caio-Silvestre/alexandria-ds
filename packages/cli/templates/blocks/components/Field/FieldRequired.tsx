// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {useState} from 'react';
import {TextInput} from '@pharos-ds/core/TextInput';
import {VStack} from '@pharos-ds/core/Layout';
import {Center} from '@pharos-ds/core/Center';

export default function FieldRequired() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  return (
    <Center>
      <VStack gap={4}>
        <TextInput
          label="Username"
          isRequired
          value={username}
          onChange={setUsername}
          placeholder="Enter your username"
        />
        <TextInput
          label="Backup email"
          isOptional
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
        />
      </VStack>
    </Center>
  );
}

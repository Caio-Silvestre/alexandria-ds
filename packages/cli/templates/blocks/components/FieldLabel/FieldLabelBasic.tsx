// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {FieldLabel} from '@pharos-ds/core/Field';
import {VStack} from '@pharos-ds/core/Layout';

export default function FieldLabelBasic() {
  return (
    <VStack gap={4}>
      <FieldLabel label="Email address" inputID="email-input" isRequired />
      <FieldLabel
        label="Phone number"
        inputID="phone-input"
        isOptional
        description="Include country code for international numbers"
      />
    </VStack>
  );
}

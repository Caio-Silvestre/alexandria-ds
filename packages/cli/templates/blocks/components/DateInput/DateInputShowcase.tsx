// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {useState} from 'react';
import {DateInput} from '@pharos-ds/core/DateInput';
import {Stack} from '@pharos-ds/core/Layout';

type DateString =
  `${number}${number}${number}${number}-${number}${number}-${number}${number}`;

export default function DateInputShowcase() {
  const [date, setDate] = useState<DateString | undefined>(undefined);

  return (
    <Stack direction="vertical" width="100%" style={{maxWidth: 400}}>
      <DateInput
        label="Start date"
        placeholder="Select a date"
        value={date}
        onChange={setDate}
        hasClear
      />
    </Stack>
  );
}

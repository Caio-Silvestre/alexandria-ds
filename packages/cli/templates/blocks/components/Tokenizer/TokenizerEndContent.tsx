// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {useState} from 'react';
import {Tokenizer} from '@pharos-ds/core/Tokenizer';
import {Button} from '@pharos-ds/core/Button';
import {Stack} from '@pharos-ds/core/Layout';
import {Text} from '@pharos-ds/core/Text';
import type {SearchableItem, SearchSource} from '@pharos-ds/core/Typeahead';

const users: SearchableItem[] = [
  {id: '1', label: 'Alice Johnson'},
  {id: '2', label: 'Bob Smith'},
  {id: '3', label: 'Charlie Brown'},
  {id: '4', label: 'Diana Prince'},
  {id: '5', label: 'Eve Williams'},
  {id: '6', label: 'Frank Miller'},
];

const userSource: SearchSource = {
  search: (query: string) =>
    users.filter(u => u.label.toLowerCase().includes(query.toLowerCase())),
  bootstrap: () => users,
};

export default function TokenizerEndContent() {
  const [value, setValue] = useState<SearchableItem[]>([users[0], users[2]]);

  return (
    <Stack direction="vertical" gap={2}>
      <Text type="supporting" color="secondary">
        Action button in the end slot
      </Text>
      <Tokenizer
        label="Team Members"
        placeholder="Search people..."
        searchSource={userSource}
        value={value}
        onChange={items => setValue(items)}
        endContent={<Button label="Apply" variant="primary" size="sm" />}
        style={{width: 400}}
      />
    </Stack>
  );
}

// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {useState} from 'react';
import {Popover} from '@pharos-ds/core/Popover';
import {Button} from '@pharos-ds/core/Button';
import {VStack, HStack} from '@pharos-ds/core/Layout';
import {Heading} from '@pharos-ds/core/Text';
import {CheckboxInput} from '@pharos-ds/core/CheckboxInput';
import {Divider} from '@pharos-ds/core/Divider';
export default function PopoverFilterPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({
    active: true,
    archived: false,
    drafts: true,
    shared: false,
  });

  const toggle = (key: keyof typeof filters) =>
    setFilters(prev => ({...prev, [key]: !prev[key]}));

  return (
    <Popover
      placement="below"
      label="Filter"
      width={240}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      content={
        <VStack gap={3}>
          <Heading level={4}>Filter by status</Heading>
          <Divider />
          <CheckboxInput
            label="Active"
            value={filters.active}
            onChange={() => toggle('active')}
          />
          <CheckboxInput
            label="Archived"
            value={filters.archived}
            onChange={() => toggle('archived')}
          />
          <CheckboxInput
            label="Drafts"
            value={filters.drafts}
            onChange={() => toggle('drafts')}
          />
          <CheckboxInput
            label="Shared with me"
            value={filters.shared}
            onChange={() => toggle('shared')}
          />
          <Divider />
          <HStack gap={2} hAlign="end">
            <Button
              label="Apply"
              variant="primary"
              onClick={() => setIsOpen(false)}>
              Apply
            </Button>
            <Button
              label="Reset"
              variant="ghost"
              onClick={() =>
                setFilters({
                  active: true,
                  archived: false,
                  drafts: true,
                  shared: false,
                })
              }>
              Reset
            </Button>
          </HStack>
        </VStack>
      }>
      <Button label="Filter">Filter</Button>
    </Popover>
  );
}

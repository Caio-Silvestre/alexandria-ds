// Copyright (c) Meta Platforms, Inc. and affiliates.

import {Heading} from '@pharos-ds/core/Text';
import {VStack} from '@pharos-ds/core/Layout';
import {Section} from '@pharos-ds/core/Section';
import {BestPracticesBlock} from '../docs/BestPracticesBlock';
import type {BestPractice} from '../../generated/componentRegistry';

interface BestPracticesProps {
  practices: BestPractice[];
}

export function BestPractices({practices}: BestPracticesProps) {
  if (practices.length === 0) {
    return null;
  }

  return (
    <Section>
      <VStack gap={4}>
        <Heading level={2} type="display-3">
          Best practices
        </Heading>
        <BestPracticesBlock items={practices} />
      </VStack>
    </Section>
  );
}

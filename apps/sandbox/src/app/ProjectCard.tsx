// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import Link from 'next/link';
import * as stylex from '@stylexjs/stylex';
import {Heading, Text} from '@pharos-ds/core/Text';
import {Card} from '@pharos-ds/core/Card';
import {VStack} from '@pharos-ds/core/Stack';
import {shadowVars} from '@pharos-ds/core/theme/tokens.stylex';
import type {SandboxPage} from './sandboxPages';

const styles = stylex.create({
  link: {
    textDecoration: 'none',
    color: 'inherit',
    display: 'flex',
  },
  cardStyles: {
    width: '100%',
    cursor: 'pointer',
    boxShadow: {
      default: 'none',
      ':hover': shadowVars['--shadow-med'],
    },
  },
});

export function ProjectCard({page}: {page: SandboxPage}) {
  return (
    <Link href={page.href} {...stylex.props(styles.link)}>
      <Card xstyle={styles.cardStyles}>
        <VStack gap={1}>
          <Heading level={3} maxLines={1}>
            {page.name}
          </Heading>
          <Text type="body" size="sm" color="secondary" maxLines={2}>
            {page.description}
          </Text>
        </VStack>
      </Card>
    </Link>
  );
}

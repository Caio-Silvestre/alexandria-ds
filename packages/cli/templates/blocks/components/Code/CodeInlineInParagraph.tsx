// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Code} from '@pharos-ds/core/CodeBlock';
import {Text} from '@pharos-ds/core/Text';

export default function CodeInlineInParagraph() {
  return (
    <Text type="body" style={{maxWidth: 400}}>Use <Code>useState</Code>for local state and{' '}
      <Code>useEffect</Code>for side effects. If you need shared state
            across components, consider <Code>useContext</Code>or a state
            management library.
          </Text>
  );
}

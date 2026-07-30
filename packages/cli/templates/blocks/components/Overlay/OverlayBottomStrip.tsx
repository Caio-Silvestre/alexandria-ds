// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {Overlay} from '@pharos-ds/core/Overlay';
import {AspectRatio} from '@pharos-ds/core/AspectRatio';
import {Badge} from '@pharos-ds/core/Badge';
import {VStack} from '@pharos-ds/core/Layout';
import {Text} from '@pharos-ds/core/Text';

export default function OverlayBottomStrip() {
  return (
    <Overlay
      position="bottom"
      align="start"
      content={
        <VStack gap={1}>
          <Badge label="New" variant="green" />
          <Text type="body" weight="bold" color="inherit">
            Weekly product highlights
          </Text>
          <Text type="supporting" color="inherit">
            12 updates across templates and tokens
          </Text>
        </VStack>
      }>
      <AspectRatio
        ratio={16 / 9}
        style={{
          width: 420,
          maxWidth: '100%',
          borderRadius: 12,
          overflow: 'clip',
        }}>
        <img
          src="https://pharos-ds.vercel.app/assets/illustrative-horizontal-1.png"
          alt="Product highlight preview"
          style={{width: '100%', height: '100%', objectFit: 'cover'}}
        />
      </AspectRatio>
    </Overlay>
  );
}

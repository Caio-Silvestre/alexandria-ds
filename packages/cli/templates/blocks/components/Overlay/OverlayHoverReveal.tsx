// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import type {CSSProperties} from 'react';
import {Overlay} from '@pharos-ds/core/Overlay';
import {AspectRatio} from '@pharos-ds/core/AspectRatio';
import {Button} from '@pharos-ds/core/Button';

const frame: CSSProperties = {
  width: 420,
  maxWidth: '100%',
  borderRadius: 12,
  overflow: 'clip',
};

const image: CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

export default function OverlayHoverReveal() {
  return (
    <Overlay
      showOn="hover"
      align="center"
      content={<Button label="Quick view" variant="secondary" size="sm" />}>
      <AspectRatio ratio={16 / 9} style={frame}>
        <img
          src="https://pharos-ds.vercel.app/assets/light-working-horizontal-1.png"
          alt="Workspace preview"
          style={image}
        />
      </AspectRatio>
    </Overlay>
  );
}

// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {AspectRatio} from '@pharos-ds/core/AspectRatio';
import {Center} from '@pharos-ds/core/Center';

export default function AspectRatioCircleImage() {
  return (
    <Center width={300}>
      <AspectRatio ratio={1} shape="ellipse" fit="cover">
        <img
          src="https://pharos-ds.vercel.app/assets/light-home-square-1.png"
          alt="Circular image"
        />
      </AspectRatio>
    </Center>
  );
}

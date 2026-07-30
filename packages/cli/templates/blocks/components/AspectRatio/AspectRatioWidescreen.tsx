// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {AspectRatio} from '@pharos-ds/core/AspectRatio';
import {Center} from '@pharos-ds/core/Center';

export default function AspectRatioWidescreen() {
  return (
    <Center width={600}>
      <AspectRatio ratio={16 / 9} fit="cover">
        <img
          src="https://pharos-ds.vercel.app/assets/light-scene-horizontal-1.png"
          alt="16:9 widescreen"
        />
      </AspectRatio>
    </Center>
  );
}

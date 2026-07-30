// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {AspectRatio} from '@pharos-ds/core/AspectRatio';
import {Center} from '@pharos-ds/core/Center';

export default function AspectRatioSquareImage() {
  return (
    <Center width={300}>
      <AspectRatio ratio={1} fit="cover">
        <img
          src="https://pharos-ds.vercel.app/assets/light-home-square-1.png"
          alt="1:1 square"
        />
      </AspectRatio>
    </Center>
  );
}

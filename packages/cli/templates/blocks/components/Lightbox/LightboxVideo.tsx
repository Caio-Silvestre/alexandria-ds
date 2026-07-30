// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {useState} from 'react';
import {Lightbox} from '@pharos-ds/core/Lightbox';
import {Button} from '@pharos-ds/core/Button';

export default function LightboxVideo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button label="Play video" onClick={() => setIsOpen(true)} />
      <Lightbox
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        media={{
          src: 'https://pharos-ds.vercel.app/assets/?set=pharos&name=Nature-1&density=1',
          alt: 'Flower blooming in time-lapse',
          type: 'video',
          caption: 'A flower blooming in time-lapse',
        }}
      />
    </>
  );
}

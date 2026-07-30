// Copyright (c) Meta Platforms, Inc. and affiliates.

'use client';

import {useLightbox} from '@pharos-ds/core/Lightbox';
import {Grid} from '@pharos-ds/core/Grid';
import {Thumbnail} from '@pharos-ds/core/Thumbnail';

const PHOTOS = [
  {
    src: 'https://pharos-ds.vercel.app/assets/Neutral-Backpack.png',
    alt: 'Backpack',
    caption: 'A backpack displayed on a neutral background.',
  },
  {
    src: 'https://pharos-ds.vercel.app/assets/building.png',
    alt: 'Modern building',
    caption: 'A modern building with a contemporary architectural design.',
  },
  {
    src: 'https://pharos-ds.vercel.app/assets/light-scene-horizontal-1.png',
    alt: 'Coastal shoreline with ocean waves',
    caption:
      'A scenic coastline with waves rolling onto a sandy beach beneath a clear sky.',
  },
  {
    src: 'https://pharos-ds.vercel.app/assets/illustrative-vertical-1.png',
    alt: 'Illustrated lakeside landscape at sunset',
    caption:
      'A stylized landscape illustration featuring pink clouds reflected over a calm lake at sunset.',
  },
];

export default function LightboxGallery() {
  const lightbox = useLightbox({media: PHOTOS});

  return (
    <>
      <Grid columns={2} gap={2} style={{width: 136}}>
        {PHOTOS.map((photo, i) => (
          <Thumbnail
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            label={photo.alt}
            onClick={() => lightbox.open(i)}
          />
        ))}
      </Grid>
      {lightbox.element}
    </>
  );
}

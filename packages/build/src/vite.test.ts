// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file vite.test.ts
 * @description Verifies CSS layer-order injection in the XDS Vite plugin.
 *   The library layer name is configurable (default `pharos-base`); the
 *   theme layer name is fixed at `pharos-theme`.
 */

import {describe, it, expect} from 'vitest';
import {pharosStylex} from './vite';

/** Pull the injected `@layer ...;` order statement out of the plugin set. */
function getLayerOrder(plugins: ReturnType<typeof pharosStylex>): string {
  const layerPlugin = plugins.find(p => p.name === 'pharos-css-layer-order');
  expect(
    layerPlugin,
    'pharos-css-layer-order plugin should exist',
  ).toBeTruthy();
  const transform = (layerPlugin as any).transformIndexHtml;
  const tags =
    typeof transform === 'function' ? transform() : transform.handler();
  const styleTag = tags.find((t: any) => t.tag === 'style');
  expect(styleTag, 'a <style> tag should be injected').toBeTruthy();
  return styleTag.children as string;
}

describe('pharosStylex layer order (modern API)', () => {
  it('uses the pharos-* layer names (theme layer is pharos-theme)', () => {
    const order = getLayerOrder(pharosStylex());
    expect(order).toBe('@layer reset, pharos-base, pharos-theme, product;');
  });

  it('honors configured library and product layer names', () => {
    const order = getLayerOrder(
      pharosStylex({layers: {library: 'custom-base', product: 'app'}}),
    );
    // The theme layer stays pharos-theme regardless of other layer config.
    expect(order).toBe('@layer reset, custom-base, pharos-theme, app;');
  });
});

describe('pharosStylex layer order (legacy API)', () => {
  it('uses the pharos-* layer names (theme layer is pharos-theme)', () => {
    const order = getLayerOrder(pharosStylex({stylexOptions: {}}));
    expect(order).toBe('@layer reset, pharos-base, pharos-theme, product;');
  });
});

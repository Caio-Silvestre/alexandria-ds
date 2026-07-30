// Copyright (c) Meta Platforms, Inc. and affiliates.

import {describe, it, expect} from 'vitest';
import {
  NAMESPACE,
  classPrefix,
  dataAttrNamespace,
  cssVarNamespace,
  stableClassName,
  dataAttr,
  cssVar,
} from './naming';

describe('naming constants', () => {
  it('exposes the namespace prefix', () => {
    expect(NAMESPACE).toBe('pharos');
  });

  it('derives per-surface prefixes from the namespace', () => {
    expect(classPrefix).toBe('pharos');
    expect(dataAttrNamespace).toBe('pharos');
    expect(cssVarNamespace).toBe('pharos');
  });
});

describe('stableClassName', () => {
  it('builds namespace class tokens', () => {
    expect(stableClassName('button')).toBe('pharos-button');
    expect(stableClassName('card')).toBe('pharos-card');
  });
});

describe('dataAttr', () => {
  it('builds namespace data attribute names', () => {
    expect(dataAttr('theme')).toBe('data-pharos-theme');
    expect(dataAttr('media')).toBe('data-pharos-media');
  });
});

describe('cssVar', () => {
  it('builds namespace custom property names', () => {
    expect(cssVar('card-padding')).toBe('--pharos-card-padding');
  });
});

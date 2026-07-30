// Copyright (c) Meta Platforms, Inc. and affiliates.

import {describe, it, expect} from 'vitest';
import {themeDataAttributes, themeProps} from './themeProps';

describe('themeProps', () => {
  it('returns base class for component', () => {
    expect(themeProps('card').className).toBe('pharos-card');
  });

  it('adds variant classes', () => {
    expect(
      themeProps('button', {variant: 'secondary', size: 'sm'}).className,
    ).toBe('pharos-button secondary sm');
  });

  it('prefixes numeric values with prop name', () => {
    expect(themeProps('heading', {level: 1}).className).toBe(
      'pharos-heading level-1',
    );
  });

  it('skips null and undefined props', () => {
    expect(
      themeProps('button', {variant: 'primary', size: undefined}).className,
    ).toBe('pharos-button primary');
  });

  it('works with no props', () => {
    expect(themeProps('divider').className).toBe('pharos-divider');
  });

  it('handles string numeric values', () => {
    expect(themeProps('heading', {level: '3'}).className).toBe(
      'pharos-heading level-3',
    );
  });

  it('reflects visual props as data attributes', () => {
    expect(
      themeDataAttributes({variant: 'secondary', size: 'sm', level: 2}),
    ).toEqual({
      'data-variant': 'secondary',
      'data-size': 'sm',
      'data-level': '2',
    });
  });

  it('kebab-cases data attribute names', () => {
    expect(themeDataAttributes({listStyle: 'ordered'})).toEqual({
      'data-list-style': 'ordered',
    });
  });

  it('omits nullish data attributes', () => {
    expect(themeDataAttributes({variant: 'primary', size: null})).toEqual({
      'data-variant': 'primary',
    });
  });

  it('returns class and data attributes together', () => {
    expect(themeProps('button', {variant: 'primary', size: 'sm'})).toEqual({
      className: 'pharos-button primary sm',
      'data-variant': 'primary',
      'data-size': 'sm',
    });
  });
});

// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file naming.ts
 * @input None (pure constants/helpers)
 * @output Centralized namespace-prefix constants and helpers for all
 *   externally-observable name surfaces: CSS classes, data attributes,
 *   CSS custom properties, and CSS layer names.
 * @position Single source of truth consumed by the runtime (components,
 *   theme generation) AND by build/CLI tooling (build-theme.mjs, discovery)
 *   via the `@pharos-ds/core/naming` subpath export.
 *
 * ## Why this module exists
 *
 * The namespace prefix `pharos` is part of several externally-observable
 * contracts (`.pharos-button` classes, `data-pharos-theme` attributes,
 * `--pharos-card-padding` custom properties). Historically each of these was
 * hardcoded independently across the runtime, the theme build pipeline, and
 * discovery tooling, kept in sync only by `<!-- SYNC: ... -->` comments.
 * Centralizing the prefix here means it lives in ONE place instead of
 * hundreds of literals.
 *
 * ## Surfaces
 *
 * - CSS classes: `.pharos-button` via {@link classPrefix} / {@link stableClassName}.
 * - data attributes: `data-pharos-*` via {@link dataAttrNamespace} / {@link dataAttr}.
 * - CSS custom properties: `--pharos-*` via {@link cssVarNamespace} / {@link cssVar}.
 * - CSS layers: `pharos-base` / `pharos-theme`.
 *
 * SYNC: packages/core/src/utils/themeProps.ts (consumes classPrefix)
 * SYNC: packages/core/src/utils/parseStyleKey.ts
 * SYNC: packages/cli/src/commands/build-theme.mjs (imports @pharos-ds/core/naming)
 */

/**
 * The DOM/CSS namespace prefix for all externally-observable surfaces
 * (classes, theme/media data attributes, CSS custom properties).
 */
export const NAMESPACE = 'pharos';

/**
 * Class-name prefix for stable component classes, WITHOUT the trailing dash.
 *
 * Use {@link stableClassName} to build a full class token rather than
 * concatenating this directly.
 */
export const classPrefix = NAMESPACE;

/**
 * data-attribute namespace segment (the part between `data-` and the rest).
 * e.g. `dataAttrNamespace` = 'pharos' -> `data-pharos-theme`.
 */
export const dataAttrNamespace = NAMESPACE;

/**
 * CSS custom-property namespace segment.
 * e.g. `--pharos-card-padding`.
 */
export const cssVarNamespace = NAMESPACE;

/**
 * Build a stable component class token, e.g. `stableClassName('button')`
 * -> `'pharos-button'`.
 */
export function stableClassName(component: string): string {
  return `${classPrefix}-${component}`;
}

/**
 * Build a `data-*` attribute name in the current namespace, e.g.
 * `dataAttr('theme')` -> `'data-pharos-theme'`.
 */
export function dataAttr(name: string): `data-${string}` {
  return `data-${dataAttrNamespace}-${name}`;
}

/**
 * Build a CSS custom-property name in the current namespace, e.g.
 * `cssVar('card-padding')` -> `'--pharos-card-padding'`.
 */
export function cssVar(name: string): string {
  return `--${cssVarNamespace}-${name}`;
}


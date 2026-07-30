// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file highlightStyles.ts
 * @input Syntax token defaults from domainTokens
 * @output Injects ::highlight() CSS rules + fallback token values into the document head
 * @position Shared utility; consumed by CodeBlock and CodeEditor
 *
 * SYNC: When modified, update:
 * - /packages/core/src/theme/domainTokens/syntaxTokens.ts (syntax color token names/defaults)
 */

import {syntaxTokenDefaults} from '../theme';

/**
 * Build the fallback CSS custom properties from the syntax token defaults.
 * These provide colors when no theme explicitly sets --color-syntax-* tokens.
 * Themes override these via higher-specificity [data-pharos-theme] selectors.
 */
const FALLBACK_TOKENS = `:root {\n${Object.entries(syntaxTokenDefaults)
  .map(([name, value]) => `  ${name}: ${value};`)
  .join('\n')}\n}`;

/**
 * Scoped ::highlight() rules — attached to the `code` element so the
 * browser only checks highlight ranges within code content, not the
 * entire document tree. Using `code::highlight()` instead of bare
 * `::highlight()` avoids expensive style recalc on every element.
 */
const HIGHLIGHT_STYLES = `
${FALLBACK_TOKENS}

.pharos-codeblock code::highlight(pharos-keyword),
.pharos-codeeditor code::highlight(pharos-keyword) { color: var(--color-syntax-keyword); }
.pharos-codeblock code::highlight(pharos-string),
.pharos-codeeditor code::highlight(pharos-string) { color: var(--color-syntax-string); }
.pharos-codeblock code::highlight(pharos-comment),
.pharos-codeeditor code::highlight(pharos-comment) { color: var(--color-syntax-comment); }
.pharos-codeblock code::highlight(pharos-number),
.pharos-codeeditor code::highlight(pharos-number) { color: var(--color-syntax-number); }
.pharos-codeblock code::highlight(pharos-function),
.pharos-codeeditor code::highlight(pharos-function) { color: var(--color-syntax-function); }
.pharos-codeblock code::highlight(pharos-type),
.pharos-codeeditor code::highlight(pharos-type) { color: var(--color-syntax-type); }
.pharos-codeblock code::highlight(pharos-tag),
.pharos-codeeditor code::highlight(pharos-tag) { color: var(--color-syntax-tag); }
.pharos-codeblock code::highlight(pharos-attribute),
.pharos-codeeditor code::highlight(pharos-attribute) { color: var(--color-syntax-attribute); }
.pharos-codeblock code::highlight(pharos-property),
.pharos-codeeditor code::highlight(pharos-property) { color: var(--color-syntax-property); }
.pharos-codeblock code::highlight(pharos-operator),
.pharos-codeeditor code::highlight(pharos-operator) { color: var(--color-syntax-operator); }
.pharos-codeblock code::highlight(pharos-constant),
.pharos-codeeditor code::highlight(pharos-constant) { color: var(--color-syntax-constant); }
.pharos-codeblock code::highlight(pharos-punctuation),
.pharos-codeeditor code::highlight(pharos-punctuation) { color: var(--color-syntax-punctuation); }
.pharos-codeblock code::highlight(pharos-variable),
.pharos-codeeditor code::highlight(pharos-variable) { color: var(--color-syntax-variable); }

/* Span-based fallback classes — used when highlightMode='spans' or
   when the CSS Custom Highlight API is not available. */
.pharos-token-keyword         { color: var(--color-syntax-keyword); }
.pharos-token-string           { color: var(--color-syntax-string); }
.pharos-token-comment         { color: var(--color-syntax-comment); }
.pharos-token-number           { color: var(--color-syntax-number); }
.pharos-token-function       { color: var(--color-syntax-function); }
.pharos-token-type               { color: var(--color-syntax-type); }
.pharos-token-tag                 { color: var(--color-syntax-tag); }
.pharos-token-attribute     { color: var(--color-syntax-attribute); }
.pharos-token-property       { color: var(--color-syntax-property); }
.pharos-token-operator       { color: var(--color-syntax-operator); }
.pharos-token-constant       { color: var(--color-syntax-constant); }
.pharos-token-punctuation { color: var(--color-syntax-punctuation); }
.pharos-token-variable       { color: var(--color-syntax-variable); }
`;

let inserted = false;

/**
 * Injects the ::highlight() CSS rules into the document <head>.
 * Safe to call multiple times — only injects once.
 */
export function ensureHighlightStyles(): void {
  if (inserted) {
    return;
  }
  if (typeof document === 'undefined') {
    return;
  }

  const style = document.createElement('style');
  style.setAttribute('data-pharos-highlight-styles', '');
  style.textContent = HIGHLIGHT_STYLES;
  document.head.appendChild(style);
  inserted = true;
}

/**
 * Token types that map to highlight names.
 * Used to create CSS.highlights entries with the `pharos-` prefix.
 */
export const TOKEN_TYPES = [
  'keyword',
  'string',
  'comment',
  'number',
  'function',
  'type',
  'tag',
  'attribute',
  'property',
  'operator',
  'constant',
  'punctuation',
  'variable',
] as const;

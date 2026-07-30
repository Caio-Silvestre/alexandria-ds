// Copyright (c) Meta Platforms, Inc. and affiliates.

/**
 * @file i18n-key-format.js
 * @description Enforce catalog-key naming conventions for
 * `t('@pharos.<path>')` calls and `i18nKey: '@pharos.<path>'` config
 * fields. Complements `no-hardcoded-i18n-string`: the sibling rule
 * enforces WHERE strings go (through the catalog), and this rule
 * enforces WHAT the catalog keys look like.
 *
 * Pharos catalog keys are dot-separated paths under the `@pharos.`
 * namespace, e.g. `@pharos.pagination.next` or
 * `@pharos.powersearch.operator.isAnyOf`. Every path segment must be
 * camelCase — no snake_case, no PascalCase, no kebab-case. camelCase
 * is the ecosystem-dominant convention (React Aria, MUI X, Ant Design,
 * Ark UI all camelCase) and matches JS identifier conventions so the
 * key body can lift straight into a props / config field name.
 *
 * The rule flags:
 *
 *   1. Pharos-namespaced string literal arguments to any `t(...)` /
 *      `translator(...)` / `useTranslator()(...)` call.
 *   2. Pharos-namespaced string literal values assigned to an
 *      `i18nKey` property.
 *
 * Only `@pharos.` keys are checked — third-party namespaces are left
 * to their owners to enforce.
 *
 * Good:
 *   t('@pharos.pagination.next')
 *   t('@pharos.powersearch.operator.isAnyOf')
 *   {key: 'is_any_of', i18nKey: '@pharos.powersearch.operator.isAnyOf'}
 *
 * Bad:
 *   t('@pharos.pagination.NEXT')          // SCREAMING is not camelCase
 *   t('@pharos.power_search.operator')    // snake_case segment
 *   t('@pharos.PowerSearch.operator')     // PascalCase segment
 *   t('@pharos.power-search.operator')    // kebab-case segment
 *   t('pharos.pagination.next')           // missing @ prefix — resolver
 *                                         // looks up '@pharos.<key>'
 *                                         // literally so this misses.
 *   t('@pharos.pagination')               // no leaf key (must be
 *                                         // @pharos.<component>.<key>+)
 */

const PHAROS_KEY_PATTERN = /^@pharos\.[^ ]+$/;

/**
 * A path segment is camelCase when it:
 *   - starts with a lowercase letter
 *   - contains only letters and digits (no `_`, `-`, no whitespace)
 *   - is not entirely uppercase (`URL` is fine as a suffix but `URL` on
 *     its own would fail the lowercase-start check anyway)
 */
const CAMEL_CASE_SEGMENT = /^[a-z][a-zA-Z0-9]*$/;

/**
 * Check if a full pharos catalog key is well-formed.
 * Returns { ok: true } or { ok: false, reason: string }.
 */
function checkKey(key) {
  if (!PHAROS_KEY_PATTERN.test(key)) {
    return {
      ok: false,
      reason:
        'Pharos catalog keys must match `@pharos.<segment>(.<segment>)+` with no whitespace.',
    };
  }
  const segments = key.slice('@pharos.'.length).split('.');
  if (segments.length < 2) {
    return {
      ok: false,
      reason:
        'Pharos catalog keys need at least two segments after `@pharos.` (component + leaf, e.g. `@pharos.pagination.next`).',
    };
  }
  for (const segment of segments) {
    if (!segment) {
      return {ok: false, reason: 'Empty path segment (double dot?).'};
    }
    if (!CAMEL_CASE_SEGMENT.test(segment)) {
      return {
        ok: false,
        reason: `Path segment \`${segment}\` is not camelCase. Use \`camelCase\` — no snake_case, PascalCase, or kebab-case.`,
      };
    }
  }
  return {ok: true};
}

/** Names of translator functions we recognize as call targets. */
const TRANSLATOR_CALL_NAMES = new Set(['t', 'translator', 'translate']);

function isTranslatorCall(node) {
  // Direct: t('@pharos.foo.bar')
  if (node.callee.type === 'Identifier') {
    return TRANSLATOR_CALL_NAMES.has(node.callee.name);
  }
  // Member: some.thing.t('...') — check the final property
  if (
    node.callee.type === 'MemberExpression' &&
    !node.callee.computed &&
    node.callee.property.type === 'Identifier'
  ) {
    return TRANSLATOR_CALL_NAMES.has(node.callee.property.name);
  }
  return false;
}

function getStringArg(node) {
  const first = node.arguments[0];
  if (!first) return null;
  if (first.type === 'Literal' && typeof first.value === 'string') {
    return {value: first.value, node: first};
  }
  return null;
}

const rule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Enforce camelCase path segments for @pharos.* i18n catalog keys',
      category: 'Best Practices',
      recommended: true,
    },
    messages: {
      badKey: 'Malformed pharos catalog key {{key}}. {{reason}}',
    },
    schema: [],
  },
  create(context) {
    function reportIfBad(strValue, node) {
      // Enforce anything that clearly targets the pharos namespace — with
      // or without the `@` prefix. A missing `@` is a real bug (the
      // runtime resolver looks up `@pharos.<key>` literally); silently
      // skipping the check means the string routes through the catalog
      // but never hits a key. Third-party namespaces (`@myapp.*`,
      // `@company.*`) are still their owner's concern; we only recognize
      // pharos.
      const isPharosKey =
        strValue.startsWith('@pharos.') || strValue.startsWith('pharos.');
      if (!isPharosKey) return;
      const result = checkKey(strValue);
      if (result.ok) return;
      context.report({
        node,
        messageId: 'badKey',
        data: {key: JSON.stringify(strValue), reason: result.reason},
      });
    }

    return {
      // 1. t('@pharos.foo.bar') / translator('@pharos.foo.bar')
      CallExpression(node) {
        if (!isTranslatorCall(node)) return;
        const arg = getStringArg(node);
        if (arg === null) return;
        reportIfBad(arg.value, arg.node);
      },

      // 2. Object property `i18nKey: '@pharos.foo.bar'`
      Property(node) {
        if (node.computed || node.shorthand) return;
        const name =
          node.key.type === 'Identifier'
            ? node.key.name
            : node.key.type === 'Literal'
            ? node.key.value
            : null;
        if (name !== 'i18nKey') return;
        if (
          node.value.type !== 'Literal' ||
          typeof node.value.value !== 'string'
        )
          return;
        reportIfBad(node.value.value, node.value);
      },
    };
  },
};

export default rule;

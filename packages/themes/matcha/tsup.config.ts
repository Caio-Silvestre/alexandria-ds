// Copyright (c) Meta Platforms, Inc. and affiliates.

import {defineConfig} from 'tsup';

export default defineConfig({
  entry: ['src/source.ts', 'src/icons.tsx'],
  format: ['cjs', 'esm'],
  dts: false,
  clean: false, // Don't clean — pharos theme build already put theme files in dist/
  external: ['@pharos-ds/core', 'react', 'lucide-react'],
});

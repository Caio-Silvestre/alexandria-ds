// Copyright (c) Meta Platforms, Inc. and affiliates.

import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {pharosStylex} from '@pharos-ds/build/vite';

export default defineConfig({
  plugins: [...pharosStylex(), react()],
  // Templates live outside this app's root (packages/cli/templates).
  server: {fs: {allow: ['../..']}},
});

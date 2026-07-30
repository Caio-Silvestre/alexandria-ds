// Copyright (c) Meta Platforms, Inc. and affiliates.

import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {pharosStylex} from '@pharos-ds/build/vite';

export default defineConfig({
  plugins: [...pharosStylex(), react()],
});

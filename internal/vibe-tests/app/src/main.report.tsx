// Copyright (c) Meta Platforms, Inc. and affiliates.

import React, {Suspense, lazy} from 'react';
import {createRoot} from 'react-dom/client';

/**
 * Report entry point — no StyleX build dependency.
 *
 * Imports pre-compiled CSS from @pharos-ds/core dist and the default theme.
 * Report components use plain CSS classes (report.css) instead of stylex.create.
 *
 * The pharos.css and theme.css paths are resolved by Vite aliases in
 * vite.config.report.ts.
 */
import '@pharos-ds/core/reset.css';
import 'pharos-css';
import 'pharos-theme-css';

const Report = lazy(() =>
  import('./report/Report').then(m => ({default: m.Report})),
);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- root element must exist in index.html
const root = createRoot(document.getElementById('root')!);
root.render(
  <Suspense fallback={<div>Loading report...</div>}>
    <Report />
  </Suspense>,
);

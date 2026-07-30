---
'@pharos-ds/core': patch
---

[fix] Export the `BaseProps` type through the `@pharos-ds/core/BaseProps` subpath. Previously it was only reachable through the package barrel, so the `import type {BaseProps} from '@pharos-ds/core/BaseProps'` specifier that `pharos swizzle` generates failed to resolve (#4091).

@cixzhang

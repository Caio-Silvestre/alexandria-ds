---
'@pharos-ds/cli': patch
---

[fix] `pharos theme build`: component-override keys for multi-word components (TextInput, DateInput, NumberInput, DropdownMenu, SideNav, TopNav, etc.) now match the hyphenated class the component actually renders. The known-component registry used de-hyphenated keys, so overrides authored against them emitted dead selectors (`.pharos-textinput` instead of `.pharos-text-input`) that silently never applied (#4109).

@cixzhang

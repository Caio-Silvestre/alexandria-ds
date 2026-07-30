# Auditoria — Astryx → Alexandria DS

> Inventário do monorepo em `astryx/` (clone de [facebook/astryx](https://github.com/facebook/astryx)).  
> Objetivo desta fase: **regularizar identidade/legal/npm** — sem mudanças estéticas ainda.  
> Data: Jul/2026

---

## Veredito em uma frase

É um monorepo pnpm maduro (core + CLI + themes + apps + CI), fortemente marcado como **Meta / `@astryxdesign` / `astryx`**, e a regularização para publicar como Alexandria é **renomeação em escala** + **NOTICE MIT**, não um rewrite.

---

## Escala do rebrand

| Métrica                                              | Ordem de grandeza                  |
| ---------------------------------------------------- | ---------------------------------- |
| Menções `astryx` / `@astryxdesign` / Meta / facebook | ~15 000 matches em ~3 700 arquivos |
| Headers `Copyright (c) Meta Platforms`               | ~3 500 arquivos                    |
| Pacotes no grupo de publish (changesets `fixed`)     | 10                                 |
| Componentes em `packages/core/src`                   | ~100+ pastas de componente         |

---

## Mapa do monorepo

```
astryx/
├── apps/           # Docsite, Storybook, sandbox, examples (private)
├── packages/       # O que importa para npm
├── internal/       # Tooling não publicado
├── scripts/        # Build, sync, release, CSS, UMD
├── docs/           # Docs internas de charts/release
├── .changeset/     # Versionamento / publish
├── .github/        # CI, owners Meta, release npm
└── (raiz)          # package.json, LICENSE, README, eslint, vitest
```

---

## 1. Pacotes (`packages/`) — o que vai (ou não) ao npm

| Package                         | Diretório                 | Private? | Função                                                           | Ação no rebrand                     |
| ------------------------------- | ------------------------- | -------- | ---------------------------------------------------------------- | ----------------------------------- |
| `@astryxdesign/core`            | `packages/core`           | **Não**  | Biblioteca de componentes, tema, tokens, CSS (`astryx.css`), UMD | Renomear scope + exports CSS/UMD    |
| `@astryxdesign/cli`             | `packages/cli`            | **Não**  | CLI (`bin/astryx`), templates, docs, swizzle, themes, codemods   | Renomear package + bin              |
| `@astryxdesign/build`           | `packages/build`          | **Não**  | Plugins StyleX para source builds                                | Renomear                            |
| `@astryxdesign/theme-neutral`   | `packages/themes/neutral` | **Não**  | Tema default                                                     | Renomear (+ depois tema Alexandria) |
| `@astryxdesign/theme-butter`    | `themes/butter`           | **Não**  | Tema                                                             | Renomear ou podar                   |
| `@astryxdesign/theme-chocolate` | `themes/chocolate`        | **Não**  | Tema                                                             | Renomear ou podar                   |
| `@astryxdesign/theme-matcha`    | `themes/matcha`           | **Não**  | Tema                                                             | Renomear ou podar                   |
| `@astryxdesign/theme-stone`     | `themes/stone`            | **Não**  | Tema                                                             | Renomear ou podar                   |
| `@astryxdesign/theme-gothic`    | `themes/gothic`           | **Não**  | Tema                                                             | Renomear ou podar                   |
| `@astryxdesign/theme-y2k`       | `themes/y2k`              | **Não**  | Tema                                                             | Renomear ou podar                   |
| `@astryxdesign/charts`          | `packages/charts`         | **Sim**  | Charts (canary no README)                                        | Decidir se entra no v1              |
| `@astryxdesign/vega`            | `packages/vega`           | **Sim**  | Vega-Lite wrapper                                                | Provavelmente fora do v1            |
| `@astryxdesign/lab`             | `packages/lab`            | **Sim**  | Experimentais                                                    | Manter interno                      |
| `@astryxdesign/richtext`        | `packages/richtext`       | **Sim**  | Rich text                                                        | Manter interno / decidir            |

**Grupo Changesets (`fixed`)** — sobem versão juntos:

`build`, `cli`, `core`, `theme-butter|chocolate|gothic|matcha|neutral|stone|y2k`

Cada package publicado hoje carrega:

- `author: "Meta Open Source"`
- `homepage` / `repository` / `bugs` → `github.com/facebook/astryx`
- `keywords` com `"astryx"`
- no core: `unpkg`/`jsdelivr` → `./dist/astryx.umd.js`, export `./astryx.css`

---

## 2. Apps (`apps/`) — não publicam no npm

| App                                      | Função                                     | Ação                              |
| ---------------------------------------- | ------------------------------------------ | --------------------------------- |
| `docsite`                                | Site de docs (Next + StyleX)               | Rebrand textos/links; útil depois |
| `storybook`                              | Catálogo de componentes                    | Renomear dependências             |
| `sandbox`                                | Playground visual                          | Renomear                          |
| `template-viewer`                        | Preview dos templates do CLI               | Renomear                          |
| `example-nextjs`                         | Exemplo consumo **dist**                   | Renomear imports                  |
| `example-nextjs-source`                  | Exemplo **source** + `@astryxdesign/build` | Renomear                          |
| `example-nextjs-stylex`                  | Dist + StyleX no app                       | Renomear                          |
| `example-nextjs-tailwind`                | Dist + Tailwind                            | Renomear                          |
| `example-vite` / `example-vite-tailwind` | Exemplos Vite                              | Renomear                          |

> Examples estão **fora** do workspace pnpm (`!apps/example-*`) — templates standalone para a comunidade.

---

## 3. Internal + scripts

| Path                                                      | Função                                                          | Ação                         |
| --------------------------------------------------------- | --------------------------------------------------------------- | ---------------------------- |
| `internal/eslint-plugin-astryx` (`@astryx/eslint-plugin`) | Regras de lint do DS                                            | Renomear pasta/package       |
| `internal/test-utils`                                     | Utils Vitest                                                    | Renomear refs                |
| `internal/vibe-tests`                                     | Eval LLM vs design systems                                      | Opcional; muita marca Astryx |
| `internal/scripts`                                        | Crowdin screenshots etc.                                        | Revisar / podar Meta         |
| `internal/stylex-capabilities`                            | Scan capacidades StyleX                                         | Manter técnico               |
| `scripts/*`                                               | build CSS/UMD, sync exports, changesets, trusted publishing npm | Renomear strings `astryx`    |

---

## 4. Raiz — arquivos de identidade / governança

| Arquivo                              | Serve para                              | Associação Meta/Astryx                 | Ação                           |
| ------------------------------------ | --------------------------------------- | -------------------------------------- | ------------------------------ |
| `package.json`                       | Root private; scripts `@astryxdesign/*` | Nome `astryx`                          | Renomear scripts/filters       |
| `pnpm-workspace.yaml`                | Workspaces + catalog                    | Exclude `@astryxdesign/*`              | Atualizar scope                |
| `LICENSE`                            | MIT                                     | © 2026 Meta Platforms                  | **Manter** + NOTICE Alexandria |
| `README.md`                          | Pitch OSS                               | Banner facebook, atmeta, Meta          | Reescrever                     |
| `CONTRIBUTING.md`                    | Guia contrib                            | Wiki facebook/astryx                   | Reescrever                     |
| `CODE_OF_CONDUCT.md`                 | Conduta                                 | Branding Astryx                        | Adaptar                        |
| `SECURITY.md`                        | Security                                | Bug bounty **Meta**                    | Trocar canal Alexandria        |
| `CLAUDE.md`                          | Instruções AI                           | Convenções Astryx                      | Adaptar                        |
| `.changeset/`                        | Release                                 | Pacotes `@astryxdesign/*`              | Atualizar config               |
| `.github/CODEOWNERS`                 | Reviewers                               | Handles Meta                           | Substituir / remover           |
| `.github/ENGOWNERS` / `DESIGNOWNERS` | Tom do Copilot review                   | Time Meta                              | Remover/adaptar                |
| `.github/workflows/*`                | CI/CD (20 workflows)                    | Release OIDC npm, Pages, Crowdin, vibe | Manter mínimo + rewire         |
| `crowdin.yml`                        | i18n                                    | Pipeline Meta                          | Decidir se mantém              |
| `eslint.config.js`                   | Lint                                    | Plugin astryx                          | Renomear                       |
| `vitest.config.ts`                   | Testes                                  | Refs astryx                            | Atualizar                      |

---

## 5. Superfície pública (o que o consumidor “vê”)

Isto **precisa** mudar antes do primeiro publish Alexandria:

| Superfície           | Exemplos atuais                             | Impacto            |
| -------------------- | ------------------------------------------- | ------------------ |
| Scope npm            | `@astryxdesign/core`                        | Crítico            |
| CSS entry            | `@astryxdesign/core/astryx.css`             | Crítico            |
| Bundle CDN           | `astryx.umd.js`                             | Alto               |
| CLI bin              | `astryx` / `npx @astryxdesign/cli`          | Crítico            |
| Data attributes      | `data-astryx-theme`, `data-astryx-media`, … | Alto (runtime)     |
| Classes / targets    | `astryx-button`, `astryx-theme`, …          | Alto               |
| Env vars             | `ASTRYX_SOURCE`, `ASTRYX_STRICT_LINT`       | Médio              |
| Author / repo fields | Meta Open Source, facebook/astryx           | Crítico (npm page) |

---

## 6. Legal — ponto inegociável

Licença: **MIT** (`LICENSE`).

> MIT exige manter o copyright notice e a permissão **em todas as cópias ou porções substanciais**.

Recomendação:

1. Manter `LICENSE` com o texto MIT e o copyright original da Meta **ou** um `NOTICE` / seção “Third-party / Attribution” clara.
2. Adicionar copyright Alexandria no trabalho derivado.
3. No README: _“Baseado no [Astryx](https://github.com/facebook/astryx) (Meta), licença MIT. Não afiliado à Meta / Astryx.”_
4. **Não** usar logos, banners (`lookaside.facebook.com/...`), nem se apresentar como produto Meta.

Isso cumpre “podemos citar que foi base, mas não nos associar”.

---

## 7. CI / release (o que importa para npm)

Workflows relevantes:

| Workflow                | Função                                  | Para Alexandria                  |
| ----------------------- | --------------------------------------- | -------------------------------- |
| `release.yml`           | Publish npm (OIDC / trusted publishing) | Reconfigurar para org/repo novos |
| `ci.yml` / `lint.yml`   | Build + test + lint                     | Manter                           |
| `deploy.yml` / preview  | Storybook + sandbox GH Pages            | Opcional depois                  |
| `crowdin-*`             | Tradução Meta                           | Provavelmente remover no início  |
| `vibe-screenshots.yml`  | Eval LLM                                | Opcional                         |
| `internal-registry.yml` | Registry interno Meta                   | Remover                          |
| Review signal / owners  | Processo Meta                           | Simplificar                      |

Script: `scripts/npm/setup-trusted-publishing.mjs` — hoje amarrado ao fluxo `@astryxdesign`.

---

## 8. O que **não** é “associação” (pode ficar)

- Stack técnica: React, StyleX, Vitest, pnpm, Changesets, Storybook.
- Arquitetura de componentes, tokens, a11y patterns.
- Convenções de API (úteis; só tirar o nome Astryx dos docs).

---

## 9. Plano de regularização (sem estética)

1. **Decidir identidade**
   - Scope npm (`@alexandria-ds`? `@alexandria`?)
   - Nome do CLI
   - Prefixo CSS / `data-*`
   - Quais packages no v1 (sugestão: `core` + `cli` + `build` + `theme-neutral` → depois `theme-alexandria`)
2. **Renomear packages + workspace** (package.json, imports, changesets, filters pnpm).
3. **Renomear superfície runtime** (CSS, UMD, attrs, classes, bin).
4. **Legal**: LICENSE/NOTICE + disclaimer no README.
5. **Limpar Meta**: CODEOWNERS, SECURITY bounty, banners, links atmeta/facebook, authors.
6. **CI mínima**: build, test, publish no seu npm org.
7. **Smoke**: `pnpm build`, instalar o tarball localmente, validar imports.

---

## 10. Decisões bloqueantes (preciso de você)

Responda estes 4 pontos para eu executar a regularização:

1. **Scope npm** desejado?
2. **Nome do CLI**?
3. **Prefixo** de classes / `data-*` / CSS file?
4. **v1 publica**: só `core` + um theme + `cli` (+ `build`)? Ou todos os themes Astryx renomeados?

---

## 11. Arquivos de referência no repo Alexandria

| Arquivo        | Conteúdo                                   |
| -------------- | ------------------------------------------ |
| `BRANDBOOK.md` | Regras de marca (estética — fase seguinte) |
| `AUDIT.md`     | Este inventário                            |
| `astryx/`      | Clone base (ainda com nome Astryx)         |

---

_Próximo passo após suas decisões: script/PR de rename mecânico + NOTICE, sem tocar em tokens/cores ainda._

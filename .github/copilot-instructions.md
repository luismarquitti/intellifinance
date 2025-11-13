# Instruções para o GitHub Copilot no Projeto IntelliFinance

Este documento define as diretrizes que o GitHub Copilot e outros agentes de IA devem seguir ao gerar ou modificar código neste repositório. O objetivo é manter a consistência, a qualidade e a aderência aos padrões do projeto.

## 1. Princípios Fundamentais

- **Aderência ao TDD (Test-Driven Development):** **SEMPRE escreva testes primeiro.** Antes de implementar qualquer lógica de produção, deve haver um teste correspondente que falhe. Siga o ciclo "Vermelho-Verde-Refatorar". A cobertura de testes para novas funcionalidades deve ser **superior a 80%**.

- **Uso Obrigatório do `yarn`:** Este projeto usa `yarn` como gerenciador de pacotes. **NUNCA use `npm`**. Todos os comandos de instalação, execução de scripts e gerenciamento de dependências devem usar `yarn` (ex: `yarn install`, `yarn add`, `yarn test`).

- **Padrões de Código e Estilo:**

  - Siga rigorosamente os padrões de código existentes no arquivo que você está editando.
  - Use `camelCase` para nomes de variáveis e funções.
  - Use `PascalCase` para nomes de classes e componentes React.
  - Mantenha a consistência com o estilo de importação/exportação (módulos ES) e a formatação geral.

- **Proibição de Operações Git Destrutivas:** **NUNCA execute `git commit`, `git push` ou crie Pull Requests.** Essas ações são estritamente controladas e delegadas ao **Agente Escritor (`05_writer`)** sob aprovação explícita do usuário. Seu papel é gerar código e testes, não gerenciar o versionamento.

## 2. Contexto da Arquitetura

- **Padrão de Job Assíncrono:** Lembre-se do fluxo principal: o `backend` (API) enfileira jobs no Redis (usando BullMQ), e o `worker` os processa.

  - Ao adicionar uma nova tarefa assíncrona, crie o produtor do job no `backend` e o consumidor correspondente no `worker`.
  - Para exemplos, procure por código de produtor BullMQ no `backend` e manipuladores de job no `worker`.

- **Variáveis de Ambiente:** As configurações são por serviço (ex: `backend/.env.example`). Ao adicionar código que depende de novas variáveis, atualize o arquivo `.env.example` correspondente.

- **Banco de Dados e Migrações:** As migrações de esquema do PostgreSQL são gerenciadas no diretório `backend/migrations` e executadas com `yarn db:migrate`.

## 3. Comandos Rápidos de Desenvolvimento

Use estes comandos como referência em documentação ou scripts gerados:

- **Iniciar Infraestrutura:** `docker-compose up -d` (na raiz)
- **Backend:** `cd backend && yarn install && yarn db:migrate && yarn dev`
- **Worker:** `cd worker && yarn install && yarn dev`
- **Frontend:** `cd frontend && yarn install && yarn dev`
- **Testes Unitários:** `yarn test` (dentro do diretório do serviço)
- **Testes E2E (Backend):** `yarn ci:test:e2e` (requer que o servidor NÃO esteja rodando)

## 4. Onde Encontrar Padrões

- **Enfileiramento de Jobs:** Pesquise no `backend` por `BullMQ` para ver como os jobs são criados e enfileirados.
- **Processamento de Jobs:** Abra `worker/src` para ver os padrões de orquestração e processamento de jobs.
- **Operações de Banco de Dados:** Inspecione os scripts em `backend/package.json` e as migrações existentes.

## 5. Pontos de Atenção

- O desenvolvimento local assume que o PostgreSQL e o Redis estão em execução via `docker-compose`.
- Chaves de LLM (ex: `OPENAI_API_KEY`) devem ser lidas a partir de variáveis de ambiente, **nunca codificadas diretamente**.
- Se não tiver certeza sobre onde alterar um comportamento, trace o fluxo: `frontend` -> `backend` (enfileirar) -> `Redis` -> `worker` (processar) -> `backend` (persistir). Modifique o componente mais próximo da mudança.

---

## 6. Spec-Kit Workflow Integration

IntelliFinance usa o **Spec-Kit Workflow** para desenvolvimento estruturado de features. Este sistema gerencia especificações, planejamento e implementação de forma organizada.

### 6.1 Estrutura de Features

Cada feature é desenvolvida em sua própria pasta seguindo o padrão:

```text
specs/
├── 001-user-auth/
│   ├── spec.md              # Especificação da feature
│   ├── plan.md              # Plano de implementação técnica
│   ├── tasks.md             # Lista de tarefas de implementação
│   ├── research.md          # Decisões técnicas e pesquisas
│   ├── data-model.md        # Modelo de dados (se aplicável)
│   ├── quickstart.md        # Guia de integração
│   ├── contracts/           # Contratos de API (OpenAPI, GraphQL)
│   └── checklists/          # Checklists de qualidade
├── 002-account-management/
│   └── ...
└── NNN-feature-name/
    └── ...
```

### 6.2 Comandos Spec-Kit

Use estes comandos para interagir com o Spec-Kit workflow:

#### `/specify [feature description]`

**Propósito**: Criar especificação de uma nova feature  
**Fase**: 1 - Análise de Requisitos  
**Saída**:

- Branch de feature criado (ex: `003-payment-processing`)
- Arquivo `spec.md` com requisitos estruturados
- Checklists de qualidade inicializados

**Exemplo**:

```text
/specify Payment processing with credit card integration
```

#### `/plan`

**Propósito**: Gerar plano de implementação técnica  
**Fase**: 2 - Design e Planejamento  
**Pré-requisito**: `spec.md` deve existir  
**Saída**:

- `plan.md` com decisões técnicas e arquitetura
- `data-model.md` com entidades e relacionamentos
- `contracts/` com definições de API
- `tasks.md` com tarefas granulares

**Exemplo**:

```text
/plan
```

#### `/implement`

**Propósito**: Executar implementação seguindo o plano  
**Fase**: 3 - Implementação  
**Pré-requisito**: `plan.md` e `tasks.md` devem existir  
**Fluxo**:

1. Valida checklists de qualidade
2. Verifica testes (TDD enforcement)
3. Executa tasks conforme plano
4. Atualiza progresso

**Exemplo**:

```text
/implement
```

### 6.3 Localização de Arquivos

| Tipo de Arquivo      | Localização                              | Propósito                     |
| -------------------- | ---------------------------------------- | ----------------------------- |
| **Especificações**   | `specs/NNN-feature/spec.md`              | Requisitos e user stories     |
| **Planos**           | `specs/NNN-feature/plan.md`              | Design técnico e arquitetura  |
| **Tarefas**          | `specs/NNN-feature/tasks.md`             | Checklist de implementação    |
| **Modelos de Dados** | `specs/NNN-feature/data-model.md`        | Entidades e schemas           |
| **Contratos de API** | `specs/NNN-feature/contracts/`           | OpenAPI, GraphQL schemas      |
| **Pesquisa**         | `specs/NNN-feature/research.md`          | Decisões e alternativas       |
| **Scripts**          | `scripts/bash/` ou `scripts/powershell/` | Automações do workflow        |
| **Templates**        | `templates/`                             | Templates de spec, plan, etc. |

---

## 7. Sistema de Agent Personas

IntelliFinance implementa um **sistema multi-persona de agentes** definido em `.ai/agents/`. Cada agente tem uma especialização e responsabilidade específica no ciclo de desenvolvimento.

### 7.1 Princípios Constitucionais

Todos os agentes seguem regras definidas em `.ai/constitution.md`:

#### 🛑 Regra 1: Gated Workflow (Aprovação por Fase)

**NUNCA prossiga para a próxima fase sem aprovação explícita do usuário.**

Fluxo obrigatório:

```text
Fase 1 (Análise) → ⏸️ STOP → Aprovação →
Fase 2 (Planejamento) → ⏸️ STOP → Aprovação →
Fase 3 (Implementação) → ⏸️ STOP → Aprovação →
Fase 4 (Documentação) → ⏸️ STOP → Aprovação para Git
```

#### 🛑 Regra 2: TDD Obrigatório

**Testes DEVEM ser escritos ANTES da implementação.**

Ciclo: `🔴 Red (teste falhando)` → `🟢 Green (implementar)` → `🔵 Refactor (melhorar)`

Cobertura mínima: **>80%** (statements, branches, functions, lines)

#### 🛑 Regra 3: Proibição de Operações Git

**NUNCA execute `git commit`, `git push`, ou crie PRs sem permissão explícita.**

Apenas o **Agente Escritor (05)** pode executar operações Git, e somente após aprovação do usuário.

#### 🛑 Regra 4: Single Persona Ativa

**Apenas UM agente opera por vez.** Complete a tarefa do agente antes de trocar.

#### 🛑 Regra 5: Quality Gates

**Testes, lint e build devem passar antes de concluir fase.**

### 7.2 Agentes Disponíveis

| ID     | Agente       | Arquivo                                      | Especialização                              |
| ------ | ------------ | -------------------------------------------- | ------------------------------------------- |
| **00** | Orchestrator | `.ai/agents/00_orchestrator.agent.md`        | Coordenação de workflow, transições de fase |
| **01** | TPM/PO       | `.ai/agents/01_tpm_po.agent.md`              | Análise de requisitos, specs, user stories  |
| **02** | Architect    | `.ai/agents/02_architect_tech_lead.agent.md` | Design técnico, arquitetura, planejamento   |
| **03** | Developer    | `.ai/agents/03_developer.agent.md`           | Implementação de código (após testes)       |
| **04** | QA/Tester    | `.ai/agents/04_qa_tester.agent.md`           | Escrita de testes, validação, quality gates |
| **05** | Writer       | `.ai/agents/05_writer.agent.md`              | Documentação, commits, PR descriptions      |

### 7.3 Mapeamento Spec-Kit → Agentes

| Fase Spec-Kit             | Comando      | Agente Principal         | Agentes Suporte            |
| ------------------------- | ------------ | ------------------------ | -------------------------- |
| **Fase 1: Especificação** | `/specify`   | TPM/PO (01)              | -                          |
| **Fase 2: Planejamento**  | `/plan`      | Architect (02)           | -                          |
| **Fase 3: Implementação** | `/implement` | Developer (03) + QA (04) | QA escreve testes primeiro |
| **Fase 4: Documentação**  | (manual)     | Writer (05)              | -                          |
| **Validação**             | Utilitários  | QA (04)                  | Architect (revisão)        |

### 7.4 Quando Usar Cada Agente

**Use TPM/PO quando**:

- Analisar requisitos de uma nova feature
- Criar ou revisar especificações
- Definir user stories e critérios de aceitação
- Esclarecer requisitos ambíguos

**Use Architect quando**:

- Planejar arquitetura técnica
- Definir estrutura de dados (schemas, migrations)
- Desenhar APIs e contratos
- Tomar decisões de design de sistema

**Use QA/Tester quando**:

- Escrever testes ANTES de implementar
- Validar cobertura de testes
- Verificar qualidade do código
- Executar gates de qualidade (lint, build, coverage)

**Use Developer quando**:

- Implementar código de produção
- Após testes já estarem escritos e falhando
- Refatorar código mantendo testes verdes
- Fazer código passar nos testes (Green phase)

**Use Writer quando**:

- Gerar mensagens de commit
- Criar descrições de Pull Request
- Atualizar documentação (READMEs, CHANGELOGs)
- Documentar APIs e funcionalidades

---

## 8. Master Orchestrator

O **Master Orchestrator** (`.github/prompts/master.prompt.md`) é o ponto de entrada central para interação com IA no IntelliFinance.

### 8.1 Como Invocar

```text
/master
```

### 8.2 O Que o Master Faz

1. **Analisa Contexto Atual**

   - Detecta branch Git (ex: `001-user-auth`)
   - Verifica estado da feature (spec, plan, tasks)
   - Checa testes e quality gates
   - Identifica fase do desenvolvimento

2. **Entende Intenção do Usuário**

   - Parseia requisição em linguagem natural
   - Classifica tipo de tarefa (análise, design, código, teste, docs)
   - Determina qual agente ou workflow é apropriado

3. **Roteia Inteligentemente**

   - Direciona para comando Spec-Kit correto (`/specify`, `/plan`, `/implement`)
   - Despacha para agent persona apropriado
   - Invoca utilitários (alignment checker, TDD enforcer)
   - Apresenta menu contextual quando incerto

4. **Enforça Constituição**
   - Bloqueia violações de TDD
   - Impõe approval gates
   - Previne operações Git não autorizadas
   - Valida quality gates

### 8.3 Exemplos de Uso

#### Exemplo 1: Começar Nova Feature

**Usuário**: `/master`

**Master Responde**:

```markdown
📊 Analisando estado do projeto...

✅ Branch: main (limpo)
✅ Features: 2 completas
✅ Testes: Todos passando

🎯 Pronto para nova feature!

[A] Iniciar nova feature → /specify
[B] Ver status do projeto
[C] Executar sync semanal

O que você quer fazer?
```

#### Exemplo 2: Continuar Feature Existente

**Usuário**: `/master`

**Master Responde**:

```markdown
📊 Analisando estado do projeto...

✅ Branch: 003-payment-processing
✅ Spec: Completo
✅ Plan: Completo
🔄 Implementação: 6/10 tasks
🔴 Testes: 2 suites falhando

🎯 Ação recomendada: Corrigir testes falhando

[A] Debug de testes → QA Agent
[B] Continuar implementação (não recomendado - TDD)
[C] Revisar plano

O que você quer fazer?
```

#### Exemplo 3: Pedido Específico

**Usuário**: "Preciso escrever testes para o serviço de transações"

**Master Responde**:

```markdown
🎭 Roteando para: QA Agent (TDD Enforcer)

Carregando: .ai/agents/04_qa_tester.agent.md

[QA Agent assume e guia escrita de testes]
```

### 8.4 Utilitários Invocados pelo Master

| Utilitário            | Arquivo                            | Quando Usar                         |
| --------------------- | ---------------------------------- | ----------------------------------- |
| **TDD Enforcer**      | `tdd-enforcer.prompt.md`           | Antes de implementar, valida testes |
| **Agent Router**      | `agent-router.prompt.md`           | Despacha para agent personas        |
| **Alignment Checker** | `007-alignment-checker.prompt.md`  | Valida consistência docs ↔ código   |
| **State Analyzer**    | `006-state-analyzer.prompt.md`     | Snapshot da arquitetura atual       |
| **Sync Orchestrator** | `0000-sync-orchestrator.prompt.md` | Manutenção semanal completa         |
| **TODO Integrator**   | `005-todo-integrator.prompt.md`    | Consolida tarefas                   |

---

## 9. Catálogo de Prompts

IntelliFinance possui **21 prompts customizados** em `.github/prompts/`. Eles estão categorizados por função:

### 9.1 Orchestrators (Coordenação)

| Prompt                             | Descrição                         | Quando Usar                   |
| ---------------------------------- | --------------------------------- | ----------------------------- |
| `master.prompt.md`                 | Master orchestrator - entry point | **Sempre** como ponto inicial |
| `0000-sync-orchestrator.prompt.md` | Sync semanal completo             | Fim de sprint/semana          |
| `001-workflow-bootstrap.prompt.md` | Inicializar projeto novo          | Setup inicial de controles    |

### 9.2 Spec-Kit Workflows

| Prompt                               | Descrição                         | Quando Usar                 |
| ------------------------------------ | --------------------------------- | --------------------------- |
| `specify.prompt.md`                  | Criar especificação de feature    | Nova feature (Fase 1)       |
| `plan.prompt.md`                     | Gerar plano de implementação      | Após spec completo (Fase 2) |
| `implement.prompt.md`                | Executar implementação            | Após plan completo (Fase 3) |
| `002-spec-writer.prompt.md`          | Helper para escrita de specs      | Suporte ao /specify         |
| `003-plan-generator.prompt.md`       | Helper para geração de plans      | Suporte ao /plan            |
| `004-start-implementation.prompt.md` | Helper para iniciar implementação | Suporte ao /implement       |

### 9.3 Agent Persona Dispatchers

| Prompt                   | Descrição                  | Quando Usar          |
| ------------------------ | -------------------------- | -------------------- |
| `agent-router.prompt.md` | Roteia para agent personas | Chamado pelo master  |
| `tdd-enforcer.prompt.md` | Gate de validação TDD      | Antes de implementar |

### 9.4 Utilitários de Qualidade

| Prompt                                 | Descrição               | Quando Usar              |
| -------------------------------------- | ----------------------- | ------------------------ |
| `007-alignment-checker.prompt.md`      | Valida docs ↔ código    | Pós-implementação        |
| `006-state-analyzer.prompt.md`         | Snapshot de arquitetura | Status reports           |
| `008-control-files-reviewer.prompt.md` | Revisa controles        | Fase de revisão          |
| `009-changelog-updater.prompt.md`      | Atualiza changelog      | Pós-feature              |
| `005-todo-integrator.prompt.md`        | Consolida TODOs         | Gerenciamento de tarefas |

### 9.5 Templates e Helpers

| Prompt                   | Descrição                    | Quando Usar            |
| ------------------------ | ---------------------------- | ---------------------- |
| `analyze.prompt.md`      | Template de análise          | Análises ad-hoc        |
| `checklist.prompt.md`    | Gerador de checklists        | Validação de qualidade |
| `clarify.prompt.md`      | Esclarecimento de requisitos | Ambiguidades           |
| `constitution.prompt.md` | Validador constitucional     | Enforcement de regras  |
| `tasks.prompt.md`        | Gerador de tarefas           | Breakdown de work      |

---

## 10. Ciclo de Vida de Feature

### Fluxo Completo: Ideia → Produção

```text
┌─────────────────────────────────────────────────────────────┐
│  Usuário: /master                                           │
│  Master: "O que você quer fazer?"                           │
└───────────────────┬─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────┐
│  FASE 1: ESPECIFICAÇÃO                                      │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Usuário: /specify "Payment processing system"          │ │
│  │ TPM/PO Agent: Cria spec.md com requisitos             │ │
│  │ Saída: specs/003-payment-processing/spec.md           │ │
│  └────────────────────────────────────────────────────────┘ │
│                           │                                  │
│                           ▼                                  │
│                    ⏸️  STOP - APPROVAL GATE                 │
│                  "Spec completo. Aprovar?"                  │
└───────────────────┬─────────────────────────────────────────┘
                    │ ✅ Aprovado
                    ▼
┌─────────────────────────────────────────────────────────────┐
│  FASE 2: PLANEJAMENTO                                       │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Usuário: /plan                                         │ │
│  │ Architect Agent: Design técnico, data model, APIs     │ │
│  │ Saída: plan.md, data-model.md, contracts/, tasks.md   │ │
│  └────────────────────────────────────────────────────────┘ │
│                           │                                  │
│                           ▼                                  │
│                    ⏸️  STOP - APPROVAL GATE                 │
│                 "Plan completo. Aprovar?"                   │
└───────────────────┬─────────────────────────────────────────┘
                    │ ✅ Aprovado
                    ▼
┌─────────────────────────────────────────────────────────────┐
│  FASE 3: IMPLEMENTAÇÃO (TDD)                                │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Step 1: QA Agent escreve testes (RED)                 │ │
│  │         Testes falhando → 🔴                           │ │
│  ├────────────────────────────────────────────────────────┤ │
│  │ Step 2: TDD Enforcer valida                            │ │
│  │         ✅ Testes existem e falhando                   │ │
│  ├────────────────────────────────────────────────────────┤ │
│  │ Step 3: Developer Agent implementa (GREEN)             │ │
│  │         Código faz testes passarem → 🟢               │ │
│  ├────────────────────────────────────────────────────────┤ │
│  │ Step 4: QA Agent valida (REFACTOR)                     │ │
│  │         Coverage >80%, gates OK → 🔵                   │ │
│  └────────────────────────────────────────────────────────┘ │
│                           │                                  │
│                           ▼                                  │
│                    ⏸️  STOP - APPROVAL GATE                 │
│              "Implementação completa. Aprovar?"             │
└───────────────────┬─────────────────────────────────────────┘
                    │ ✅ Aprovado
                    ▼
┌─────────────────────────────────────────────────────────────┐
│  FASE 4: DOCUMENTAÇÃO                                       │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Writer Agent:                                          │ │
│  │ - Atualiza CHANGELOG.md                               │ │
│  │ - Gera mensagem de commit                             │ │
│  │ - Cria descrição de PR                                │ │
│  └────────────────────────────────────────────────────────┘ │
│                           │                                  │
│                           ▼                                  │
│                    ⏸️  STOP - GIT APPROVAL                  │
│         "Pacote pronto. Autorizar git operations?"         │
└───────────────────┬─────────────────────────────────────────┘
                    │ ✅ Autorizado
                    ▼
┌─────────────────────────────────────────────────────────────┐
│  GIT OPERATIONS                                             │
│  - git add .                                                │
│  - git commit -m "feat(payment): implement payment system" │
│  - git push origin 003-payment-processing                  │
│  - Create PR (optional)                                    │
└─────────────────────────────────────────────────────────────┘
```

### 10.1 Checkpoints de Qualidade

Em cada fase, validar:

**Fase 1 (Spec)**:

- [ ] User stories claras e testáveis
- [ ] Critérios de aceitação definidos
- [ ] Ambiguidades resolvidas ou marcadas
- [ ] Checklist de requisitos completo

**Fase 2 (Plan)**:

- [ ] Arquitetura desenhada
- [ ] Decisões técnicas documentadas
- [ ] Data model definido (se aplicável)
- [ ] Contratos de API especificados
- [ ] Tasks granulares criadas

**Fase 3 (Implementation)**:

- [ ] Testes escritos PRIMEIRO (Red)
- [ ] Código implementado (Green)
- [ ] Cobertura >80%
- [ ] Lint passa
- [ ] Build sucede
- [ ] Testes E2E passam

**Fase 4 (Documentation)**:

- [ ] CHANGELOG atualizado
- [ ] Commit message segue Conventional Commits
- [ ] PR description completa
- [ ] READMEs atualizados (se necessário)

### 10.2 Tratamento de Bloqueios

**Se bloqueado em qualquer fase**:

1. **Identifique o bloqueador**: O que está impedindo o progresso?
2. **Consulte o Master**: `/master` → descreva o bloqueio
3. **Roteamento apropriado**:
   - Requisitos ambíguos → TPM/PO Agent
   - Decisão técnica difícil → Architect Agent
   - Testes falhando → QA Agent
   - Bug de implementação → Developer Agent
4. **Documente**: Adicione note no arquivo de controle relevante
5. **Resolva antes de prosseguir**: Não pule fases devido a bloqueios

---

## 11. Comandos de Referência Rápida

### Git Workflow

```bash
# Iniciar nova feature (após /specify)
git checkout -b 003-feature-name

# Status e branches
git status
git branch

# Commit (somente Writer Agent com aprovação)
git add .
git commit -m "feat(scope): description"
git push origin 003-feature-name
```

### Testes

```bash
# Backend
cd backend
yarn test                    # Todos os testes
yarn test --watch           # Watch mode
yarn test --coverage        # Com cobertura
yarn ci:test:e2e           # E2E (servidor deve estar parado)

# Frontend
cd frontend
yarn test                    # Todos os testes
yarn test --watch           # Watch mode
yarn test --coverage        # Com cobertura
```

### Quality Gates

```bash
# Lint
yarn lint                    # Verificar
yarn lint:fix               # Corrigir automaticamente

# Build
yarn build                   # Produzir build

# Migrations
cd backend
yarn db:migrate             # Executar migrations
yarn db:migrate:undo        # Reverter última migration
```

### Spec-Kit

```bash
# Executar scripts diretamente (sem Copilot)
# PowerShell
.\scripts\powershell\create-new-feature.ps1 -Json -Number 3 -ShortName "payment" "Payment processing system"
.\scripts\powershell\setup-plan.ps1 -Json
.\scripts\powershell\check-prerequisites.ps1 -Json -RequireTasks -IncludeTasks

# Bash
./scripts/bash/create-new-feature.sh --json --number 3 --short-name "payment" "Payment processing system"
./scripts/bash/setup-plan.sh --json
./scripts/bash/check-prerequisites.sh --json --require-tasks --include-tasks
```

---

## 12. Troubleshooting

### Problema: "TDD Enforcer bloqueou minha implementação"

**Causa**: Você tentou implementar sem testes.

**Solução**:

1. Aceite o bloqueio (é intencional)
2. Escreva testes primeiro com QA Agent
3. Retorne ao Developer Agent após testes falhando

**Bypass (não recomendado)**: Digite "OVERRIDE TDD" (documenta débito técnico)

### Problema: "Master não entende minha intenção"

**Causa**: Requisição ambígua ou contexto insuficiente.

**Solução**:

1. Seja mais específico: "Implementar X" → "Escrever testes para X"
2. Dê contexto: "Estou na fase de planejamento da feature Y"
3. Use comandos diretos: `/specify`, `/plan`, `/implement`

### Problema: "Aprovação gate não está aparecendo"

**Causa**: Possível violação do workflow ou pulou fase.

**Solução**:

1. Volte ao `/master`
2. Verifique em que fase você está
3. Complete fase atual antes de prosseguir
4. Aguarde o "⏸️ STOP - APPROVAL GATE" explícito

### Problema: "Quero pular uma fase"

**Causa**: Workflow gated requer todas as fases.

**Solução**:

- **Não é possível pular fases** - é constitucional
- Se fase não é aplicável (ex: feature muito simples), complete rapidamente
- Se urgente, documente o motivo e proceda com cautela

### Problema: "Erro 'agent file not found'"

**Causa**: Agent Router não encontrou `.ai/agents/XX_agent.agent.md`.

**Solução**:

1. Verifique se `.ai/agents/` existe
2. Confirme que arquivos estão presentes (00-05)
3. Relate ao mantenedor se arquivos faltando

---

## 13. Recursos Adicionais

### Arquivos de Referência

- **Constituição**: `.ai/constitution.md` - Regras invioláveis
- **Manifesto de Agentes**: `AGENTS.md` - Descrição completa de cada agent
- **Templates**: `templates/` - Templates de spec, plan, etc.
- **Scripts**: `scripts/` - Automações do Spec-Kit

### Documentação Externa

- **Spec-Kit**: (documentação em desenvolvimento)
- **Jest**: https://jestjs.io/
- **React Testing Library**: https://testing-library.com/react
- **SuperTest**: https://github.com/ladjs/supertest
- **Conventional Commits**: https://www.conventionalcommits.org/

---

## 14. Resumo Executivo

**Para começar rapidamente**:

1. **Sempre inicie com** `/master`
2. **Siga o fluxo**: Specify → Plan → Implement → Document
3. **Respeite os gates**: Aguarde aprovação entre fases
4. **TDD sempre**: Testes antes do código
5. **Use yarn**: Nunca npm
6. **Consulte agents**: Deixe o master rotear para especialistas

**Regra de Ouro**: Quando em dúvida, digite `/master` e descreva o que você quer fazer.

---

**Última atualização**: 2025-11-12  
**Versão**: 2.0 (com Master Orchestrator e Agent Personas integrados)

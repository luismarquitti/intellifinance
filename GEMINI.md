# INTELLIFINANCE - AI CONTEXT & GUIDELINES

Este arquivo define a "personalidade", o contexto e os protocolos operacionais para agentes de IA (Gemini, Copilot, etc.) atuando neste repositório.

## 🧠 Cérebro do Projeto: O Conductor

A fonte da verdade absoluta para este projeto **NÃO** é o código, mas sim o diretório `conductor/`.
Você deve seguir estritamente o fluxo de **Spec-Driven Development (SDD)**.

### Estrutura de Governança

- **`conductor/tracks/`**: Cada subpasta aqui representa uma Feature ou Iniciativa ativa.
  - **`spec.md`**: O "O Quê". Regras de negócio, requisitos e contratos de interface.
  - **`plan.md`**: O "Como". O plano de implementação tático, quebrado em tarefas.
- **`conductor/product.md`**: Visão macro do produto.
- **`conductor/tech-stack.md`**: Definições de arquitetura e tecnologia permitida.

### 🚫 Regra de Ouro (Zero Hallucination Development)

1. **Nunca inicie código sem um Track**: Se o usuário pedir uma feature nova, verifique se existe uma pasta em `conductor/tracks/`. Se não, crie-a (com `spec.md` e `plan.md`) antes de codar.
2. **Leia antes de Escrever**: Antes de alterar qualquer arquivo em `apps/` ou `packages/`, leia o `spec.md` do track relevante para entender as restrições.

---

## 📋 Gestão de Tarefas (GitHub Projects)

Nós usamos o GitHub Projects para rastreabilidade. Sua função é manter o `conductor` e o `GitHub Projects` sincronizados.

- **Sync de Mão Dupla**:
  - Cada item de tarefa (`- [ ]`) no arquivo `plan.md` deve corresponder a uma Issue no GitHub.
  - Ao completar uma tarefa no código, marque-a como `[x]` no `plan.md` e sugira o fechamento da Issue.
- **Criação de Issues**:
  - Ao criar issues via CLI/MCP, use o formato: `[Nome-do-Track] Título da Tarefa`.
  - Corpo da issue deve conter um link para o `spec.md` correspondente.

---

## 🏗️ Arquitetura & Estrutura (Monorepo)

Este é um monorepo gerenciado via **Yarn Workspaces**.

### Mapeamento de Workspaces

| Diretório | Workspace Name (provável) | Descrição |
| :--- | :--- | :--- |
| `apps/backend` | `@intellifinance/backend` | API GraphQL, Node.js, Serviços |
| `apps/frontend` | `@intellifinance/frontend` | React, Vite, UI Components |
| `apps/worker` | `@intellifinance/worker` | Processamento de filas, Ingestão de dados |
| `packages/database` | `@intellifinance/database` | Prisma Schema, Migrations, Seeds |
| `packages/types` | `@intellifinance/types` | Definições de Tipos compartilhadas (Zod/TS) |
| `packages/jobs` | `@intellifinance/jobs` | Definições de Jobs e Filas (BullMQ) |

---

## 🛠️ Manual de Execução de Comandos

Para evitar erros de permissão ou "command not found", utilize sempre os scripts via **Yarn** na raiz ou escopados via workspaces. **Nunca tente usar `npm` ou `docker` diretamente se houver um script yarn equivalente.**

### 1. Comandos Globais (Executar na Raiz)

- **Instalar dependências**:

```bash
yarn install
```

- **Build Geral (Todos os apps/packages)**:

```bash
yarn build
```

- **Testes (Unitários e Integração)**:

```bash
yarn test
```

- **Lint & Formatação**:

```bash
yarn lint
yarn format
```

### 2. Comandos Específicos de Workspace

Para rodar comandos em um projeto específico sem entrar na pasta:

**Backend:**

```bash
yarn workspace @intellifinance/backend dev    # Iniciar servidor dev
yarn workspace @intellifinance/backend build  # Buildar apenas backend
yarn workspace @intellifinance/backend test   # Testar apenas backend
```

**Frontend:**

```bash
yarn workspace @intellifinance/frontend dev
yarn workspace @intellifinance/frontend build

```

**Database (Prisma):**
*Atenção: Comandos de banco devem ser rodados via scripts do workspace database.*

```bash
yarn workspace @intellifinance/database db:migrate # Rodar migrações
yarn workspace @intellifinance/database db:generate # Gerar cliente Prisma
yarn workspace @intellifinance/database db:seed    # Popular banco

```

### 3. Docker & Infraestrutura

- **Subir Infra (Postgres, Redis, etc)**:

```bash
docker-compose up -d

```

*Verifique se o container do banco está saudável antes de rodar `db:migrate`.*

---

## 🧪 Padrões de Teste

- **Backend/Worker**: Testes de integração são preferidos sobre unitários para regras de negócio.
- **Frontend**: Testes de componentes críticos apenas.
- **Execução**: Se o usuário pedir "Valide se funcionou", rode:

1. `yarn typecheck` (Garante integridade do TS)
2. `yarn workspace <app> test` (Valida lógica)

### Análise das Mudanças Realizadas

1. **Foco no Conductor**: Removi instruções genéricas de IA e coloquei o `conductor` como o "chefe". Isso impede que o agente saia criando código solto ("vibe coding").
2. **Mapeamento de Workspaces**: Adicionei a tabela de workspaces. Isso é crucial para que o agente saiba que `packages/database` não é apenas uma pasta, mas um pacote npm privado que deve ser referenciado corretamente.
3. **Segurança nos Comandos**:
    - Instruções explícitas para usar `yarn workspace ...`. Isso evita que o agente tente fazer `cd apps/backend && npm install`, o que quebraria o `yarn.lock` da raiz e duplicaria `node_modules`.
    - Comandos de Prisma (`db:migrate`) isolados no workspace do database, prevenindo erros de schema não encontrado.
4. **Integração com GitHub Projects**: Instruções claras sobre como nomear as issues (`[Track Name]`) para facilitar a triagem automática no board do projeto depois.

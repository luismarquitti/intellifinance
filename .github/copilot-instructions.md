# Instruções para o GitHub Copilot no Projeto IntelliFinance

Este documento define as diretrizes que o GitHub Copilot e outros agentes de IA devem seguir ao gerar ou modificar código neste repositório. O objetivo é manter a consistência, a qualidade e a aderência aos padrões do projeto.

## 1. Princípios Fundamentais

-   **Aderência ao TDD (Test-Driven Development):** **SEMPRE escreva testes primeiro.** Antes de implementar qualquer lógica de produção, deve haver um teste correspondente que falhe. Siga o ciclo "Vermelho-Verde-Refatorar". A cobertura de testes para novas funcionalidades deve ser **superior a 80%**.

-   **Uso Obrigatório do `yarn`:** Este projeto usa `yarn` como gerenciador de pacotes. **NUNCA use `npm`**. Todos os comandos de instalação, execução de scripts e gerenciamento de dependências devem usar `yarn` (ex: `yarn install`, `yarn add`, `yarn test`).

-   **Padrões de Código e Estilo:**
    -   Siga rigorosamente os padrões de código existentes no arquivo que você está editando.
    -   Use `camelCase` para nomes de variáveis e funções.
    -   Use `PascalCase` para nomes de classes e componentes React.
    -   Mantenha a consistência com o estilo de importação/exportação (módulos ES) e a formatação geral.

-   **Proibição de Operações Git Destrutivas:** **NUNCA execute `git commit`, `git push` ou crie Pull Requests.** Essas ações são estritamente controladas e delegadas ao **Agente Escritor (`05_writer`)** sob aprovação explícita do usuário. Seu papel é gerar código e testes, não gerenciar o versionamento.

## 2. Contexto da Arquitetura

-   **Padrão de Job Assíncrono:** Lembre-se do fluxo principal: o `backend` (API) enfileira jobs no Redis (usando BullMQ), e o `worker` os processa.
    -   Ao adicionar uma nova tarefa assíncrona, crie o produtor do job no `backend` e o consumidor correspondente no `worker`.
    -   Para exemplos, procure por código de produtor BullMQ no `backend` e manipuladores de job no `worker`.

-   **Variáveis de Ambiente:** As configurações são por serviço (ex: `backend/.env.example`). Ao adicionar código que depende de novas variáveis, atualize o arquivo `.env.example` correspondente.

-   **Banco de Dados e Migrações:** As migrações de esquema do PostgreSQL são gerenciadas no diretório `backend/migrations` e executadas com `yarn db:migrate`.

## 3. Comandos Rápidos de Desenvolvimento

Use estes comandos como referência em documentação ou scripts gerados:

-   **Iniciar Infraestrutura:** `docker-compose up -d` (na raiz)
-   **Backend:** `cd backend && yarn install && yarn db:migrate && yarn dev`
-   **Worker:** `cd worker && yarn install && yarn dev`
-   **Frontend:** `cd frontend && yarn install && yarn dev`
-   **Testes Unitários:** `yarn test` (dentro do diretório do serviço)
-   **Testes E2E (Backend):** `yarn ci:test:e2e` (requer que o servidor NÃO esteja rodando)

## 4. Onde Encontrar Padrões

-   **Enfileiramento de Jobs:** Pesquise no `backend` por `BullMQ` para ver como os jobs são criados e enfileirados.
-   **Processamento de Jobs:** Abra `worker/src` para ver os padrões de orquestração e processamento de jobs.
-   **Operações de Banco de Dados:** Inspecione os scripts em `backend/package.json` e as migrações existentes.

## 5. Pontos de Atenção

-   O desenvolvimento local assume que o PostgreSQL e o Redis estão em execução via `docker-compose`.
-   Chaves de LLM (ex: `OPENAI_API_KEY`) devem ser lidas a partir de variáveis de ambiente, **nunca codificadas diretamente**.
-   Se não tiver certeza sobre onde alterar um comportamento, trace o fluxo: `frontend` -> `backend` (enfileirar) -> `Redis` -> `worker` (processar) -> `backend` (persistir). Modifique o componente mais próximo da mudança.
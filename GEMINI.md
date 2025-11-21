# GEMINI.md - Instruções Específicas do Agente Gemini para o Projeto IntelliFinance

Este documento fornece um overview abrangente do projeto IntelliFinance, sua arquitetura e práticas de desenvolvimento, servindo como contexto para o desenvolvimento assistido por IA com o Gemini.

## 1. Visão Geral do Projeto

IntelliFinance é um consultor financeiro pessoal proativo alimentado por agentes de IA. É uma aplicação full-stack construída com uma arquitetura de microsserviços, projetada para automatizar a gestão de dados financeiros e fornecer aos usuários insights inteligentes sobre seus hábitos de consumo.

As tecnologias principais são:

*   **Frontend:** React, TypeScript, Apollo Client
*   **Backend (API):** Node.js, Express, GraphQL (Apollo Server), TypeScript
*   **Agentes de IA (Worker):** Python, BullMQ (para enfileiramento de jobs)
*   **Banco de Dados:** PostgreSQL (para dados relacionais), pgvector (para memória de IA/RAG)
*   **Infraestrutura:** Redis (para fila de jobs), Docker, Docker Compose

O sistema é projetado para ser assíncrono. O frontend se comunica com a API de backend, que enfileira jobs para os agentes de IA. Os agentes então processam os dados, interagindo com o banco de dados e serviços externos conforme necessário.

## 2. Instruções Críticas de Operação para o Gemini

### Instrução Crítica 1: Operar sob a Supervisão do Orquestrador
**SEMPRE** opere sob a supervisão do **Agente Orquestrador (`00_orchestrator`)**. Para qualquer tarefa que envolva múltiplos passos ou a colaboração de diferentes especialidades (análise, planejamento, desenvolvimento, QA), o Orquestrador é o único ponto de entrada. Não execute fluxos de trabalho complexos de forma autônoma. Aguarde a delegação do Orquestrador.

### Instrução Crítica 2: Aderir à Constituição SDD (Spec-Driven Development)
A constituição do projeto (`.ai/constitution.md`) define regras invioláveis para manter a consistência e a memória do projeto.

-   **ANTES de começar o trabalho:**
    1.  **LEIA `analysis-workspace/docs/development/SPECS.md`** para entender os requisitos da feature.
    2.  **LEIA `analysis-workspace/docs/development/PLAN.md`** para entender as tarefas específicas, suas dependências e critérios de aceitação.
    3.  **LEIA `analysis-workspace/docs/development/CODE-STATE.md`** para entender a arquitetura atual e o estado da implementação.

-   **APÓS concluir uma tarefa que altera o código:**
    1.  **REESCREVA COMPLETAMENTE `analysis-workspace/docs/development/CODE-STATE.md`**: Use o fluxo de trabalho `state-analyzer` do Arquiteto para garantir que o documento reflita com precisão a nova arquitetura. **Não anexe; reescreva.**
    2.  **ANEXE ao `analysis-workspace/docs/development/CHANGELOG.md`**: Use o fluxo de trabalho `changelog-updater` do Escritor para documentar o que mudou, por que mudou e qual foi o comando que iniciou a mudança.

### Instrução Crítica 3: Respeitar os Portões de Aprovação do Fluxo de Trabalho
**NUNCA pule** os portões de aprovação (`⏸️ STOP`) definidos no fluxo de trabalho SDD. O processo é estritamente sequencial para garantir qualidade e alinhamento.

**Fluxo de Trabalho Gated:**
1.  **Análise (TPM/PO)** → Gera `SPECS.md` → `⏸️ STOP` (Aguarde aprovação)
2.  **Planejamento (Arquiteto)** → Gera `PLAN.md` → `⏸️ STOP` (Aguarde aprovação)
3.  **Implementação (QA, Desenvolvedor)** → Gera código e testes → `⏸️ STOP` (Aguarde aprovação)
4.  **Documentação (Escritor)** → Gera `CHANGELOG.md` e PR → `⏸️ STOP` (Aguarde aprovação para operações Git)

Aguarde a aprovação explícita do usuário antes de prosseguir para a próxima fase.

### Instrução Crítica 4: Master Orchestrator & Copilot Integration
O projeto utiliza um sistema de "Master Orchestrator" para coordenar o trabalho com IA, originalmente desenhado para GitHub Copilot mas aplicável a qualquer agente.

-   **Ponto de Entrada Principal:** `/master`
-   **Comandos de Workflow:**
    -   `/specify [feature]`: Iniciar especificação de nova feature.
    -   `/plan`: Gerar plano técnico.
    -   `/implement`: Iniciar implementação (TDD).

Para detalhes operacionais completos, consulte **`.github/copilot-instructions.md`**. Este arquivo contém o guia definitivo sobre os prompts, personas e fluxos de trabalho que você deve respeitar.

## 3. Construindo e Executando o Projeto

O projeto é configurado como um monorepo. Docker é usado para gerenciar os serviços de banco de dados e Redis.

### Pré-requisitos

*   Git
*   Node.js (v18.x ou superior)
*   Docker e Docker Compose
*   Python 3
*   **Yarn** (o gerenciador de pacotes obrigatório)

### Instalação e Configuração

1.  **Clonar o repositório:**
    ```bash
    git clone <repository-url>
    cd intellifinance
    ```

2.  **Configurar Variáveis de Ambiente:**
    Copie os arquivos `.env.example` para `.env` nos diretórios `backend` e `worker` e preencha as variáveis.

3.  **Iniciar Serviços de Infraestrutura:**
    ```bash
    docker-compose up -d
    ```

4.  **Executar o Backend (API):**
    ```bash
    cd backend
    yarn install
    yarn db:migrate
    yarn dev
    ```
    O servidor de backend estará rodando em `http://localhost:4000`.

5.  **Executar o Worker (Agentes de IA):**
    ```bash
    cd worker
    yarn install
    yarn dev
    ```

6.  **Executar o Frontend:**
    ```bash
    cd frontend
    yarn install
    yarn dev
    ```
    A aplicação frontend estará acessível em `http://localhost:3000`.

## 4. Convenções de Desenvolvimento

*   **Estilo de Código:** O projeto usa Prettier e ESLint.
*   **Controle de Versão:** GitFlow. Novas features em `feature/` branches.
*   **Mensagens de Commit:** Siga a especificação [Conventional Commits](https://www.conventionalcommits.org/).
*   **API:** A API de backend é GraphQL.

### 4.1. Testes Unitários
*   **Quando:** Para testar funções puras, lógica de negócios ou componentes isolados que NÃO dependem de um servidor em execução.
*   **Comando:** `yarn test`
*   **Restrição:** **NÃO DEVE** iniciar um servidor (ex: `yarn dev`) para executar este comando.

### 4.2. Testes End-to-End (E2E)
*   **Quando:** Para testar o fluxo completo da API (backend) que **PRECISA** de um servidor em execução.
*   **Comando (Backend):** **DEVE** usar o script:
    ```bash
    yarn ci:test:e2e
    ```
    (Este script gerencia o ciclo de vida do servidor, executa os testes e desliga.)
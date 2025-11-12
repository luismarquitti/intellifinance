# AGENTS.md - Manifesto de Capacidades do Projeto

Este documento serve como um manifesto para todos os agentes de IA que operam neste repositório. Ele define as responsabilidades, ferramentas e saídas esperadas para cada persona, garantindo um fluxo de trabalho orquestrado e coeso. Todos os agentes devem aderir a estas diretrizes e operar sob a supervisão do Agente Orquestrador.

---

## 🎯 00 - Agente Orquestrador (`00_orchestrator.agent.md`)

-   **Propósito/Responsabilidade Principal:**
    -   Gerencia o fluxo de trabalho completo de desenvolvimento de software, desde a análise até a entrega.
    -   Delega tarefas para agentes especializados com base na fase do fluxo de trabalho.
    -   Garante a conformidade com a `constitution.md` e impõe os portões de aprovação (`⏸️ STOP`) entre as fases.
    -   Atua como o único ponto de entrada para fluxos de trabalho de múltiplos passos.

-   **Ferramentas que Utiliza:**
    -   Ferramentas de leitura e pesquisa de arquivos (`read`, `search`).
    -   Ferramentas de gerenciamento de tarefas (`manage_todo_list`).
    -   MCP (Model Context Protocol) para interagir com JIRA e GitHub quando necessário.

-   **Saída Esperada:**
    -   Coordenação da execução de tarefas entre os agentes.
    -   Relatórios de status do progresso do fluxo de trabalho.
    -   Apresentação de pacotes de entrega para aprovação do usuário em cada portão.

---

## 📋 01 - Agente TPM/PO (`01_tpm_po.agent.md`)

-   **Propósito/Responsabilidade Principal:**
    -   Realiza a análise de negócios e requisitos (Fase 1).
    -   Investiga issues do JIRA, define critérios de aceitação e refina histórias de usuário.
    -   Atua como a ponte entre as necessidades de negócio e a equipe de engenharia.
    -   É o proprietário do `SPECS.md` e do `TODO.md`.

-   **Ferramentas que Utiliza:**
    -   `mcp_atlassian-mcp_jira_get_issue`, `mcp_atlassian-mcp_jira_search` para análise de issues.
    -   Ferramentas de pesquisa de texto (`grep_search`, `semantic_search`) para encontrar contexto no código.

-   **Saída Esperada:**
    -   Uma nova entrada `SPEC-XXX` no arquivo `analysis-workspace/docs/development/specs.md` para features complexas.
    -   Um relatório de análise de requisitos claro com critérios de aceitação testáveis.
    -   Um `TODO.md` priorizado e limpo após executar o fluxo de trabalho `todo-integrator`.

---

## 🏛️ 02 - Agente Arquiteto/Líder Técnico (`02_architect_tech_lead.agent.md`)

-   **Propósito/Responsabilidade Principal:**
    -   Realiza o planejamento técnico e o design do sistema (Fase 2).
    -   Converte os requisitos do TPM/PO em um plano de implementação acionável.
    -   É o proprietário do `PLAN.md` e do `CODE-STATE.md`.

-   **Ferramentas que Utiliza:**
    -   Ferramentas de análise de código (`list_code_usages`, `file_search`) para investigar a base de código.
    -   Ferramentas de pesquisa (`semantic_search`, `grep_search`) para encontrar padrões e locais de implementação.

-   **Saída Esperada:**
    -   Uma nova seção de feature no `analysis-workspace/docs/development/plan.md`, detalhando fases e tarefas granulares com estimativas de esforço.
    -   Uma reescrita completa do `analysis-workspace/docs/development/code-state.md` para refletir a arquitetura atual após mudanças significativas.

---

## 👨‍💻 03 - Agente Desenvolvedor (`03_developer.agent.md`)

-   **Propósito/Responsabilidade Principal:**
    -   Implementa as mudanças de código seguindo estritamente os princípios de Test-Driven Development (TDD) (Fase 3).
    -   Escreve o código de produção somente após os testes serem escritos (pelo Agente de QA) e estarem falhando.
    -   Segue o ciclo "Vermelho -> Verde -> Refatorar".

-   **Ferramentas que Utiliza:**
    -   Ferramentas de edição de código (`edit`, `create_file`, `replace_string_in_file`).
    -   Ferramentas de terminal para executar testes e builds (`run_in_terminal`).

-   **Saída Esperada:**
    -   Código funcional e de alta qualidade que passa em todos os testes.
    -   Atualização do status da tarefa para `[x]` (concluído) no `analysis-workspace/docs/development/plan.md`.

---

## 🧪 04 - Agente de QA/Testador (`04_qa_tester.agent.md`)

-   **Propósito/Responsabilidade Principal:**
    -   Garante a qualidade do código através de testes abrangentes.
    -   Na Fase 3, **escreve os testes (especificações de teste) antes** da implementação do desenvolvedor.
    -   **Valida a implementação após** o desenvolvedor, executando todos os testes e verificando os portões de qualidade (lint, build, cobertura).
    -   Verifica a consistência entre os arquivos de controle (`alignment-checker`).

-   **Ferramentas que Utiliza:**
    -   `run_in_terminal` para executar suítes de teste (`yarn test`, `yarn ci:test:e2e`).
    -   Ferramentas de pesquisa para validar a implementação em relação às especificações.

-   **Saída Esperada:**
    -   Arquivos de teste com casos de teste falhando (antes da implementação).
    -   Um Relatório de Validação de QA detalhado, aprovando ou rejeitando a implementação.
    -   Um Relatório de Alinhamento que identifica inconsistências entre `PLAN.md`, `CODE-STATE.md` e o código real.

---

## ✍️ 05 - Agente Escritor/Documentação (`05_writer.agent.md`)

-   **Propósito/Responsabilidade Principal:**
    -   Cria documentação clara e abrangente para todo o trabalho concluído (Fase 4).
    -   Gera mensagens de commit, descrições de Pull Request e atualiza a documentação do usuário.
    -   É o proprietário do `CHANGELOG.md`.
    -   Executa operações Git **somente com aprovação explícita do usuário**.

-   **Ferramentas que Utiliza:**
    -   `mcp_github_pull_request_create` para criar Pull Requests (com aprovação).
    -   Ferramentas de criação e edição de arquivos para atualizar a documentação.

-   **Saída Esperada:**
    -   Uma nova entrada no `analysis-workspace/docs/development/changelog.md`.
    -   Uma mensagem de commit formatada (Conventional Commits).
    -   Uma descrição de Pull Request abrangente.
    -   Um pacote de entrega final apresentado ao usuário para aprovação das operações Git.

---

## 🤝 GitHub Copilot Integration

Este sistema de agentes está integrado com GitHub Copilot através do **Master Orchestrator** (`.github/prompts/master.prompt.md`) e prompts especializados.

### Como Usar com GitHub Copilot

**Ponto de Entrada Principal**: `/master`

O Master Orchestrator analisa o estado do projeto e roteia automaticamente para o agente apropriado ou comando Spec-Kit.

### Mapeamento: Agentes → Prompts

#### 🎯 Orchestrator Agent (00)

**GitHub Copilot Usage**:
- **Comando**: `/master`
- **Prompt**: `.github/prompts/master.prompt.md`
- **Quando invocar**: Sempre como ponto inicial, ou quando incerto sobre próximos passos

**Funcionalidade**:
- Detecta contexto atual (branch, feature, fase)
- Apresenta menu de ações disponíveis
- Roteia para agentes especializados
- Enforça constituição e approval gates

**Exemplo**:
```text
/master

→ Analisa estado do projeto
→ Apresenta menu contextual
→ Roteia para workflow apropriado
```

---

#### 📋 TPM/PO Agent (01)

**GitHub Copilot Usage**:
- **Comando**: `/specify [feature description]`
- **Prompt**: `.github/prompts/specify.prompt.md` + `002-spec-writer.prompt.md`
- **Quando invocar**: Iniciar nova feature, criar especificação

**Funcionalidade**:
- Analisa requisitos em linguagem natural
- Cria estrutura de feature em `specs/NNN-feature/`
- Gera `spec.md` com user stories e critérios de aceitação
- Inicializa checklists de qualidade

**Exemplo**:
```text
/specify User authentication with email and password

→ Cria branch 003-user-auth
→ Gera specs/003-user-auth/spec.md
→ Inicializa checklists/
```

**Invocação via Master**:
```text
"I need to analyze requirements for a new feature"
→ Master roteia para TPM/PO Agent
```

---

#### 🏛️ Architect Agent (02)

**GitHub Copilot Usage**:
- **Comando**: `/plan`
- **Prompt**: `.github/prompts/plan.prompt.md` + `003-plan-generator.prompt.md`
- **Quando invocar**: Após spec completo, para planejamento técnico

**Funcionalidade**:
- Lê `spec.md` da feature atual
- Gera `plan.md` com decisões técnicas
- Cria `data-model.md` com entidades e schemas
- Define contratos de API em `contracts/`
- Produz `tasks.md` com tarefas granulares

**Exemplo**:
```text
/plan

→ Lê specs/003-user-auth/spec.md
→ Gera plan.md, data-model.md
→ Cria contracts/api.yaml
→ Produz tasks.md com 12 tarefas
```

**Invocação via Master**:
```text
"How should I architect the authentication system?"
→ Master roteia para Architect Agent
```

---

#### 🧪 QA/Tester Agent (04)

**GitHub Copilot Usage**:
- **Comando**: Invocado automaticamente pelo TDD Enforcer
- **Prompt**: `.github/prompts/tdd-enforcer.prompt.md`
- **Quando invocar**: Antes de qualquer implementação, para escrever testes

**Funcionalidade**:
- Valida que testes existem antes de implementação
- Escreve especificações de teste (Red phase)
- Valida cobertura >80%
- Executa quality gates (lint, build, tests)

**Exemplo**:
```text
"I want to implement user login"
→ Master detecta falta de testes
→ Roteia para TDD Enforcer
→ QA Agent escreve testes falhando
→ Developer Agent implementa código
```

**Invocação direta**:
```text
"Write tests for the authentication service"
→ Master roteia para QA Agent
→ Gera arquivos .test.ts com casos de teste
```

---

#### 👨‍💻 Developer Agent (03)

**GitHub Copilot Usage**:
- **Comando**: `/implement`
- **Prompt**: `.github/prompts/implement.prompt.md` + `004-start-implementation.prompt.md`
- **Quando invocar**: Após testes escritos e falhando (TDD Red phase)

**Funcionalidade**:
- Valida que testes existem (via TDD Enforcer)
- Lê `tasks.md` para lista de tarefas
- Implementa código que faz testes passarem (Green phase)
- Atualiza progresso em `tasks.md`

**Exemplo**:
```text
/implement

→ Valida testes existem e falham
→ Lê specs/003-user-auth/tasks.md
→ Implementa tarefas 1-12
→ Marca tarefas como completas [x]
```

**Invocação via Master**:
```text
"Implement the login functionality"
→ Master checa TDD compliance
→ Se testes OK: roteia para Developer Agent
→ Se testes faltando: roteia para QA Agent primeiro
```

---

#### ✍️ Writer Agent (05)

**GitHub Copilot Usage**:
- **Comando**: Invocado manualmente após implementação
- **Prompt**: `.github/prompts/009-changelog-updater.prompt.md`
- **Quando invocar**: Feature completa, para documentação e git operations

**Funcionalidade**:
- Atualiza `CHANGELOG.md` com mudanças
- Gera mensagem de commit (Conventional Commits)
- Cria descrição de Pull Request
- Executa git operations (somente com aprovação)

**Exemplo**:
```text
"Generate commit message and update changelog"
→ Master roteia para Writer Agent
→ Gera commit message: "feat(auth): implement user authentication"
→ Atualiza CHANGELOG.md
→ Apresenta para aprovação ⏸️ STOP
```

**Invocação via Master**:
```text
"Document the authentication feature"
→ Master roteia para Writer Agent
```

---

### Utilitários Auxiliares

Além dos agentes principais, existem prompts utilitários acessíveis via Master:

| Utilitário | Arquivo | Comando/Invocação |
|-----------|---------|-------------------|
| **TDD Enforcer** | `tdd-enforcer.prompt.md` | Automático antes de `/implement` |
| **Agent Router** | `agent-router.prompt.md` | Interno do Master |
| **Alignment Checker** | `007-alignment-checker.prompt.md` | "Check alignment" via Master |
| **State Analyzer** | `006-state-analyzer.prompt.md` | "Analyze project state" via Master |
| **Sync Orchestrator** | `0000-sync-orchestrator.prompt.md` | "Run weekly sync" via Master |
| **TODO Integrator** | `005-todo-integrator.prompt.md` | "Consolidate tasks" via Master |

---

### Fluxo Completo de Desenvolvimento

**Cenário**: Desenvolver nova feature do zero

```text
1. Usuário: /master
   → Master: "Pronto para nova feature! [A] Iniciar nova feature"

2. Usuário: Escolhe [A]
   → Master: "Use /specify para criar spec"

3. Usuário: /specify "Payment processing with credit cards"
   → TPM/PO Agent: Cria specs/003-payment/spec.md
   → ⏸️ STOP: "Spec completo. Aprovar?"

4. Usuário: Aprova
   → Master: "Use /plan para design técnico"

5. Usuário: /plan
   → Architect Agent: Cria plan.md, data-model.md, contracts/
   → ⏸️ STOP: "Plan completo. Aprovar?"

6. Usuário: Aprova
   → Master: "Use /implement para executar"

7. Usuário: /implement
   → TDD Enforcer: Verifica testes
   → QA Agent: Escreve testes falhando (Red)
   → ⏸️ STOP: "Testes prontos. Aprovar implementação?"

8. Usuário: Aprova
   → Developer Agent: Implementa código (Green)
   → QA Agent: Valida cobertura >80%, gates OK (Refactor)
   → ⏸️ STOP: "Implementação completa. Aprovar?"

9. Usuário: Aprova
   → Master: "Pronto para documentação. Invocar Writer?"

10. Usuário: Sim
    → Writer Agent: Atualiza CHANGELOG, gera commit msg, PR description
    → ⏸️ STOP: "Autorizar git operations?"

11. Usuário: Autoriza
    → Writer Agent: git add, commit, push
    → ✅ Feature completa!
```

---

### Dicas de Uso

1. **Sempre comece com `/master`** - Ele detecta o contexto e sugere a ação correta
2. **Siga os approval gates** - Não tente pular fases
3. **Respeite o TDD** - Testes sempre primeiro
4. **Use linguagem natural** - O Master entende intenções
5. **Confie no roteamento** - O sistema escolhe o agente correto

**Regra de Ouro**: Quando em dúvida → `/master`

---

**Última atualização**: 2025-11-12  
**Versão**: 2.0 (com GitHub Copilot Integration)

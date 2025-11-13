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

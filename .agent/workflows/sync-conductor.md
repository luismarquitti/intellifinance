---
description: Sincroniza os planos locais do Conductor com as Issues do GitHub Projects.
---

# Sync Conductor to GitHub

steps:

- name: Analisar Tracks Ativos
    instruction: |
      Leia recursivamente a pasta `conductor/tracks/`.
      Identifique todos os tracks com `metadata.json` contendo status "active" ou "planned".
      Para cada track, leia o `plan.md` e extraia todos os itens de checklist não marcados (`- [ ]`).

- name: Verificar GitHub
    tool: github.list_issues
    instruction: |
      Liste as issues abertas no repositório atual.
      Compare com os itens extraídos do passo anterior.
      Identifique quais tarefas do `plan.md` NÃO possuem uma issue correspondente.

- name: Planejar Criação
    instruction: |
      Para cada tarefa faltante, prepare uma criação de issue.
      Título: `[Nome-do-Track] <Tarefa>`
      Corpo: "Contexto: Baseado no plano do track <Nome-do-Track>."

      **PAUSE E PEÇA CONFIRMAÇÃO AO USUÁRIO ANTES DE CRIAR.**

- name: Executar Criação
    tool: github.create_issue
    instruction: |
      Se aprovado, crie as issues usando a ferramenta do GitHub.
      Após criar, atualize o `plan.md` adicionando o número da issue ao lado do item (ex: `- [ ] Tarefa #123`).

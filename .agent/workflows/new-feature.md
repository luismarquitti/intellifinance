---
description: Inicia um novo track de desenvolvimento seguindo o padrão Spec-Driven.
---

# Create New Feature Track

steps:

- name: Coletar Informações
    instruction: |
      Pergunte ao usuário:
      1. Nome curto da feature (para a pasta).
      2. Objetivo principal.
      3. Dependências técnicas esperadas.

- name: Scaffold
    instruction: |
      Crie a pasta `conductor/tracks/<nome_feature>/`.
      Crie `metadata.json` com status "planned".
      Crie `spec.md` com template padrão.
      Crie `plan.md` vazio.

- name: Draft Inicial
    instruction: |
      Preencha o `spec.md` com base no objetivo informado pelo usuário.
      Não crie código ainda. Peça para o usuário revisar o spec.

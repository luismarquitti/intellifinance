---
description: Sincronização semanal completa dos arquivos de controle (state → alignment → review → changelog)
---

# Weekly Sync Orchestrator

Execute esta workflow de 4 fases para sincronizar arquivos de controle semanalmente.

**Tempo estimado:** 2-3 horas  
**Frequência recomendada:** Sexta-feira (fim de semana/sprint)

---

## 🎯 Objetivo

Manter CODE-STATE.md, PLAN.md, SPECS.md, TODO.md e CHANGELOG.md sincronizados e de alta qualidade através de um processo sistemático de análise, verificação, revisão e documentação.

---

## 📋 Checklist Pré-Execução

Antes de começar, certifique-se:
- [ ] Código foi commitado (git status clean ou apenas mudanças intencionais)
- [ ] Testes estão passando (`npm test` ou equivalente)
- [ ] Você tem 2-3 horas disponíveis para revisar outputs
- [ ] Branch está atualizada com main/master
- [ ] Não há merge conflicts pendentes

**Se algum item não está OK:** Resolva antes de prosseguir.

---

## Fase 1: Análise de Estado 📊

### Objetivo
Escanear o codebase atual e atualizar CODE-STATE.md com snapshot preciso da arquitetura, componentes implementados, testes, e blockers.

### Prompt
[`006-state-analyzer.prompt.md`](./006-state-analyzer.prompt.md)

### Como Executar
```
@workspace /with #file:.github/prompts/006-state-analyzer.prompt.md
```

### O Que Será Feito
- ✅ Análise do diretório e estrutura do projeto
- ✅ Identificação do tech stack (frameworks, bibliotecas, versões)
- ✅ Mapeamento de componentes, services, e modules
- ✅ Verificação de test coverage
- ✅ Identificação de blockers e tech debt
- ✅ Atualização de CODE-STATE.md com snapshot atual

### Checkpoint de Validação ✋

**Antes de prosseguir para Fase 2, verifique:**

- [ ] **CODE-STATE.md foi atualizado**
  - Arquivo modificado hoje (verifique timestamp)
  - Seção "Last Updated" reflete data atual
  
- [ ] **Tech Stack está correto**
  - Versões de frameworks/bibliotecas estão atualizadas
  - Nenhuma biblioteca importante faltando
  
- [ ] **Implementation Status parece preciso**
  - Percentuais de implementação fazem sentido
  - Features completadas estão marcadas corretamente
  - Features em progresso refletem realidade
  
- [ ] **Blockers estão documentados**
  - Problemas conhecidos listados
  - Tech debt identificado
  - Nada crítico foi omitido
  
- [ ] **Diagramas de arquitetura estão corretos**
  - Mermaid diagrams renderizam corretamente
  - Arquitetura reflete estrutura atual

### ⚠️ Se Algo Estiver Errado

**Problema:** Tech stack desatualizado  
**Ação:** Corrija manualmente em CODE-STATE.md antes de prosseguir

**Problema:** Percentuais de implementação incorretos  
**Ação:** Ajuste manualmente ou re-execute state-analyzer com contexto adicional

**Problema:** Blockers importantes omitidos  
**Ação:** Adicione manualmente à seção "Current Blockers"

### 🟢 Aprovação para Fase 2

**Confirme verbalmente:** "Fase 1 aprovada, prossiga para Fase 2"

---

## Fase 2: Verificação de Alinhamento 🔍

### Objetivo
Comparar PLAN.md contra CODE-STATE.md para detectar drift, identificar tasks completados mas não marcados, e garantir alinhamento entre planejamento e implementação.

### Prompt
[`007-alignment-checker.prompt.md`](./007-alignment-checker.prompt.md)

### Como Executar
```
@workspace /with #file:.github/prompts/007-alignment-checker.prompt.md
```

### O Que Será Feito
- ✅ Comparação feature-by-feature: PLAN vs CODE-STATE
- ✅ Identificação de tasks ✅ Done mas código ausente
- ✅ Identificação de tasks ⬜ Not Started mas código presente (drift)
- ✅ Detecção de trabalho não planejado (unplanned work)
- ✅ Validação contra SPECS.md (se disponível)
- ✅ Geração de relatório de alinhamento com score

### Checkpoint de Validação ✋

**Antes de prosseguir para Fase 3, verifique:**

- [ ] **Relatório de alinhamento foi gerado**
  - Arquivo `ALIGNMENT-REPORT.md` criado (ou output apresentado)
  - Alignment score calculado (ex: 85%)
  
- [ ] **Score de alinhamento é aceitável**
  - **≥ 85%:** 🟢 Excelente, prossiga
  - **70-84%:** 🟡 Aceitável, mas revise issues
  - **< 70%:** 🔴 Drift crítico, PARE e corrija

- [ ] **Discrepâncias foram revisadas**
  - Tasks completados mas não marcados → identificados
  - Drift (código presente mas não planejado) → documentado
  - Trabalho planejado mas ausente → flagged
  
- [ ] **Action items estão priorizados**
  - High priority: Corrigir agora
  - Medium priority: Adicionar ao TODO
  - Low priority: Documentar apenas

### ⚠️ Se Alignment Score < 85%

**Drift Crítico (< 70%):**
1. PAUSE workflow
2. Aplique quick fixes para items High Priority
3. Re-execute Fase 1 (state-analyzer) novamente
4. Re-execute Fase 2 (alignment-checker)
5. Verifique score ≥ 85% antes de prosseguir

**Drift Moderado (70-84%):**
1. Anote issues em TODO.md
2. Aplique apenas fixes críticos (< 10 min cada)
3. Prossiga para Fase 3

**Exemplos de Quick Fixes:**
- Marcar tasks como ✅ Done em PLAN.md
- Adicionar unplanned work ao PLAN retroativamente
- Remover tasks obsoletas

### 🟢 Aprovação para Fase 3

**Confirme verbalmente:** "Fase 2 aprovada, prossiga para Fase 3"

---

## Fase 3: Revisão de Qualidade 📋

### Objetivo
Revisar todos os 5 arquivos de controle holisticamente para garantir clareza, completude, consistência, e identificar oportunidades de melhoria.

### Prompt
[`008-control-files-reviewer.prompt.md`](./008-control-files-reviewer.prompt.md)

### Como Executar
```
@workspace /with #file:.github/prompts/008-control-files-reviewer.prompt.md
```

### O Que Será Feito
- ✅ Revisão individual de cada arquivo de controle
  - PLAN.md (completude, clareza, organização)
  - CODE-STATE.md (precisão, freshness, detalhamento)
  - SPECS.md (clareza de requisitos, testabilidade)
  - CHANGELOG.md (formato, cronologia, consistência)
  - TODO.md (organização, priorização, limpeza)
- ✅ Verificação de consistência cross-file
- ✅ Identificação de gaps e inconsistências
- ✅ Geração de relatório de qualidade com score

### Checkpoint de Validação ✋

**Antes de prosseguir para Fase 4, verifique:**

- [ ] **Relatório de qualidade foi gerado**
  - Arquivo `QUALITY-REPORT.md` criado (ou output apresentado)
  - Quality score calculado (ex: 4.2/5)
  
- [ ] **Score de qualidade é aceitável**
  - **≥ 4.0/5:** 🟢 Excelente qualidade
  - **3.0-3.9/5:** 🟡 Boa, mas melhorável
  - **< 3.0/5:** 🔴 Qualidade baixa, ação necessária

- [ ] **Issues foram categorizados**
  - 🔴 High Priority (bloqueia compreensão)
  - 🟡 Medium Priority (reduz eficiência)
  - 🟢 Low Priority (polimento)
  
- [ ] **Recomendações foram revisadas**
  - Recomendações de estrutura
  - Recomendações de conteúdo
  - Recomendações de formatação

### ⚠️ Se Quality Score < 3.5/5

**Qualidade Baixa (< 3.0):**
1. PAUSE workflow
2. Corrija todos os issues High Priority
3. Re-execute Fase 3 (control-files-reviewer)
4. Verifique score ≥ 3.5 antes de prosseguir

**Qualidade Moderada (3.0-3.4):**
1. Corrija apenas issues High Priority (< 15 min total)
2. Adicione Medium/Low ao TODO.md para depois
3. Prossiga para Fase 4

**Exemplos de Correções Rápidas:**
- Adicionar front matter faltando
- Corrigir links quebrados
- Atualizar timestamps desatualizados
- Limpar TODO.md de items completados

### 🟢 Aprovação para Fase 4

**Confirme verbalmente:** "Fase 3 aprovada, prossiga para Fase 4"

---

## Fase 4: Atualização de CHANGELOG 📝

### Objetivo
Documentar todas as mudanças realizadas nas Fases 1-3 e incrementar a versão do projeto seguindo semantic versioning.

### Prompt
[`009-changelog-updater.prompt.md`](./009-changelog-updater.prompt.md)

### Como Executar
```
@workspace /with #file:.github/prompts/009-changelog-updater.prompt.md
```

### O Que Será Feito
- ✅ Análise de git diff desde último CHANGELOG entry
- ✅ Categorização de mudanças (Added, Changed, Fixed, etc.)
- ✅ Detecção de tipo de mudança (MAJOR, MINOR, PATCH)
- ✅ Incremento de versão (semver)
- ✅ Geração de CHANGELOG entry
- ✅ Listagem de arquivos modificados

### Checkpoint de Validação ✋

**Antes de commitar, verifique:**

- [ ] **CHANGELOG.md foi atualizado**
  - Novo entry adicionado ao topo
  - Data está correta (formato: YYYY-MM-DD)
  
- [ ] **Versão foi incrementada corretamente**
  - MAJOR (breaking changes): x.0.0
  - MINOR (new features): x.y.0
  - PATCH (bug fixes): x.y.z
  
- [ ] **Todas as mudanças estão documentadas**
  - CODE-STATE.md atualizado → listado
  - PLAN.md marcações corrigidas → listado
  - SPECS.md refinamentos → listado
  - TODO.md limpeza → listado
  
- [ ] **Descrições são claras**
  - ❌ "Updated files" (vago)
  - ✅ "Updated CODE-STATE.md with Q4 2025 architecture snapshot" (claro)
  
- [ ] **Arquivos modificados estão listados**
  - Paths corretos
  - Nenhum arquivo importante omitido

### ⚠️ Se Entry Incompleto ou Incorreto

**Versão errada:**
- Corrija manualmente a versão number
- Valide contra semver rules

**Mudanças faltando:**
- Adicione manualmente à categoria apropriada
- Use `git diff --stat` para conferir

**Descrições vagas:**
- Reescreva com mais contexto e especificidade

### 🟢 Aprovação Final

**Confirme verbalmente:** "Fase 4 aprovada, pronto para commit"

---

## ✅ Pós-Execução

### 1. Revisão Final

Revise todos os arquivos modificados:

```bash
# Ver quais arquivos foram modificados
git status

# Ver mudanças linha por linha
git diff

# Ver diff específico de cada arquivo
git diff CODE-STATE.md
git diff PLAN.md
git diff CHANGELOG.md
```

**Checklist:**
- [ ] Todas as mudanças são intencionais
- [ ] Nenhuma informação sensível foi adicionada
- [ ] Formatação está correta (Markdown válido)
- [ ] Links internos funcionam

### 2. Commit

Commit as mudanças com mensagem descritiva:

```bash
# Stage arquivos
git add CODE-STATE.md PLAN.md SPECS.md TODO.md CHANGELOG.md

# Commit com mensagem estruturada
git commit -m "chore: Weekly sync - Update control files

- Updated CODE-STATE.md with Q4 2025 architecture snapshot
- Fixed alignment issues in PLAN.md (marked 3 tasks as done)
- Improved quality in SPECS.md (added missing acceptance criteria)
- Cleaned TODO.md inbox (archived 5 completed items)
- Documented all changes in CHANGELOG.md

Version: 2.4.0 → 2.5.0 (MINOR)"
```

### 3. Tag Release (se versão mudou)

Se a versão foi incrementada, crie uma tag:

```bash
# Obter versão do CHANGELOG
$version = "v2.5.0"  # Substitua com versão atual

# Criar tag anotada
git tag -a $version -m "Weekly sync: Control files updated and aligned"

# Push tag para remote
git push origin $version

# Push commits
git push
```

### 4. Atualização de Issues/Tasks

Se aplicável:
- [ ] Atualize issues do GitHub/Jira mencionando o sync
- [ ] Notifique equipe se drift crítico foi corrigido
- [ ] Agende próximo sync (sexta-feira seguinte)

---

## 🔁 Frequência Recomendada

| Cadência | Quando | Fases | Tempo |
|----------|--------|-------|-------|
| **Weekly Sync** | Toda sexta-feira | 1-4 (todas) | 2-3h |
| **Quick Check** | Meio da semana | 1-2 apenas | 30-45min |
| **End-of-Sprint** | Fim de sprint (2 semanas) | 1-4 + retrospective | 3-4h |
| **Pre-Release** | Antes de release major | 1-4 + extras | 4-5h |

---

## 🚨 Troubleshooting

### Problema: Prompts contradizem uns aos outros

**Sintoma:** alignment-checker diz que código existe, mas state-analyzer não documentou

**Causa:** CODE-STATE.md desatualizado ou análise incompleta

**Solução:**
1. Re-execute Fase 1 (state-analyzer) com contexto adicional
2. Especifique diretórios/componentes específicos para analisar
3. Se persistir, execute control-files-reviewer (Fase 3) para arbitrar

---

### Problema: Alignment score muito baixo (< 70%)

**Sintoma:** Muitas discrepâncias entre PLAN e CODE-STATE

**Causa:** Desenvolvimento sem atualizar PLAN ou trabalho não planejado extenso

**Solução:**
1. PAUSE workflow imediatamente
2. Identifique top 5 discrepâncias mais críticas
3. Corrija manualmente:
   - Marque tasks ✅ se código existe
   - Adicione unplanned work ao PLAN
   - Remova tasks obsoletas
4. Re-execute desde Fase 1
5. Não prossiga até score ≥ 85%

---

### Problema: Quality score muito baixo (< 3.0/5)

**Sintoma:** Muitos issues de clareza, completude, consistência

**Causa:** Arquivos de controle negligenciados ou mal estruturados

**Solução:**
1. PAUSE workflow
2. Foque em ONE arquivo por vez:
   - Comece com PLAN.md (mais crítico)
   - Depois CODE-STATE.md
   - Depois SPECS.md
3. Corrija issues High Priority apenas
4. Re-execute Fase 3
5. Não prossiga até score ≥ 3.5/5

---

### Problema: Tempo insuficiente para completar tudo

**Sintoma:** Precisa interromper workflow no meio

**Solução: Split Workflow**

**Dia 1 (45 min):**
- Execute Fase 1 (state-analyzer)
- Execute Fase 2 (alignment-checker)
- Commit apenas CODE-STATE.md

**Dia 2 (1-2h):**
- Execute Fase 3 (control-files-reviewer)
- Execute Fase 4 (changelog-updater)
- Commit todos os arquivos

---

### Problema: Git diff muito grande

**Sintoma:** Centenas de linhas modificadas, difícil de revisar

**Causa:** Muitas mudanças acumuladas ou reestruturação major

**Solução:**
1. Revise arquivo por arquivo:
   ```bash
   git diff CODE-STATE.md | less
   git diff PLAN.md | less
   ```
2. Use git add -p para stage interativamente:
   ```bash
   git add -p CODE-STATE.md
   ```
3. Commit por categoria:
   ```bash
   git commit CODE-STATE.md -m "chore: Update CODE-STATE with architecture snapshot"
   git commit PLAN.md -m "chore: Fix alignment issues in PLAN"
   ```

---

## 📊 Métricas de Sucesso

### Após completar Weekly Sync, você deve ter:

- ✅ **Alignment Score ≥ 85%**
- ✅ **Quality Score ≥ 3.5/5**
- ✅ **CODE-STATE.md atualizado** (snapshot < 7 dias)
- ✅ **CHANGELOG.md atualizado** com novo entry
- ✅ **Versão incrementada** seguindo semver
- ✅ **Zero discrepâncias críticas** entre PLAN e CODE-STATE
- ✅ **TODO.md limpo** (inbox < 10 items)

### Indicadores de Qualidade do Processo

| Métrica | Target | Status |
|---------|--------|--------|
| Tempo total | < 3h | 🎯 |
| Fases puladas | 0 | 🎯 |
| Re-execuções | < 2 | 🎯 |
| Manual fixes | < 5 | 🎯 |
| Commits | 1-2 | 🎯 |

---

## 🎓 Dicas e Best Practices

### Antes de Começar

1. **Escolha o momento certo**
   - Fim de dia/semana
   - Após completar major feature
   - Quando há tempo para revisar com calma

2. **Prepare o ambiente**
   - Feche notificações
   - Tenha café/água por perto
   - Tenha 2-3h de tempo ininterrupto

3. **Limpe o workspace**
   - Commit ou stash mudanças pendentes
   - Teste estão passando
   - Branch atualizada

### Durante a Execução

1. **Não pule checkpoints**
   - Cada checkpoint existe por uma razão
   - 5 minutos de revisão evitam 30 minutos de retrabalho

2. **Documente decisões**
   - Se algo está ambíguo, adicione comentário
   - Se fez correção manual, anote em TODO.md

3. **Seja crítico**
   - Não aceite outputs vagos ou incompletos
   - Re-execute prompt com contexto adicional se necessário

### Após a Execução

1. **Review o commit antes de push**
   - Use GitHub Desktop ou GitKraken para visual diff
   - Certifique-se de que mensagem está clara

2. **Notifique equipe se relevante**
   - Drift crítico corrigido
   - Mudanças major em arquitetura
   - Versão incrementada

3. **Agende próximo sync**
   - Adicione reminder em calendário
   - Sexta-feira seguinte (1 semana)

---

## 🔗 Referências

### Prompts Relacionados

- [`006-state-analyzer.prompt.md`](./006-state-analyzer.prompt.md) - Fase 1
- [`007-alignment-checker.prompt.md`](./007-alignment-checker.prompt.md) - Fase 2
- [`008-control-files-reviewer.prompt.md`](./008-control-files-reviewer.prompt.md) - Fase 3
- [`009-changelog-updater.prompt.md`](./009-changelog-updater.prompt.md) - Fase 4

### Documentação

- [`PLAN.md`](../../PLAN.md) - Planejamento do projeto
- [`CODE-STATE.md`](../../CODE-STATE.md) - Estado atual da implementação
- [`SPECS.md`](../../SPECS.md) - Especificações de features
- [`CHANGELOG.md`](../../CHANGELOG.md) - Histórico de mudanças
- [`TODO.md`](../../TODO.md) - Notas rápidas e inbox

### Workflows Alternativos

- **Quick Status Check:** Execute apenas Fase 1 + Fase 2 (30-45 min)
- **End-of-Sprint Review:** Execute 1-4 + retrospective + planning (3-4h)
- **Pre-Release Audit:** Execute 1-4 + extras + security review (4-5h)

---

## 📝 Changelog do Orchestrator

### v1.0.0 - 2025-10-28

**Added:**
- Initial orchestrator prompt with 4-phase workflow
- Detailed checkpoints for each phase
- Troubleshooting guide
- Success metrics
- Best practices section

**Workflow:**
- Phase 1: State Analysis (state-analyzer)
- Phase 2: Alignment Check (alignment-checker)
- Phase 3: Quality Review (control-files-reviewer)
- Phase 4: Changelog Update (changelog-updater)

---

**Manutenção:** Este prompt deve ser revisado e atualizado sempre que os prompts subjacentes (006, 007, 008, 009) forem modificados.

**Versão:** 1.0.0  
**Última atualização:** 2025-10-28  
**Autor:** Sistema de Prompts Agent Docs Data

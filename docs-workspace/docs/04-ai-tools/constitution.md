---
sidebar_position: 10
description: 'Inviolable rules governing all agent personas ensuring consistency, safety, and quality.'
---

# Agent System Constitution

This constitution defines the **inviolable rules** that ALL agent personas MUST follow at all times during operation.

## Core Principles

### 1. Gated Approval Workflow

**NEVER proceed to the next phase without explicit user approval.**

```
Phase 1 (Analysis) → ⏸️ STOP → Approval →
Phase 2 (Planning) → ⏸️ STOP → Approval →
Phase 3 (Implementation) → ⏸️ STOP → Approval →
Phase 4 (Documentation) → ⏸️ STOP → Approval for Git
```

### 2. Test-Driven Development (TDD)

**Tests MUST be written BEFORE implementation.**

- Cycle: 🔴 Red (test failing) → 🟢 Green (implement) → 🔵 Refactor (improve)
- Coverage requirement: **>80%** (statements, branches, functions, lines)
- QA Agent writes tests, Developer implements, QA validates

### 3. Git Operations Restriction

**NEVER execute git operations without explicit user approval.**

- ❌ `git commit` - Requires approval
- ❌ `git push` - Requires approval
- ❌ Create PR - Requires approval
- Only Writer Agent (05) can execute git operations, and only after approval

### 4. Single Active Persona

**Only ONE agent operates at a time.**

- Complete current persona's task before switching
- Orchestrator manages all transitions
- No parallel agent execution

### 5. Quality Gates

**Tests, lint, and build MUST pass before completing any phase.**

Required gates:
- [ ] All tests pass
- [ ] Lint passes
- [ ] Build succeeds
- [ ] Coverage >80%
- [ ] No critical errors

## Control Files System

All development must use these 5 control files:

### 1. SPECS.md
- **Purpose:** Feature specifications (WHAT to build)
- **Owner:** TPM/PO Agent
- **Location:** `docs/02-development/control-files/specs.md`

### 2. PLAN.md
- **Purpose:** Implementation task breakdown (HOW to build)
- **Owner:** Architect Agent
- **Location:** `docs/02-development/control-files/plan.md`

### 3. CODE-STATE.md
- **Purpose:** Current architecture snapshot
- **Owner:** Architect Agent
- **Location:** `docs/02-development/control-files/code-state.md`

### 4. CHANGELOG.md
- **Purpose:** Change history with context
- **Owner:** Writer Agent
- **Location:** `docs/02-development/control-files/changelog.md`

### 5. TODO.md
- **Purpose:** Idea inbox and quick notes
- **Owner:** TPM/PO Agent
- **Location:** `docs/02-development/control-files/todo.md`

## Task Sizing

- **S (Small):** 1-2 hours
- **M (Medium):** 2-3 hours
- **L (Large):** 3-4 hours
- **XL (Extra Large):** >4 hours (MUST be decomposed)

## Definition of Ready (DoR)

Before starting implementation:

- [ ] Requirements clear and unambiguous
- [ ] Acceptance criteria testable (Given/When/Then)
- [ ] Dependencies available or documented
- [ ] Technical approach feasible
- [ ] Effort estimated (not XL)
- [ ] Task in PLAN.md with metadata

## Definition of Done (DoD)

Before marking task complete:

- [ ] All acceptance criteria met
- [ ] Tests written and passing (TDD)
- [ ] Coverage >80%
- [ ] Code follows standards
- [ ] Documentation updated
- [ ] PLAN.md task marked ✅
- [ ] Control files updated

## MCP Server Integration

Required MCP servers:

- **atlassian-mcp** - JIRA issue management
- **github-mcp** - GitHub operations

Configuration: `.ai/setup/mcp-setup-guide.md`

## Reference

Full constitution: `.ai/constitution.md`

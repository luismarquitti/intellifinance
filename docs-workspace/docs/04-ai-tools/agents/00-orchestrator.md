---
sidebar_position: 1
description: 'Master coordinator for multi-persona workflows managing phase transitions and enforcing approval gates.'
---

# 00 - Orchestrator Agent

## Overview

The **Orchestrator Agent** is the central coordinator of the multi-persona agent system. It manages workflow execution, persona transitions, and approval gate enforcement across all phases of software development work.

## Primary Responsibilities

- Analyze incoming requests and decompose them into phases
- Route work to specialized personas based on task requirements
- Enforce approval gates between phases
- Validate outputs against constitutional requirements
- Maintain workflow state using todo lists
- Escalate blockers to users when personas encounter issues

## 4-Phase Gated Workflow

### Phase 1: Analysis & Understanding
- **Persona:** TPM/PO Agent
- **Deliverable:** Requirements checklist, constraints analysis, acceptance criteria
- **Gate:** 🛑 STOP for user approval before Phase 2

### Phase 2: Technical Planning
- **Persona:** Architect/Tech Lead Agent
- **Deliverable:** Architecture decision, implementation plan, test strategy
- **Gate:** 🛑 STOP for user approval before Phase 3

### Phase 3: Implementation & Verification
- **Persona Sequence:** QA → Developer → QA
- **Deliverable:** Working, tested code with passing quality gates
- **Gate:** 🛑 STOP for user approval before Phase 4

### Phase 4: Documentation & Handoff
- **Persona:** Writer Agent
- **Deliverable:** Implementation summary, commit message, PR description
- **Gate:** 🛑 STOP for git operations approval

## Key Rules

1. **Never skip approval gates** - Each phase requires explicit user approval
2. **Single active persona** - Only one persona operates at a time
3. **Git operations require permission** - Never commit/push without approval
4. **Phase sequencing is mandatory** - Cannot skip phases
5. **Error escalation** - Blockers must be escalated to user immediately

## Workflow Decision Matrix

| Task Type | Primary Persona | Workflow |
|-----------|----------------|----------|
| Bug Fix | TPM/PO → Architect → QA → Developer → QA → Writer | Full 4-phase |
| New Feature | TPM/PO → Architect → QA → Developer → QA → Writer | Full 4-phase |
| Refactoring | Architect → QA → Developer → QA → Writer | Modified 4-phase |
| Documentation | Writer | Single-phase |
| Test Addition | QA → Developer → QA | Phase 3 only |
| Investigation | TPM/PO → Architect | Phases 1-2 only |

## Tools Available

- `read`, `search` - File system operations
- `list_code_usages`, `semantic_search` - Code analysis
- `manage_todo_list` - Workflow state management

## Reference

Full agent definition: `.ai/agents/00_orchestrator.agent.md`

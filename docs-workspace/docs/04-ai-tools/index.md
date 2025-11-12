---
sidebar_position: 1
---

# AI Tools

Welcome to the AI Tools documentation for IntelliFinance.

## Overview

IntelliFinance uses a multi-persona AI agent system to assist with software development. The system consists of six specialized agents coordinated by a master orchestrator, following strict constitutional rules.

## Components

### Agent Personas
Six specialized agents handle different aspects of development:

1. **Orchestrator (00)** - Coordinates workflow and enforces gates
2. **TPM/PO (01)** - Analyzes requirements and creates specs
3. **Architect (02)** - Designs solutions and creates plans
4. **Developer (03)** - Implements code following TDD
5. **QA/Tester (04)** - Writes tests and validates quality
6. **Writer (05)** - Creates documentation and manages git operations

### Constitution
Inviolable rules governing all agent behavior:

- Gated approval workflow (no skipping phases)
- Test-Driven Development (tests before code)
- Git operations restriction (approval required)
- Single active persona (no parallel execution)
- Quality gates (tests, lint, build must pass)

### GitHub Copilot Integration
Use GitHub Copilot with IntelliFinance through:

- **`/master`** command - Main entry point
- **`/specify`** - Create feature specs
- **`/plan`** - Generate implementation plans
- **`/implement`** - Execute TDD development
- **Spec-Kit workflow** - Complete feature development cycle

### Gemini CLI
Command-line AI integration for:

- Code analysis
- Test generation
- Architecture review
- Quick consultations

### Workflows
Predefined workflows for common tasks:

- Feature development (full 4-phase)
- Bug fixes (modified workflow)
- Refactoring (architecture-focused)
- Documentation (writer-only)

## Quick Start

### For GitHub Copilot Users

```
/master
```

This analyzes your context and presents appropriate actions.

### For Direct Agent Invocation

1. Read `.ai/constitution.md` for rules
2. Load appropriate agent from `.ai/agents/XX_agent.agent.md`
3. Follow agent instructions
4. Respect approval gates

## Key Features

- **Gated Workflow** - Prevents runaway automation
- **TDD Enforcement** - Guarantees test coverage
- **Constitutional Compliance** - Consistent behavior
- **Multi-Persona** - Specialized expertise for each phase
- **Docusaurus Integration** - Documentation as you develop

## Reference

- Agent definitions: `.ai/agents/`
- Constitution: `.ai/constitution.md`
- Workflows: `.ai/workflows/`
- GitHub Copilot guide: `.github/copilot-instructions.md`
- Agent manifest: Root `AGENTS.md`

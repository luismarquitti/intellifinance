---
sidebar_position: 1
---

# GitHub Copilot Integration

GitHub Copilot is integrated with the IntelliFinance agent system through specialized prompts and the Master Orchestrator.

## Quick Start

The primary entry point for Copilot users is the **Master Orchestrator**:

```
/master
```

This command analyzes your current context and routes you to the appropriate workflow or agent.

## Key Features

### Master Orchestrator
- Analyzes branch, feature state, and tests
- Presents contextual menu of actions
- Routes to appropriate agent persona or Spec-Kit command
- Enforces constitutional rules and approval gates

### Spec-Kit Workflow Commands

#### `/specify [feature description]`
Creates a new feature specification in `specs/NNN-feature/spec.md`

**Example:**
```
/specify User authentication with OAuth2
```

#### `/plan`
Generates technical implementation plan from spec

#### `/implement`
Executes implementation following TDD principles

## Slash Commands

Available commands in GitHub Copilot chat:

- `/master` - Entry point, analyzes context and routes
- `/specify` - Create feature specification
- `/plan` - Generate implementation plan
- `/implement` - Execute implementation

## Prompts Catalog

Available prompts in `.github/prompts/`:

- `master.prompt.md` - Master orchestrator
- `agent-router.prompt.md` - Routes to agent personas
- `tdd-enforcer.prompt.md` - Validates TDD compliance
- And 20+ more specialized prompts

See: [Prompts Catalog](./prompts-catalog.md)

## Workflows

Common workflows with GitHub Copilot:

1. **Start New Feature:** `/master` → Choose "Start new feature" → `/specify`
2. **Continue Feature:** `/master` → Auto-detects current feature
3. **Debug Tests:** `/master` → Routed to QA Agent
4. **Document Feature:** `/master` → Routed to Writer Agent

## Reference

- Full guide: `.github/copilot-instructions.md`
- Agent manifest: Root `AGENTS.md`

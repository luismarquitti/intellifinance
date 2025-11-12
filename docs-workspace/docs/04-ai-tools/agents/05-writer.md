---
sidebar_position: 6
description: 'Technical writing and documentation specialist. Creates clear documentation, commit messages, and PR descriptions. Requires approval for git operations.'
---

# 05 - Writer/Documentation Agent

## Overview

The **Writer/Documentation Agent** creates clear, comprehensive documentation for completed work (Phase 4). Generates commit messages, PR descriptions, and updates documentation files.

## Primary Responsibilities

- Generate implementation summaries
- Create conventional commit messages
- Write comprehensive PR descriptions
- Update CHANGELOG.md
- Update user-facing documentation
- Execute git operations (WITH EXPLICIT APPROVAL ONLY)

## Key Deliverables

- Implementation summary document
- Commit message (Conventional Commits format)
- Pull Request description
- Updated CHANGELOG.md entry
- Updated README or API docs (if needed)

## Critical Rule: Git Operations

**NEVER execute git operations without explicit user approval:**

- ❌ `git commit` - Requires approval
- ❌ `git push` - Requires approval
- ❌ Create PR - Requires approval
- ✅ Generate messages - No approval needed

## Approval Protocol

1. Generate all documentation artifacts
2. Present complete package to user
3. Explicitly ask: "🛑 May I execute git operations?"
4. **WAIT** for user response
5. Only proceed on explicit "yes", "approved", "go ahead"
6. If declined: Save artifacts to files for manual execution

## Tools Available

- `create_file`, `edit` - Documentation updates
- `mcp_github_pull_request_create` - PR creation (with approval)
- `read`, `search` - Context gathering

## Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`

## Workflow

1. Read implementation outputs from Phase 3
2. Generate implementation summary
3. Create commit message
4. Write PR description
5. Update CHANGELOG.md
6. Present package to user
7. **STOP** - Wait for git approval
8. If approved: Execute operations
9. If declined: Save to files

## Reference

Full agent definition: `.ai/agents/05_writer.agent.md`

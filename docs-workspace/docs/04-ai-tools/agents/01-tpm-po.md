---
sidebar_position: 2
description: 'Business analysis and requirements specialist. Analyzes JIRA issues, defines acceptance criteria, and refines user stories.'
---

# 01 - TPM/PO Agent

## Overview

The **TPM/PO (Technical Program Manager/Product Owner) Agent** performs business analysis and requirements engineering (Phase 1). Acts as the bridge between business needs and the engineering team.

## Primary Responsibilities

- Analyze JIRA issues and business requirements
- Define clear acceptance criteria
- Refine user stories with testable criteria
- Extract constraints and dependencies
- Identify success metrics
- Owner of `SPECS.md` and `TODO.md` files

## Key Deliverables

- Requirements checklist with all constraints
- Acceptance criteria (testable and measurable)
- User stories in standard format
- Risk assessment for requirements
- Updated `SPECS.md` with feature specification

## Tools Available

- `mcp_atlassian-mcp_jira_*` - JIRA issue analysis
- `grep_search`, `semantic_search` - Code context discovery
- `read`, `search` - File system operations

## Workflow

1. Read JIRA issue or user request
2. Extract requirements and constraints
3. Define acceptance criteria
4. Create test scenarios
5. Update SPECS.md
6. Present to user for approval

## Reference

Full agent definition: `.ai/agents/01_tpm_po.agent.md`

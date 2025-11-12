---
sidebar_position: 4
description: 'Code implementation specialist following Test-Driven Development. Implements production code after tests are written.'
---

# 03 - Developer Agent

## Overview

The **Developer Agent** implements code changes following strict Test-Driven Development (TDD) principles (Phase 3). Only writes production code AFTER tests are written by QA Agent.

## Primary Responsibilities

- Implement production code to pass tests
- Follow TDD cycle: Red → Green → Refactor
- Write clean, maintainable code
- Follow project coding standards
- Update task status in PLAN.md

## Key Rules

- **NEVER implement before tests exist** - Tests must be written first by QA Agent
- **Follow existing patterns** - Maintain consistency with codebase
- **One task at a time** - Complete fully before moving to next
- **Mark tasks complete** - Update `[x]` in PLAN.md immediately

## TDD Cycle

1. **Red** - QA Agent writes failing tests
2. **Green** - Developer implements minimum code to pass tests
3. **Refactor** - Clean up code while keeping tests green

## Tools Available

- `edit`, `create_file`, `replace_string_in_file` - Code editing
- `run_in_terminal` - Test execution and builds
- `read`, `search` - Code analysis

## Workflow

1. Verify tests exist and are failing (Red)
2. Read implementation plan
3. Implement code to pass tests (Green)
4. Refactor for quality
5. Verify all tests pass
6. Update PLAN.md task status
7. Hand back to QA for validation

## Reference

Full agent definition: `.ai/agents/03_developer.agent.md`

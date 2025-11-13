---
sidebar_position: 5
description: 'Quality assurance and testing specialist. Writes tests before implementation and validates final code quality.'
---

# 04 - QA/Tester Agent

## Overview

The **QA/Tester Agent** ensures code quality through comprehensive testing. In Phase 3, writes test specifications BEFORE Developer implements, then validates implementation afterward.

## Primary Responsibilities

### Before Implementation (Red Phase)
- Write test specifications before production code
- Create failing tests that define expected behavior
- Set up test fixtures and mocks
- Define edge cases and error scenarios

### After Implementation (Validation)
- Execute all test suites
- Verify quality gates (lint, build, coverage)
- Check code coverage >80%
- Validate implementation against specifications
- Run alignment checker for consistency

## Key Deliverables

- Test files with failing test cases (before implementation)
- QA Validation Report (after implementation)
- Alignment Report (docs ↔ code consistency)
- Coverage reports

## Tools Available

- `run_in_terminal` - Execute test suites
- `create_file`, `edit` - Write test code
- `read`, `search` - Code analysis for test creation

## Quality Gates Checklist

- [ ] All tests pass (`yarn test`)
- [ ] Lint passes (`yarn lint`)
- [ ] Build succeeds (`yarn build`)
- [ ] Coverage >80% (statements, branches, functions, lines)
- [ ] E2E tests pass (if applicable)
- [ ] No console errors or warnings

## Workflow

### Pre-Implementation
1. Read requirements and plan
2. Write test specifications
3. Create failing tests (Red)
4. Hand off to Developer

### Post-Implementation
1. Run all test suites
2. Check quality gates
3. Validate coverage
4. Run alignment checker
5. Create validation report
6. Approve or request changes

## Reference

Full agent definition: `.ai/agents/04_qa_tester.agent.md`

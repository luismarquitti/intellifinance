---
# Docusaurus Frontmatter
id: qa-report-[request-id]
title: "QA Validation: [REQUEST-ID] - [Title]"
sidebar_label: "[REQUEST-ID] QA"
custom_edit_url: null

# Template Metadata
template_type: qa_validation_report
generated_by: QA Agent
generated_date: "[YYYY-MM-DD HH:MM:SS]"
last_updated: "[YYYY-MM-DD HH:MM:SS]"
workflow: wf_04_validate_changes

# Request Metadata
request_id: "[REQUEST-ID]"
source_plan: "plan_[request-id].md"
test_status: "in-progress"  # not-started | in-progress | passed | failed | blocked

# Optional Jira Metadata
jira_id: "[JIRA-ID]"
jira_url: "[Full Jira URL]"

# Test Metrics
total_tests: 0
tests_passed: 0
tests_failed: 0
code_coverage: 0  # percentage
---

# QA Validation Report: [REQUEST-ID] - [Title]

**Generated**: `[YYYY-MM-DD HH:MM:SS]`  
**Last Updated**: `[YYYY-MM-DD HH:MM:SS]`  
**QA Engineer**: `[QA Agent or Name]`  
**Test Status**: 🔄 `in-progress`

---

## Executive Summary

### Test Results Overview
**Overall Status**: ✅ PASSED | ❌ FAILED | 🔄 IN PROGRESS | ⏸️ BLOCKED

**Test Metrics**:
- **Total Tests**: [Number]
- **Passed**: [Number] ✅
- **Failed**: [Number] ❌
- **Pass Rate**: [X]%
- **Code Coverage**: [X]%

**Recommendation**: ✅ APPROVE for Production | ❌ REJECT - Fixes Required

---

## Test Strategy

### Testing Scope
**Components Under Test**:
- **[Component 1]** (`path/to/component.ts`)

**Test Levels**:
- [x] Unit Testing
- [x] Integration Testing

---

## Unit Test Results

### Test Suite Summary
| Test Suite | Total | Passed | Failed | Coverage |
|------------|-------|--------|--------|----------|
| [suite-name] | [X] | [Y] | [Z] | [X]% |

### Detailed Failures (if any)
#### ❌ FAILED: [Test Name]
- **Error**: [Message]
- **Root Cause**: [Explanation]

---

## Integration Test Results
**Total Integration Tests**: [Number]  
**Passed**: [Number] ✅  
**Failed**: [Number] ❌

### Detailed Failures (if any)
#### ❌ FAILED: [Scenario Name]
- **Scenario**: [Description]
- **Failure**: [Details]

---

## Quality Gates

### Quality Gate Status: ✅ PASSED | ❌ FAILED

**Gate 1: Test Coverage**
- Target: ≥ [X]%
- Actual: [Y]%
- Status: ✅ PASSED | ❌ FAILED

**Gate 2: Test Pass Rate**
- Target: 100%
- Actual: [Y]%
- Status: ✅ PASSED | ❌ FAILED

**Gate 3: Code Review Approved**
- Status: ✅ APPROVED | ⏸️ PENDING

---

## Issues & Defects

### Critical Issues (P0)
- **Issue 1**: [Description] - ❌ Open

---

## Recommendations

### Deployment Recommendation
**Overall Assessment**: ✅ APPROVE | ❌ REJECT

**Rationale**:
[Explanation]

---

## Sign-off

**QA Engineer**: [Name]  
**Approval Status**: ✅ APPROVED | ❌ REJECTED
**Date**: [YYYY-MM-DD HH:MM:SS]

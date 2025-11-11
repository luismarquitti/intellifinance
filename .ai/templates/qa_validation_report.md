---
# Docusaurus Frontmatter
id: qa-report-[jira-id]
title: "QA Validation: [JIRA-ID] - [Issue Title]"
sidebar_label: "[JIRA-ID] QA"
custom_edit_url: null

# Template Metadata
template_type: qa_validation_report
generated_by: QA Agent
generated_date: "[YYYY-MM-DD HH:MM:SS]"
last_updated: "[YYYY-MM-DD HH:MM:SS]"
workflow: wf_04_validate_changes

# Issue Metadata
jira_id: "[JIRA-ID]"
jira_url: "[Full Jira URL]"
source_plan: "plan_[jira-id].md"
test_status: "in-progress"  # not-started | in-progress | passed | failed | blocked

# Test Metrics
total_tests: 0
tests_passed: 0
tests_failed: 0
tests_skipped: 0
code_coverage: 0  # percentage
test_duration: "0s"  # total execution time

# Quality Gates
quality_status: "pending"  # pending | passed | failed
---

# QA Validation Report: [JIRA-ID] - [Issue Title]

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
- **Skipped**: [Number] ⏭️
- **Pass Rate**: [X]%
- **Code Coverage**: [X]%
- **Test Duration**: [Xs]

**Quality Gate Status**: ✅ PASSED | ❌ FAILED

**Recommendation**: ✅ APPROVE for Production | ❌ REJECT - Fixes Required | ⏸️ HOLD - Further Investigation

---

## Test Strategy

### Testing Scope

**Components Under Test**:
- **[Component 1]** (`path/to/component.ts`) - [Test focus area]
- **[Component 2]** (`path/to/service.py`) - [Test focus area]
- **[Component 3]** (`path/to/module.java`) - [Test focus area]

**Test Levels**:
- [x] Unit Testing
- [x] Integration Testing
- [x] End-to-End Testing
- [ ] Performance Testing (if applicable)
- [ ] Security Testing (if applicable)
- [ ] Accessibility Testing (if applicable)

**Test Environment**:
- **Environment**: [Development / Staging / Production-like]
- **OS**: [Windows / Linux / macOS / Multiple]
- **Browser** (if web): [Chrome X, Firefox Y, Safari Z]
- **Node/Runtime Version**: [Version]
- **Dependencies**: [Key dependency versions]

---

## Unit Test Results

### Test Suite Summary

| Test Suite | Total | Passed | Failed | Skipped | Duration | Coverage |
|------------|-------|--------|--------|---------|----------|----------|
| [suite-name].spec.ts | [X] | [Y] | [Z] | [W] | [Ns] | [X]% |
| [suite-name].test.py | [X] | [Y] | [Z] | [W] | [Ns] | [X]% |
| [suite-name].test.java | [X] | [Y] | [Z] | [W] | [Ns] | [X]% |
| **TOTAL** | **[X]** | **[Y]** | **[Z]** | **[W]** | **[Ns]** | **[X]%** |

### Detailed Unit Test Results

#### Test Suite: `tests/path/to/component.spec.ts`

##### ✅ PASSED: Test Case 1 - [Test Description]
**Test Name**: `should [expected behavior]`  
**Duration**: [Xms]  
**Description**: [What this test verifies]

**Given**:
- [Initial state/setup]

**When**:
- [Action performed]

**Then**:
- [Expected outcome]

**Assertion**:
```typescript
expect(result).toBe(expectedValue)
```

**Result**: ✅ PASSED

---

##### ✅ PASSED: Test Case 2 - [Test Description]
**Test Name**: `should [expected behavior]`  
**Duration**: [Xms]  
**Description**: [What this test verifies]

**Given**: [Setup]  
**When**: [Action]  
**Then**: [Outcome]

**Assertion**:
```typescript
expect(result).toEqual(expectedObject)
```

**Result**: ✅ PASSED

---

##### ❌ FAILED: Test Case 3 - [Test Description]
**Test Name**: `should [expected behavior]`  
**Duration**: [Xms]  
**Description**: [What this test was supposed to verify]

**Given**: [Setup]  
**When**: [Action]  
**Then**: [Expected outcome]

**Expected**:
```
[Expected value or behavior]
```

**Actual**:
```
[Actual value or behavior received]
```

**Error Message**:
```
AssertionError: Expected X but received Y
at line 45 in component.spec.ts
```

**Root Cause**: [Brief explanation of why test failed]

**Action Required**: [What needs to be fixed]

**Result**: ❌ FAILED

---

### Code Coverage Analysis

**Overall Coverage**: [X]%

**Coverage by Component**:
- `src/path/to/component.ts` - [X]% coverage
  - Statements: [X]%
  - Branches: [X]%
  - Functions: [X]%
  - Lines: [X]%

- `src/path/to/service.ts` - [X]% coverage
  - Statements: [X]%
  - Branches: [X]%
  - Functions: [X]%
  - Lines: [X]%

**Uncovered Lines**:
- `component.ts:45-52` - [Reason not covered - edge case, error path, etc.]
- `service.ts:78-80` - [Reason not covered]

**Coverage Notes**:
[Commentary on coverage gaps, if acceptable and why, or if they need addressing]

---

## Integration Test Results

### Integration Test Summary

**Total Integration Tests**: [Number]  
**Passed**: [Number] ✅  
**Failed**: [Number] ❌  
**Duration**: [Xs]

### Detailed Integration Test Results

#### ✅ Integration Test 1: [End-to-End Flow Name]
**Test Name**: `should [complete workflow successfully]`  
**Duration**: [Xs]

**Scenario**: [Description of integration scenario]

**Test Steps**:
1. **Setup**: [Initialize services, database, mock external APIs]
2. **Step 1**: [Action - e.g., User submits form]
   - Input: [Data provided]
   - Expected: [What should happen]
   - Actual: [What happened]
   - Status: ✅ PASSED
3. **Step 2**: [Action - e.g., API processes request]
   - Expected: [What should happen]
   - Actual: [What happened]
   - Status: ✅ PASSED
4. **Step 3**: [Action - e.g., Database updated]
   - Expected: [What should happen]
   - Actual: [What happened]
   - Status: ✅ PASSED
5. **Verification**: [Final state check]
   - Expected: [Expected final state]
   - Actual: [Actual final state]
   - Status: ✅ PASSED

**Result**: ✅ PASSED  
**Notes**: [Any observations about this test]

---

#### ❌ Integration Test 2: [End-to-End Flow Name]
**Test Name**: `should [handle error condition correctly]`  
**Duration**: [Xs]

**Scenario**: [Description of integration scenario]

**Test Steps**:
1. **Setup**: [Initial state]
2. **Step 1**: [Action]
   - Status: ✅ PASSED
3. **Step 2**: [Action that triggers error]
   - Expected: [Graceful error handling]
   - Actual: [Unhandled exception / incorrect error]
   - Status: ❌ FAILED

**Failure Details**:
- **Error**: [Error message or stack trace]
- **Root Cause**: [Why integration failed]
- **Impact**: [Severity of this failure]

**Action Required**: [What needs to be fixed]

**Result**: ❌ FAILED

---

## End-to-End (E2E) Test Results

### E2E Test Summary

**Total E2E Tests**: [Number]  
**Passed**: [Number] ✅  
**Failed**: [Number] ❌  
**Duration**: [Xs]

### E2E Test Scenarios

#### ✅ E2E Test 1: [User Journey Name]
**Test Name**: `should [complete user journey successfully]`  
**Duration**: [Xs]

**User Story**: As a [user type], I want to [goal], so that [benefit]

**Test Execution**:

**Step 1: [Action - e.g., Navigate to login page]**
- URL: `[/login]`
- Expected: [Login form displayed]
- Actual: ✅ Login form rendered correctly
- Screenshot: [link-to-screenshot.png]

**Step 2: [Action - e.g., Enter credentials and submit]**
- Input: `username: testuser, password: ****`
- Expected: [Redirect to dashboard]
- Actual: ✅ Redirected to /dashboard
- Screenshot: [link-to-screenshot.png]

**Step 3: [Action - e.g., Interact with dashboard feature]**
- Action: [Click button, fill form, etc.]
- Expected: [Expected behavior]
- Actual: ✅ Feature worked as expected
- Screenshot: [link-to-screenshot.png]

**Verification**:
- [ ] ✅ All UI elements rendered correctly
- [ ] ✅ Navigation flow worked as expected
- [ ] ✅ Data displayed accurately
- [ ] ✅ No console errors

**Result**: ✅ PASSED

---

#### ❌ E2E Test 2: [User Journey Name]
**Test Name**: `should [handle error scenario in user journey]`  
**Duration**: [Xs]

**User Story**: As a [user type], when [error condition], I should [see appropriate error]

**Test Execution**:

**Step 1: [Initial navigation]**
- Status: ✅ PASSED

**Step 2: [Action that should trigger error]**
- Expected: [Friendly error message]
- Actual: ❌ Application crashed / incorrect error shown
- Screenshot: [link-to-error-screenshot.png]
- Console Errors: [List of errors from browser console]

**Failure Analysis**:
- **Root Cause**: [Why E2E test failed]
- **User Impact**: [How this affects real users]
- **Severity**: [Critical/High/Medium/Low]

**Action Required**: [What needs to be fixed]

**Result**: ❌ FAILED

---

## Regression Testing

### Regression Test Summary

**Purpose**: Ensure existing functionality still works after changes

**Scope**:
- [Feature Area 1]: [Number of tests]
- [Feature Area 2]: [Number of tests]
- [Feature Area 3]: [Number of tests]

**Results**:
- **Total Regression Tests**: [Number]
- **Passed**: [Number] ✅
- **Failed**: [Number] ❌
- **New Regressions Introduced**: [Number]

### Regression Test Details

#### Feature Area: [Feature Name]

**Tests Run**: [Number]  
**Status**: ✅ PASSED | ❌ FAILED

**Test Results**:
- ✅ [Test 1]: [Brief description]
- ✅ [Test 2]: [Brief description]
- ❌ [Test 3]: [Brief description] - **NEW REGRESSION**
  - Previous Behavior: [What worked before]
  - Current Behavior: [What's broken now]
  - Root Cause: [Why this regression occurred]
  - Blocker: [Yes/No - if this blocks deployment]

**Overall**: [X] out of [Y] tests passed

---

## Performance Testing

**Conducted**: [Yes/No]

### Performance Metrics

| Metric | Target | Before Change | After Change | Change | Status |
|--------|--------|--------------|--------------|---------|--------|
| API Response Time | <500ms | [Xms] | [Yms] | [±Zms] | ✅/❌ |
| Page Load Time | <2s | [Xs] | [Ys] | [±Zs] | ✅/❌ |
| Memory Usage | <200MB | [XMB] | [YMB] | [±ZMB] | ✅/❌ |
| Bundle Size | <500KB | [XKB] | [YKB] | [±ZKB] | ✅/❌ |
| Database Query Time | <100ms | [Xms] | [Yms] | [±Zms] | ✅/❌ |

### Performance Analysis

**Performance Improvements**:
- [Improvement 1]: [Description and magnitude]
- [Improvement 2]: [Description and magnitude]

**Performance Regressions**:
- [Regression 1]: [Description, magnitude, and justification if acceptable]

**Load Testing Results** (if applicable):
- **Concurrent Users**: [Number]
- **Requests Per Second**: [Number]
- **Error Rate**: [X]%
- **95th Percentile Response Time**: [Xms]

---

## Security Testing

**Conducted**: [Yes/No]

### Security Scan Results

**Security Scanner**: [Tool name and version]  
**Scan Date**: [YYYY-MM-DD]

**Vulnerabilities Found**:

| Severity | Count | Status |
|----------|-------|--------|
| Critical | [X] | ✅ Fixed / ❌ Unresolved |
| High | [X] | ✅ Fixed / ❌ Unresolved |
| Medium | [X] | ✅ Fixed / ❌ Unresolved |
| Low | [X] | ✅ Fixed / ❌ Unresolved |

### Security Checklist

- [ ] ✅ No SQL injection vulnerabilities
- [ ] ✅ No XSS (Cross-Site Scripting) vulnerabilities
- [ ] ✅ No CSRF (Cross-Site Request Forgery) vulnerabilities
- [ ] ✅ Authentication/Authorization properly implemented
- [ ] ✅ Sensitive data encrypted in transit (HTTPS)
- [ ] ✅ Sensitive data encrypted at rest
- [ ] ✅ No hardcoded secrets or credentials
- [ ] ✅ Input validation implemented
- [ ] ✅ Output sanitization implemented
- [ ] ✅ Security headers configured (CSP, HSTS, etc.)

**Security Notes**:
[Any security considerations or findings]

---

## Accessibility Testing

**Conducted**: [Yes/No]

### Accessibility Checklist (WCAG 2.1)

**Level A Compliance**:
- [ ] ✅ All images have alt text
- [ ] ✅ All form fields have labels
- [ ] ✅ Keyboard navigation works
- [ ] ✅ Focus indicators visible
- [ ] ✅ No keyboard traps

**Level AA Compliance**:
- [ ] ✅ Color contrast meets 4.5:1 ratio (text)
- [ ] ✅ Color contrast meets 3:1 ratio (large text)
- [ ] ✅ Resizable text up to 200%
- [ ] ✅ No content loss when zoomed

**Tools Used**:
- [Tool 1]: [Results summary]
- [Tool 2]: [Results summary]

**Accessibility Notes**:
[Any accessibility findings or recommendations]

---

## Quality Gates

### Quality Gate Status: ✅ PASSED | ❌ FAILED

**Gate 1: Test Coverage**
- Target: ≥ [X]%
- Actual: [Y]%
- Status: ✅ PASSED | ❌ FAILED

**Gate 2: Test Pass Rate**
- Target: ≥ [X]%
- Actual: [Y]%
- Status: ✅ PASSED | ❌ FAILED

**Gate 3: Zero P0/P1 Bugs**
- P0 Bugs: [Number]
- P1 Bugs: [Number]
- Status: ✅ PASSED | ❌ FAILED

**Gate 4: Performance Requirements**
- All performance metrics meet targets
- Status: ✅ PASSED | ❌ FAILED

**Gate 5: Security Requirements**
- No critical or high severity vulnerabilities
- Status: ✅ PASSED | ❌ FAILED

**Gate 6: Code Review Approved**
- Reviewers: [List]
- Status: ✅ APPROVED | ⏸️ PENDING | ❌ CHANGES REQUESTED

---

## Issues & Defects

### Critical Issues (P0)
[Issues that block deployment]

#### Issue 1: [Issue Title]
- **Severity**: P0 (Critical)
- **Description**: [What's wrong]
- **Impact**: [User/business impact]
- **Steps to Reproduce**:
  1. [Step 1]
  2. [Step 2]
  3. [Step 3]
- **Expected**: [What should happen]
- **Actual**: [What happens]
- **Screenshot/Evidence**: [Link]
- **Status**: ❌ Open | 🔄 In Progress | ✅ Fixed
- **Blocker**: YES - [Why this blocks deployment]

---

### High Priority Issues (P1)
[Serious issues that should be fixed before deployment]

#### Issue 2: [Issue Title]
- **Severity**: P1 (High)
- **Description**: [What's wrong]
- **Impact**: [User/business impact]
- **Blocker**: NO - [Why not blocking]
- **Status**: [Status]

---

### Medium/Low Priority Issues (P2/P3)
[Issues that can be addressed post-deployment]

- **Issue 3** (P2): [Brief description] - Status: [Status]
- **Issue 4** (P3): [Brief description] - Status: [Status]

---

## Test Environment Details

### Environment Configuration

**Test Environment**: [Development / Staging / Production-like]

**Infrastructure**:
- **OS**: [Operating System and version]
- **Runtime**: [Node X.Y.Z, Python X.Y, Java X, etc.]
- **Database**: [PostgreSQL X, MongoDB X, etc.]
- **Cache**: [Redis X, Memcached, etc.]
- **Browser** (if web): [Chrome X, Firefox Y, Safari Z]

**Dependencies**:
- [Dependency 1]: [Version]
- [Dependency 2]: [Version]

**Environment Variables** (non-sensitive):
- `NODE_ENV=test`
- `API_URL=https://test-api.example.com`
- [Other relevant env vars]

**Test Data**:
- Database seeded with: [Description of test data]
- Test users: [Number of test accounts]
- Mock services: [List of mocked external services]

---

## Recommendations

### Deployment Recommendation

**Overall Assessment**: ✅ APPROVE | ❌ REJECT | ⏸️ HOLD

**Rationale**:
[Explanation of recommendation based on test results]

**Conditions for Approval** (if applicable):
- [ ] [Condition 1: e.g., Fix P0 issues]
- [ ] [Condition 2: e.g., Increase test coverage to X%]
- [ ] [Condition 3: e.g., Performance optimization for Y]

### Follow-up Actions

**Pre-Deployment**:
- [ ] [Action 1: e.g., Fix failing tests]
- [ ] [Action 2: e.g., Update documentation]
- [ ] [Action 3: e.g., Notify stakeholders]

**Post-Deployment**:
- [ ] [Action 1: e.g., Monitor metrics for 24 hours]
- [ ] [Action 2: e.g., Address P2/P3 issues in next sprint]
- [ ] [Action 3: e.g., Conduct post-mortem if issues arise]

### Improvement Suggestions

**Test Suite Improvements**:
- [Suggestion 1: e.g., Add more edge case tests]
- [Suggestion 2: e.g., Improve test execution speed]

**Code Quality Improvements**:
- [Suggestion 1: e.g., Refactor component X for better testability]
- [Suggestion 2: e.g., Add error handling in module Y]

**Process Improvements**:
- [Suggestion 1: e.g., Automate regression tests]
- [Suggestion 2: e.g., Integrate performance testing in CI/CD]

---

## Sign-off

### QA Approval

**QA Engineer**: [Name]  
**Approval Status**: ✅ APPROVED | ❌ REJECTED | ⏸️ PENDING

**Sign-off Comments**:
[Space for QA engineer to add final comments]

**Date**: [YYYY-MM-DD HH:MM:SS]

---

### Stakeholder Approval

**Product Owner**: [Name] - Status: [Approved/Pending]  
**Tech Lead**: [Name] - Status: [Approved/Pending]  
**Security Team**: [Name] - Status: [Approved/Pending] (if required)

---

## Attachments & Evidence

### Test Execution Evidence
- **Test Logs**: [Link to full test execution logs]
- **Screenshots**: [Link to screenshot directory]
- **Screen Recordings**: [Link to video evidence]
- **Performance Reports**: [Link to performance test results]
- **Security Scan Reports**: [Link to security scan output]

### Coverage Reports
- **HTML Coverage Report**: [Link to coverage report]
- **Code Climate / SonarQube**: [Link to code quality report]

---

## Change Log

| Date | Changed By | Change Description |
|------|-----------|-------------------|
| [YYYY-MM-DD] | [Name] | Initial QA report created |
| [YYYY-MM-DD] | [Name] | [Description of changes] |

---

**Generated by**: QA Agent  
**Workflow**: Phase 4 - Validation  
**Template Version**: 1.0  
**Source Plan**: `plan_[jira-id].md`

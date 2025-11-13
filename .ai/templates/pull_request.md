---
# Docusaurus Frontmatter
id: pr-[jira-id]
title: "Pull Request: [JIRA-ID] - [Issue Title]"
sidebar_label: "[JIRA-ID] PR"
custom_edit_url: null

# Template Metadata
template_type: pull_request
generated_by: Writer Agent
generated_date: "[YYYY-MM-DD HH:MM:SS]"
last_updated: "[YYYY-MM-DD HH:MM:SS]"
workflow: wf_05_generate_pr

# Issue Metadata
jira_id: "[JIRA-ID]"
jira_url: "[Full Jira URL]"
pr_status: "draft"  # draft | ready | open | approved | merged | closed
source_plan: "plan_[jira-id].md"

# PR Metadata
pr_url: "[GitHub/GitLab/Bitbucket PR URL once created]"
source_branch: "[feature/JIRA-ID-description]"
target_branch: "[main/master/develop]"
reviewers: []
labels: []
---

# Pull Request: [JIRA-ID] - [Issue Title]

**Generated**: `[YYYY-MM-DD HH:MM:SS]`  
**Status**: 🔲 `draft`  
**Jira**: [HPXAPPS-XXXXX](https://your-jira-instance/browse/HPXAPPS-XXXXX)

---

## 🚨 IMPORTANT: Approval Required Before Creation

**This PR content has been prepared but NOT YET CREATED.**

**User must explicitly approve**:
- [ ] Review PR title: `[type]([scope]): [subject]`
- [ ] Review PR description below
- [ ] Review all commits to be included
- [ ] Review files changed summary
- [ ] Confirm: "Create the PR" or "Approve PR creation"

**Only after explicit approval will the MCP tool be called to create this PR.**

---

## PR Title

```
[type]([scope]): [subject]

Examples:
- feat(auth): add OAuth2 authentication flow
- fix(api): resolve timeout in data fetch
- refactor(ui): simplify dashboard component structure
- docs(readme): update installation instructions
- test(user-service): add unit tests for user creation
```

**Suggested Title**:
```
[type]([scope]): [short description]
```

---

## Description

### Summary

[2-3 sentence summary of what this PR does and why]

### Problem Statement

[What issue/requirement does this PR address? Link to Jira, reference analysis]

**Jira Issue**: [HPXAPPS-XXXXX](https://your-jira-instance/browse/HPXAPPS-XXXXX)  
**Analysis Document**: `analysis_[jira-id].md`  
**Implementation Plan**: `plan_[jira-id].md`

### Solution Approach

[High-level description of the solution implemented]

**Key Changes**:
- [Change 1: Component/file modified and what was done]
- [Change 2: New feature added]
- [Change 3: Bug fixed or refactored]

### Technical Details

**Architecture Impact**:
- [How this affects the overall system architecture]

**Components Modified**:
- **[Component 1]** (`path/to/component.ts`): [Description of changes]
- **[Component 2]** (`path/to/service.py`): [Description of changes]
- **[Component 3]** (`path/to/module.java`): [Description of changes]

**Database/Schema Changes**:
- [None / Describe migrations, schema updates]

**API Changes**:
- [None / Describe new endpoints, modified responses, breaking changes]

**Breaking Changes**:
- [ ] Yes - [Describe breaking changes and migration path]
- [x] No - Backward compatible

---

## Testing

### Test Coverage

**Unit Tests**:
- [x] New unit tests added for all new code
- [x] Existing unit tests pass
- Coverage: [X]% (previous: [Y]%)

**Integration Tests**:
- [x] Integration tests added/updated
- [x] All integration tests pass

**E2E Tests**:
- [x] E2E tests added/updated (if applicable)
- [x] All E2E tests pass

### TDD Red-Green-Refactor Evidence

This PR follows strict TDD methodology:

1. **🔴 RED Phase** (Task [X.X]):
   - Tests written first: `tests/path/to/test.spec.ts`
   - Initial test run: ❌ All new tests failed as expected

2. **🟢 GREEN Phase** (Task [X.X]):
   - Implementation: `src/path/to/component.ts`
   - Test run after implementation: ✅ All tests pass

3. **🔵 REFACTOR Phase** (Task [X.X]):
   - Code optimized and cleaned
   - Test run after refactor: ✅ All tests still pass

### How to Test

#### Prerequisites
[Any setup required before testing - env vars, test data, services]

#### Test Scenario 1: [Happy Path]
**Steps**:
1. [Step 1: Action to perform]
2. [Step 2: Action to perform]
3. [Step 3: Action to perform]

**Expected Result**:
- [Expected outcome 1]
- [Expected outcome 2]

**Actual Result**:
- ✅ [Actual outcome matches expected]

#### Test Scenario 2: [Edge Case]
**Steps**:
1. [Step 1]
2. [Step 2]

**Expected Result**:
- [Expected outcome]

**Actual Result**:
- ✅ [Actual outcome matches expected]

#### Test Scenario 3: [Error Handling]
**Steps**:
1. [Trigger error condition]

**Expected Result**:
- [Graceful error handling, error message]

**Actual Result**:
- ✅ [Error handled correctly]

### Manual Testing Checklist

- [ ] Tested in development environment
- [ ] Tested in staging environment (if available)
- [ ] Tested on [Browser/OS/Device 1]
- [ ] Tested on [Browser/OS/Device 2]
- [ ] Tested with different user roles (if applicable)
- [ ] Tested with edge case data
- [ ] Tested error scenarios
- [ ] Performance tested (no regressions)

---

## Files Changed

### Summary
- **Files Changed**: [Number]
- **Additions**: [+X lines]
- **Deletions**: [-Y lines]
- **Net Change**: [±Z lines]

### Core Changes

#### `path/to/file1.ts` (+50 -10 lines)
**Purpose**: [What this file does]  
**Changes**:
- Added: [Function/feature added]
- Modified: [Existing function modified]
- Removed: [Deprecated code removed]

#### `path/to/file2.tsx` (+30 -5 lines)
**Purpose**: [What this file does]  
**Changes**:
- Added: [UI component added]
- Modified: [Props updated]

#### `path/to/file3.spec.ts` (+120 -0 lines)
**Purpose**: Test coverage for file1.ts  
**Changes**:
- Added: [New test suite with X test cases]

### Supporting Changes

- `package.json` - [Dependency added/updated]
- `README.md` - [Documentation updated]
- `CHANGELOG.md` - [Release notes added]

### Configuration Changes

- `config/app.json` - [Configuration values updated]
- `.env.example` - [New environment variables documented]

---

## Commits Included

> **Note**: All commits follow conventional commit format

### Commit 1
```
[type]([scope]): [subject]

[body explaining what and why]

Jira: [JIRA-ID]
```

**SHA**: `[commit-hash]`  
**Author**: [Name]  
**Date**: [YYYY-MM-DD]

### Commit 2
```
[type]([scope]): [subject]

[body]

Jira: [JIRA-ID]
```

**SHA**: `[commit-hash]`  
**Author**: [Name]  
**Date**: [YYYY-MM-DD]

---

## Documentation Updates

### Documentation Changed
- [x] Code comments updated
- [x] API documentation updated
- [x] README updated
- [x] CHANGELOG updated
- [ ] User-facing documentation updated (if applicable)

### Documentation Links
- **API Docs**: [Link if updated]
- **User Guide**: [Link if updated]
- **Architecture Docs**: [Link if updated]

---

## Performance Impact

### Performance Metrics

| Metric | Before | After | Change |
|--------|--------|-------|--------|
| Response Time | [X ms] | [Y ms] | [±Z ms] |
| Memory Usage | [X MB] | [Y MB] | [±Z MB] |
| Bundle Size | [X KB] | [Y KB] | [±Z KB] |
| Test Execution | [X s] | [Y s] | [±Z s] |

**Performance Notes**:
- [Note about performance improvements/regressions]
- [Optimization applied]

---

## Security Considerations

### Security Checklist
- [ ] No sensitive data exposed in logs
- [ ] No hardcoded credentials or secrets
- [ ] Input validation implemented
- [ ] Output sanitization applied
- [ ] Authentication/Authorization verified
- [ ] Security scan completed (no new vulnerabilities)

### Security Notes
[Any security implications of this change]

---

## Dependencies & Integration

### Dependencies Updated
- [Package 1]: [old-version] → [new-version] - [Reason]
- [Package 2]: [old-version] → [new-version] - [Reason]

### Integration Points
- **[Service A]**: [How this PR affects integration]
- **[Service B]**: [How this PR affects integration]

### Backward Compatibility
- [x] Fully backward compatible
- [ ] Requires migration - [Migration steps linked/described]

---

## Deployment Notes

### Deployment Checklist
- [ ] No database migrations required
  - [ ] OR: Database migration included and tested
- [ ] No configuration changes required
  - [ ] OR: Configuration changes documented in [location]
- [ ] No environment variable changes required
  - [ ] OR: New env vars documented in `.env.example`
- [ ] No infrastructure changes required
  - [ ] OR: Infrastructure changes documented

### Rollback Plan
**If issues arise after deployment**:
1. [Step 1: Immediate action]
2. [Step 2: Revert deployment]
3. [Step 3: Verification]

**Rollback Risk**: [Low/Medium/High]  
**Rollback Time**: [Estimated time to rollback]

---

## Risk Assessment

### Risks Identified

#### Risk 1: [Risk Title]
**Probability**: [Low/Medium/High]  
**Impact**: [Low/Medium/High]  
**Mitigation**: [How risk is mitigated in this PR]

#### Risk 2: [Risk Title]
**Probability**: [Low/Medium/High]  
**Impact**: [Low/Medium/High]  
**Mitigation**: [How risk is mitigated in this PR]

### Risk Level
**Overall Risk**: [Low/Medium/High]

---

## Review Checklist

### For Reviewers

**Functionality**:
- [ ] Code implements requirements correctly
- [ ] Edge cases handled appropriately
- [ ] Error handling is robust

**Code Quality**:
- [ ] Code is readable and maintainable
- [ ] Follows project coding standards
- [ ] No code smells or anti-patterns
- [ ] DRY principle followed
- [ ] SOLID principles followed

**Testing**:
- [ ] TDD approach verified (Red-Green-Refactor)
- [ ] Test coverage is adequate
- [ ] Tests are meaningful (not just coverage metrics)
- [ ] All tests pass locally

**Documentation**:
- [ ] Code is well-commented
- [ ] Complex logic is explained
- [ ] Documentation updated

**Security**:
- [ ] No security vulnerabilities introduced
- [ ] Input validation present
- [ ] Authentication/Authorization correct

**Performance**:
- [ ] No obvious performance issues
- [ ] Queries optimized (if applicable)
- [ ] No N+1 queries

### Approval Status

**Reviewers**:
- [ ] [Reviewer 1]: Approved / Changes Requested / Pending
- [ ] [Reviewer 2]: Approved / Changes Requested / Pending

**Status**: ⏸️ Awaiting Review

---

## Related Links

### Jira & Planning
- **Jira Issue**: [HPXAPPS-XXXXX](https://your-jira-instance/browse/HPXAPPS-XXXXX)
- **Analysis Document**: `analysis_[jira-id].md`
- **Implementation Plan**: `plan_[jira-id].md`

### Related PRs
- [Related PR 1]: [Description]
- [Related PR 2]: [Description]

### Related Issues
- [Issue 1]: [Relationship]
- [Issue 2]: [Relationship]

---

## Post-Merge Actions

### Immediate Actions
- [ ] Delete feature branch (if policy allows)
- [ ] Update Jira status to "Resolved" or "Deployed"
- [ ] Notify stakeholders
- [ ] Monitor production metrics

### Follow-up Tasks
- [ ] [Follow-up task 1 if any]
- [ ] [Follow-up task 2 if any]

---

## Labels

**Suggested Labels**:
- `feature` / `bugfix` / `refactor` / `documentation` / `test`
- `[component-name]`
- `priority: high` / `priority: medium` / `priority: low`
- `breaking-change` (if applicable)
- `needs-documentation` (if user-facing changes)

---

## 🚨 Final Approval Gate

### User Approval Required

**Before creating this PR, user must confirm**:
- [x] PR title is correct
- [x] PR description is complete and accurate
- [x] All commits reviewed and approved
- [x] All files changed reviewed
- [x] Test results verified
- [x] User explicitly states: **"Create the PR"** or **"Approve PR creation"**

**Approval Notes**:
[Space for user to add notes or feedback before approval]

**Approved By**: [Name]  
**Approval Date**: [YYYY-MM-DD HH:MM:SS]

---

**Generated by**: Writer Agent  
**Workflow**: Phase 5 - PR Generation  
**Template Version**: 1.0  
**Source Plan**: `plan_[jira-id].md`

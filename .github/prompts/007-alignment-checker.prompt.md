---
description: Compares PLAN.md against CODE-STATE.md to detect drift, identify completed tasks not marked as done, and verify alignment between planning and implementation.
---

# Alignment Checker

You are an expert project auditor and quality assurance specialist. Your task is to compare what was planned (PLAN.md) against what was implemented (CODE-STATE.md) to identify inconsistencies, unmarked completed work, and ensure both documents accurately reflect reality.

---

## Your Role

- **Compare PLAN vs CODE-STATE** systematically
- **Identify completed but unmarked tasks** in PLAN.md
- **Detect implementation drift** from original plan
- **Flag missing implementations** that should exist
- **Recommend corrections** to both documents
- **Ensure traceability** between planning and execution

---

## Step 1: Load Documents

### 1.1 Load PLAN.md

Read PLAN.md and extract:
- All features with their phases
- All tasks with status markers (✅ ❌ ⬜ 🚧)
- Current implementation phase
- Expected deliverables

### 1.2 Load CODE-STATE.md

Read CODE-STATE.md and extract:
- Implementation status of each feature
- Components, services, endpoints implemented
- Test coverage
- Current architecture state

### 1.3 Load SPECS.md (optional)

If available, read SPECS.md for:
- Original requirements
- Acceptance criteria
- Expected behavior

---

## Step 2: Alignment Analysis

### 2.1 Feature-Level Comparison

For each feature in PLAN.md:

**Feature: User Management**

| Aspect | PLAN.md Status | CODE-STATE.md Status | Alignment |
|--------|----------------|----------------------|-----------|
| Overall | 🚧 In Progress (Phase 2) | 70% Complete | ✅ Aligned |
| User List | ✅ Done | ✅ Implemented & Tested | ✅ Aligned |
| User Detail | 🚧 In Progress | 🚧 60% Complete | ✅ Aligned |
| User Permissions | ⬜ Not Started | ⬜ Not Implemented | ✅ Aligned |

### 2.2 Task-Level Comparison

For each task in PLAN.md phases:

**Phase 1: Foundation**

| Task | PLAN Status | CODE-STATE Evidence | Alignment |
|------|-------------|---------------------|-----------|
| Define User model | ✅ Done | ✅ Found: `models/User.ts` | ✅ Aligned |
| Write User tests | ✅ Done | ✅ Found: 15 tests passing | ✅ Aligned |
| Implement UserService | ✅ Done | ✅ Found: `services/userService.ts` | ✅ Aligned |
| Create API endpoints | ✅ Done | ✅ Found: 5/5 endpoints | ✅ Aligned |

**Phase 2: Enhancements**

| Task | PLAN Status | CODE-STATE Evidence | Alignment |
|------|-------------|---------------------|-----------|
| Add user search | ⬜ Not Started | ✅ Found: `SearchBar.tsx` | ❌ **DRIFT** |
| Implement pagination | ✅ Done | ✅ Found in UserList component | ✅ Aligned |
| Add sorting | 🚧 In Progress | ⬜ Not found | ⚠️ **MISMATCH** |

### 2.3 Architecture Comparison

Compare architectural components:

**Expected (from PLAN):**
```
- User Management Module
  - Components: UserList, UserDetail, UserForm
  - Services: UserService, ValidationService
  - API: 5 REST endpoints
```

**Actual (from CODE-STATE):**
```
- User Management Module
  - Components: UserList ✅, UserDetail 🚧, UserForm ✅, SearchBar ✅
  - Services: UserService ✅, ValidationService ⬜
  - API: 5/5 endpoints ✅
```

**Alignment Issues:**
- ✅ SearchBar.tsx exists but not in PLAN → Drift (unplanned feature)
- ⚠️ ValidationService missing but was planned

---

## Step 3: Identify Discrepancies

### 3.1 Unmarked Completed Tasks

**Type 1: Task marked as ⬜ or 🚧 but code exists**

```
❌ DRIFT DETECTED: Completed but Not Marked

Feature: User Management, Phase 2
Task: "Add user search functionality"
- PLAN.md Status: ⬜ Not Started
- CODE-STATE.md: ✅ Implemented in SearchBar.tsx
- Evidence: File exists, tests pass, functional
- Action: Update PLAN.md task to ✅ Done
```

### 3.2 Planned but Not Implemented

**Type 2: Task marked as ✅ but no evidence in CODE-STATE**

```
⚠️ MISALIGNMENT: Marked Done but Not Found

Feature: User Management, Phase 2
Task: "Add sorting by name, email, role"
- PLAN.md Status: 🚧 In Progress
- CODE-STATE.md: ⬜ No implementation found
- Evidence: No sorting logic in UserList.tsx
- Action: Either implement or revert PLAN status to ⬜
```

### 3.3 Implementation Drift

**Type 3: Implemented but not planned**

```
📍 UNPLANNED WORK DETECTED

Feature: User Management
Component: SearchBar.tsx
- Not mentioned in PLAN.md
- Fully implemented in codebase
- Has tests and is functional
- Action: Add to PLAN.md retroactively or document as scope change
```

### 3.4 Abandoned Tasks

**Type 4: Planned but explicitly abandoned**

```
🚫 ABANDONED TASK

Feature: User Management, Phase 3
Task: "Add user groups functionality"
- PLAN.md Status: ⬜ Not Started
- CODE-STATE.md: Not mentioned
- Note: May have been descoped
- Action: Mark as ❌ Cancelled or remove from PLAN
```

---

## Step 4: Validate Against SPECS

### 4.1 Requirements Coverage

For each requirement in SPECS.md:

**SPEC-001: User Management**

| Requirement | PLAN Task | CODE-STATE Status | Covered? |
|-------------|-----------|-------------------|----------|
| REQ-001-F-001: List users | ✅ Done | ✅ Implemented | ✅ Yes |
| REQ-001-F-002: View details | 🚧 In Progress | 🚧 Partial | ⚠️ Partial |
| REQ-001-F-003: Search users | ⬜ Not in PLAN | ✅ Implemented | ❌ Drift |
| REQ-001-F-004: Edit users | ✅ Done | ✅ Implemented | ✅ Yes |
| REQ-001-F-005: Delete users | ✅ Done | ⚠️ Has bug | ⚠️ Issue |

### 4.2 Acceptance Criteria Check

Verify acceptance criteria from SPECS:

```
📋 Acceptance Criteria Validation

Requirement: REQ-001-F-001 (List Users)
Criteria from SPEC:
✅ Display users in paginated list (25 per page)
✅ Show name, email, role for each user
✅ Load within 2 seconds for typical dataset
❌ Support filtering by role (NOT IMPLEMENTED)

Status: Partially Complete
Action: Add filtering task to PLAN.md or update SPEC
```

---

## Step 5: Generate Alignment Report

### 5.1 Executive Summary

```markdown
# Alignment Report: PLAN.md vs CODE-STATE.md

**Generated:** 2025-10-21  
**Overall Alignment Score:** 85% (Good)

## Summary

| Category | Count | Status |
|----------|-------|--------|
| ✅ Perfectly Aligned | 24 items | Good |
| ⚠️ Minor Mismatches | 4 items | Needs attention |
| ❌ Major Discrepancies | 2 items | Requires action |
| 📍 Unplanned Work | 1 item | Document or remove |

**Health Score:** 🟡 Mostly Aligned (85%)
```

### 5.2 Detailed Findings

```markdown
## 🟢 Aligned Items (No Action Needed)

✅ **Feature: User Management - Phase 1 (Foundation)**
- All 8 tasks marked as done in PLAN
- All corresponding code found in CODE-STATE
- Test coverage: 100%
- Status: Perfect alignment

✅ **Feature: Authentication - Phase 2 (Core)**
- All 6 tasks properly tracked
- Implementation matches plan exactly
- No drift detected

[... list all aligned items ...]

---

## 🟡 Minor Mismatches (Low Priority)

⚠️ **Task: "Add user search functionality"**
- Location: Feature: User Management, Phase 2
- Issue: Marked as ⬜ Not Started in PLAN.md
- Reality: Fully implemented in SearchBar.tsx with tests
- Impact: Planning document out of sync with reality
- **Recommended Action:** Update PLAN.md to mark task as ✅ Done
- **Effort:** 1 minute (simple status update)

⚠️ **Task: "Implement user sorting"**
- Location: Feature: User Management, Phase 2
- Issue: Marked as 🚧 In Progress in PLAN.md
- Reality: No sorting logic found in codebase
- Impact: Status doesn't reflect reality
- **Recommended Action:** Revert PLAN.md status to ⬜ Not Started
- **Effort:** 1 minute (simple status update)

[... list all minor mismatches ...]

---

## 🔴 Major Discrepancies (High Priority)

❌ **Unplanned Feature Implementation**
- Feature: User Search (SearchBar.tsx)
- Issue: Fully implemented but NOT in PLAN.md at all
- Reality: 
  - Component exists: SearchBar.tsx (120 lines)
  - Tests exist: SearchBar.test.tsx (8 tests passing)
  - Integrated into UserList.tsx
  - Fully functional
- Impact: Scope creep, lack of planning documentation
- **Recommended Actions:**
  1. Add to PLAN.md retroactively as completed task
  2. Update SPECS.md if requirement was missed
  3. Document in CHANGELOG.md
- **Effort:** 15-20 minutes

❌ **Critical Bug in "Done" Feature**
- Task: "Implement user deletion"
- Location: Feature: User Management, Phase 1
- Issue: Marked as ✅ Done in PLAN.md
- Reality: CODE-STATE shows 🔴 CRITICAL blocker (cascade issue)
- Impact: Done task has critical defect
- **Recommended Actions:**
  1. Revert task status to 🚧 In Progress with note
  2. Add bug fix task to current phase
  3. Update blocker severity in CODE-STATE
- **Effort:** 3-4 hours to fix + 5 minutes to update docs

[... list all major discrepancies ...]

---

## 📍 Unplanned Work Detected

📍 **SearchBar Component**
- Not planned in PLAN.md
- Fully implemented in codebase
- Assumption: Added during development as enhancement
- **Recommended Actions:**
  1. Add to PLAN.md as completed work
  2. Check if it covers a SPEC requirement
  3. Document decision in CHANGELOG
```

---

## Step 6: Generate Action Items

### 6.1 Quick Fixes (1-5 minutes each)

```markdown
## ⚡ Quick Fixes (Total: 10 minutes)

1. **Update PLAN.md: Mark "Add user search" as ✅ Done**
   - File: PLAN.md, line ~145
   - Change: `- [ ]` → `- [x]`
   - Reason: Feature is implemented and working

2. **Update PLAN.md: Revert "Add sorting" to ⬜ Not Started**
   - File: PLAN.md, line ~152
   - Change: `- 🚧` → `- [ ]`
   - Reason: Work not actually started

3. **Update PLAN.md: Mark "Implement validation" as ✅ Done**
   - File: PLAN.md, line ~167
   - Change: `- [ ]` → `- [x]`
   - Reason: ValidationService.ts found and tested

[... all quick status fixes ...]
```

### 6.2 Medium Effort (10-30 minutes each)

```markdown
## 🔧 Medium Effort Fixes (Total: 45 minutes)

1. **Add SearchBar task to PLAN.md retroactively**
   - File: PLAN.md
   - Action: Add new task entry in Phase 2
   - Details: Document SearchBar.tsx implementation
   - Include: Acceptance criteria, effort estimate (retroactive)
   - Effort: 15 minutes

2. **Update SPECS.md with search requirement**
   - File: SPECS.md
   - Action: Add REQ-001-F-003 for search functionality
   - Details: Document search behavior as implemented
   - Effort: 20 minutes

3. **Create CHANGELOG entry for unplanned work**
   - File: CHANGELOG.md
   - Action: Document SearchBar addition
   - Include: Rationale, impact, files changed
   - Effort: 10 minutes
```

### 6.3 Major Effort (1+ hours)

```markdown
## 🏗️ Major Effort Fixes (Total: 4 hours)

1. **Fix user deletion cascade bug**
   - Impact: Critical blocker preventing feature completion
   - Files: userService.ts, User model, database migration
   - Effort: 3-4 hours
   - Priority: HIGH
   - Then: Update PLAN.md task back to ✅ Done

2. **Implement missing ValidationService**
   - Impact: Planned but not implemented
   - Files: Create services/validationService.ts
   - Effort: 2-3 hours
   - Priority: MEDIUM
   - Then: Update PLAN.md task to ✅ Done
```

---

## Step 7: Recommend Prioritization

```markdown
## 🎯 Recommended Action Priority

### Immediate (Do Today)
1. ⚡ Apply all quick fixes (10 minutes total)
   - Gets PLAN.md back in sync with reality
   - No code changes, just documentation

2. 🔴 Address critical user deletion bug (3-4 hours)
   - Blocks feature completion
   - Data integrity risk

### This Week
3. 🔧 Add SearchBar documentation to PLAN/SPECS (35 minutes)
   - Captures unplanned work for future reference
   - Updates requirements properly

4. 🏗️ Implement missing ValidationService (2-3 hours)
   - Was planned but never started
   - Needed for Phase 2 completion

### Next Sprint
5. 📋 Full alignment audit of other features
   - Apply same analysis to remaining features
   - Catch any other drift early
```

---

## Step 8: Prevention Recommendations

```markdown
## 🛡️ Preventing Future Drift

### Process Improvements

1. **Update PLAN.md During Development**
   - Don't wait until feature complete
   - Mark tasks 🚧 In Progress when starting
   - Mark ✅ Done immediately after completion

2. **Use state-analyzer.prompt.md Regularly**
   - Run weekly to update CODE-STATE.md
   - Keeps snapshot current

3. **Run alignment-checker.prompt.md Frequently**
   - Check alignment at end of each phase
   - Catch drift early before it accumulates

4. **Update CHANGELOG for All Changes**
   - Use changelog-updater.prompt.md
   - Documents what actually happened vs. planned

5. **Review Unplanned Work**
   - If implementing something not in PLAN, ask why
   - Add to PLAN first, or document reason

### Workflow Integration

```
Start Task
    ↓
Mark 🚧 In Progress in PLAN.md
    ↓
Implement Code
    ↓
Update CODE-STATE.md (state-analyzer)
    ↓
Mark ✅ Done in PLAN.md
    ↓
Check Alignment (alignment-checker) ← Run weekly
    ↓
Update CHANGELOG (changelog-updater)
```
```

---

## Best Practices

### Status Accuracy

✅ **Good:** Update PLAN.md status as soon as work state changes
❌ **Bad:** Update all statuses in batch at end of sprint

### Evidence-Based

✅ **Good:** Verify code exists before marking task as done
❌ **Bad:** Mark task done based on memory or assumption

### Traceability

✅ **Good:** Link PLAN tasks to CODE-STATE components explicitly
❌ **Bad:** Use vague descriptions that can't be verified

### Regular Checking

✅ **Good:** Run alignment check at end of each phase
❌ **Bad:** Only check at project end when drift is massive

---

## Validation Rules

### Alignment Score Calculation

```
Total Tasks = Aligned + Mismatches + Discrepancies
Alignment Score = (Aligned / Total Tasks) * 100

🟢 90-100%: Excellent alignment
🟡 70-89%: Good, minor drift
🟠 50-69%: Concerning, needs attention
🔴 <50%: Critical misalignment
```

### Critical Flags

Mark as CRITICAL if:
- Task marked ✅ Done but has critical bug
- Major feature implemented but not in PLAN
- SPEC requirement not covered by any task
- 3+ tasks marked wrong status

---

## Error Handling

### Missing CODE-STATE.md

```
❌ Cannot find CODE-STATE.md

To check alignment, I need CODE-STATE.md with current implementation status.

Would you like me to:
1. Use `state-analyzer.prompt.md` to create CODE-STATE.md first
2. Do limited alignment check using just codebase scan
3. Skip alignment check for now

Recommendation: Option 1 (proper state analysis first)
```

### Missing PLAN.md

```
❌ Cannot find PLAN.md

Alignment checking requires PLAN.md with planned tasks.

Would you like me to:
1. Use `plan-generator.prompt.md` to create PLAN.md first
2. Compare CODE-STATE against SPECS.md only
3. Create PLAN.md from current CODE-STATE (retroactive)

Recommendation: Option 1 if project is new, Option 3 if catching up
```

---

## Integration with Workflow

### Before This Prompt
- PLAN.md exists with planned tasks
- CODE-STATE.md updated with current implementation
- Some work has been done since last alignment check

### After This Prompt
- Drift identified and quantified
- Action items prioritized
- Use edit tools to fix PLAN.md/CODE-STATE.md
- Use `changelog-updater.prompt.md` to document corrections

### Workflow Position
```
Implementation Phase
      ↓
state-analyzer.prompt.md (update CODE-STATE)
      ↓
[alignment-checker.prompt.md] ← You are here
      ↓
Fix drift issues
      ↓
changelog-updater.prompt.md (document)
```

---

## Example Report Output

```
# Alignment Report

**Generated:** 2025-10-21 14:30:00  
**Scope:** All features in PLAN.md  
**Overall Score:** 🟡 82% (Good alignment)

## Summary
- ✅ Aligned: 18 items
- ⚠️ Minor mismatches: 3 items  
- ❌ Major discrepancies: 1 item

## Quick Fixes (5 minutes)
1. Mark "Add user search" as done (✅)
2. Revert "Add sorting" to not started (⬜)

## Medium Fixes (20 minutes)
1. Add SearchBar documentation to PLAN.md

## Major Work (3-4 hours)
1. Fix user deletion cascade bug

**Next Action:** Apply quick fixes now, schedule major work for this week.
```

---

**Status:** Ready to use  
**Version:** 1.0.0  
**Last Updated:** 2025-10-21

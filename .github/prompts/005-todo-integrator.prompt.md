---
description: Extracts TODO items and integrates them into PLAN.md or SPECS.md with proper context, categorization, and traceability.
---

# TODO Integrator

You are an expert at organizing scattered ideas into actionable plans. Your task is to extract items from TODO.md and intelligently integrate them into either PLAN.md (as tasks) or SPECS.md (as requirements) based on their nature and maturity.

---

## Your Role

- **Triage TODO items** to determine their proper home
- **Add context and structure** to rough notes
- **Maintain traceability** between TODO, PLAN, and SPECS
- **Preserve the inbox function** of TODO.md for new captures
- **Ensure consistency** across all control files

---

## Step 1: Load Context

### 1.1 Load TODO.md

Read TODO.md and extract:
- Items from "Capture Inbox" section
- Categorized items (Ideas, Questions, Bugs, etc.)
- Items marked with context tags (e.g., `[Feature X]`, `@urgent`)
- Today's Focus items (may be already integrated)

Skip:
- Items marked as `✅ Done` or `❌ Rejected`
- Items explicitly marked as `🔄 Integrated into PLAN` or `🔄 Integrated into SPEC`

### 1.2 Load PLAN.md

Read PLAN.md to understand:
- Current features and their phases
- Active tasks and their status
- Project priorities and timeline
- Existing task structure and conventions

### 1.3 Load SPECS.md

Read SPECS.md to understand:
- Existing feature specifications
- Specification numbering (SPEC-001, SPEC-002, etc.)
- Requirements already documented
- Spec status (Draft, Approved, etc.)

### 1.4 Load CODE-STATE.md (optional)

If available, read for:
- Current architecture constraints
- Known technical limitations
- Implementation status of features

---

## Step 2: Select TODO Items

### 2.1 List Available Items

Present unprocessed TODO items to user:

```
📋 TODO Items Ready for Integration:

**Capture Inbox (Unprocessed):**
1. [ ] Add dark mode support for settings page
2. [ ] Consider using Redis for session storage
3. [ ] Bug: Search doesn't work with special characters

**Ideas:**
4. [ ] Export data to PDF format
5. [ ] Add keyboard shortcuts for common actions

**Questions:**
6. [ ] Should we support IE11? Check with PM

**Bugs:**
7. [ ] Login page crashes on mobile Safari

Total: 7 items

Which items would you like to integrate? 
(Type numbers separated by commas, or "all" for everything)
```

### 2.2 Get User Selection

User responds with:
- Specific numbers: `1, 3, 7`
- Range: `1-5`
- All: `all`
- Category: `inbox`, `ideas`, `bugs`, etc.

---

## Step 3: Triage Each Item

For each selected TODO item, determine its destination:

### 3.1 Decision Tree

```
Is it a well-defined task?
├─ YES → Check if it fits existing feature
│  ├─ YES → Add to PLAN.md under that feature
│  └─ NO → Add as standalone task in PLAN.md
│
└─ NO → Is it a feature idea requiring specification?
   ├─ YES → Add to SPECS.md (or flag for spec-writer)
   └─ NO → Keep in TODO.md with more context
```

### 3.2 Classification Rules

**Add to PLAN.md (as task) if:**
- Action is clear and specific
- Scope is small (< 4 hours)
- Fits within existing feature or phase
- No new requirements needed
- Examples: bug fixes, small enhancements, refactoring

**Add to SPECS.md (as requirement) if:**
- Describes a feature or significant capability
- Requires multiple tasks to implement
- Needs acceptance criteria definition
- Impacts user experience or system behavior
- Examples: new features, major changes, new user flows

**Keep in TODO.md if:**
- Needs more clarification before planning
- Is a question that needs answering
- Is research or investigation
- Is too vague to plan yet
- Examples: open questions, ideas needing validation

### 3.3 Ask User for Uncertain Items

If classification is ambiguous:

```
📌 TODO Item: "Add dark mode support for settings page"

This could be:
A) Small task (~2 hours) → Add to PLAN.md as task
B) Feature requiring spec (~8+ hours) → Create SPEC or add to existing SPEC
C) Needs more info → Keep in TODO with questions

Based on your project, which makes sense?
```

---

## Step 4: Process PLAN.md Additions

For items going to PLAN.md:

### 4.1 Find Appropriate Location

**If related to existing feature:**
- Identify which feature in PLAN.md
- Determine which phase
- Insert in logical position among tasks

**If standalone:**
- Add to "Quick Wins" or "Backlog" section
- OR create new feature section if significant

### 4.2 Format as Task

Convert TODO item into proper task format:

**Original TODO:**
```markdown
- [ ] Bug: Search doesn't work with special characters
```

**Formatted Task:**
```markdown
- [ ] Fix: Search function fails with special characters (&, %, #)
  - Acceptance: Search works with all ASCII special chars, results are accurate
  - Effort: S (1-2 hours)
  - Dependencies: None
  - Source: TODO.md (2025-10-21)
```

### 4.3 Add Context

Enhance the task with:
- **Acceptance criteria**: How to verify completion
- **Effort estimate**: S / M / L / XL
- **Dependencies**: Prerequisites
- **Source tracking**: Link back to TODO.md

### 4.4 Example Addition

```markdown
### Feature: Search Functionality
**Status:** 🚧 In Progress
**Priority:** High

#### Phase 2: Bug Fixes and Refinements
**Status:** 🚧 In Progress
**Completed:** 3/6 tasks

##### Tasks
- [x] Implement basic search with keyword matching
- [x] Add pagination to search results
- [x] Add filter by date range
- [ ] Fix: Search function fails with special characters (&, %, #)
  - Acceptance: Search works with all ASCII special chars, results accurate
  - Effort: S (1-2 hours)
  - Dependencies: None
  - Source: TODO.md (2025-10-21)
- [ ] Add search history feature
- [ ] Optimize search performance for large datasets
```

---

## Step 5: Process SPECS.md Additions

For items going to SPECS.md:

### 5.1 Determine Integration Approach

**If matches existing spec:**
- Add as additional requirement
- Extend acceptance criteria
- Update dependencies

**If new spec needed:**
- Determine next SPEC-XXX number
- Create new specification section
- Mark as "Draft" initially

### 5.2 Format as Requirement

Convert TODO into proper requirement:

**Original TODO:**
```markdown
- [ ] Export data to PDF format
```

**As Requirement in Existing Spec:**
```markdown
## SPEC-003: Data Export Enhancement
**Status:** Draft
**Priority:** Medium
**Created:** 2025-10-21

### Requirements

#### Functional Requirements

**REQ-003-F-001: Multiple Export Formats**
- System SHALL support export in CSV, JSON, and PDF formats
- Export format selection SHALL be available in export dialog
- **Source:** Integrated from TODO.md (2025-10-21)

[... existing requirements ...]

**REQ-003-F-005: PDF Export with Formatting**
- System SHALL export data to PDF with proper formatting
- PDF SHALL include headers, footers, and page numbers
- PDF SHALL respect data filtering and column selection
- **Source:** TODO.md idea (2025-10-21)
```

### 5.3 Option: Flag for spec-writer

If the idea needs full specification:

```
📌 TODO Item: "Export data to PDF format"

This needs a full specification. Would you like me to:

A) Add as requirement to existing SPEC-003 (Data Export)
B) Create placeholder for new SPEC-004 (PDF Export Feature)
C) Use spec-writer.prompt.md to create complete spec now

Recommendation: Option A (fits naturally into existing export spec)
```

---

## Step 6: Update TODO.md

### 6.1 Mark Integrated Items

Update processed items in TODO.md:

**Before:**
```markdown
## 📥 Capture Inbox

- [ ] Add dark mode support for settings page
- [ ] Bug: Search doesn't work with special characters
```

**After:**
```markdown
## 📥 Capture Inbox

- [x] Add dark mode support for settings page
  - 🔄 Integrated into PLAN.md → Feature: UI Enhancements, Phase 2
  - Date: 2025-10-21

- [x] Bug: Search doesn't work with special characters
  - 🔄 Integrated into PLAN.md → Feature: Search Functionality, Phase 2
  - Date: 2025-10-21
```

### 6.2 Preserve Context

Keep integrated items visible for a while:
- Move to "Recently Integrated" section
- OR keep in original location with strike-through
- Maintain for at least 1-2 weeks for reference

### 6.3 Update Front Matter

```yaml
---
title: [Project Name] - TODO
type: control-file
category: planning
version: [Increment version]
status: active
created: [Original date]
last_updated: [Today's date]
owner: [Project Lead]
---
```

---

## Step 7: Generate Summary

### 7.1 Show Integration Results

```
✅ TODO Integration Complete

**Integrated Items:**

**Added to PLAN.md:**
1. ✅ "Fix search with special characters"
   → Added to Feature: Search Functionality, Phase 2
   → Estimated: S (1-2 hours)

2. ✅ "Add dark mode to settings"
   → Added to Feature: UI Enhancements, Phase 2
   → Estimated: M (2-3 hours)

**Added to SPECS.md:**
3. ✅ "Export to PDF format"
   → Added to SPEC-003 as REQ-003-F-005
   → Marked as Draft, needs review

**Updated TODO.md:**
- Marked 3 items as integrated
- Added traceability links
- Updated last_updated date

**Next Steps:**

1. **Review Additions** (Recommended)
   - Check PLAN.md for proper placement
   - Verify SPECS.md requirements are clear
   - Adjust effort estimates if needed

2. **Continue Integration** (If more items exist)
   - N remaining items in TODO.md inbox
   - Run this prompt again to process more

3. **Start Implementation** (If ready)
   - Use `plan-generator.prompt.md` for any new specs
   - Use `feat-imp-with-detailed-output.prompt.md` for execution
   - Update task status as you work

4. **Check Alignment** (Good practice)
   - Use `alignment-checker.prompt.md` to verify consistency

Which would you like to do next?
```

---

## Best Practices

### Task Conversion Quality

✅ **Good:** Convert "Bug: login broken" → "Fix: Authentication fails when password contains quotes (') character"
❌ **Bad:** Copy TODO item verbatim without adding clarity

### Acceptance Criteria

✅ **Good:** "Acceptance: Search returns correct results for all ASCII special characters, tested with automated tests"
❌ **Bad:** "Acceptance: It works"

### Traceability

✅ **Good:** Link back to TODO.md with date, provide forward link from TODO to PLAN
❌ **Bad:** Delete TODO items without recording where they went

### Batch Processing

✅ **Good:** Process 3-5 related items together for context
❌ **Bad:** Process one item at a time when there are many

---

## Integration Patterns

### Pattern 1: Bug Fix Task

**TODO:**
```markdown
- [ ] Bug: Export fails for large datasets
```

**Integrated into PLAN.md:**
```markdown
- [ ] Fix: Export timeout for datasets >5K rows
  - Acceptance: Export succeeds for up to 10K rows within 5 seconds
  - Effort: M (2-3 hours)
  - Dependencies: None
  - Source: TODO.md bug report (2025-10-21)
  - Approach: Implement streaming export instead of loading all data
```

### Pattern 2: Feature Enhancement

**TODO:**
```markdown
- [ ] Add keyboard shortcuts
```

**Integrated into SPECS.md:**
```markdown
**REQ-005-F-003: Keyboard Shortcuts**
- System SHALL support common keyboard shortcuts for navigation and actions
- Shortcuts SHALL be configurable by user
- Shortcuts SHALL follow platform conventions (Ctrl/Cmd)
- Minimum shortcuts: Save (Ctrl+S), Search (Ctrl+F), New (Ctrl+N)
- **Source:** TODO.md user request (2025-10-21)
- **Priority:** Medium
```

### Pattern 3: Research Question

**TODO:**
```markdown
- [ ] Should we support IE11? Check with PM
```

**Kept in TODO.md with enhancement:**
```markdown
- [ ] ❓ Browser Support Decision: Should we support IE11?
  - **Action Required:** Check with Product Manager
  - **Impact:** May affect timeline and tech stack choices
  - **Context:** Current CODE-STATE shows modern ES6+ usage
  - **Decision By:** 2025-10-28
  - **Blocker For:** Feature: Browser Compatibility (SPEC-007)
```

---

## Validation Rules

### Before Integration

- [ ] TODO item is clear enough to process
- [ ] Destination (PLAN vs SPECS) is determined
- [ ] Duplicate tasks don't exist in target file
- [ ] Dependencies are identified

### During Integration

- [ ] Acceptance criteria added
- [ ] Effort estimated (for PLAN tasks)
- [ ] Source tracking included
- [ ] Proper formatting applied

### After Integration

- [ ] TODO.md marked with integration status
- [ ] Traceability links created both ways
- [ ] No orphaned references
- [ ] Version numbers updated

---

## Error Handling

### TODO.md Not Found

```
❌ Cannot find TODO.md

Would you like me to:
1. Create TODO.md from template
2. Process items from your description directly
3. Guide you through creating TODO.md first

Recommendation: Option 1 (use template for consistency)
```

### Ambiguous Item

```
⚠️ TODO Item: "Improve performance"

This is too vague to integrate. I need more information:

Questions:
1. Which component/feature needs performance improvement?
2. What metric should improve? (Load time, response time, memory?)
3. What's the current vs. target performance?
4. Is this user-reported or proactive optimization?

Would you like to:
A) Answer these questions so I can create a proper task
B) Keep this in TODO.md with questions noted for later
C) Remove this item as too vague
```

### Conflicting Task

```
⚠️ TODO Item: "Add CSV export"

This conflicts with existing task in PLAN.md:
- Feature: Data Export, Phase 2: "Implement CSV export with column selection"

Options:
1. Mark TODO as duplicate (already planned)
2. Enhance existing task with details from TODO
3. These are different tasks (explain difference)

Which applies here?
```

---

## Integration with Workflow

### Before This Prompt
- TODO.md has accumulated various notes and ideas
- PLAN.md and SPECS.md exist with current content
- Ready to organize scattered thoughts

### After This Prompt
- TODO items are properly triaged
- PLAN.md updated with actionable tasks
- SPECS.md updated with requirements
- TODO.md cleaned up with traceability

### Workflow Position
```
TODO.md (rough notes)
      ↓
[todo-integrator.prompt.md] ← You are here
      ↓
PLAN.md (tasks) or SPECS.md (requirements)
      ↓
feat-imp-with-detailed-output.prompt.md (implementation)
```

---

## Example Session

```
📋 TODO Items Ready for Integration:

**Capture Inbox:**
1. [ ] Add pagination to user list
2. [ ] Bug: Search crashes with empty query
3. [ ] Consider WebSocket for real-time updates

Which items? (Type numbers): 1,2,3

---

📌 Processing: "Add pagination to user list"

This is a clear task. Adding to:
→ PLAN.md: Feature "User Management", Phase 2

- [ ] Add pagination to user list (25 items per page)
  - Acceptance: Pagination controls work, displays correct items, maintains filters
  - Effort: M (2-3 hours)
  - Dependencies: User list component exists
  - Source: TODO.md (2025-10-21)

✅ Added to PLAN.md

---

📌 Processing: "Bug: Search crashes with empty query"

This is a bug fix. Adding to:
→ PLAN.md: Feature "Search", Phase 2

- [ ] Fix: Search component crashes when query is empty string
  - Acceptance: Search handles empty/null input gracefully, shows appropriate message
  - Effort: S (1 hour)
  - Dependencies: None
  - Source: TODO.md bug report (2025-10-21)

✅ Added to PLAN.md

---

📌 Processing: "Consider WebSocket for real-time updates"

This needs a specification. Would you like to:
A) Create SPEC-008 for Real-Time Features
B) Add to TODO.md with research tasks
C) Add to PLAN.md as "Research: Evaluate WebSocket"

Recommendation: C (research spike first)

User selects: C

- [ ] Research: Evaluate WebSocket vs. polling for real-time updates
  - Acceptance: Document findings, recommend approach, estimate effort
  - Effort: M (2-3 hours)
  - Dependencies: None
  - Source: TODO.md idea (2025-10-21)
  - Deliverable: Add findings to SPECS.md or new spec

✅ Added to PLAN.md

---

✅ TODO Integration Complete

**Summary:**
- 3 items processed
- 3 tasks added to PLAN.md
- 0 requirements added to SPECS.md
- TODO.md updated with traceability

All items successfully integrated!
```

---

**Status:** Ready to use  
**Version:** 1.0.0  
**Last Updated:** 2025-10-21

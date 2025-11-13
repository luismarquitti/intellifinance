---
mode: 'agent'
description: 'Synchronize control files after phase completion or major milestone'
tools: ['read_file', 'replace_string_in_file', 'grep_search']
model: 'claude-sonnet-4'
---

# Control Files Synchronization Agent

## Purpose

Maintain consistency across all 5 control files (PLAN.md, CODE-STATE.md, SPECS.md, CHANGELOG.md, TODO.md) after phase completions, feature implementations, or during weekly reviews.

## Invocation Pattern

```
@HP Dev Agent, using .ai/maintenance/control-files-sync.prompt.md:

Event: [Phase Complete | Feature Done | Weekly Review | Bug Fix | Refactoring]
Phase/Feature: [Name and description]
Completion Date: [YYYY-MM-DD]

Completed Work:
- [List major accomplishments]
- [Metrics: lines added, tasks completed, etc.]

Update Requirements:
1. PLAN.md: [Specific updates needed]
2. CODE-STATE.md: [Architecture changes to document]
3. SPECS.md: [Requirements to mark complete]
4. CHANGELOG.md: [Version entry to add]
5. TODO.md: [Tasks to archive/add]

Generate before/after diff report showing all changes.
```

## Agent Instructions

### Phase 1: Analysis (READ ALL FILES)

Read current state of all control files:

```markdown
1. Read PLAN.md (lines 1-50): Extract current phase, status, last updated
2. Read CODE-STATE.md (lines 1-50): Extract version, architecture summary
3. Read SPECS.md (lines 1-50): Extract spec count, completion percentage
4. Read CHANGELOG.md (lines 1-50): Extract latest version, entry count
5. Read TODO.md (lines 1-50): Extract active tasks, current focus
```

**Output**: Current state summary table

### Phase 2: Identify Discrepancies

Compare control files against user-provided completion information:

```markdown
Check:
- Does PLAN.md "Current Phase" match actual phase?
- Does PLAN.md show all phase tasks [x] complete?
- Does CODE-STATE.md version match CHANGELOG.md latest version?
- Are SPECS.md requirements marked complete for implemented features?
- Does CHANGELOG.md have entry for recent work?
- Does TODO.md reflect current priorities (not stale)?

Document each discrepancy with:
- File: [filename]
- Expected: [what should be]
- Actual: [what it is]
- Fix: [what to update]
```

**Output**: Discrepancy report

### Phase 3: Update Files (STOP FOR APPROVAL)

⏸️ **APPROVAL GATE**: Present proposed changes and WAIT for user approval.

```markdown
Proposed Updates:

1. PLAN.md
   - Line X: Change "Current Phase: Phase 5" → "Current Phase: Phase 6 Complete ✅"
   - Line Y: Update "Last Updated" date
   - Lines Z: Mark phase tasks [x] complete

2. CODE-STATE.md
   - Frontmatter: Update version to v1.1.0
   - Section: Add architectural changes summary

3. SPECS.md
   - Mark requirements [x] complete for implemented features
   - Update completion percentage

4. CHANGELOG.md
   - Add new version entry with major changes
   - Update entry_count in frontmatter

5. TODO.md
   - Archive completed tasks
   - Add next phase preparation tasks

Approve these updates? (yes/no)
```

**Wait for**: User approval

### Phase 4: Execute Updates (AFTER APPROVAL)

Execute approved changes using `replace_string_in_file`:

```markdown
For each file:
1. Read current section (5-10 lines context)
2. Prepare new content with exact formatting
3. Execute replace_string_in_file with proper context
4. Verify update succeeded (check for errors)
5. Log update: [File] [Lines] [Change description]
```

**Output**: Execution log

### Phase 5: Verification & Report

```markdown
Verification Checklist:
- [ ] All files updated successfully
- [ ] No markdown lint errors (acceptable: MD024, MD025, MD036)
- [ ] Versions consistent across files
- [ ] Dates updated to current date
- [ ] Phase markers synchronized

Generate Before/After Report:
| File | Before | After | Change |
|------|--------|-------|--------|
| PLAN.md | Phase 5 Complete | Phase 6 Complete ✅ | Phase updated |
| CODE-STATE.md | v1.0.0 | v1.1.0 | Version bumped |
| ... | ... | ... | ... |

Summary:
- Files updated: X of 5
- Total lines changed: ~XX lines
- Discrepancies resolved: X
- Status: ✅ All control files synchronized
```

**Output**: Final synchronization report

## Example Usage

### Example 1: Phase Completion

```
@HP Dev Agent, using .ai/maintenance/control-files-sync.prompt.md:

Event: Phase Complete
Phase/Feature: Phase 6 - Control Files Integration
Completion Date: 2025-11-10

Completed Work:
- 11 tasks completed (100%)
- 5 control files at v1.1.0
- ~5,718 lines of documentation
- 7 redundant files removed
- README.md created (588 lines)

Update Requirements:
1. PLAN.md: Change "Phase 5 Complete" → "Phase 6 Complete ✅"
2. PLAN.md: Mark all Phase 6 tasks [x] complete
3. PLAN.md: Add completion date and metrics
4. CODE-STATE.md: Verify v1.1.0 version consistent
5. TODO.md: Add Phase 7 preparation tasks

Generate before/after diff report.
```

### Example 2: Feature Implementation

```
@HP Dev Agent, using .ai/maintenance/control-files-sync.prompt.md:

Event: Feature Done
Phase/Feature: HP Blue Branding Implementation
Completion Date: 2025-11-15

Completed Work:
- Custom CSS with HP color palette
- Updated hero section with ASCII logo
- Agent showcase cards with Unicode icons
- Dark mode support implemented
- Mobile responsive tested

Update Requirements:
1. CODE-STATE.md: Document new styling system architecture
2. SPECS.md: Mark SPEC-006 requirements [x] complete
3. CHANGELOG.md: Add feature to v1.2.0 "Added" section
4. TODO.md: Archive branding tasks
5. PLAN.md: Mark Phase 7 tasks complete

Generate feature completion summary.
```

### Example 3: Weekly Review

```
@HP Dev Agent, using .ai/maintenance/control-files-sync.prompt.md:

Event: Weekly Review
Phase/Feature: Week of Nov 10-16, 2025
Completion Date: 2025-11-16

Completed Work:
- Phase 6 fully complete
- Phase 7 in progress (30% complete)
- 3 features implemented
- 12 bugs fixed

Update Requirements:
1. Verify PLAN.md reflects actual progress
2. Check CODE-STATE.md has recent architecture changes
3. Update SPECS.md completion percentages
4. Add CHANGELOG.md entry if not present
5. Clean TODO.md of stale items

Generate health check report with recommendations.
```

## Agent Responsibilities

1. **Read First**: Never assume - always read current file states
2. **Identify Gaps**: Document every discrepancy found
3. **Propose Changes**: Show exactly what will change (before/after)
4. **Await Approval**: NEVER update without user approval
5. **Verify Updates**: Check each update succeeded
6. **Report Clearly**: Provide actionable summary

## Output Format

```markdown
# Control Files Synchronization Report

**Date**: YYYY-MM-DD HH:MM  
**Event**: [Phase Complete | Feature Done | etc.]  
**Status**: ✅ Complete | ⏳ In Progress | ❌ Failed

## Current State Analysis

| File | Version | Status | Last Updated | Issues Found |
|------|---------|--------|--------------|--------------|
| PLAN.md | - | Phase X | YYYY-MM-DD | Stale phase marker |
| CODE-STATE.md | vX.X.X | Active | YYYY-MM-DD | None |
| SPECS.md | vX.X.X | XX% | YYYY-MM-DD | Requirements not marked |
| CHANGELOG.md | vX.X.X | X entries | YYYY-MM-DD | Missing entry |
| TODO.md | vX.X.X | Active | YYYY-MM-DD | Stale tasks |

## Discrepancies Found

1. **PLAN.md**: Current phase shows "Phase 5" but Phase 6 is complete
2. **SPECS.md**: SPEC-006 requirements not marked complete
3. **TODO.md**: 5 completed tasks still in active list

## Proposed Updates

[Detailed before/after for each file]

## Updates Applied

- ✅ PLAN.md: Updated phase marker (line 16)
- ✅ PLAN.md: Updated last_updated date (line 10)
- ✅ SPECS.md: Marked requirements complete (lines 234-245)
- ✅ TODO.md: Archived 5 completed tasks (lines 88-120)

## Verification

- [x] All 5 control files synchronized
- [x] Versions consistent (v1.1.0)
- [x] Dates current (2025-11-10)
- [x] Phase markers accurate
- [x] No critical lint errors

## Summary

**Files Updated**: 3 of 5  
**Lines Changed**: ~45 lines  
**Discrepancies Resolved**: 3  
**Time Elapsed**: 5 minutes  
**Status**: ✅ All control files now synchronized

## Next Actions

1. Review Phase 7 tasks in PLAN.md
2. Prepare for HP branding implementation
3. Schedule next control files review (2025-11-17)
```

## Tips for Effective Usage

### Daily Work
- Update TODO.md as you work (quick capture)
- Let agents update during task execution

### Weekly Review
- Run this sync command every Friday
- Verify control files match reality
- Clean stale TODO.md items

### Phase Transitions
- **ALWAYS** run this command when completing a phase
- Update PLAN.md phase markers
- Add CHANGELOG.md entry

### Feature Releases
- Run before creating PR
- Ensure SPECS.md requirements marked complete
- Update CODE-STATE.md if architecture changed

## Anti-Patterns to Avoid

❌ **Don't**: Manually edit control files without documenting
❌ **Don't**: Skip control file updates after major work
❌ **Don't**: Let PLAN.md get more than 1 phase behind
❌ **Don't**: Forget to version-bump CHANGELOG.md

✅ **Do**: Use this agent command after every significant milestone
✅ **Do**: Keep control files within 1 week of current state
✅ **Do**: Document all updates in CHANGELOG.md
✅ **Do**: Verify synchronization before phase transitions

---

**Version**: 1.0.0  
**Created**: 2025-11-10  
**Maintained by**: HP Dev Agent System

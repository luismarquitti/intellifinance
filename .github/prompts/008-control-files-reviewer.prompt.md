---
description: Reviews all control files (PLAN.md, CODE-STATE.md, SPECS.md, CHANGELOG.md, TODO.md) holistically to ensure clarity, completeness, consistency, and recommend improvements.
---

# Control Files Reviewer

You are an expert technical writer and quality assurance specialist. Your task is to perform a comprehensive review of all control files in the project to ensure they are clear, complete, consistent, and effective for their intended purposes.

---

## Your Role

- **Holistic review** of all control files together
- **Check clarity** of writing and structure
- **Verify completeness** of information
- **Ensure consistency** across files
- **Identify gaps** in documentation
- **Recommend improvements** for quality and usability

---

## Step 1: Load All Control Files

### 1.1 Required Files

Load these core control files:

1. **PLAN.md** - Project plan with tasks and phases
2. **CODE-STATE.md** - Current architecture snapshot
3. **SPECS.md** - Feature specifications
4. **CHANGELOG.md** - Audit trail of changes
5. **TODO.md** - Quick capture notes

### 1.2 Optional Files

If available, also load:
- **constitution.md** - Project governance and principles
- **.github/copilot-instructions.md** - AI agent guidelines
- **README.md** - Project overview
- **ARCHITECTURE.md** - Technical architecture documentation

### 1.3 Extract Metadata

From each file, extract:
- Front matter (YAML metadata)
- Version number
- Last updated date
- Owner/maintainer
- Status

---

## Step 2: Individual File Review

### 2.1 Review PLAN.md

**Check for:**

**✓ Completeness:**
- [ ] Executive summary present
- [ ] Current task clearly identified
- [ ] All features documented with phases
- [ ] Tasks have acceptance criteria
- [ ] Effort estimates provided
- [ ] Dependencies identified
- [ ] Success criteria defined

**✓ Clarity:**
- [ ] Task descriptions are actionable
- [ ] Acceptance criteria are testable
- [ ] Status markers used consistently (✅❌⬜🚧)
- [ ] No ambiguous language
- [ ] Technical terms defined or clear from context

**✓ Organization:**
- [ ] Logical feature grouping
- [ ] Phases are sequential and logical
- [ ] Priority order makes sense
- [ ] Related tasks are grouped together

**✓ Accuracy:**
- [ ] Status markers reflect reality (cross-check with CODE-STATE)
- [ ] Effort estimates seem reasonable
- [ ] Dependencies are valid
- [ ] No completed tasks marked as pending

**Common Issues:**
- Tasks too vague: "Fix user stuff" → "Fix user deletion cascade bug"
- Missing acceptance criteria
- Effort estimates missing
- Status out of sync with CODE-STATE
- No current focus identified

### 2.2 Review CODE-STATE.md

**Check for:**

**✓ Completeness:**
- [ ] Tech stack fully documented
- [ ] Architecture diagrams present
- [ ] Implementation status for all features
- [ ] Test coverage reported
- [ ] Blockers documented
- [ ] Dependencies listed
- [ ] Last updated timestamp

**✓ Accuracy:**
- [ ] Tech versions are current
- [ ] Architecture matches codebase
- [ ] Implementation percentages accurate
- [ ] Test coverage numbers verified
- [ ] Blockers still relevant

**✓ Clarity:**
- [ ] Architecture diagrams are readable
- [ ] Implementation status is clear
- [ ] Blockers have enough detail
- [ ] Technical jargon explained

**✓ Freshness:**
- [ ] Updated within last 2 weeks (or after each phase)
- [ ] Snapshot date clearly marked
- [ ] No stale information

**Common Issues:**
- Outdated version numbers
- Architecture diagrams missing or obsolete
- Implementation status vague: "mostly done" vs "75% complete (3/4 components)"
- Blockers without severity or owner
- No timestamp indicating when snapshot was taken

### 2.3 Review SPECS.md

**Check for:**

**✓ Completeness:**
- [ ] All features have specifications
- [ ] Requirements clearly stated
- [ ] Acceptance criteria defined
- [ ] User stories present
- [ ] Non-functional requirements included
- [ ] Dependencies documented
- [ ] Risks identified

**✓ Clarity:**
- [ ] Requirements are unambiguous
- [ ] Acceptance criteria are testable
- [ ] User stories follow Given/When/Then format
- [ ] Technical terms defined
- [ ] Examples provided where helpful

**✓ Organization:**
- [ ] Specs numbered consistently (SPEC-001, SPEC-002)
- [ ] Logical grouping by feature area
- [ ] Table of contents or index
- [ ] Related specs cross-referenced

**✓ Traceability:**
- [ ] Links to PLAN.md features
- [ ] Links from PLAN.md back to specs
- [ ] Requirements numbered (REQ-XXX-F-001)

**Common Issues:**
- Vague requirements: "System should be fast" → "System SHALL respond within 500ms (P95)"
- Missing acceptance criteria
- No user stories to provide context
- Specs without clear status (Draft/Approved/Implemented)
- No traceability to implementation tasks

### 2.4 Review CHANGELOG.md

**Check for:**

**✓ Completeness:**
- [ ] All significant changes documented
- [ ] Each entry has date
- [ ] Files changed are listed
- [ ] Triggering prompt identified
- [ ] Versions use semantic versioning

**✓ Format:**
- [ ] Follows Keep a Changelog format
- [ ] Categories used correctly (Added, Changed, Fixed, etc.)
- [ ] Entries are chronological
- [ ] No edits to past entries (append-only)

**✓ Clarity:**
- [ ] Change descriptions are clear
- [ ] Impact is understandable
- [ ] Technical changes explained for non-technical readers

**✓ Consistency:**
- [ ] Entry format consistent
- [ ] Date format consistent (ISO 8601)
- [ ] Version numbers follow semver

**Common Issues:**
- Missing recent changes
- Entries without dates
- Vague descriptions: "Fixed bugs" vs "Fixed user deletion cascade bug"
- Categories misused (bug fix in "Changed" instead of "Fixed")
- Editing old entries instead of appending

### 2.5 Review TODO.md

**Check for:**

**✓ Organization:**
- [ ] Clear sections (Inbox, Ideas, Questions, Bugs)
- [ ] Items categorized appropriately
- [ ] Done items marked or archived
- [ ] Today's Focus section present

**✓ Clarity:**
- [ ] Items are specific enough to action
- [ ] Context provided where needed
- [ ] Priority indicators used
- [ ] Owner assigned where relevant

**✓ Freshness:**
- [ ] Recent items present
- [ ] Old completed items archived or removed
- [ ] No stale items lingering indefinitely

**✓ Integration:**
- [ ] Integrated items marked with links to PLAN/SPECS
- [ ] No duplicates of planned tasks
- [ ] Clear distinction between quick notes and formal plans

**Common Issues:**
- Inbox cluttered with old items
- Items too vague: "Think about performance" vs "Research Redis for session caching"
- Completed items not marked or moved
- Duplicates of tasks already in PLAN
- No context for cryptic notes

---

## Step 3: Cross-File Consistency Review

### 3.1 PLAN ↔ SPECS Consistency

**Check:**
- [ ] Every feature in PLAN references a SPEC
- [ ] Every approved SPEC has tasks in PLAN
- [ ] Acceptance criteria in PLAN match SPECS
- [ ] Dependencies align between both files

**Example Check:**

**PLAN.md says:**
> Feature: User Management (SPEC-001)

**SPECS.md should have:**
> SPEC-001: User Management System

**Inconsistency Example:**
- PLAN references SPEC-005 but SPECS only goes up to SPEC-004
- SPECS.md has approved SPEC-003 but no tasks in PLAN

### 3.2 PLAN ↔ CODE-STATE Consistency

**Check:**
- [ ] Feature status aligns (use alignment-checker for detailed analysis)
- [ ] Implementation percentages match task completion
- [ ] Blockers in CODE-STATE are reflected in PLAN
- [ ] Tech stack in CODE-STATE matches plan assumptions

**Example Check:**

**PLAN.md says:**
> User Management: Phase 2, 🚧 In Progress

**CODE-STATE.md should say:**
> User Management: 70% complete, in progress

**Inconsistency Example:**
- PLAN shows feature ✅ Done but CODE-STATE shows 60% complete
- CODE-STATE has critical blocker but PLAN doesn't mention it

### 3.3 CHANGELOG ↔ All Files Consistency

**Check:**
- [ ] Changes documented in CHANGELOG match updates to other files
- [ ] Version numbers incremented appropriately
- [ ] Dates in CHANGELOG align with last_updated in other files
- [ ] Files listed in CHANGELOG were actually modified

**Example Check:**

**CHANGELOG.md says (2025-10-20):**
> Added user search feature to PLAN.md

**PLAN.md last_updated should be:**
> last_updated: 2025-10-20

### 3.4 TODO ↔ PLAN Consistency

**Check:**
- [ ] No duplicates between TODO and PLAN
- [ ] TODO items marked as integrated actually appear in PLAN
- [ ] PLAN doesn't have rough notes that belong in TODO

---

## Step 4: Quality Assessment

### 4.1 Rate Each File

Use this scoring rubric (1-5 scale):

**5 - Excellent:**
- Complete, clear, accurate, well-organized
- No improvements needed
- Could be used as template for other projects

**4 - Good:**
- Mostly complete and clear
- Minor improvements would help
- Effective for its purpose

**3 - Adequate:**
- Functional but has notable gaps
- Clarity could be improved
- Several issues to address

**2 - Needs Work:**
- Significant gaps or confusion
- Missing key information
- Difficult to use effectively

**1 - Poor:**
- Incomplete or misleading
- Major issues
- Needs substantial rework

### 4.2 Score Each Aspect

| File | Completeness | Clarity | Consistency | Organization | Overall |
|------|--------------|---------|-------------|--------------|---------|
| PLAN.md | 4/5 | 5/5 | 3/5 | 4/5 | **4/5** |
| CODE-STATE.md | 3/5 | 4/5 | 3/5 | 4/5 | **3.5/5** |
| SPECS.md | 5/5 | 5/5 | 4/5 | 5/5 | **4.75/5** |
| CHANGELOG.md | 4/5 | 5/5 | 5/5 | 5/5 | **4.75/5** |
| TODO.md | 3/5 | 3/5 | 4/5 | 2/5 | **3/5** |

**Overall Control Files Quality:** **3.9/5 (Good)**

---

## Step 5: Generate Findings Report

### 5.1 Executive Summary

```markdown
# Control Files Review Report

**Review Date:** 2025-10-21  
**Reviewer:** control-files-reviewer.prompt.md  
**Overall Quality Score:** 3.9/5 (Good)

## Summary

✅ **Strengths:**
- SPECS.md is excellent (4.75/5) - clear, complete, well-organized
- CHANGELOG.md follows best practices consistently
- PLAN.md has good task structure and acceptance criteria

⚠️ **Areas for Improvement:**
- CODE-STATE.md needs updating (last update 2 weeks ago)
- TODO.md is cluttered with old completed items
- Consistency issues between PLAN and CODE-STATE (3 discrepancies)

🔴 **Critical Issues:**
- None (no blocking issues found)

## Recommendations Priority

**High Priority (Do This Week):**
1. Update CODE-STATE.md with current state (1-2 hours)
2. Fix PLAN↔CODE-STATE inconsistencies (30 minutes)
3. Clean up TODO.md inbox (15 minutes)

**Medium Priority (Do This Sprint):**
4. Add missing SPEC-003 to PLAN.md (1 hour)
5. Enhance PLAN.md task acceptance criteria (1 hour)

**Low Priority (Nice to Have):**
6. Add architecture diagrams to CODE-STATE.md (2 hours)
7. Create index/table of contents for SPECS.md (30 minutes)
```

### 5.2 Detailed Findings by File

```markdown
## Detailed Findings

---

### PLAN.md - Score: 4/5 (Good)

**Strengths:**
✅ Well-structured with clear phases
✅ Tasks have acceptance criteria
✅ Dependencies documented
✅ Current focus clearly identified

**Issues:**

**🟡 MINOR: Missing effort estimates for 3 tasks**
- Location: Feature "Data Export", Phase 2
- Tasks: "Add CSV export", "Add JSON export", "Add PDF export"
- Impact: Can't estimate feature completion time
- Recommendation: Add effort estimates (S/M/L)
- Effort to fix: 5 minutes

**🟡 MINOR: Vague acceptance criteria on 2 tasks**
- Location: Feature "Search", Phase 3
- Task: "Optimize search performance"
- Current: "Acceptance: Search is faster"
- Recommended: "Acceptance: Search responds <500ms for 10K records (P95)"
- Effort to fix: 10 minutes

**🟠 MODERATE: Status inconsistency with CODE-STATE**
- Location: Feature "User Management"
- Issue: PLAN shows ✅ Done but CODE-STATE shows critical bug
- Impact: Planning documents don't reflect reality
- Recommendation: Use alignment-checker.prompt.md to fix
- Effort to fix: 30 minutes

---

### CODE-STATE.md - Score: 3.5/5 (Good but needs update)

**Strengths:**
✅ Good architecture diagrams
✅ Complete tech stack documentation
✅ Blockers clearly documented

**Issues:**

**🟠 MODERATE: Outdated snapshot (Last update: 2025-10-05)**
- Impact: Doesn't reflect current state
- Missing: Recent implementations from last 2 weeks
- Recommendation: Run state-analyzer.prompt.md to update
- Effort to fix: 1-2 hours

**🟡 MINOR: Implementation percentages need validation**
- Location: User Management feature
- Current: "70% complete"
- Issue: Unclear what 70% means (tasks? components? features?)
- Recommendation: Use task completion count: "5/7 components (71%)"
- Effort to fix: 15 minutes

**🟡 MINOR: Missing test coverage for 2 features**
- Features: Data Export, Notifications
- Issue: No test coverage metrics reported
- Recommendation: Add coverage stats from test reports
- Effort to fix: 10 minutes

---

### SPECS.md - Score: 4.75/5 (Excellent)

**Strengths:**
✅ All specs well-formatted with clear structure
✅ Requirements numbered and traceable
✅ Good use of Given/When/Then for acceptance criteria
✅ Dependencies clearly documented

**Issues:**

**🟢 MINOR: Consider adding table of contents**
- Current: 5 specs, still manageable without index
- Future: Will be helpful when 10+ specs exist
- Recommendation: Add navigation index at top
- Effort to fix: 30 minutes

**🟢 MINOR: SPEC-003 missing implementation link**
- Issue: No reference to PLAN.md tasks
- Recommendation: Add "Implementation: See PLAN.md Feature 'Data Export'"
- Effort to fix: 2 minutes

---

### CHANGELOG.md - Score: 4.75/5 (Excellent)

**Strengths:**
✅ Follows Keep a Changelog format perfectly
✅ All entries dated
✅ Append-only (no edits to history)
✅ Files changed are listed

**Issues:**

**🟢 MINOR: Missing entry for recent work**
- Issue: SearchBar.tsx added 2025-10-18 but not in CHANGELOG
- Recommendation: Add entry retroactively
- Effort to fix: 5 minutes

---

### TODO.md - Score: 3/5 (Adequate but cluttered)

**Strengths:**
✅ Good categorization structure
✅ Integration links work well

**Issues:**

**🟠 MODERATE: Inbox cluttered with 15 old items**
- Issue: Items from 2+ weeks ago still in inbox
- Impact: Hard to see current priorities
- Recommendation: Archive completed, integrate or clarify pending
- Effort to fix: 15 minutes

**🟡 MINOR: 5 items too vague to action**
- Examples:
  - "Think about caching" → "Research Redis vs Memcached for session caching"
  - "Improve UX" → "Add loading states to async operations"
- Recommendation: Add context or remove if not important
- Effort to fix: 10 minutes

**🟡 MINOR: 3 duplicates of items in PLAN**
- Items: "Add pagination", "Fix search bug", "Implement auth"
- Issue: Redundant tracking in two places
- Recommendation: Mark as integrated or remove
- Effort to fix: 3 minutes
```

---

## Step 6: Prioritized Action Items

### 6.1 Categorize by Effort and Impact

```markdown
## Action Items by Priority

### 🔴 High Priority (High Impact, Quick Fixes) - Total: 1 hour

1. **Update CODE-STATE.md to current state** (1-2 hours)
   - Files: CODE-STATE.md
   - Use: state-analyzer.prompt.md
   - Impact: HIGH (outdated snapshot causing confusion)
   - Effort: 1-2 hours

2. **Fix PLAN↔CODE-STATE inconsistencies** (30 minutes)
   - Files: PLAN.md, CODE-STATE.md
   - Use: alignment-checker.prompt.md
   - Impact: HIGH (planning accuracy)
   - Effort: 30 minutes

3. **Clean up TODO.md inbox** (15 minutes)
   - Files: TODO.md
   - Action: Archive or integrate 15 old items
   - Impact: MEDIUM (usability)
   - Effort: 15 minutes

---

### 🟡 Medium Priority (Medium Impact) - Total: 2 hours

4. **Add missing SPEC-003 implementation tasks to PLAN** (1 hour)
   - Files: PLAN.md
   - Use: plan-generator.prompt.md
   - Impact: MEDIUM (planning completeness)
   - Effort: 1 hour

5. **Enhance acceptance criteria in PLAN** (1 hour)
   - Files: PLAN.md
   - Action: Make 2 vague criteria testable
   - Impact: MEDIUM (task clarity)
   - Effort: 1 hour

---

### 🟢 Low Priority (Nice to Have) - Total: 3 hours

6. **Add architecture diagrams to CODE-STATE** (2 hours)
   - Files: CODE-STATE.md
   - Action: Create detailed component diagrams
   - Impact: LOW (enhancement)
   - Effort: 2 hours

7. **Add table of contents to SPECS.md** (30 minutes)
   - Files: SPECS.md
   - Action: Create navigation index
   - Impact: LOW (future-proofing)
   - Effort: 30 minutes

8. **Add missing CHANGELOG entry** (5 minutes)
   - Files: CHANGELOG.md
   - Action: Document SearchBar.tsx addition
   - Impact: LOW (completeness)
   - Effort: 5 minutes
```

---

## Step 7: Best Practices Recommendations

```markdown
## Best Practices for Maintaining Control Files

### Daily
- ✅ Update PLAN.md task status as you work
- ✅ Add quick notes to TODO.md as they arise
- ✅ Mark TODO items as integrated when moved to PLAN

### Weekly
- ✅ Run state-analyzer.prompt.md to update CODE-STATE.md
- ✅ Run alignment-checker.prompt.md to catch drift
- ✅ Clean up TODO.md inbox
- ✅ Review and prioritize TODO items

### Per Phase/Sprint
- ✅ Run control-files-reviewer.prompt.md (this prompt) for health check
- ✅ Update CHANGELOG.md with phase completion
- ✅ Review all SPECS for accuracy
- ✅ Archive completed TODO items

### After Each Implementation
- ✅ Update PLAN.md task to ✅ Done
- ✅ Update CODE-STATE.md with new components
- ✅ Add CHANGELOG entry with changelog-updater.prompt.md
- ✅ Verify acceptance criteria met

### Quality Gates

**Before marking feature "Done":**
- [ ] All tasks in PLAN.md marked ✅
- [ ] CODE-STATE.md shows feature implemented
- [ ] CHANGELOG.md documents changes
- [ ] SPECS.md acceptance criteria verified
- [ ] No related items in TODO.md

**Before sprint planning:**
- [ ] All control files reviewed
- [ ] Inconsistencies resolved
- [ ] CODE-STATE.md updated
- [ ] Alignment check passed
```

---

## Step 8: Generate Summary

```
✅ Control Files Review Complete

**Overall Quality:** 3.9/5 (Good)

**Files Reviewed:** 5
- PLAN.md: 4/5
- CODE-STATE.md: 3.5/5 (needs update)
- SPECS.md: 4.75/5 (excellent)
- CHANGELOG.md: 4.75/5 (excellent)
- TODO.md: 3/5 (cluttered)

**Issues Found:**
- 🔴 Critical: 0
- 🟠 Moderate: 3
- 🟡 Minor: 8
- 🟢 Enhancement: 3

**Total Issues:** 14

**Estimated Fix Time:**
- High priority: 2 hours
- Medium priority: 2 hours
- Low priority: 3 hours
- Total: 7 hours

**Immediate Recommendations:**

1. **Today:** Update CODE-STATE.md (1-2 hours)
   - Run `state-analyzer.prompt.md`
   - Most impactful fix

2. **This Week:** Fix inconsistencies (30 min)
   - Run `alignment-checker.prompt.md`
   - Clean up TODO.md (15 min)

3. **This Sprint:** Complete medium priority items (2 hours)

**Next Steps:**

Would you like me to:
A) Help fix high-priority issues now
B) Generate detailed fix instructions for each issue
C) Focus on specific file improvements
D) Create a maintenance schedule

Which would be most helpful?
```

---

## Validation Checklist

### Before Generating Report

- [ ] All control files loaded successfully
- [ ] Each file scored on all dimensions
- [ ] Cross-file consistency checked
- [ ] Issues categorized by severity
- [ ] Action items prioritized by impact/effort
- [ ] Effort estimates provided
- [ ] Best practices recommended

### Report Quality

- [ ] Executive summary provides clear overview
- [ ] Issues are specific with file/location/line references
- [ ] Recommendations are actionable
- [ ] Effort estimates are realistic
- [ ] Priority makes sense (high-impact, low-effort first)

---

## Integration with Workflow

### When to Use This Prompt

- **Weekly:** Quick health check
- **End of phase:** Before sprint planning
- **Before major planning:** Ensure foundation is solid
- **After onboarding:** Help new team members understand state
- **When feeling lost:** Regain clarity on project status

### Workflow Position

```
Regular Development
      ↓
Maintain control files daily
      ↓
[control-files-reviewer.prompt.md] ← Weekly/per-phase check
      ↓
Fix issues identified
      ↓
Continue with confidence
```

---

**Status:** Ready to use  
**Version:** 1.0.0  
**Last Updated:** 2025-10-21

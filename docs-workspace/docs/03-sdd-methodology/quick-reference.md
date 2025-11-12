---
title: Spec-Driven Workflow - Quick Reference
type: documentation
category: workflow
version: 1.0.0
status: active
created: 2025-10-21
last_updated: 2025-10-21
---

# Spec-Driven Workflow - Quick Reference

**One-Page Cheat Sheet** | Version 1.0.0 | 2025-10-21

---

## The 5 Control Files

| File | Purpose | Update When | Key Content |
|------|---------|-------------|-------------|
| **SPECS.md** | What & Why | Planning | Requirements, acceptance criteria, user stories |
| **PLAN.md** | How & When | Daily | Tasks, phases, status (✅❌⬜🚧), estimates |
| **CODE-STATE.md** | What exists | Weekly | Tech stack, architecture, implementation status |
| **CHANGELOG.md** | What changed | Per feature | Chronological changes, versions, files |
| **TODO.md** | Quick capture | Anytime | Ideas, questions, bugs, research items |

---

## The 9 Workflow Prompts

| Prompt | Use For | Input | Output | Time |
|--------|---------|-------|--------|------|
| **workflow-bootstrap** | New project | Project info | All 5 files | 10-15 min |
| **spec-writer** | Create specifications | Feature idea | SPECS.md entry | 10-20 min |
| **plan-generator** | Break into tasks | Spec ID | PLAN.md feature | 5-10 min |
| **start-implementation** | Begin work session | None (auto) | Task options + context | 2-5 min |
| **todo-integrator** | Clean up TODO | Which items | PLAN/SPECS updated | 10-20 min |
| **state-analyzer** | Update snapshot | None (auto) | CODE-STATE.md | 1-2 hours |
| **alignment-checker** | Find drift | None | Report + fixes | 10-15 min |
| **control-files-reviewer** | Quality check | None | Quality report | 5-10 min |
| **changelog-updater** | Document changes | What changed | CHANGELOG.md | 5-10 min |

---

## Quick Decision Tree

```
Got an idea?
├─ Rough thought? → TODO.md inbox
├─ Small task (<4h)? → PLAN.md directly
├─ Big feature? → spec-writer.prompt.md → SPECS.md
└─ Architecture? → CODE-STATE.md

Ready to code?
├─ Starting work? → start-implementation.prompt.md (choose task)
├─ Have spec? → plan-generator.prompt.md → PLAN.md
├─ Have plan? → feat-imp-with-detailed-output.prompt.md
└─ No plan? → Create spec first

Just finished coding?
├─ Update CODE-STATE.md → state-analyzer.prompt.md
├─ Check alignment → alignment-checker.prompt.md
└─ Document → changelog-updater.prompt.md

Weekly tasks?
├─ Monday: Review TODO.md → todo-integrator.prompt.md
├─ Friday: Update state → state-analyzer.prompt.md
├─ Friday: Check health → control-files-reviewer.prompt.md
└─ Anytime: Fix drift → alignment-checker.prompt.md
```

---

## The Complete Workflow (Visual)

```
💡 Idea
  ↓
📝 TODO.md (capture)
  ↓
📋 spec-writer.prompt.md → SPECS.md
  ↓
📊 plan-generator.prompt.md → PLAN.md
  ↓
🎯 start-implementation.prompt.md (choose task)
  ↓
💻 feat-imp-with-detailed-output.prompt.md (code)
  ↓
📸 state-analyzer.prompt.md → CODE-STATE.md
  ↓
🔍 alignment-checker.prompt.md (verify)
  ↓
📜 changelog-updater.prompt.md → CHANGELOG.md
  ↓
✅ Done!
```

---

## Status Markers

| Symbol | Meaning | Use In |
|--------|---------|--------|
| ✅ | Done/Complete | PLAN.md, CODE-STATE.md |
| ❌ | Cancelled/Failed | PLAN.md |
| ⬜ | Not Started | PLAN.md, CODE-STATE.md |
| 🚧 | In Progress | PLAN.md, CODE-STATE.md |
| ⚠️ | Warning/Issue | CODE-STATE.md |
| 🔴 | Critical | CODE-STATE.md |
| 🟡 | Medium | CODE-STATE.md |
| 🟢 | Good/OK | CODE-STATE.md |

---

## Task Structure in PLAN.md

```markdown
- [ ] Task description with clear outcome
  - Acceptance: How to verify done
  - Effort: S (1-2h) | M (2-3h) | L (3-4h) | XL (>4h)
  - Dependencies: Task IDs or "None"
```

---

## Spec Structure in SPECS.md

```markdown
## SPEC-XXX: Feature Name
**Status:** Draft | Approved | In Development | Implemented
**Priority:** High | Medium | Low

### Problem Statement
Why we need this

### Functional Requirements
**REQ-XXX-F-001:** Description
- System SHALL/SHOULD do X

### Acceptance Criteria
**Given** context
**When** action
**Then** result
```

---

## CHANGELOG Entry Format

```markdown
## [X.Y.Z] - YYYY-MM-DD

**Triggered by:** prompt-name.prompt.md
**Related:** SPEC-XXX, Feature Name

### Added | Changed | Fixed | Security
- What changed and why

**Files Changed:**
- `path/to/file.ts`
```

---

## Version Numbers (Semantic Versioning)

- **Major (X.0.0):** Breaking changes, major features
- **Minor (X.Y.0):** New features (backward compatible)
- **Patch (X.Y.Z):** Bug fixes, docs, refactoring

---

## Daily Checklist

**Starting Work:**
- [ ] Run start-implementation.prompt.md to see options
- [ ] Choose task from presented options
- [ ] Review acceptance criteria and context
- [ ] Mark task 🚧 in PLAN.md (or let prompt do it)

**During Work:**
- [ ] Capture quick notes in TODO.md
- [ ] Update PLAN.md task status as you go
- [ ] Write tests per SPEC acceptance criteria

**After Work:**
- [ ] Mark task ✅ in PLAN.md
- [ ] Commit with reference to PLAN task
- [ ] Quick note in TODO if needed

---

## Weekly Checklist

**Monday Morning:**
- [ ] Review TODO.md inbox
- [ ] Run todo-integrator.prompt.md
- [ ] Check PLAN.md priorities

**Friday Afternoon:**
- [ ] Run state-analyzer.prompt.md
- [ ] Run alignment-checker.prompt.md
- [ ] Run control-files-reviewer.prompt.md
- [ ] Fix high-priority issues
- [ ] Clean up TODO.md

---

## Per-Phase Checklist

**Before Starting Feature:**
- [ ] SPECS.md entry exists and approved
- [ ] PLAN.md has detailed tasks
- [ ] Dependencies available
- [ ] Tech feasibility confirmed

**After Implementation Phase:**
- [ ] All phase tasks ✅ in PLAN.md
- [ ] CODE-STATE.md updated
- [ ] Alignment check passed
- [ ] Tests passing

**After Feature Complete:**
- [ ] All acceptance criteria met
- [ ] CHANGELOG.md updated
- [ ] PLAN.md feature marked complete
- [ ] No critical blockers

---

## Common Commands

### Mark task in progress:
```markdown
- [🚧] Task name
```

### Mark task done:
```markdown
- [x] Task name
```

### Add to TODO inbox:
```markdown
## 📥 Capture Inbox
- [ ] Your quick note here
```

### Reference spec in plan:
```markdown
**Spec:** SPEC-001
```

### Link in CHANGELOG:
```markdown
**Related:** SPEC-001, PLAN.md Feature Name
```

---

## File Locations

- **Templates:** `templates/control-files/*.md`
- **Prompts:** `.github/prompts/*.prompt.md`
- **Docs:** `doc/workflows/*.md`
- **Examples:** `doc/workflows/examples/*.md`

---

## Emergency Fixes

**Don't know what to work on?**
→ Run `start-implementation.prompt.md`

**Lost and confused?**
→ Run `control-files-reviewer.prompt.md`

**PLAN and CODE-STATE don't match?**
→ Run `alignment-checker.prompt.md`

**CODE-STATE outdated?**
→ Run `state-analyzer.prompt.md`

**TODO overwhelming?**
→ Run `todo-integrator.prompt.md`

**Starting fresh?**
→ Run `workflow-bootstrap.prompt.md`

---

## Pro Tips

✅ **Do:**
- Update PLAN.md immediately (not end of day)
- Run state-analyzer weekly (set calendar reminder)
- Use TODO.md freely (low friction capture)
- Check alignment at end of each phase
- Document changes in CHANGELOG

❌ **Don't:**
- Edit past CHANGELOG entries (append only)
- Let CODE-STATE go >2 weeks without update
- Accumulate 50+ TODO items
- Skip specs for complex features (>4 hours)
- Mark tasks done without checking acceptance criteria

---

## When Things Go Wrong

| Problem | Solution |
|---------|----------|
| Don't know what to work on | start-implementation.prompt.md |
| Drift between files | alignment-checker.prompt.md |
| Outdated CODE-STATE | state-analyzer.prompt.md |
| Unclear priorities | start-implementation.prompt.md |
| Too many TODO items | todo-integrator.prompt.md |
| Low quality files | control-files-reviewer.prompt.md |
| Missing CHANGELOG entry | changelog-updater.prompt.md |
| Files contradict | control-files-reviewer.prompt.md |
| New project setup | workflow-bootstrap.prompt.md |

---

## Related Documentation

*   [Analytics Interaction Analysis Tool Usage](./analytics-tool-usage.md)

---

## Get Help

- **Full Guide:** [spec-driven-workflow.md](./spec-driven-workflow.md)
- **Examples:** [examples/](./examples/)
- **Philosophy:** [SPEC-DRIVEN-DEVELOPMENT.md](../../SPEC-DRIVEN-DEVELOPMENT.md)
- **Templates:** [templates/control-files/](../../templates/control-files/)

---

**Print this page and keep it handy!**

**Last Updated:** 2025-10-21 | **Version:** 1.0.0

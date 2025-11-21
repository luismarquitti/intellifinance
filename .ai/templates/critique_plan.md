---
# Docusaurus Frontmatter
id: critique-plan-[request-id]
title: "Critique: Plan [REQUEST-ID]"
sidebar_label: "[REQUEST-ID] Plan Critique"
custom_edit_url: null

# Template Metadata
template_type: critique_plan
generated_by: Architect Agent (Self-Critique)
generated_date: "[YYYY-MM-DD HH:MM:SS]"
request_id: "[REQUEST-ID]"
source_plan: "plan_[request-id].md"
---

# Plan Critique: [REQUEST-ID]

**Analyzed Document**: `plan_[request-id].md`
**Critique Date**: `[YYYY-MM-DD HH:MM:SS]`

---

## 1. Feasibility & Design Check

### Architecture
- [ ] **Over-engineering**: Is the solution too complex for the problem?
    - *Observation*: [Comments]
- [ ] **Under-engineering**: Does it miss scalability/security requirements?
    - *Observation*: [Comments]
- [ ] **Forensic Alignment** (Bugs only): Does the fix address the *proven* root cause found in forensic analysis?
    - *Observation*: [Comments]

### Implementation Steps
- [ ] **Atomic Tasks**: Are tasks small enough (no XL tasks)?
    - *Issues*: [List large tasks]
- [ ] **TDD Strategy**: Does every coding task have a corresponding test task?
    - *Issues*: [List missing tests]

## 2. Risk Assessment
- [ ] **Regressions**: Could this break existing functionality?
    - *Risk*: [Description]
- [ ] **Dependencies**: Are all dependencies accounted for?
    - *Missing*: [Description]

## 3. Improvement Recommendations

### Required Changes (Must Fix)
1. [Change 1]
2. [Change 2]

### Suggestions (Optional)
1. [Suggestion 1]

## 4. Conclusion
- [ ] **Ready for Approval**: Plan is solid.
- [ ] **Needs Revision**: Apply "Required Changes" before requesting approval.

**Action Taken**: [Revised Plan / Proceeded to Approval]

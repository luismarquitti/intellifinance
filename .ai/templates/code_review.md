---
# Docusaurus Frontmatter
id: code-review-[request-id]
title: "Code Review: [REQUEST-ID]"
sidebar_label: "[REQUEST-ID] Code Review"
custom_edit_url: null

# Template Metadata
template_type: code_review
generated_by: Developer Agent (Self-Review)
generated_date: "[YYYY-MM-DD HH:MM:SS]"
request_id: "[REQUEST-ID]"
---

# Code Review (Self-Correction): [REQUEST-ID]

**Review Date**: `[YYYY-MM-DD HH:MM:SS]`

---

## 1. Code Quality Checklist

### Clean Code
- [ ] **Readability**: Variable/function names are descriptive.
- [ ] **Comments**: Complex logic is explained; no redundant comments.
- [ ] **Dead Code**: No unused imports, variables, or commented-out code.
- [ ] **Debug Artifacts**: No `console.log`, `print()`, or debugger statements.

### Architecture & Patterns
- [ ] **Pattern Adherence**: Follows project's existing patterns (e.g., Repository pattern, Service layer).
- [ ] **Separation of Concerns**: Logic is in the right place (UI vs Business Logic).
- [ ] **DRY**: No obvious code duplication.

## 2. Testing & Safety
- [ ] **Test Coverage**: New code is covered by tests.
- [ ] **Happy Path**: Verified.
- [ ] **Edge Cases**: Verified.
- [ ] **Error Handling**: No swallowed exceptions; errors are logged/handled.

## 3. Findings & Fixes

| File | Issue | Fix Applied |
|------|-------|-------------|
| `path/to/file.ts` | Leftover console.log | Removed |
| `path/to/service.py` | Unclear variable name `x` | Renamed to `userIndex` |

## 4. Conclusion
- [ ] **Ready for QA**: Code is clean, tested, and buildable.
- [ ] **Needs Work**: Fix issues above before handoff.

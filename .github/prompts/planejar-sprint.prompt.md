---
description: Quebra uma Spec aberta em Issues do GitHub.
agent: scrum
---

# MISSION
Read the current `.spec.md` file and break it down into atomic development tasks.

# RULES
1.  **Atomicity:** Each task must be doable in < 1 day.
2.  **Dependency Chain:** Identify strict dependencies (Backend -> Frontend).
3.  **Format:** Output a list ready to be pasted into GitHub Issues or a CSV.

# OUTPUT FORMAT
| Type | Title | Dependency | Complexity (Fibonacci) |
| :--- | :--- | :--- | :--- |
| FEAT | [Backend] Create User Mutation | None | 3 |
| TEST | [QA] Unit Tests for User Service | Feat-Backend | 2 |
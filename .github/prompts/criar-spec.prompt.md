---
description: Gera uma nova Spec Técnica (SDD) baseada numa ideia vaga.
agent: po
---

# MISSION
Your goal is to interview the user and draft a professional **Technical Specification (.spec.md)** following the SDD Standard.

# STEPS
1.  **Ask for Context:** If the user hasn't provided details, ask: "What feature are we building? Who is it for?"
2.  **Identify Edge Cases:** Before writing, ask 3 provocative questions to clarify scope (e.g., "What happens if the API fails?", "Is this mobile-responsive?").
3.  **Draft the Spec:** Generate the file content including:
    * **Overview & Goals**
    * **Data Model** (Prisma Schema snippet)
    * **API Contract** (GraphQL Schema snippet)
    * **Flowchart** (Mermaid.js)
    * **Acceptance Criteria** (Checklist)

# OUTPUT TEMPLATE
Use strict Markdown. Ensure the file name follows `specs/domain/feature-name.spec.md`.
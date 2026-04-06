# 08 — Scope Management

> *"Scope creep is not an addition. It is a silent theft of time, quality, and morale."*

Scope creep is the gradual and uncontrolled expansion of a project's perimeter. It is one of the most frequent causes of delays, budget overruns, and failures. Its key characteristic is that it happens slowly, often with requests that seem "small" and "reasonable," until the project is unrecognizable compared to the original plan.

---

## Anatomy of Scope Creep

### The 5 Forms of Scope Creep

**1. Gold Plating (from the team)**
The team adds unrequested features because "it seems useful" or "it's a good idea." Even when it comes from the team, it is scope creep.

**2. Feature Creep (from stakeholders)**
The business adds progressive features, each "small," which collectively transform the scope.

**3. Requirement Drift (ambiguity resolved on the fly)**
Requirements were ambiguous, each stakeholder interpreted them differently, and the team resolved ambiguities in progress without documentation.

**4. Integration Creep**
"Just connect it to system X" — an integration that seemed trivial turns out to be complex and absorbs unplanned resources.

**5. Quality Creep**
Quality standards not initially defined that are imposed as the project advances ("I didn't know they expected this level of testing too").

---

## The Formal Change Request Process

The Change Request (CR) is the mechanism that makes scope creep *visible and costly*. If a CR is approved, the change enters with its clear consequences. If rejected, the team does not implement it.

### CR Workflow

```
                    REQUEST
                       │
                       ▼
            ┌──────────────────┐
            │  CR Submission   │
            │  (requester)     │
            └──────────────────┘
                       │
                       ▼
            ┌──────────────────┐
            │ Impact Analysis  │
            │  (tech lead)     │
            │  - effort        │
            │  - cost          │
            │  - risks         │
            │  - dependencies  │
            └──────────────────┘
                       │
                       ▼
            ┌──────────────────┐
            │ Review & Decide  │
            │  (PO + TL)       │
            └──────────────────┘
               ┌───────┴───────┐
               ▼               ▼
          APPROVED          REJECTED
               │               │
               ▼               ▼
        Update           Document
        backlog +        motivation
        roadmap +        and notify
        budget          requester
```

### Complete Change Request Template

```markdown
# Change Request — CR-[NNN]

**ID:** CR-[NNN]
**Date:** [YYYY-MM-DD]
**Requester:** [name] — [role] — [email]
**Requested Priority:** Critical / High / Medium / Low
**Urgency:** Must enter current sprint? [Yes/No — justification]

---

## 1. Change Description

### What is to be added/modified/removed:
[Clear and complete description]

### Why it is needed:
[Business justification]

### What value it adds:
[Expected benefit, quantified if possible]

---

## 2. Impacted Requirements

| Requirement ID | Description | Impact Type |
|----------------|-------------|-------------|
| REQ-XXX | [desc] | Modification / Replacement / Integration |
| REQ-YYY | [desc] | Dependency |

---

## 3. Impact Analysis (filled by tech lead)

**Estimated effort:** [hours / story points]

**Impacted software components:**
- [Component A]: [type of modification]
- [Component B]: [type of modification]

**Tests to add/update:**
- [Test 1]
- [Test 2]

**Database: schema migration required?** [Yes/No — details]

**API: breaking changes?** [Yes/No — details]

**Risks:**
| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| [Risk 1] | High/Medium/Low | High/Medium/Low | [how] |

**Features that may slip** (if this CR enters):
- [Feature A]: from sprint [N] to sprint [N+1]
- [Feature B]: ...

**Cost estimate (if applicable):**
- Development effort: [N] days × [$/day] = $[total]
- Extra testing: [N] days × [$/day] = $[total]
- **CR Total:** $[total]

---

## 4. Options

**Option A (full implementation):**
Effort: [N] points — Includes: [everything requested]

**Option B (minimum implementation):**
Effort: [N] points — Includes: [the minimum necessary]
Does not include: [what is excluded and why]

---

## 5. Decision

- [ ] **APPROVED** — Option: [A/B] — Enters: Sprint [N] / Roadmap [Q]
- [ ] **REJECTED** — Motivation: [description]
- [ ] **DEFERRED** — To Sprint [N] — Motivation: [description]
- [ ] **POSTPONED** — Review after: [date/event]

**Signed by:** _______________________ **Role:** _____________ **Date:** _______
**Signed by:** _______________________ **Role:** _____________ **Date:** _______
```

---

## The Scope Baseline

At the beginning of the project (or each release), the scope must be defined and *frozen* in a baseline document:

```markdown
# Scope Baseline — [Project] Release [N]

**Approval date:** [date]
**Approved by:** [Product Owner], [Sponsor], [Tech Lead]

## In Scope (features included in this release)

### MUST HAVE (MVP)
- [Feature 1]: [brief description] — Story points: [N]
- [Feature 2]: [brief description] — Story points: [N]
- [Feature 3]: [brief description] — Story points: [N]

**MUST Total:** [N] story points ≈ [N] weeks

### SHOULD HAVE (if time permits)
- [Feature 4]: [brief description] — Story points: [N]

## Explicitly Out of Scope

The following features are **explicitly excluded** from this release:
- [Feature X]: planned for Release [N+1]
- [Feature Y]: no current planning
- [Integration Z]: out of scope due to technical/budget constraints

## Assumptions

This baseline assumes:
1. [Assumption 1]
2. [Assumption 2]
3. [Assumption 3]

## Acceptance Signature

By signing this document, the parties agree that any addition to the
"In Scope" features requires a formal Change Request.

| Name | Role | Signature | Date |
|------|------|-----------|------|
| [name] | Product Owner | ________ | [date] |
| [name] | Business Sponsor | ________ | [date] |
| [name] | Tech Lead | ________ | [date] |
```

---

## The Concept of "Change Budget"

An advanced technique for managing scope creep is the **Change Budget**: at the beginning of the project or quarter, explicitly reserve a percentage of the budget/effort for unforeseeable changes.

```
Total sprint budget: 100 points

80 points → Planned features (scope baseline)
20 points → Change Budget (for CRs approved during the sprint)

If the Change Budget is exhausted, new CRs go to the next sprint.
If the Change Budget is not used, it can go to additional features.
```

This mechanism has a dual effect:
1. Makes explicit that changes have a cost
2. Creates a self-regulating mechanism: when the budget is exhausted, stakeholders begin to prioritize better

---

## Scope Creep: Warning Signs

Monitor these indicators to identify scope creep early:

| Signal | What It Means |
|--------|---------------|
| "Just add..." said often | Systematic minimization of costs |
| Stories that grow during the sprint | Requirements not stable at commit time |
| Progressively declining velocity | Technical debt or untracked scope |
| Increasingly frequent "alignment" meetings | Requirements unclear or evolving |
| "It was implied" said by the business | Implicit requirements not elicited |
| Continual deadline shifts | Uncontrolled scope |
| "Small" features that multiply | Systematic gold plating or feature creep |

---

## Containment Techniques

### Timeboxing
Every activity has a fixed duration. If not finished within the timebox, priority is reassessed — time is not expanded.

### Scope Freezing
At some point before the release, the backlog is "frozen": no new stories enter, only critical bugs.

### YAGNI — You Ain't Gonna Need It
XP principle: don't implement features until they are needed. Every feature has a cost of development, maintenance, and complexity. If not needed now, don't build it.

### Minimum Viable Product (MVP)
Identify the minimum indispensable that delivers value and release it. Then iterate. This forces stakeholders to explicitly prioritize.

---

## Responding to Unplanned Urgent Requests

Professional response scripts for the most common situations:

**"I need this thing by Friday"**
> "I can analyze the impact now and give you an estimate by [time]. If you approve the CR and are available to move [feature X] to the next sprint, we can proceed."

**"It's not a big thing, it won't take long"**
> "I understand it seems small. Let me do the technical estimate — there are usually non-obvious aspects. I'll get back to you by [time]."

**"But it's extremely urgent, there's no time for procedures"**
> "If it's a production emergency impacting revenue, we can follow the hot-fix process (15 minutes instead of 2 days). For everything else, skipping the process puts the system's stability at risk."

**"I don't understand why it takes so long"**
> "I can show you the estimate breakdown. [Component A] requires X because of [technical reason], [component B] requires Y because of [technical reason]. Would you prefer to only do part A to reduce effort?"

---

*Previous: [07 — Agile as a Shield](./07-agile-protection.md) | Next: [09 — Stakeholder Anti-Patterns](./09-stakeholder-antipatterns.md)*

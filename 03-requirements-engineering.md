# 03 — Requirements Engineering

> *"An ambiguous requirement is a bug waiting to be written."*

Requirements Engineering (RE) is the discipline concerned with eliciting, analyzing, specifying, validating, and managing software requirements. It is the first and most critical line of defense in SDSD.

---

## The Fundamental Problem

Stakeholders rarely know what they want. They know what they do today, they know they have a problem, and they have a vague idea of how a solution might look. But:

- They don't know the technical vocabulary to describe it precisely
- They cannot predict edge cases
- They change their minds when they see the real product
- They describe solutions instead of problems ("I want a red button" instead of "I need to easily cancel the operation")
- They omit implicit requirements that they consider obvious but that the developer cannot guess

This is normal. It's not stupidity: it's the cognitive structure of the problem.

---

## Levels of Requirements

### The Requirements Hierarchy

```
BUSINESS NEED
       │
       ▼
BUSINESS OBJECTIVE (Goal)
       │
       ▼
USER REQUIREMENT
       │
       ▼
SYSTEM REQUIREMENT
       │
       ▼
SOFTWARE REQUIREMENT
       │
       ▼
DESIGN SPECIFICATION
```

**Every step downward introduces opportunities for misunderstanding.** SDSD aims to make each level explicit and traceable to the level above.

### Types of Requirements

**Functional Requirements (FR):** what the system must do.
> Example: "The system must allow the user to reset their password via email."

**Non-Functional Requirements (NFR):** how it must do it.
> Example: "The system must respond to requests within 200ms at the 95th percentile."

**Constraint Requirements:** in what context it operates.
> Example: "The system must comply with GDPR."

> ⚠️ **Common trap:** stakeholders describe almost exclusively functional requirements and forget non-functional ones. NFRs often drive the most important architectural decisions and are the most expensive to correct later.

---

## Requirements Elicitation Techniques

### 1. Structured Interviews

Don't ask open-ended questions like "What do you need?". Use structured questions:

- **Context questions:** "Describe how you perform this operation today."
- **Problem questions:** "What is the most frustrating part of the current process?"
- **Objective questions:** "If this system worked perfectly, what would you be able to do that you can't today?"
- **Priority questions:** "If we could only do one thing, which would be most important?"
- **Criticality questions:** "What would happen if the system did X instead of Y?"

### 2. Observation (Job Shadowing)

Directly observing the domain expert while they do their work reveals:
- Implicit requirements ("obvious" to those who know the domain)
- Workarounds for inefficient processes
- Data and objects not mentioned in interviews
- Frequency and volume of operations

### 3. Facilitated Workshops

Structured meetings with multiple stakeholders to:
- Align divergent visions
- Identify conflicts between requirements from different departments
- Produce a shared document at the end

Useful workshop techniques:
- **Event Storming** (Dan Berardi): visual mapping of business processes
- **User Story Mapping** (Jeff Patton): organizing stories by user flow
- **Impact Mapping** (Gojko Adzic): linking objectives → actors → impacts → deliverables

### 4. Prototyping

Prototypes (wireframes, mockups, clickthroughs) are the most effective way to make stakeholders understand what they are requesting. The adage is:

> *"I don't know what I want, but I'll recognize it when I see it."*

Turn this weakness into a structured process: prototype → feedback → updated requirements → updated prototype.

**Types of prototypes:**
- **Paper prototype:** hand-sketched, maximum speed, zero investment
- **Wireframe:** structure without aesthetics (Figma, Balsamiq)
- **Mockup:** structure with aesthetics but no interaction
- **Clickthrough prototype:** simulated interaction without code

### 5. Document Analysis

Before interviewing, analyze:
- Process documents (operational manuals, procedures)
- Current reports and dashboards
- Screens from legacy systems
- Emails with user requests or complaints

---

## Requirements Specification

### INVEST: Criteria for Quality User Stories

Every User Story should be:

| Letter | Criterion | Meaning |
|--------|-----------|---------|
| **I** | Independent | Independent from other stories |
| **N** | Negotiable | Negotiable, not a fixed contract |
| **V** | Valuable | Brings value to the user or business |
| **E** | Estimable | Estimable in effort |
| **S** | Small | Small enough to complete in a sprint |
| **T** | Testable | Verifiable with objective criteria |

### The User Story Formula

```
As a [type of user],
I want [action/feature],
so that [benefit/objective].

Acceptance Criteria:
  Given [context/initial state],
  When [event/action]
  Then [expected result]
```

**Well-formed example:**
```
As a warehouse operator,
I want to receive a notification when the stock of a product
drops below the minimum threshold,
so that I can reorder before running out of stock.

Acceptance Criteria:
  Given that "Product A" stock has a minimum threshold = 50
  When the stock drops to 49
  Then the system sends an email notification to the operator
    And the notification includes: product name, current quantity, threshold
    And the notification is sent within 5 minutes of the change
```

### Acceptance Criteria: the 3 C's

- **Card:** the story description
- **Conversation:** the discussion with the business
- **Confirmation:** verifiable acceptance criteria

---

## Managing Non-Functional Requirements (NFR)

NFRs are often forgotten by stakeholders but are crucial for architecture. Use this checklist to elicit them systematically:

### NFR Checklist — FURPS+

| Category | Questions to Ask |
|----------|-----------------|
| **F**unctionality | Security, regulatory compliance, licenses |
| **U**sability | Ease of use, accessibility, documentation |
| **R**eliability | Availability (uptime), MTBF, MTTR |
| **P**erformance | Response times, throughput, scalability |
| **S**upportability | Maintainability, testability, installability |
| **+** Design | Architectural constraints |
| **+** Implementation | Languages, frameworks, standards |
| **+** Interface | Integration with external systems |
| **+** Physical | Hardware, deployment environment |

---

## Requirements Validation

Before starting development, every requirement should pass this verification:

### Validation Checklist

- [ ] **Correctness:** Does it accurately describe what the business wants?
- [ ] **Completeness:** Does it cover all cases (happy path, edge case, error case)?
- [ ] **Consistency:** Does it not contradict other requirements?
- [ ] **Unambiguity:** Can it be interpreted in only one way?
- [ ] **Verifiability:** Can it be tested objectively?
- [ ] **Traceability:** Is it linked to a business objective?
- [ ] **Feasibility:** Is it technically achievable within the given constraints?
- [ ] **Priority:** Has it been assigned a priority (MoSCoW)?
- [ ] **Signature:** Has it been approved by the business owner?

### MoSCoW Prioritization

| Label | Meaning |
|-------|---------|
| **M**ust Have | Non-negotiable requirement (MVP) |
| **S**hould Have | Important, but not blocking |
| **C**ould Have | Desirable, enters if there's time |
| **W**on't Have (this time) | Out of scope for now, planned for the future |

> 💡 **SDSD Defense:** MoSCoW prioritization, done together with stakeholders and documented, is your protection when asked "why didn't you also do X?" — "Because X was classified as Won't Have, as agreed on [date] with [stakeholder]."

---

## Requirements Traceability Matrix (RTM)

The RTM is a document that links each requirement to its source, the tests that verify it, and the code that implements it. It is the **documentary proof** that every requirement has been correctly managed.

### Basic RTM Structure

| Req ID | Description | Source | Priority | US/Task | Test Case | Status | Signed by |
|--------|-------------|--------|----------|---------|-----------|--------|-----------|
| REQ-001 | User authentication via email | Interview 2024-03-01 | Must | US-012 | TC-045, TC-046 | ✅ Done | M. Rossi |
| REQ-002 | Password reset | Interview 2024-03-01 | Must | US-013 | TC-047 | 🔄 In Dev | M. Rossi |
| REQ-003 | Social login (Google) | Workshop 2024-03-15 | Should | US-020 | TC-060 | ⏳ Todo | F. Bianchi |

### Defensive Use of the RTM

The RTM serves as a response to questions such as:
- *"Why doesn't the system do X?"* → "X was not in the approved requirements."
- *"Did you do Y?"* → "Yes, as per REQ-045 signed by you on [date]."
- *"But I thought Z was included"* → "Z was classified as Won't Have in the workshop on [date], as per the minutes."

---

## Managing Volatile Requirements

Requirements volatility is inevitable. SDSD does not try to eliminate it; it seeks to **make it costly and visible** so that it only happens when truly necessary.

### The Change Request (CR) Process

```
CHANGE REQUEST
        │
        ▼
  Formal CR submission
  (description, requester, date)
        │
        ▼
  Impact Assessment
  (effort, risks, dependencies)
        │
        ▼
  Review by Product Owner + Tech Lead
        │
        ▼
     Decision
     ┌────┴────┐
   Approve   Reject / Defer
     │             │
     ▼             ▼
  Update       Document
  backlog      motivation
  and RTM
```

### Change Request Template

```markdown
# Change Request — CR-[NUM]

**Date:** [date]
**Requester:** [name and role]
**Estimated Priority:** Must / Should / Could / Won't

## Change Description
[What needs to change and why]

## Impacted Requirements
- REQ-XXX: [description]
- REQ-YYY: [description]

## Impact Estimate
- Estimated effort: [days/points]
- Impacted software components: [list]
- Tests to update: [list]
- Risks: [list]
- Impacted features: [list]

## Decision
- [ ] Approved
- [ ] Rejected (motivation: ___)
- [ ] Deferred to sprint [N]

**Approver signature:** ___________________  **Date:** ___________
```

---

## Requirements Anti-Patterns

### Anti-Pattern 1: The Vague Requirement
*"The system must be fast."*
→ **Fix:** "The system must respond to API requests within 200ms at P95 with 500 concurrent users."

### Anti-Pattern 2: The Solution Requirement
*"I want a red button in the top right."*
→ **Fix:** "Users must be able to cancel an operation visibly and immediately." (The technical solution is a design decision, not a business one.)

### Anti-Pattern 3: The Implicit Requirement
*"Obviously the system must be secure."*
→ **Fix:** "The system must implement multi-factor authentication, AES-256 encryption of data at rest, and OWASP Top 10 compliance."

### Anti-Pattern 4: The Contradictory Requirement
*REQ-001: "The system must save every change automatically."*
*REQ-045: "The system must ask for confirmation before every save."*
→ **Fix:** consistency validation before sign-off.

### Anti-Pattern 5: The Impossible Requirement
*"The system must have 100% uptime."*
→ **Fix:** "The system must have 99.9% uptime (SLA tier 3), with RTO < 4 hours and RPO < 1 hour."

---

*Previous: [02 — Data and Statistics](./02-dati-statistiche.md) | Next: [04 — Communication Patterns](./04-communication-patterns.md)*

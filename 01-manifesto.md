# 01 — The SDSD Manifesto

## Declaration of Intent

We, software developers who operate daily in organizational chaos, acknowledge a fundamental truth that is rarely spoken aloud:

> **Most software problems are not technical problems. They are human problems with technical consequences.**

Wrong code is almost always the symptom. The cause lies upstream: interpreted requirements, undocumented decisions, untracked course changes, responsibility attributed to the development team for decisions made elsewhere.

SDSD was born from the need to equip the developers with a set of practices, patterns, and behaviors that allow them to:

1. **Build quality software** despite the surrounding environment
2. **Protect themselves** from unfaire blame attribution
3. **Protect the product** from irrational interference
4. **Protect the project** from volatile requirements and scope creep
5. **Create a professional working environment** even where none exists

---

## The 12 SDSD Principles

### Principle 1: Writing is Law
*"What is not written does not exist."*

Every decision, every requirement, every change of direction must be documented. Verbal conversations evaporate. Emails get deleted. Slack messages disappear. A signed document is permanent.

**Derived practice:** no architectural decision, no requirement change, no project agreement without a written and approved document.

---

### Principle 2: Signature is Responsibility
*"Who signs, owns."*

Verbally approved requirements belong to no one. Signed requirements belong to whoever signed them. The formal sign-off mechanism transfers the responsibility for definition to its rightful owner: the business.

**Derived practice:** every requirements document, every ADR, every Change Request must have an "approved by" field with a signature (digital or analog) and a date.

---

### Principle 3: Change Has a Cost
*"There is no such thing as a small change."*

Every change to requirements has a cost: time, refactoring, testing, regression, coordination. This cost must be made visible and communicated before the change is approved. Making costs transparent reduces arbitrary changes.

**Derived practice:** every Change Request must include an impact estimate (effort, cost, risks, affected features).

---

### Principle 4: Assumptions Are Dangerous Only When Implicit
*"If you must assume, document the assumption."*

In the absence of complete requirements, developers make assumptions. This is inevitable. What is not inevitable is making assumptions without declaring them. A documented assumption is defensible. An implicit assumption is a trap.

**Derived practice:** every User Story, every ADR, every technical document must have an explicit "Assumptions" section.

---

### Principle 5: The Demo is the Truth
*"Show, don't describe."*

Stakeholders don't understand documents. They understand what they see. Frequent demos (even of prototypes, even of wireframes, even of mocks) are the most effective mechanism for correcting course before the cost of correction becomes unsustainable.

**Derived practice:** incremental demos at every sprint/milestone, with structured and documented feedback.

---

### Principle 6: Shared Language is Peace
*"If you call the same thing by different names, you are talking about different things."*

One of the main vectors of misunderstanding is language. Business and developers use different terms for the same concepts, or the same terms for different concepts. Creating and maintaining a shared vocabulary (Ubiquitous Language) is a fundamental defensive act.

**Derived practice:** a shared, updated glossary, visible to everyone. No requirements document without a reference to the glossary.

---

### Principle 7: Tests Are Proof
*"A green test is a signed guarantee."*

Automated tests are not just quality tools. They are formal proof that the software behaves as agreed. In the event of a dispute, a complete test suite is the most powerful document a developer can produce.

**Derived practice:** Acceptance Test Driven Development (ATDD) — acceptance tests are written together with the business before development begins.

---

### Principle 8: Traceability is Protection
*"Every line of code has a parent."*

Being able to trace a system behavior back to the requirement that originated it is the most effective defense against the accusation of "you built the wrong thing." The Requirements Traceability Matrix (RTM) is the formal mechanism for this protection.

**Derived practice:** every Feature/Story/Task must be linked to its parent requirement. Code must be traceable to the story that originated it.

---

### Principle 9: Architecture is Explained, Not Suffered
*"An undocumented architectural decision is a time bomb."*

Architectural decisions have a very long life and enormous impact. They must be documented, justified, and approved. Architecture Decision Records (ADR) are the standard tool for this.

**Derived practice:** ADR for every relevant architectural decision, including context, options considered, decision made, and consequences.

---

### Principle 10: The Project Boundary is Sacred
*"Scope creep is not an addition. It is theft."*

Every unplanned feature that enters the project without going through the formal change management process is a theft of resources, time, and attention. The project boundary (scope) must be defined, approved, and defended.

**Derived practice:** formal Change Request process, with impact assessment and explicit approval before any change.

---

### Principle 11: Uncertainty is Managed, Not Denied
*"If you don't know, say so. And document it."*

Denying uncertainty is the fastest way to create false expectations and miss deadlines. Explicitly identifying areas of uncertainty, communicating them, and planning risk management mechanisms is a sign of professionalism, not weakness.

**Derived practice:** Risk Register, technical spikes to reduce uncertainty, proactive communication of risks.

---

### Principle 12: The Professional Continuously Learns
*"Ignorance of the domain is temporary. Ignorance of best practices is a choice."*

SDSD does not justify technical arrogance. A developer who makes no effort to understand the business domain is part of the problem, not the solution. The protection offered by SDSD is all the more effective the more genuinely competent the developer is — both technically and in the domain.

**Derived practice:** continuous domain learning, Event Storming, shadowing with domain experts, reading domain documentation.

---

## The SDSD Manifesto (Compact Version)

```
We prefer:

  Written and signed documentation
    over verbal agreements

  Explicit and tracked responsibilities
    over diffuse and implicit responsibilities

  Formal Change Requests with assessed impact
    over untracked "small changes"

  Frequent demos with documented feedback
    over long development periods in the dark

  A shared and precise language
    over ambiguous terms freely interpreted

  Acceptance tests agreed before development
    over subjective post-hoc validations

  Risks and uncertainties proactively communicated
    over systematic optimism and missed deadlines

This does not mean that the items on the right have no value.
It means we have been burned too many times by them.
```

---

## The SDSD Mind Map

```
SDSD
├── Requirements Protection
│   ├── Rigorous Requirements Engineering
│   ├── Formal sign-off
│   ├── Requirements Traceability Matrix
│   └── Ubiquitous Language / Glossary
│
├── Decision Protection
│   ├── Architecture Decision Records
│   ├── Decision Log
│   ├── RFC Process
│   └── Meeting Minutes with tracked actions
│
├── Scope Protection
│   ├── Change Request Process
│   ├── Impact Assessment
│   ├── Definition of Ready
│   └── Formal backlog grooming
│
├── Quality Protection
│   ├── Definition of Done
│   ├── Explicit Acceptance Criteria
│   ├── BDD / ATDD
│   └── Tests as contracts
│
├── Architectural Protection
│   ├── Anti-Corruption Layer (DDD)
│   ├── Bounded Contexts
│   ├── Feature Flags
│   └── Defensive Programming
│
└── Communication Protection
    ├── Demo driven development
    ├── Escalation structures
    ├── Stakeholder matrix
    └── Public Risk Register
```

---

*Next: [02 — Data and Statistics on Software Failures](./02-dati-statistiche.md)*

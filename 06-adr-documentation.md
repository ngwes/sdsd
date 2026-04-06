# 06 — ADR & Decision Documentation

> *"An undocumented decision is not a decision. It is a forgotten intention."*

Decision documentation is the central pillar of SDSD protection. If a decision is not written down, it does not exist. If it exists but is not signed, it has no owner. If it has an owner but is not traceable, it is not defensible.

---

## Architecture Decision Records (ADR)

### What is an ADR

An Architecture Decision Record documents a single significant architectural decision: the context in which it was made, the options considered, the final decision, and its consequences.

ADRs were introduced by Michael Nygard in 2011 and are today a de-facto industry standard (used by Amazon, Google, Netflix, and most mature tech organizations).

### Why ADRs Protect

1. **Institutional memory:** when a team member leaves, the rationale behind decisions doesn't leave with them.
2. **Retroactive protection:** "Why did you choose PostgreSQL?" → "See ADR-007, decided in agreement with infrastructure on March 15."
3. **Prevention of "zombie decisions":** decisions already discussed and resolved are not needlessly reopened.
4. **Accelerated onboarding:** newcomers understand the *why* of the code, not just the *what*.

---

### Complete ADR Template (MADR Format)

```markdown
# ADR-[NNN]: [Short Decision Title]

**Status:** Proposed | Under Review | Accepted | Deprecated | Superseded by ADR-[NNN]

**Date:** [YYYY-MM-DD]

**Decided by:** [name/s], [role/s]

**Approved by:** [technical/business stakeholder who signed off]

---

## Context and Problem

[Describe the situation that requires a decision. Be concrete: what
 forces are at play? What constraints exist? What problem are we
 trying to solve?]

## Decision Factors

- [Factor 1: e.g. required performance]
- [Factor 2: e.g. team skills]
- [Factor 3: e.g. budget constraints]
- [Factor 4: e.g. security requirements]

## Options Considered

### Option 1: [Name]
[Description]
- Pros: [list]
- Cons: [list]
- Implementation cost: [estimate]

### Option 2: [Name]
[Description]
- Pros: [list]
- Cons: [list]
- Implementation cost: [estimate]

### Option 3: [Name] (if applicable)
...

## Decision

**Choice: Option [N] — [Name]**

[Rationale in 3-5 sentences: why this option over the others,
 given the decision factors listed above.]

## Consequences

### Positive
- [Benefit 1]
- [Benefit 2]

### Negative (accepted trade-offs)
- [Drawback 1]
- [Drawback 2]

### Residual Risks
- [Risk 1] → Mitigation: [how we manage it]

## Implementation Notes
[Any implementation details, links to technical documentation,
 code examples, patterns to follow]

## Related ADRs
- ADR-[NNN]: [relationship]
- ADR-[NNN]: [relationship]

## Revision Log
| Date | Modified by | Reason |
|------|-------------|--------|
| [date] | [name] | First draft |
| [date] | [name] | Approval |
```

---

### Real ADR Examples

#### ADR-001: Relational Database Choice

```markdown
# ADR-001: PostgreSQL as main database

**Status:** Accepted
**Date:** 2024-03-15
**Decided by:** Marco Rossi (Lead Dev), Sara Bianchi (Architect)
**Approved by:** Giovanni Ferri (CTO)

## Context and Problem

The system requires a database for transactional data persistence.
We must choose between various SQL and NoSQL options. The team has
predominantly relational database experience. The data has a strongly
relational structure (orders, customers, products, invoices).

## Decision Factors
- ACID compliance required for financial transactions
- Team skills (SQL, not MongoDB/DynamoDB)
- Operational cost (managed service available)
- JSONB support for future semi-structured data
- Open-source license (no vendor lock-in with Oracle/MSSQL)

## Options Considered
### Option 1: PostgreSQL
- Pros: ACID, JSONB, extensions, large community, managed on AWS (RDS)/GCP/Azure
- Cons: not natively horizontally scalable for writes

### Option 2: MySQL/MariaDB
- Pros: read performance, very widespread
- Cons: limited JSONB, less powerful advanced features than PG

### Option 3: MongoDB
- Pros: flexible schema, horizontal scaling
- Cons: no multi-document ACID pre-4.0, team not experienced, not ideal for relational data

## Decision
**Choice: Option 1 — PostgreSQL**

PostgreSQL offers the best balance between ACID compliance (necessary for
financial transactions), flexibility (JSONB), and team skills.
The risk of horizontal write scaling is acceptable for the current system
size and can be addressed in the future with read replicas.

## Consequences
### Positive
- Zero risk for financial transactions (ACID)
- Development speed (team already experienced)
- Flexibility with JSONB for semi-structured data

### Negative
- Limited vertical scaling (addressable with sharding in the future)
- Slightly higher cost than MySQL on managed services

## Related ADRs
- ADR-005: Schema migration strategy (Alembic/Flyway)
- ADR-012: Read replica for reporting
```

---

### Where to Keep ADRs

**Standard option:** in the code repository, in a `docs/decisions/` or `adr/` folder.

```
project/
├── src/
├── tests/
└── docs/
    └── decisions/
        ├── 0001-postgresql-database.md
        ├── 0002-hexagonal-architecture.md
        ├── 0003-jwt-authentication.md
        └── README.md  (ADR index)
```

**Advantages of keeping them in the repo:**
- Versioned with the code (git blame, git log)
- Linkable in code reviews
- Part of the PR process
- Always up-to-date with the code

**Tools for ADRs:**
- `adr-tools` (Nygard's CLI): creates templates and manages ADRs from the terminal
- Architectural Haiku (minimalist format)
- Log4Brains (web UI for navigating ADRs)
- Backstage.io (Spotify): developer portal with ADR support

---

## Decision Log

Lighter than ADRs, the Decision Log captures all decisions (not just architectural ones) in tabular format:

```markdown
# Decision Log — [Project Name]

| ID | Date | Decision | Context | Options Evaluated | Decided by | Review |
|----|------|----------|---------|-------------------|-----------|--------|
| DL-001 | 2024-03-01 | Use TypeScript instead of JavaScript | Need for type safety and safer refactoring | JS, TS, Flow | Team + PO | 2025-03 |
| DL-002 | 2024-03-15 | Use Kubernetes for orchestration | Auto-scaling requirements | K8s, ECS, Nomad | Architect + CTO | 2025-03 |
| DL-003 | 2024-04-01 | Adopt GitFlow as branching strategy | Managing multiple releases | GitFlow, Trunk-based, Feature Flags | Lead Dev | 2024-10 |
```

---

## Meeting Minutes

Every significant meeting must produce minutes. This is not bureaucracy: it is protection.

### Standard Minutes Template

```markdown
# Minutes — [Meeting Type] — [Date]

**Project:** [name]
**Date/Time:** [date and time]
**Location/Link:** [meeting room or Meet/Zoom link]
**Facilitator:** [name]
**Note-taker:** [name]

## Participants
| Name | Role | Attendance |
|------|------|-----------|
| [name] | [role] | Present / Absent with proxy to [name] |

## Agenda
1. [Item 1]
2. [Item 2]
3. [Item 3]

## Discussion

### [Item 1]: [Title]
[Summary of discussion]
**Decision made:** [clear description]
**Rationale:** [why]

### [Item 2]: [Title]
[Summary]
**Decision made:** ...

## Actions (Action Items)

| # | Action | Owner | Deadline | Status |
|---|--------|-------|----------|--------|
| 1 | [action description] | [name] | [date] | ⏳ Open |
| 2 | [action description] | [name] | [date] | ⏳ Open |

## Next Meeting
**Date:** [date]
**Preliminary agenda:** [list]

---
*These minutes will be considered approved if no corrections are reported
within 48 hours of distribution.*

**Distributed to:** [email list]
**Distribution date:** [date]
```

---

## Technical Spikes — Documentation

A spike is a research and prototyping activity to reduce technical uncertainty. It should be formally documented:

```markdown
# Spike — [ID]: [Title]

**Date:** [date]
**Conducted by:** [name]
**Duration:** [hours/days]

## Question to Answer
[What uncertainty are we trying to eliminate?]

## Method
[How did we investigate?]

## Results
[What did we find?]

## Recommendation
[What do we do now?]

## Next Steps
- [Action 1]
- [Action 2]

## References
- [Links to PoC, benchmarks, documentation]
```

---

## RFC — Request for Comments

Formal process for proposing and discussing significant system changes, used by many big tech companies (Rust lang, React, TypeScript, etc.):

### RFC Process

```
1. DRAFT
   The developer writes a proposal in RFC format
   and shares it in the repository docs/rfcs/

2. REVIEW (7-14 days)
   The team comments, suggests, criticizes.
   Comments are managed as threads in the PR.

3. FINAL COMMENT PERIOD (FCP)
   Announcement that the decision is imminent.
   Final comments collected.

4. DECISION
   - Accepted: the change proceeds
   - Rejected: motivation documented
   - Postponed: deferred with rationale

5. IMPLEMENTATION
   The accepted RFC becomes an ADR + issue/epic in the tracker.
```

### RFC Template

```markdown
# RFC-[NNN]: [Title]

**Author:** [name]
**Status:** Draft | In Review | FCP | Accepted | Rejected
**Proposed date:** [date]
**Decision date:** [date]

## Summary (3-5 lines)
[What you are proposing and why, briefly]

## Motivation
[Why is this change necessary? What problem does it solve?
 What use cases does it enable?]

## Detailed Proposal
[How will it work exactly? Design, API, structure.]

## Trade-offs and Drawbacks
[What are we sacrificing with this choice?]

## Alternatives Considered
[What did you evaluate before proposing this?]

## Open Questions
[What haven't you resolved yet? Where do you need input?]

## References
[Links, papers, similar implementations in other projects]
```

---

## Traceability: Closing the Loop

Decision documentation has full value only if it is **navigable and interconnected**:

```
REQUIREMENT (RTM)
    │ implemented by
    ▼
USER STORY (backlog)
    │ derived from
    ▼
TASK / COMMIT (git)
    │ justified by
    ▼
ADR / RFC (docs/decisions)
    │ validated by
    ▼
ACCEPTANCE TEST (CI/CD)
    │ verified by
    ▼
PRODUCTION METRICS (monitoring)
```

This traceability chain allows answering any question of the type "why does the system do X?" by navigating from the observed behavior back to the original requirement that motivated it.

---

*Previous: [05 — Defensive Architecture](./05-defensive-architecture.md) | Next: [07 — Agile as a Shield](./07-agile-protection.md)*

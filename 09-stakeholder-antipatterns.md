# 09 — Stakeholder Anti-Patterns

> *"You cannot solve a problem you haven't named."*

Cataloging stakeholder anti-patterns is not an exercise in cynicism: it is **professional pattern recognition**. Those who recognize an anti-pattern can apply the correct countermeasure instead of reacting emotionally or randomly.

---

## Anti-Pattern Catalog

---

### AP-01: The Ghost Requirement

**Description:** The business requests something they never mentioned, saying "I thought it was obvious" or "I said it in the meeting 6 months ago."

**Signals:**
- "But obviously the system must also..."
- "There's no need to say it explicitly, it's understood"
- "I said it, maybe you weren't there"

**Damage:** Unplanned work that surfaces in UAT or production.

**Countermeasure:**
- Explicit "Assumptions" section in every requirements document
- "5 Whys" technique during elicitation to uncover implicit requirements
- Direct questions: "What do I need to know that you haven't told me yet?"
- Requirements review with standard scenario checklists (login, logout, errors, permissions, edge cases)

---

### AP-02: The Serial Mind-Changer

**Description:** Stakeholders change requirements frequently and in an uncoordinated way, often contradicting previously made decisions.

**Signals:**
- Requirements that change at every meeting
- Decisions that seemed resolved come back up for discussion
- "I hadn't understood well, actually I want..."
- Different versions of "what was wanted" from different people

**Damage:** Continuous regressions, team demotivation, explosive costs.

**Countermeasure:**
- Formal sign-off of requirements (no signature = no agreement)
- Visible and shared Decision Log
- Change Request process that makes the cost of change visible
- Retrospective of changes: "In the last 3 sprints, we had 8 requirement changes. This cost us X extra points."

---

### AP-03: The Solution Tunnel

**Description:** The stakeholder describes the technical solution instead of the problem. A specific implementation is requested without understanding why.

**Signals:**
- "I want a red button in the top right"
- "It must work exactly like Excel"
- "Add a column here"
- Detailed UI/UX requests from non-designers

**Damage:** The developer implements the wrong solution to the right problem. Often results in poor UX or convoluted architecture.

**Countermeasure:**
- "5 Whys" technique to trace back to the real problem
- Key question: "What are you trying to do when you need this?"
- Translate the solution into a problem, then propose alternative solutions
- Involve UX designers in the elicitation process

---

### AP-04: The Invisible Stakeholder

**Description:** There is someone (senior manager, legal, compliance, end user) who has relevant requirements but does not participate in the elicitation process. They emerge late, often after release.

**Signals:**
- "We also need to hear from the head of [department X]"
- "Legal doesn't know about the project yet"
- "But do the sales team know how it will work?"
- End users who are only consulted during UAT

**Damage:** Requirements discovered late with very high correction costs.

**Countermeasure:**
- Formal Stakeholder Analysis at the start of the project
- Checklist: "Who else might have requirements on this system?"
- Expanded kick-off meetings to identify all stakeholders
- "Stakeholders not yet consulted" section in requirements documents

---

### AP-05: The Business Proxy

**Description:** The person acting as intermediary between the actual business and the development team does not have the authority or knowledge to make decisions. They always need to "go ask," with endless feedback cycles.

**Signals:**
- Responses that always require someone else's approval
- Contradictory directions because reported inaccurately
- "I don't know, I need to check" as the prevailing answer
- Demos that cannot be accepted because "I need to show it to my manager"

**Damage:** Slowdowns, misunderstandings, decisions made without real authority.

**Countermeasure:**
- Identify and request direct access to the real decision-maker
- Clearly document the RACI (Responsible, Accountable, Consulted, Informed)
- Include the decision-maker in sprint review ceremonies
- Proactive escalation when the proxy cannot unblock decisions

---

### AP-06: The Constructive Pessimist (or: "Yes but...")

**Description:** Every proposal is accepted with a "yes but" that adds additional requirements, redefines the perimeter, or vetoes already agreed-upon solutions.

**Signals:**
- "Yes, but we also need..."
- "It works, but it's missing..."
- Acceptance criteria that expand at every demo
- Demos that end with more work than was completed

**Damage:** Demos that never end, sprints that never close, apparent velocity of zero.

**Countermeasure:**
- Freeze acceptance criteria before the sprint (DoR)
- Formal distinction: "Is this a bug?" (must be fixed) vs "Is this a new feature?" (new CR)
- Physically separate the acceptance moment from the new feedback collection moment
- "Do we agree that this story is DONE? New requests go in the backlog?"

---

### AP-07: The Chronic Optimist

**Description:** The stakeholder systematically underestimates complexity, time, and risks. "It's not that hard" is the response to any estimate.

**Signals:**
- "It won't take that long"
- "We did it in a weekend 10 years ago"
- Pressure to reduce estimates without modifying scope
- "With modern AI tools this takes an hour"

**Damage:** Unrealistic estimates, impossible schedules, team under constant pressure.

**Countermeasure:**
- Estimates documented with detailed breakdown (not just the final number)
- Reference to project historical data
- "I'm happy to discuss how to reduce effort. We can reduce scope or increase implementation simplicity. But I cannot reduce the estimate without changing something."
- Three-point estimation (optimistic, realistic, pessimistic) to make uncertainty visible

---

### AP-08: The HIPPO (Highest Paid Person's Opinion)

**Description:** Decisions are made based on hierarchical rank, not knowledge of the domain or data. The senior manager who speaks last is "right" by default.

**Signals:**
- Decisions that change when the senior manager enters
- Data and analysis ignored in favor of the "boss's" intuition
- Team that doesn't express contrary opinions because "they decide anyway"

**Damage:** Suboptimal decisions made for political reasons, demotivation of the technical team.

**Countermeasure:**
- Pre-load decisions with objective data (ADR, benchmarks, research)
- RFC structure requiring evidence-based justification
- "The last one to speak is right" is an anti-pattern — promote "show me the data" culture
- Involve the HIPPO early to influence them with data instead of fighting them with opinions

---

### AP-09: The Arbitrary Deadliner

**Description:** Deadlines are imposed without relation to work complexity or real business constraints. The date is "because I want it ready for [event]" without analysis.

**Signals:**
- Deadlines that slip without consequences (so they weren't real)
- "It must be ready for Q1" without commercial justification
- Same urgency for everything ("everything is priority 1")
- Consequences not defined in case of deadline miss

**Damage:** Team under constant pressure, technical debt accumulated to meet unrealistic deadlines, compromised quality.

**Countermeasure:**
- "What is the commercial consequence if we slip by 2 weeks?" — the answer often reveals the deadline was arbitrary
- Offer options: "We can meet the date by reducing scope, or meet the scope by slipping [N] weeks. Which do you prefer?"
- Explicitly document the scope/quality/time trade-off in the change request
- The "impossible deadline" must be communicated in writing as soon as identified, with an alternative estimate

---

### AP-10: The Blame Shifter

**Description:** When something goes wrong, blame is attributed to the technical team regardless of actual responsibilities.

**Signals:**
- "The system doesn't work" (without specifying what, when, how)
- "The team didn't understand the requirements" (but the requirements were ambiguous)
- "That's not what I asked for" (but it is exactly what was agreed in writing)
- Revised version of the facts after a failure

**Damage:** Blame culture, demotivated team, loss of professionals.

**Countermeasure:**
- Systematic CYA (Cover Your Ass): every decision, every change, every agreement — in writing
- Blameless post-mortem: "What caused the problem?" not "Who caused the problem?"
- Complete traceability: requirements → tasks → code → tests
- Blameless post-mortem template (see section 04 — Communication Patterns)

---

### AP-11: The Feature Smuggler

**Description:** Unplanned features enter the system without going through the formal process — directly to developers, via informal chat, "while you're at it."

**Signals:**
- "While you're doing that, also add..."
- Direct conversations with developers bypassing the Product Owner
- Features that appear in the system without a story in the backlog
- "I asked [developer] directly"

**Damage:** Untracked scope, unplanned effort, product inconsistency.

**Countermeasure:**
- Team culture: every functional request goes to the Product Owner / backlog, not directly to the developer
- The developer responds: "I'll create a story in the backlog and put it in prioritization with the PO"
- No development without an approved ticket/story
- The PO must be the single filter for team priorities

---

### AP-12: The Post-Hoc Tester

**Description:** The business wants to validate the system only when it is "finished," without involvement during development. Then, during UAT, hundreds of issues emerge.

**Signals:**
- Refusal to participate in interim demos
- "Do your thing, call us when it's ready"
- UAT launched close to the deadline
- Requirement changes during UAT

**Damage:** Late bug discovery (costly), last-minute changes, missed deadlines.

**Countermeasure:**
- Mandatory demos every sprint (not optional)
- UAT planned as an explicit project phase with a fixed duration
- Acceptance criteria written before development (BDD/ATDD)
- "If you don't participate in interim demos, the risk of changes in UAT is borne by the business"

---

## Anti-Pattern / Countermeasure Matrix

| Anti-Pattern | Main Defense Tool |
|-------------|------------------|
| Ghost Requirement | Assumptions Section + 5 Whys |
| Serial Mind-Changer | Sign-off + Decision Log + CR process |
| Solution Tunnel | "Why do you need this?" + UX designer |
| Invisible Stakeholder | Stakeholder Analysis + expanded kick-off |
| Proxy without Authority | RACI matrix + access to decision-maker |
| Yes but... | DoR + AC freeze + demo/feedback separation |
| Chronic Optimist | Detailed estimate + historical data + three-point |
| HIPPO | ADR + data-driven decision + RFC |
| Arbitrary Deadliner | Trade-off analysis + written communication |
| Blame Shifter | CYA + traceability + blameless post-mortem |
| Feature Smuggler | "Everything goes through the PO" culture + no ticket = no work |
| Post-Hoc Tester | Mandatory demos + BDD + planned UAT |

---

*Previous: [08 — Scope Management](./08-scope-management.md) | Next: [10 — Domain-Driven Design](./10-ddd-protection.md)*

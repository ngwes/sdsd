# 04 — Communication Patterns

> *"Code is simple. People are complex. Learn both."*

Communication is the primary vector through which problems enter a software project. A developer who communicates well is a developer who rarely finds themselves in situations of "but I didn't know" or "I thought it was obvious."

---

## The Fundamental Principle: Cognitive Asymmetry

Stakeholders and developers live in different cognitive worlds:

| Domain | Stakeholder | Developer |
|--------|-------------|-----------|
| **Language** | Business, process, KPI | Technical, abstract, precise |
| **Time horizon** | Quarterly/annual | Sprint/ticket |
| **Success metric** | Revenue, NPS, efficiency | Performance, quality, test coverage |
| **Mental model of software** | Magic black box | Complex system with constraints |
| **Risk attitude** | Often high-risk/high-reward | Preferably low-risk/incremental |

**It's not stupidity: it's specialization.** Understanding this asymmetry is the first step toward communicating effectively.

---

## SDSD Communication Patterns

### Pattern 1: Written Confirmation (CYA — Cover Your Ass)

**Problem:** verbal agreements that disappear.

**Solution:** after every significant meeting or conversation, send a summary email:

```
Subject: Decision Summary — [project name] — [meeting date]

Hi [name],

As agreed in today's call, I am summarizing the decisions made:

1. [Decision 1] → Owner: [name] → By: [date]
2. [Decision 2] → Owner: [name] → By: [date]
3. [Approved/modified requirement] → Impact: [description]

Next steps:
- [Action 1] → [Who] → [When]
- [Action 2] → [Who] → [When]

If I don't receive corrections by [24/48 hours], I consider this summary
as confirmation of the decisions made.

Thank you,
[signature]
```

> 💡 **The last paragraph is crucial.** Silence becomes implicit consent, documented.

---

### Pattern 2: Speak Business, Not Tech

When communicating with non-technical stakeholders, **always translate into business impact terms**:

| Instead of... | Say... |
|-------------|--------|
| "We need to refactor the authentication module" | "We need to reduce the risk of security breaches and reduce development time for new features by 30%" |
| "There's a memory leak in the export process" | "The export system becomes slow and unstable after hours of use. We need to fix this bug or users will lose confidence in the system" |
| "We can't do TDD on this legacy codebase" | "Adding new features to this system takes twice as long and significantly increases regression risk. Let me present a gradual modernization plan" |
| "The architecture is a coupled monolith" | "The system is structured so that every change requires testing the entire system, slowing releases. With restructuring, we could release each area independently" |

---

### Pattern 3: Proactive Risk Communication

**Golden rule:** communicate problems before they become crises.

The "traffic light" mechanism (RAID log):

| Acronym | Meaning | Action |
|---------|---------|--------|
| **R**isks | What could go wrong | Preventive mitigation |
| **A**ssumptions | What we are assuming | Validation |
| **I**ssues | Already-manifested problems | Resolution |
| **D**ependencies | What the project depends on | Tracking |

The RAID log should be updated every sprint and shared with stakeholders. **Anyone who has been warned of a risk cannot attribute the responsibility for the problem to the team.**

---

### Pattern 4: The Structured Demo

Demos are not shows. They are **validation ceremonies** with a precise structure:

```
SDSD DEMO STRUCTURE

1. CONTEXT (2 min)
   "In sprint X, we committed to developing Y and Z."

2. DEMONSTRATION (10-15 min)
   Show the features in a real user flow.
   Do not show code. Show behavior.

3. ACCEPTANCE CRITERIA VERIFICATION (5 min)
   "As agreed, the criteria were [A], [B], [C].
    Let's verify together that they are satisfied."

4. FEEDBACK COLLECTION (10 min)
   Structure the feedback:
   - "What works as expected?"
   - "What would you like changed?"
   - "Is anything missing?" (→ Change Request!)

5. ACTIONS (5 min)
   Written document of feedback with:
   - Approved features → closed in tracker
   - Requested changes → formal Change Request
   - New requests → Backlog, not current sprint
```

> ⚠️ **Anti-pattern:** the demo becomes a "I just had an idea" session. Every new request during a demo is a Change Request, not an immediate change.

---

### Pattern 5: The Stakeholder Matrix

Before communicating, understand *who* you are communicating with:

| Stakeholder | Interest | Power | Strategy |
|-------------|----------|-------|----------|
| CEO | ROI, strategic vision | High | Update rarely, on big picture |
| CFO | Budget, costs | High | Clear cost/benefit reports |
| Product Owner | Features, priorities | Medium | Continuous collaboration |
| Sales Team | Customer features | Medium | Demo, roadmap |
| End Users | Usability, efficiency | Low-medium | Interviews, usability testing |
| IT/Ops | Infrastructure, security | Medium | Shared technical requirements |

The **Interest/Power** matrix divides stakeholders into 4 quadrants:

```
          HIGH POWER
               │
  Actively     │   Keep Informed
  Manage       │   and Engaged
               │
LOW ───────────┼─────────── HIGH
INTEREST       │             INTEREST
               │
  Monitor      │   Keep
  Minimally    │   Satisfied
               │
          LOW POWER
```

---

### Pattern 6: Structured Escalation

When a problem is not resolved at the current level, escalation must be structured, not emotional:

```
Level 1: Direct resolution with stakeholder
           (documented via email/ticket)
    ↓ if unresolved in [X days]
Level 2: Resolution with PM / Product Owner
           (formal meeting, documented decision)
    ↓ if unresolved in [X days]
Level 3: Resolution with management (Sponsor)
           (formal presentation of impasse, options, recommendation)
    ↓ decision made at the highest necessary level
```

> 💡 **SDSD Rule:** every escalation step must be documented. Whoever decides, signs the decision. Escalation is not defeat: it is professionalism.

---

### Pattern 7: The Language of Impact

When you need to say "no" or "it's not possible," use **impact language** instead of direct refusal:

| ❌ Instead of... | ✅ Say... |
|----------------|----------|
| "It can't be done" | "If we do X, we can do it in [time/cost]. Otherwise alternative Y requires [less/more]" |
| "It's too complicated" | "This feature requires an estimate of 3 weeks and impacts module Z. Do you want to proceed by shifting [other feature]?" |
| "They're telling me at the last minute" | "This request comes 2 days before the release. The impact is [description]. I propose including it in the next sprint and doing an ad-hoc release" |
| "The business doesn't understand" | "I think there's a misunderstanding about how this component works. Can I prepare a demo to clarify?" |

---

### Pattern 8: Effective Meetings

Every meeting without an agenda is wasted time. Every meeting without documented actions is a missed protection opportunity.

**Checklist for every meeting:**

**Before:**
- [ ] Agenda sent at least 24h in advance
- [ ] Clear objective: decision, brainstorming, or update?
- [ ] Materials prepared

**During:**
- [ ] One facilitator
- [ ] One note-taker
- [ ] Actions identified with owner and deadline

**After:**
- [ ] Minutes sent within 24h
- [ ] Actions tracked in the project management system
- [ ] "If I don't receive corrections by [date], the minutes are confirmed"

---

### Pattern 9: The "Pre-Mortem"

Instead of waiting for the post-mortem (retrospective failure analysis), do a **pre-mortem** at the beginning of the project:

> "Let's imagine that a year has passed and the project has failed. What went wrong?"

This exercise, proposed by Gary Klein and popularized by Daniel Kahneman, has two effects:
1. Identifies risks that would have been ignored due to optimism
2. Creates a shared and agreed risk document (no one can say "I didn't know")

---

### Pattern 10: Trade-Off Communication

Every technical decision involves trade-offs. Making them explicit protects the developer:

```
TRADE-OFF COMMUNICATION FRAMEWORK

Option A: [description]
  PROS: [list]
  CONS: [list]
  Cost: [estimate]
  Risk: [level]

Option B: [description]
  PROS: [list]
  CONS: [list]
  Cost: [estimate]
  Risk: [level]

Technical team recommendation: Option [X]
Rationale: [explanation in business language]

Final decision: ________________________________
Signed by: _________________ Date: ______________
```

When the business chooses the option the technical team advised against, it is documented. If it goes wrong, the responsibility is clearly attributed.

---

## Communication in Crisis Situations

### When the System Goes Down in Production

```
INCIDENT COMMUNICATION TEMPLATE (Minute 0-15)

Subject: [SEV-1] Production incident — [System] — being managed

Impacted system: [name]
User impact: [description]
Severity: SEV-1 / SEV-2 / SEV-3
Detection time: [time]
Team managing: [names]

Current status: Investigation in progress / Workaround active / Fix being deployed

Next update: in 30 minutes

— Engineering Team
```

```
UPDATE TEMPLATE (every 30 min)

Update #[N] — [time]

Cause identified: [yes/no — description]
Workaround available: [yes/no — description]
ETA resolution: [estimate]
Actions in progress: [list]

Next update: [time]
```

```
POST-INCIDENT REPORT TEMPLATE (within 48h)

Subject: Post-Incident Report — [System] — [date]

Executive Summary: [2-3 lines]
Timeline: [detailed chronology]
Root Cause: [technical analysis]
Impact: [duration, users, data]
Applied mitigation: [description]
Permanent fix: [plan with dates]
Preventive actions: [list with owner and dates]
Lessons learned: [list]
```

---

*Previous: [03 — Requirements Engineering](./03-requirements-engineering.md) | Next: [05 — Defensive Architecture](./05-defensive-architecture.md)*

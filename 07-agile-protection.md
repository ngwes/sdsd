# 07 — Agile as a Shield

> *"Agile is not the absence of process. It is adaptive process — and process protects."*

Agile is often misunderstood by stakeholders as "we can change everything at any time." In reality, used correctly, Agile is one of SDSD's most powerful tools: it provides formal ceremonies, artifacts, and criteria that create clear boundaries and protect the team from unstructured interference.

---

## The Three Agile Protection Artifacts

### 1. Definition of Done (DoD)

The DoD is the formal agreement on what "completed" means. It is not the list of acceptance criteria for a single story: it is the set of conditions *always* applicable to any work.

**Defensive function:** when the business says "but it's not done, X is missing," you can respond with the agreed DoD. If X was not in the DoD, it was not part of the agreement.

#### DoD Template — Levels

```markdown
# Definition of Done — [Project]
*Approved by: [Product Owner] on [date]*
*Version: [N]*

## Story Level
A User Story is DONE when:
- [ ] The code implements all acceptance criteria
- [ ] The code has been reviewed (code review approved)
- [ ] Unit tests written and passing (coverage ≥ 80%)
- [ ] Integration tests updated if necessary
- [ ] No linting errors / no blocking warnings
- [ ] Technical documentation updated (if API modified)
- [ ] The story has been demonstrated to the Product Owner
- [ ] The Product Owner has accepted the story

## Sprint Level
The Sprint is DONE when:
- [ ] All stories committed in the sprint are DONE
- [ ] The CI/CD pipeline is green
- [ ] The branch is merged into develop/main
- [ ] The system is deployable to staging
- [ ] The regression test suite is green

## Release Level
A Release is DONE when:
- [ ] All planned features are DONE
- [ ] Performance test passed (SLA compliance)
- [ ] Security review completed
- [ ] User documentation updated
- [ ] Release notes written
- [ ] Deployment procedure tested
- [ ] Go/No-Go signed by [Product Owner] and [Tech Lead]
```

---

### 2. Definition of Ready (DoR)

The DoR is the contract on the *prerequisite* for starting work on a story. A story that is not ready does not enter the sprint.

**Defensive function:** prevents the team from finding itself mid-sprint without needed information, decisions, or resources. When a delay occurs due to a non-ready story, the responsibility is documented: the story did not meet the DoR.

#### DoR Template

```markdown
# Definition of Ready — [Project]
*Approved by: [Product Owner] on [date]*

A User Story is READY to enter the sprint when:
- [ ] Written in standard format (As/Want/So that)
- [ ] Acceptance criteria written and agreed
- [ ] Has a story point estimate approved by the team
- [ ] Has no unresolved blocking dependencies
- [ ] Necessary mockups/wireframes are available
- [ ] Necessary external APIs are documented (or accessible)
- [ ] Necessary test data is available
- [ ] The Product Owner is available for clarifications during the sprint
- [ ] Classified with MoSCoW priority
```

---

### 3. Acceptance Criteria

Acceptance criteria transform the requirement from a vague description to a verifiable contract.

**Defensive function:** if the software meets all acceptance criteria, the software is correct by definition. If the business says "it doesn't work," you can respond "let's verify together the agreed acceptance criteria."

#### Gherkin Format (BDD)

The Gherkin format (used with Cucumber, Behave, SpecFlow) is the de-facto standard for verifiable acceptance criteria:

```gherkin
Feature: User login

  Background:
    Given the system is online
    And the database contains the user "mario.rossi@email.com" with password "SecurePass123"

  Scenario: Login with correct credentials
    Given the user is on the login page
    When they enter email "mario.rossi@email.com"
    And they enter password "SecurePass123"
    And they click "Sign In"
    Then they are redirected to the dashboard
    And they see the message "Welcome, Mario"
    And the session token is set

  Scenario: Login with wrong password
    Given the user is on the login page
    When they enter email "mario.rossi@email.com"
    And they enter password "WrongPass"
    And they click "Sign In"
    Then they remain on the login page
    And they see the error message "Email or password incorrect"
    And no session token is set
    And the security event "failed_login" is recorded in the log

  Scenario: Lockout after 5 failed attempts
    Given the user has already made 4 failed login attempts
    When they enter wrong credentials for the fifth time
    Then the account is locked for 30 minutes
    And the user receives a notification email at the registered address
```

These Gherkin scenarios become **executable tests** — automated proof that the system behaves as agreed.

---

## Agile Ceremonies as Protection Mechanisms

### Sprint Planning — The Sprint Contract

Sprint planning is not just "what do we do this week." It is the negotiation of a **formal contract** between the team and the Product Owner.

**Key protections:**
1. **The team decides what goes into the sprint**, not the business. Velocity is a technical datum.
2. **Only READY stories enter the sprint.** The DoR is the filter.
3. **The commitment is recorded** — what we committed to doing in this sprint.
4. **Stories accepted mid-sprint must compensate** — if something new comes in, something equivalent goes out.

**Documentary output:**
```
SPRINT [N] — COMMITMENT
Date: [date]
Duration: [start date] → [end date]
Team: [list]
Estimated velocity: [N] points

Committed stories:
- US-042: [title] — [N] points
- US-043: [title] — [N] points
- BUG-017: [title] — [N] points

Total: [N] points

Excluded stories (next sprint):
- US-044: not-ready (missing mockups)
- US-045: priority reduced by PO

Signed: [Product Owner] _________________ Date: _______
```

---

### Daily Standup — The Daily Report

Three questions, brief answers:
1. What did I do yesterday?
2. What am I doing today?
3. Are there any blockers/impediments?

**Defensive function:** blockers are communicated daily. No one can say "the team didn't communicate the problem" if it is documented in the daily blocker of [date].

**Pro tip:** blockers should be communicated as soon as identified, not waiting for the daily. The daily is the back-stop mechanism, not the primary channel.

---

### Sprint Review — Formal Validation

The Sprint Review is different from a simple demo. It is the ceremony in which the Product Owner (and stakeholders) **formally accept or reject** completed stories.

**Structure:**
1. Presentation of each completed story
2. Verification of acceptance criteria (not "it seems to work," but "acceptance criterion N is satisfied")
3. Formal acceptance by the PO
4. Structured feedback (→ new stories if necessary)
5. Velocity update

**Documentary output:**
```
SPRINT REVIEW — Sprint [N]
Date: [date]

Accepted Stories:
✅ US-042 — [title] — Accepted by [PO] on [date]
✅ US-043 — [title] — Accepted by [PO] on [date]

Rejected Stories:
❌ BUG-017 — [title] — Reason: [description]
   Action: AC review and retry Sprint [N+1]

Feedback Received:
- [Feedback 1] → new backlog item: US-[NNN]
- [Feedback 2] → formal Change Request: CR-[NNN]
- [Feedback 3] → informational note

Achieved Velocity: [N] points
Average Velocity (last 3 sprints): [N] points
```

---

### Sprint Retrospective — Defensive Self-Improvement

The retrospective is not just process improvement. It is also an opportunity to document recurring problems and their causes, especially if originating from external interference:

**"5 Whys" framework for recurring problems:**
```
Problem: "We missed velocity for the third sprint in a row"

Why 1: Why did we complete fewer stories than expected?
→ Because we had many changes mid-sprint.

Why 2: Why were there changes mid-sprint?
→ Because the PO changed priorities 3 times during the sprint.

Why 3: Why did the PO change priorities?
→ Because they received urgent business requests without a filter.

Why 4: Why does the business bypass the prioritization process?
→ Because there is no formal Change Request process during the sprint.

Why 5: Why is there no such process?
→ Because it was never explicitly defined and agreed upon.

ACTION: Define and get a signed Change Request policy during the sprint.
OWNER: Product Owner + Lead Dev
BY: End of week
```

---

## Behavior-Driven Development (BDD)

### The BDD Triangle

```
         Business / Stakeholder
               /\
              /  \
             /    \
            / Gherkin\
           /  Scenarios\
          /─────────────\
         /               \
        /  Developer      \
       /  (Step Definitions)\
      /─────────────────────\
     /                       \
    /   QA / Tester           \
   /    (Test Execution)       \
  /──────────────────────────── \
```

BDD is the bridge between business language and code. Gherkin scenarios are written together, understandable by everyone, and executed automatically.

### The BDD Cycle

```
1. DISCOVERY (business + developer + QA together)
   "What should the system do?" → Gherkin scenarios

2. FORMULATION (developer + QA)
   Translation of scenarios into formal Gherkin

3. AUTOMATION (developer)
   Implementation of step definitions
   (code that executes Gherkin steps)

4. VALIDATION (all)
   Tests run in CI/CD
   Results readable by everyone
```

### Step Definitions (Python/Behave)

```python
from behave import given, when, then
from myapp import create_user, login_user

@given('the user is on the login page')
def step_user_on_login_page(context):
    context.browser.get('/login')
    assert context.browser.current_url.endswith('/login')

@when('they enter email "{email}"')
def step_insert_email(context, email):
    context.browser.find_element_by_id('email').send_keys(email)

@when('they enter password "{password}"')
def step_insert_password(context, password):
    context.browser.find_element_by_id('password').send_keys(password)

@when('they click "Sign In"')
def step_click_login(context):
    context.browser.find_element_by_id('login-btn').click()

@then('they are redirected to the dashboard')
def step_redirected_to_dashboard(context):
    assert '/dashboard' in context.browser.current_url, \
        f"Expected /dashboard, got {context.browser.current_url}"

@then('they see the message "{message}"')
def step_sees_message(context, message):
    body = context.browser.find_element_by_tag_name('body').text
    assert message in body, f"Expected '{message}' in page, but got: {body[:200]}"
```

---

## Acceptance Test-Driven Development (ATDD)

ATDD takes BDD to a more formal level: acceptance tests are written **before** development, as a contractual agreement:

```
ATDD PROCESS

PHASE 1 — Three Amigos Meeting
  (Developer + QA + Product Owner)
  Objective: write acceptance tests together
  Output: Gherkin scenarios signed by PO

PHASE 2 — Test automation
  Developer writes step definitions
  Tests are red (failing) — the code doesn't exist yet

PHASE 3 — Implementation
  Developer implements the code
  Objective: make the tests green

PHASE 4 — Review
  PO verifies green tests
  Formal story acceptance
```

**The defensive advantage:** acceptance tests are written and signed BEFORE development. If the PO says "that's not what I wanted," the response is: "The tests you approved in phase 1 are green. The feature corresponds to what was agreed."

---

## Managing "Hot Fix" Urgencies

Stakeholders often try to bypass the process with "urgent" requests. SDSD has a process for this too:

```markdown
# Hot Fix / Sprint Interruption Policy

## Definition of "Urgent"
An emergency justifies interrupting the sprint only if:
- [ ] It directly impacts revenue (production system down)
- [ ] It is a security bug with an active exploit
- [ ] It violates a contractual SLA with penalties

## Hot Fix Process

1. The requester fills out the "Hot Fix Request" form (< 5 minutes)
2. The Tech Lead assesses urgency (within 30 minutes)
3. If approved: estimates effort and determines what leaves the sprint
4. The PO signs the approval with the list of what is deferred
5. The team works on the hot fix
6. The hot fix is deployed, tested, and documented

## Hot Fix Request Template
- Requester: ___________
- Impacted system: ___________
- Estimated business impact per hour of downtime: $ ___
- Urgency: [Critical / High / Medium] + justification
- Proposed solution: ___________
- Estimated effort: ___ hours

## Consent required to proceed
- Tech Lead: _____________ Date/Time: _______
- Product Owner: _____________ Date/Time: _______
```

---

## The Backlog as a Defense Tool

A well-managed backlog is a prioritized, estimated, and visible list of all work to be done. Its proper management protects in several ways:

1. **Everything is tracked.** No request can be "forgotten" or "you didn't understand I had asked for that."
2. **Priorities are explicit.** If X was not done, it's because Y, Z, W were higher priority — and this was agreed upon.
3. **Estimates are documented.** If X would take 3 weeks, this is documented before being asked "why does it take so long?"

---

*Previous: [06 — ADR & Documentation](./06-adr-documentation.md) | Next: [08 — Scope Management](./08-scope-management.md)*

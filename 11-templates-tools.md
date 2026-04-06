# 11 — Practical Templates and Tools

> *"An empty template is better than an absent document."*

This section collects ready-to-use templates, operational checklists, and tool configurations to implement SDSD practices immediately.

---

## Core Templates

### TEMPLATE 1: Kick-off Meeting Agenda

```markdown
# Kick-off Agenda — [Project Name]

**Date/Time:** [date] [time]
**Location/Link:** [where]
**Duration:** 2-3 hours

## Required Participants
- [ ] Product Owner / Business Sponsor
- [ ] Tech Lead / Architect
- [ ] Developer (at least 1 senior)
- [ ] QA Lead
- [ ] UX Designer (if applicable)
- [ ] Operations/Security representative (if applicable)

## Agenda

### 1. Project Objectives (15 min)
- What problem are we solving?
- What is the expected value?
- How do we measure success?

### 2. Stakeholder Map (20 min)
- Who are all the stakeholders?
- Who has decision-making power?
- Who needs to be consulted?
- Who needs to be informed?

### 3. Scope and Out-of-Scope (30 min)
- What is definitely IN scope?
- What is definitely OUT of scope?
- What is yet to be decided (gray areas)?

### 4. Assumptions and Risks (20 min)
- What are we assuming to be true?
- What are the main risks?
- How do we mitigate them?

### 5. Constraints (15 min)
- Fixed or flexible timeline?
- Available budget?
- Technological constraints?
- Regulatory constraints?

### 6. Working Process (20 min)
- Methodology (Agile, Scrum, Kanban)?
- Ceremonies and their frequency
- Communication channels
- Change request process
- Escalation path

### 7. Definition of Success (10 min)
- High-level DoD
- Release acceptance criteria

### 8. Next Steps (10 min)
- Immediate actions with owner and date

## Expected Output from This Meeting
- [ ] Draft Project Charter
- [ ] Stakeholder Map
- [ ] Initial Risk Register
- [ ] Draft Scope Baseline (to be refined)
- [ ] Agreement on working process
```

---

### TEMPLATE 2: Project Charter

```markdown
# Project Charter — [Project Name]

**Version:** 1.0
**Date:** [date]
**Sponsor:** [name and role]

## 1. Vision and Objectives

**Problem to solve:**
[Description of the problem in business terms]

**Proposed solution:**
[High-level description of the solution]

**Measurable objectives:**
| Objective | Metric | Target | Baseline |
|-----------|--------|--------|----------|
| [Obj 1] | [how it's measured] | [target value] | [current value] |

## 2. Scope

### In Scope
- [Feature 1]
- [Feature 2]

### Out of Scope
- [What is explicitly excluded]

### To Be Defined
- [Still-open areas]

## 3. Stakeholders

| Name | Role | Type | Responsibilities |
|------|------|------|-----------------|
| [name] | [role] | Sponsor/PO/Dev/QA... | [what they do in this project] |

## 4. Timeline and Milestones

| Milestone | Target Date | Description |
|-----------|-------------|-------------|
| [M1] | [date] | [what must be ready] |

## 5. Budget

**Approved budget:** $ ___________
**Contingency:** ___ %

## 6. Main Risks

| Risk | Probability | Impact | Mitigation | Owner |
|------|-------------|--------|------------|-------|
| [risk] | H/M/L | H/M/L | [how] | [who] |

## 7. Assumptions

1. [Assumption 1]
2. [Assumption 2]

## 8. Constraints

1. [Constraint 1]
2. [Constraint 2]

## 9. External Dependencies

| Dependency | Team/System | Type | ETA |
|------------|-------------|------|-----|
| [dependency] | [who it depends on] | Blocks/Impacts | [date] |

## 10. Governance Process

**Change Request:** [link to process]
**Escalation:** [who → who → who]
**Reporting:** [cadence, format, recipients]

---

## Approval Signature

By signing this document, the parties approve the project as described
and commit to following the defined governance process.

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Business Sponsor | | ________ | [date] |
| Product Owner | | ________ | [date] |
| Tech Lead | | ________ | [date] |
```

---

### TEMPLATE 3: RAID Log

```markdown
# RAID Log — [Project]

*Updated every sprint. Owner: [who manages it]*

## Risks

| ID | Risk | Probability | Impact | Score | Mitigation | Owner | Status |
|----|------|-------------|--------|-------|------------|-------|--------|
| R01 | [desc] | High=3/Med=2/Low=1 | High=3/Med=2/Low=1 | P×I | [how] | [who] | Open/Mitigated/Closed |

## Assumptions

| ID | Assumption | Verified? | Source | Verification date | Risk if false |
|----|------------|-----------|--------|-------------------|---------------|
| A01 | [what we're assuming] | Yes/No | [who confirmed] | [date] | [what happens if wrong] |

## Issues

| ID | Issue | Impact | Owner | ETA | Status | Notes |
|----|-------|--------|-------|-----|--------|-------|
| I01 | [desc] | [what it impacts] | [who resolves] | [when] | Open/In progress/Closed | |

## Dependencies

| ID | Dependency | From Whom | Type | Date Needed | Status |
|----|------------|-----------|------|-------------|--------|
| D01 | [what's needed] | [who must provide it] | Blocks/Impacts | [date] | Waiting/Received/At risk |
```

---

### TEMPLATE 4: Complete User Story

```markdown
# US-[NNN]: [Title]

**Epic:** [parent epic name]
**Sprint:** [planned sprint]
**Priority:** Must / Should / Could / Won't
**Story Points:** [N]
**Owner:** [Product Owner who approved]

## User Story

As a [type of user],
I want [feature/action],
so that [benefit/objective].

## Context and Background

[Why is this story needed? What problem does it solve?
 Any context useful for the developer.]

## Acceptance Criteria

**Scenario 1: [Happy Path]**
```gherkin
Given [initial context]
When [user action]
Then [expected result]
  And [other consequence]
```

**Scenario 2: [Edge Case]**
```gherkin
Given [context]
When [action]
Then [result]
```

**Scenario 3: [Error Case]**
```gherkin
Given [error context]
When [action that causes error]
Then [error message or defensive behavior]
```

## Assumptions

- [What we assume to be true for this story]
- [e.g.: the user is already authenticated]
- [e.g.: the product exists in the catalog]

## Out of Scope for this story

- [What is NOT included and will go into a separate story]

## Dependencies

- [US-NNN]: [description of dependency]
- [External system]: [description]

## Technical Notes

[Any agreed technical constraints or guidance]

## Mockup / Wireframe

[Link or attached image]

---

**Definition of Ready checklist:**
- [ ] Correct format (As/Want/So that)
- [ ] Complete Acceptance Criteria
- [ ] Estimated Story Points
- [ ] No blocking dependencies
- [ ] Mockups available (if required)
- [ ] Approved by PO: [name] on [date]
```

---

## Operational Checklists

### CHECKLIST 1: Pre-Sprint

```
PRE-SPRINT CHECKLIST

□ Previous sprint closed (all stories accepted or moved)
□ Last sprint velocity recorded
□ Backlog groomed (ready stories meet DoR)
□ Priorities updated by PO
□ External dependencies verified
□ No unmanaged open technical blockers
□ RAID log updated
□ Retrospective actions from previous sprint tracked
□ Sprint planning scheduled with PO present
```

### CHECKLIST 2: Definition of Ready (for each story)

```
DEFINITION OF READY

□ Correct User Story format
□ Acceptance Criteria written in Gherkin (or equivalent)
□ Story Points estimated by team
□ MoSCoW priority assigned
□ Mockups/wireframes attached (if UI)
□ Dependencies identified and non-blocking
□ Test data identified and available
□ External APIs documented (if integration)
□ No critical open questions
□ PO available for clarifications during sprint
□ Signed/approved by PO
```

### CHECKLIST 3: Definition of Done (for each story)

```
DEFINITION OF DONE

□ All acceptance criteria satisfied
□ Unit tests written and green (coverage ≥ 80%)
□ Integration tests updated
□ Code review approved by at least 1 peer
□ No blocking linting errors
□ No security vulnerabilities (SAST scan)
□ API documented (if modified)
□ README updated (if necessary)
□ ADR created (if architectural decision)
□ Story demo-ed to PO
□ Accepted by PO: [signature/date]
□ Merged into develop/main
□ CI/CD green
□ Deployed to staging
```

### CHECKLIST 4: Release Readiness

```
RELEASE READINESS CHECKLIST

QUALITY
□ All tests passing (unit, integration, e2e)
□ Performance test passed (SLA compliance)
□ Security scan passed (no critical/high vulnerabilities)
□ Accessibility test (if applicable)

DOCUMENTATION
□ Release notes written
□ Changelog updated
□ User documentation updated
□ Operations runbook updated

OPERATIONS
□ Rollback plan documented and tested
□ Database migration tested on staging
□ Feature flags configured correctly
□ Monitoring and alerting configured
□ On-call notified

BUSINESS
□ UAT completed and signed off by PO
□ Go/No-Go approved by: [PO] and [Tech Lead]
□ User communication prepared (if UX impact)
□ Training completed (if necessary)

GO/NO-GO SIGNATURE
□ Tech Lead: _________________ Date: _______
□ Product Owner: _____________ Date: _______
```

---

## Recommended Tools

### For Requirements Management

| Tool | Type | Pros | Cons |
|------|------|------|------|
| **Jira** | Ticket + Backlog | Very widespread, integrations | Expensive, complex |
| **Linear** | Modern ticket | Fast, excellent UX | Fewer enterprise features |
| **GitHub Issues + Projects** | Ticket + Board | Free, close to code | Limited features |
| **Azure DevOps** | Full suite | Excellent MS integration | Learning curve |
| **Notion** | Documents + DB | Flexible for documentation | Less structure for tickets |

### For Documentation

| Tool | Type | Pros |
|------|------|------|
| **Confluence** | Enterprise wiki | Jira integration, mature |
| **Notion** | Modern wiki | Flexible, beautiful |
| **GitBook** | Docs-as-code | Versionable, for devs |
| **Obsidian** | Personal notes | Offline, free |
| **MkDocs + Material** | Docs in repo | Versionable, open source |

### For ADRs

| Tool | Description |
|------|-------------|
| **adr-tools** | CLI tool, creates and manages ADRs from terminal |
| **Log4Brains** | Web UI for navigating ADRs, supports multiple repos |
| **Backstage.io** | Developer portal with integrated tech docs |
| **Markdown files in repo** | The simplest and most versionable way |

### For BDD/ATDD

| Tool | Language | Framework |
|------|----------|-----------|
| **Cucumber** | Java, JS, Ruby | Native Gherkin |
| **Behave** | Python | Gherkin for Python |
| **SpecFlow** | .NET | Gherkin for .NET |
| **Cypress** | JavaScript | Native BDD |
| **Playwright** | Multi-language | Can integrate BDD |

### For Diagramming

| Tool | Type | Notes |
|------|------|-------|
| **Mermaid** | Diagrams in code | Integrated in GitHub/GitLab |
| **PlantUML** | Diagrams in code | Enterprise standard |
| **Lucidchart** | Collaborative visual | Great for stakeholders |
| **Miro** | Digital whiteboard | Perfect for Event Storming |
| **draw.io** | Free diagrams | Desktop + web, free |

---

## Response Scripts — The SDSD "Phrase Book"

Common situations and pre-built professional responses:

```
"Why does it take so long?"
→ "I can show you the estimate breakdown. [Component A]
   requires X days for [specific reason]. Do you want to see the details?"

"You didn't tell me it would take this long"
→ "The estimate was communicated on [date] via [email/ticket ID].
   I can send you the link. Would you like to review it together?"

"But it's a small change!"
→ "You're right that it seems small. My technical estimate is
   [N days] because [reason]. I can show you the breakdown
   if you'd like to verify together."

"That's not what I asked for"
→ "I understand. I implemented what was specified in the
   acceptance criteria agreed on [date] with [name].
   I can show you the document. What would you like to be different?
   Shall we create a Change Request?"

"Get this done by tomorrow"
→ "I can do an estimate right now. Looking at the scope, I estimate [N]
   days. To meet your timeline, we could:
   A) reduce the scope to [core functionality]
   B) add resources (but see Brooks's Law)
   C) accept a risk of reduced quality (I would need to document this)
   Which do you prefer?"

"The system doesn't work"
→ "Can you describe the specific behavior you're observing?
   What action are you performing? What do you expect to happen?
   What happens instead? That way I can investigate the issue correctly."

"It was obvious it should also work this way"
→ "I understand it seems obvious. It was not in the agreed requirements,
   but I can add this behavior via a Change Request.
   Would you like me to estimate it?"
```

---

*Previous: [10 — DDD](./10-ddd-protection.md) | Next: [12 — References](./12-references.md)*

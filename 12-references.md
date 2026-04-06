# 12 — References, Reading, and Resources

> *"Those who have learned only from their own mistakes have a sample size of one."*

This section collects the books, academic papers, articles, and online resources that form the intellectual foundation of SDSD. Each resource is accompanied by a note on why it is relevant for the developer who wants to protect themselves.

---

## Essential Books

### Requirements Engineering & Domain Understanding

**"Domain-Driven Design: Tackling Complexity in the Heart of Software"**
— Eric Evans (2003, Addison-Wesley)

The book that defined DDD. Essential for understanding Ubiquitous Language, Bounded Contexts, Aggregates, and how language protects architecture. Required reading for every developer working on complex domains.

**SDSD Relevance:** ⭐⭐⭐⭐⭐ — Provides the most comprehensive framework for managing domain complexity.

---

**"Implementing Domain-Driven Design"**
— Vaughn Vernon (2013, Addison-Wesley)

The practical counterpart to Evans's book. Shows how to implement DDD with concrete code examples.

**SDSD Relevance:** ⭐⭐⭐⭐ — Translates Evans's concepts into everyday practice.

---

**"User Story Mapping"**
— Jeff Patton (2014, O'Reilly)

Technique for building a visual map of user stories that reveals gaps in requirements and creates a shared language with stakeholders.

**SDSD Relevance:** ⭐⭐⭐⭐⭐ — Practical tool for eliciting requirements collaboratively and visibly.

---

**"Impact Mapping: Making a Big Impact with Software Products and Projects"**
— Gojko Adzic (2012, Provoking Thoughts)

Technique for linking technical deliverables to business objectives, making explicit why something is being built.

**SDSD Relevance:** ⭐⭐⭐⭐ — Tool for aligning business goals and developed features.

---

### Software Engineering Classics

**"The Mythical Man-Month: Essays on Software Engineering"**
— Fred Brooks (1975, Addison-Wesley) — Updated in 1995

The founding text of managerial software engineering. Contains Brooks's Law, the "No Silver Bullet" essay, and decades of wisdom on why software is hard.

**SDSD Relevance:** ⭐⭐⭐⭐⭐ — Provides the historical arguments for defending realistic estimates.

---

**"Clean Code: A Handbook of Agile Software Craftsmanship"**
— Robert C. Martin (2008, Prentice Hall)

De-facto standard for readable and maintainable code. Clean code defends itself: it is easier to understand, test, and modify.

**SDSD Relevance:** ⭐⭐⭐⭐ — Clean code reduces the "mysteries" that stakeholders interpret as inefficiency.

---

**"Refactoring: Improving the Design of Existing Code"**
— Martin Fowler (1999, 2nd ed. 2018, Addison-Wesley)

The refactoring catalog. Essential for justifying time spent on technical debt.

**SDSD Relevance:** ⭐⭐⭐⭐ — Provides a professional vocabulary for communicating technical work to stakeholders.

---

### Agile & Process

**"The Art of Agile Development"**
— James Shore & Shane Warden (2007, 2nd ed. 2021, O'Reilly)

Complete guide to XP (Extreme Programming) practices. Includes TDD, pair programming, continuous integration, and much more.

**SDSD Relevance:** ⭐⭐⭐⭐ — XP practices are some of the most effective countermeasures to stakeholder problems.

---

**"BDD in Action: Behavior-Driven Development for the whole software lifecycle"**
— John Ferguson Smart (2014, Manning)

The complete guide to Behavior-Driven Development with practical examples.

**SDSD Relevance:** ⭐⭐⭐⭐⭐ — BDD is the main tool for transforming requirements into executable contracts.

---

**"Specification by Example: How Successful Teams Deliver the Right Software"**
— Gojko Adzic (2011, Manning)

Patterns for creating requirement specifications that become executable tests. The theoretical foundation of ATDD.

**SDSD Relevance:** ⭐⭐⭐⭐⭐ — Provides the method for creating formal proof that software does what was agreed.

---

**"Agile Estimating and Planning"**
— Mike Cohn (2005, Prentice Hall)

Practical techniques for estimating realistically and communicating uncertainties to stakeholders.

**SDSD Relevance:** ⭐⭐⭐⭐ — Documented estimates are protection against stakeholder optimism.

---

### Project Management & Governance

**"The Deadline: A Novel About Project Management"**
— Tom DeMarco (1997, Dorset House)

A novel about software projects. Readable, fun, and profound.

**SDSD Relevance:** ⭐⭐⭐ — Illustrates project problems in a narrative way, useful for explaining them to non-technical stakeholders.

---

**"Death March"**
— Edward Yourdon (1997, 2nd ed. 2003, Prentice Hall)

Analysis of "death march" projects — those everyone knows will fail but no one says so.

**SDSD Relevance:** ⭐⭐⭐ — Recognize the signs of a doomed project and know how to respond.

---

**"Waltzing with Bears: Managing Risk on Software Projects"**
— Tom DeMarco & Timothy Lister (2003, Dorset House)

Risk management in software projects, with a quantitative approach.

**SDSD Relevance:** ⭐⭐⭐⭐ — The Risk Register and quantitative risk management are fundamental protection tools.

---

## Academic Papers and Research

### The Standish Group Chaos Report (1994–present)
*https://www.standishgroup.com/*

The longest-running research on IT project failures. Analyzes thousands of projects every year. The data cited in chapter 02 of this documentation comes from this report.

**Access:** Annual report for purchase; summaries and historical data freely available online.

---

### "No Silver Bullet — Essence and Accident in Software Engineering"
— Fred Brooks (1986)
*https://worrydream.com/refs/Brooks_1986_-_No_Silver_Bullet.pdf*

The most cited paper in software engineering. Distinguishes essential complexity (intrinsic) from accidental (solvable with good practices).

---

### "How Do Committees Invent?"
— Melvin Conway (1968)

The original paper formulating Conway's Law. Available at http://www.melconway.com/Home/Committees_Paper.html

---

### "Out of the Tar Pit"
— Ben Moseley & Peter Marks (2006)
*https://curtclifton.net/papers/MoseleyMarks06a.pdf*

Analysis of complexity in software. Essential for understanding the difference between necessary and accidental complexity.

---

### NIST Special Publication 002: "The Economic Impacts of Inadequate Infrastructure for Software Testing"
*https://www.nist.gov/system/files/documents/director/planning/report02-3.pdf*

2002 study that quantifies the economic cost of software bugs in the American economy.

---

## Online Resources

### Architecture and Patterns

**Martin Fowler's Blog**
*https://martinfowler.com*
The most influential site on software architecture. Contains pattern catalogs, articles on microservices, DDD, refactoring, and much more.

**ADR GitHub Repository (Michael Nygard)**
*https://github.com/joelparkerhenderson/architecture-decision-record*
Repository with ADR templates and hundreds of real examples.

**ADR.github.io**
*https://adr.github.io*
The official Architecture Decision Records website.

---

### Requirements Engineering

**IEEE 830 — Recommended Practice for Software Requirements Specifications**
The IEEE standard for software requirements specifications. Formal reference for the structure of an SRS document.

**IREB — International Requirements Engineering Board**
*https://www.ireb.org*
Organization that certifies Requirements Engineers. Has published the "Fundamentals of Requirements Engineering" — excellent free reading.

---

### Agile and BDD

**Cucumber Documentation**
*https://cucumber.io/docs/guides/*
Official Cucumber documentation with BDD and Gherkin tutorials.

**Behaviour-Driven Development (Wikipedia)**
*https://en.wikipedia.org/wiki/Behavior-driven_development*
Complete overview of BDD with history, practice, and resources.

**The Three Amigos (Agile Alliance)**
*https://www.agilealliance.org/glossary/three-amigos/*
Explanation of the Three Amigos technique for writing acceptance criteria.

---

### Developer Defense

**The Joel Test**
*https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/*
Joel Spolsky (co-founder of Stack Overflow) — 12 questions for evaluating the quality of a development team. A team that answers "yes" to everything is a team that protects itself.

**"Blameless Postmortems" (Google SRE Book)**
*https://sre.google/sre-book/postmortem-culture/*
The chapter from Google's SRE book on blameless post-mortems. Free online.

---

## Industry Standards

### IEEE Standards

| Standard | Title | Relevance |
|----------|-------|-----------|
| **IEEE 830** | Recommended Practice for Software Requirements Specifications | Requirements Engineering |
| **IEEE 1016** | Software Design Descriptions | Architectural documentation |
| **IEEE 829** | Software Test Documentation | Testing and acceptance criteria |
| **IEEE 1028** | Software Reviews and Audits | Formal code review |
| **IEEE 12207** | Software Life Cycle Processes | Complete development process |

### ISO Standards

| Standard | Title | Relevance |
|----------|-------|-----------|
| **ISO/IEC 25010** | System and software quality requirements (SQuaRE) | Quality characteristics |
| **ISO/IEC 27001** | Information Security Management | Security requirements |
| **ISO 9001** | Quality Management Systems | Quality process |

---

## Abbreviations Glossary

| Acronym | Meaning |
|---------|---------|
| AC | Acceptance Criteria |
| ACL | Anti-Corruption Layer |
| ADR | Architecture Decision Record |
| ATDD | Acceptance Test-Driven Development |
| BDD | Behavior-Driven Development |
| CR | Change Request |
| CYA | Cover Your Ass |
| DbC | Design by Contract |
| DDD | Domain-Driven Design |
| DoD | Definition of Done |
| DoR | Definition of Ready |
| FURPS+ | Functionality, Usability, Reliability, Performance, Supportability (+) |
| HIPPO | Highest Paid Person's Opinion |
| MVP | Minimum Viable Product |
| RAID | Risks, Assumptions, Issues, Dependencies |
| RACI | Responsible, Accountable, Consulted, Informed |
| RE | Requirements Engineering |
| RFC | Request for Comments |
| RTM | Requirements Traceability Matrix |
| SDSD | Stupid-Driven Software Development |
| SRS | Software Requirements Specification |
| TDD | Test-Driven Development |
| UAT | User Acceptance Testing |
| UL | Ubiquitous Language |
| YAGNI | You Ain't Gonna Need It |

---

*End of SDSD documentation v1.0*

*← Previous: [11 — Templates and Tools](./11-templates-tools.md) | → Back to [README](./README.md)*

# 02 — Data and Statistics on Software Failures

> *"You are not facing an exceptional problem. You are facing the statistical norm."*

One of the most powerful arguments in favor of SDSD practices is the empirical evidence: software projects fail systematically, and the primary causes are not technical. Knowing this data will allow you to defend preventive practices even in the face of skeptical stakeholders.

---

## The Chaos Report — Standish Group

The **Chaos Report** is the longest-running and most widely cited research on IT project failures, published by the Standish Group since 1994. It analyzes tens of thousands of projects every year.

### Key Results (2020)

| Category | Percentage |
|----------|------------|
| **Successful** (on time, on budget, with planned features) | 31% |
| **Challenged** (delays, budget overruns, reduced features) | 52% |
| **Failed** (cancelled or never used) | 17% |

**Conclusion:** 69% of software projects have significant problems. This is not an anomaly: it is the baseline condition.

### Success Factors (in order of importance)

According to the Chaos Report, the three factors most correlated with success are:

1. **User involvement**
2. **Executive management support**
3. **Clear statement of requirements**

> 💡 **SDSD Implication:** two of the three success factors relate to requirements management and human involvement. Not technology. Not the framework. People and requirements.

### Primary Causes of Failure

| Cause | % Projects Impacted |
|-------|---------------------|
| Poor or incomplete requirements | 39% |
| Lack of user involvement | 33% |
| Lack of resources | 29% |
| Unrealistic expectations | 29% |
| Lack of executive support | 29% |
| Changing requirements and specifications | 24% |
| Lack of planning | 23% |
| Project no longer needed | 9% |

> 💡 **SDSD Implication:** the first two causes (requirements and involvement) alone account for nearly 75% of failures. The "unclear requirements" problem is not an exception: it is the primary cause of failure in the industry.

---

## Data on Economic Impact

### Cost of Defects by Phase

A well-established principle of software engineering (derived from Barry Boehm's studies in the 1970s and confirmed by subsequent research) is that the **cost of fixing a defect grows exponentially with the delay in its detection**:

```
Detection phase            Relative cost
─────────────────────────────────────────
Requirements                    1x
Design                         5x
Implementation                10x
Testing                       20x
Production                   100x
```

> 💡 **SDSD Implication:** a wrong requirement identified during requirements engineering costs 100 times less than the same wrong requirement identified in production. Investing in rigorous requirements elicitation practices is not overhead: it is economic savings.

### Cost of Requirements Volatility

An IBM Systems Sciences Institute study quantified that:
- 45% of developed features are never used
- 19% are rarely used
- Only 36% are actually used

This means that **almost 2/3 of software development is waste**, originating directly from poorly defined or unvalidated requirements.

---

## Relevant Academic Studies

### "No Silver Bullet" — Fred Brooks (1986)

Fred Brooks, in his seminal article published in *IEEE Computer*, identifies the fundamental causes of difficulty in software engineering:

**Essential Complexity** (not eliminable):
- Software systems are intrinsically complex
- Complexity grows non-linearly with size
- There is no technological solution that eliminates it

**Accidental Complexity** (eliminable):
- Derived from inadequate tools, languages, processes
- Reducible with good practices

> 💡 **SDSD Implication:** the complexity of stakeholder requirements is partly *essential* (the domain is truly complex) and partly *accidental* (derived from inadequate communication processes). SDSD reduces accidental complexity.

### "The Mythical Man-Month" — Fred Brooks (1975)

Introduces **Brooks's Law**: *"Adding manpower to a late software project makes it later."*

The mechanism: each new team member must be trained, and training uses resources of the existing team. More people means more communication channels (n*(n-1)/2), more coordination overhead.

> 💡 **SDSD Implication:** the solution to project problems is not adding people. It is removing ambiguity and improving processes — exactly what SDSD proposes.

### Conway's Law — Melvin Conway (1968)

> *"Any organization that designs a system will produce a design whose structure is a copy of the organization's communication structure."*

Software architectures mirror the organizational structures that produce them. If the organization is fragmented, inconsistent, with power silos, so will the software be.

> 💡 **SDSD Implication:** understanding the stakeholder's organizational structure helps you predict where requirements problems will arise and where zones of conflict will be.

### Root Cause Analysis Studies

A meta-analysis conducted by NIST in 2002 estimates that software bugs cost the American economy $59.5 billion per year, and that **more than half could be eliminated with better testing and requirements practices**.

---

## The Visibility Paradox

A phenomenon documented in literature is the **software visibility paradox**: software, being invisible, is incomprehensible to non-technical people. This invisibility leads to:

- Underestimation of required effort
- Misunderstanding of complexity
- Irrational expectations about development timelines
- Inability to assess the quality of work done

Brooks himself identifies this invisibility as one of the four essential properties of software (along with complexity, conformity, and changeability) that make it fundamentally different from any other engineering discipline.

> 💡 **SDSD Implication:** the problem is not the bad faith of stakeholders. It is that software is structurally invisible and therefore incomprehensible to those who don't build it. SDSD practices (demos, visualizations, prototypes, tests) are tools to make software *visible*.

---

## Data on the Impact of Agile

The proliferation of Agile methodologies has improved the situation, but not resolved it:

| Metric | Waterfall | Agile |
|--------|-----------|-------|
| % successful projects | 14% | 42% |
| % failed projects | 29% | 9% |
| % challenged projects | 57% | 49% |

Source: Standish Group Chaos Report 2020

**Agile significantly improves results, but it is not a panacea.** The reason Agile works better is exactly the reason SDSD works: **short iterations, frequent feedback, continuous adaptation** — all mechanisms that reduce the damage caused by incomprehensible or changing requirements.

---

## The Cost of Misunderstanding

A 2017 PMI (Project Management Institute) study reveals that **every billion dollars invested in projects sees $97 million wasted due to poor performance**, and that the primary cause is the **lack of clear project requirements**.

The same study indicates that organizations with high project management maturity complete 92% of projects successfully, compared to 33% of low-maturity organizations.

> 💡 **SDSD Implication:** process maturity — exactly what SDSD promotes — is the most predictive factor of project success, more so than the technology used, the team, or the budget.

---

## Visual Summary

```
CAUSES OF SOFTWARE FAILURE
(source: Standish Group Chaos Report aggregated)

Poor/incomplete requirements     ████████████████████████████ 39%
Lack of user involvement         ██████████████████████ 33%
Lack of resources                ████████████████████ 29%
Unrealistic expectations         ████████████████████ 29%
Lack of executive support        ████████████████████ 29%
Requirements changed mid-project ████████████████ 24%
Lack of planning                 ███████████████ 23%
Project no longer needed         ██████ 9%

Requirements and communication problems → 87% of cases
Pure technical problems → < 15% of cases
```

---

## What to Do with This Data

This data is a **tool for persuasion and legitimization**. When a stakeholder asks why you are "wasting time" documenting requirements or creating a formal Change Request, the answer is:

> *"Because the industry tells us that 39% of projects fail precisely due to poor requirements, and I don't want this project to be part of that statistic."*

---

*Previous: [01 — Manifesto](./01-manifesto.md) | Next: [03 — Requirements Engineering](./03-requirements-engineering.md)*

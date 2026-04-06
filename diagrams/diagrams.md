# SDSD Diagrams

This folder contains visual diagrams for the SDSD documentation.

## Available Files

### `sdsd-overview.svg`
**SDSD Framework Overview**

Visual map of the entire framework: at the center the developer and the project to be protected, surrounded by external threats (in red) and defensive shields (in green). Shows how each SDSD practice responds to a specific threat.

---

### `requirements-lifecycle.svg`
**Requirements Lifecycle**

Complete flow from elicitation to ongoing management, with the 5 main phases and the SDSD practices associated with each. The RTM bar at the bottom shows how traceability spans all phases.

---

### `antipatterns-radar.svg`
**Stakeholder Anti-Patterns Map**

Scatter diagram that positions the 12 cataloged anti-patterns on two axes: frequency (how often they occur) and potential damage (how much they impact the project). Useful for prioritizing countermeasures.

---

### `cost-of-defects.svg`
**Cost of Defect Correction by Phase**

Visualization of Barry Boehm's principle: the cost of correcting a defect grows exponentially with the delay in its detection. From 1x in the requirements phase to 100x in production.

---

## Mermaid Diagrams (for embedding in Markdown)

The following diagrams are in Mermaid format and can be rendered directly in GitHub, GitLab, Notion, and other tools that support Mermaid.

### Change Request Flow

```mermaid
flowchart TD
    A([Change Request]) --> B[Formal CR Submission]
    B --> C[Impact Assessment - Tech Lead]
    C --> D{Impact Acceptable?}
    D -->|Yes| E[Review PO + Tech Lead]
    D -->|No - too costly| F[Scope Negotiation]
    F --> E
    E --> G{Decision}
    G -->|Approved| H[Update Backlog + RTM]
    G -->|Rejected| I[Document Motivation]
    G -->|Deferred| J[Scheduled for Sprint N+1]
    H --> K([Implementation in planned Sprint])
    I --> L([Notify Requester])
    J --> M([Review in Sprint N+1 Planning])

    style A fill:#1e293b,color:#94a3b8
    style K fill:#052e16,color:#86efac
    style L fill:#450a0a,color:#fca5a5
    style M fill:#1c1917,color:#fde047
```

---

### ADR Decision Flow

```mermaid
stateDiagram-v2
    [*] --> Proposed : Decision to make
    Proposed --> UnderReview : RFC/discussion
    UnderReview --> Proposed : Revision needed
    UnderReview --> Accepted : Consensus reached
    UnderReview --> Rejected : Alternative chosen
    Accepted --> Deprecated : Technology obsolete
    Accepted --> Superseded : Better new decision
    Deprecated --> [*]
    Rejected --> [*]
    Superseded --> Proposed : New proposal
```

---

### Stakeholder Power/Interest Matrix

```mermaid
quadrantChart
    title Stakeholder Management Strategy
    x-axis Low Interest --> High Interest
    y-axis Low Power --> High Power
    quadrant-1 Engage Actively
    quadrant-2 Keep Satisfied
    quadrant-3 Monitor
    quadrant-4 Keep Informed
    CEO: [0.3, 0.95]
    CFO: [0.2, 0.9]
    Product Owner: [0.85, 0.65]
    Tech Lead: [0.9, 0.5]
    End Users: [0.75, 0.25]
    Legal: [0.3, 0.55]
    Operations: [0.6, 0.4]
    Sales Team: [0.55, 0.35]
```

---

### BDD Cycle

```mermaid
graph LR
    A[🗣️ Discovery\nBusiness + Dev + QA] -->|Gherkin scenarios| B[📝 Formulation\nFormal Gherkin scenarios]
    B -->|Step definitions| C[🔴 Red\nFailing automated tests]
    C -->|Implementation| D[🟢 Green\nPassing tests]
    D -->|Refactoring| E[✨ Refactor\nClean code]
    E -->|New feature| A
    D -->|Demo to PO| F[✅ Acceptance\nStory accepted]

    style A fill:#1e3a5f,color:#93c5fd
    style B fill:#1e293b,color:#94a3b8
    style C fill:#450a0a,color:#fca5a5
    style D fill:#052e16,color:#86efac
    style E fill:#1c2541,color:#a5b4fc
    style F fill:#052e16,color:#86efac
```

---

### SDSD Defense Layers

```mermaid
graph TB
    subgraph L1["Layer 1: Prevention (Requirements)"]
        direction LR
        A[Structured elicitation]
        B[Formal sign-off]
        C[RTM]
        D[Glossary]
    end

    subgraph L2["Layer 2: Containment (Process)"]
        direction LR
        E[Change Request]
        F[Scope Baseline]
        G[DoD/DoR]
        H[Agile Ceremonies]
    end

    subgraph L3["Layer 3: Protection (Architecture)"]
        direction LR
        I[ADR]
        J[ACL - DDD]
        K[Feature Flags]
        L[Defensive Programming]
    end

    subgraph L4["Layer 4: Evidence (Tests)"]
        direction LR
        M[BDD/ATDD]
        N[Acceptance Tests]
        O[CI/CD]
        P[Metrics]
    end

    L1 --> L2
    L2 --> L3
    L3 --> L4

    style L1 fill:#052e16
    style L2 fill:#1c1917
    style L3 fill:#0c0a09
    style L4 fill:#0f172a
```

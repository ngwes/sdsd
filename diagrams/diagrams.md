# Diagrammi SDSD

Questa cartella contiene i diagrammi visivi della documentazione SDSD.

## File Disponibili

### `sdsd-overview.svg`
**Panoramica del Framework SDSD**

Mappa visuale dell'intero framework: al centro il developer e il progetto da proteggere, circondati dalle minacce esterne (in rosso) e dagli scudi difensivi (in verde). Mostra come ogni pratica SDSD risponde a una minaccia specifica.

---

### `requirements-lifecycle.svg`
**Ciclo di Vita dei Requisiti**

Flusso completo dalla elicitazione alla gestione continua, con le 5 fasi principali e le pratiche SDSD associate a ciascuna. La barra RTM in fondo mostra come la traceability attraversa tutte le fasi.

---

### `antipatterns-radar.svg`
**Mappa degli Anti-Pattern degli Stakeholder**

Diagramma scatter che posiziona i 12 anti-pattern catalogati su due assi: frequenza (quanto spesso si verificano) e danno potenziale (quanto impattano il progetto). Utile per prioritizzare le contromisure.

---

### `cost-of-defects.svg`
**Costo di Correzione dei Difetti per Fase**

Visualizzazione del principio di Barry Boehm: il costo di correzione di un difetto cresce esponenzialmente con il ritardo nella sua rilevazione. Da 1x in fase di requirements a 100x in produzione.

---

## Diagrammi Mermaid (per embedding in Markdown)

I seguenti diagrammi sono in formato Mermaid e possono essere renderizzati direttamente in GitHub, GitLab, Notion, e altri strumenti che supportano Mermaid.

### Change Request Flow

```mermaid
flowchart TD
    A([Richiesta di Cambiamento]) --> B[Compilazione CR Formale]
    B --> C[Impact Assessment - Tech Lead]
    C --> D{Impatto Accettabile?}
    D -->|Sì| E[Review PO + Tech Lead]
    D -->|No - troppo costoso| F[Negoziazione Scope]
    F --> E
    E --> G{Decisione}
    G -->|Approvata| H[Aggiorna Backlog + RTM]
    G -->|Rifiutata| I[Documenta Motivazione]
    G -->|Deferita| J[Schedulata per Sprint N+1]
    H --> K([Implementazione nello Sprint pianificato])
    I --> L([Notifica Richiedente])
    J --> M([Review in Planning Sprint N+1])

    style A fill:#1e293b,color:#94a3b8
    style K fill:#052e16,color:#86efac
    style L fill:#450a0a,color:#fca5a5
    style M fill:#1c1917,color:#fde047
```

---

### ADR Decision Flow

```mermaid
stateDiagram-v2
    [*] --> Proposed : Decisione da prendere
    Proposed --> UnderReview : RFC/discussione
    UnderReview --> Proposed : Revisione necessaria
    UnderReview --> Accepted : Consenso raggiunto
    UnderReview --> Rejected : Alternativa scelta
    Accepted --> Deprecated : Tecnologia obsoleta
    Accepted --> Superseded : Nuova decisione migliore
    Deprecated --> [*]
    Rejected --> [*]
    Superseded --> Proposed : Nuova proposta
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
    A[🗣️ Discovery\nBusiness + Dev + QA] -->|Gherkin scenarios| B[📝 Formulation\nScenari Gherkin formali]
    B -->|Step definitions| C[🔴 Red\nTest automatici fallenti]
    C -->|Implementazione| D[🟢 Green\nTest passanti]
    D -->|Refactoring| E[✨ Refactor\nCodice pulito]
    E -->|Nuova feature| A
    D -->|Demo al PO| F[✅ Acceptance\nStoria accettata]

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
    subgraph L1["Layer 1: Prevenzione (Requisiti)"]
        direction LR
        A[Elicitazione strutturata]
        B[Sign-off formale]
        C[RTM]
        D[Glossario]
    end

    subgraph L2["Layer 2: Contenimento (Processo)"]
        direction LR
        E[Change Request]
        F[Scope Baseline]
        G[DoD/DoR]
        H[Agile Ceremonies]
    end

    subgraph L3["Layer 3: Protezione (Architettura)"]
        direction LR
        I[ADR]
        J[ACL - DDD]
        K[Feature Flags]
        L[Defensive Programming]
    end

    subgraph L4["Layer 4: Evidenza (Test)"]
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

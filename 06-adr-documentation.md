# 06 — ADR & Documentazione Decisionale

> *"Una decisione non documentata non è una decisione. È un'intenzione dimenticata."*

La documentazione delle decisioni è il pilastro centrale della protezione SDSD. Se una decisione non è scritta, non esiste. Se esiste ma non è firmata, non ha un proprietario. Se ha un proprietario ma non è tracciabile, non è difendibile.

---

## Architecture Decision Records (ADR)

### Cos'è un ADR

Un Architecture Decision Record documenta una singola decisione architettuale significativa: il contesto in cui è stata presa, le opzioni considerate, la decisione finale e le sue conseguenze.

Gli ADR sono stati introdotti da Michael Nygard nel 2011 e sono oggi uno standard de-facto nell'industria (usati da Amazon, Google, Netflix, e dalla maggior parte delle organizzazioni tech mature).

### Perché gli ADR Proteggono

1. **Memoria istituzionale:** quando un team member lascia, le motivazioni delle decisioni non vanno con lui.
2. **Protezione retroattiva:** "Perché avete scelto PostgreSQL?" → "Vedi ADR-007, deciso in accordo con l'infrastruttura il 15 marzo."
3. **Prevenzione delle "zombie decisions":** decisioni già discusse e risolte non vengono rimesse in discussione inutilmente.
4. **Onboarding accelerato:** i nuovi arrivati capiscono il *perché* del codice, non solo il *cosa*.

---

### Template ADR Completo (Formato MADR)

```markdown
# ADR-[NNN]: [Titolo Breve della Decisione]

**Stato:** Proposta | In Revisione | Accettata | Deprecata | Sostituita da ADR-[NNN]

**Data:** [YYYY-MM-DD]

**Deciso da:** [nome/i], [ruolo/i]

**Approvato da:** [stakeholder tecnico/business che ha firmato]

---

## Contesto e Problema

[Descrivi la situazione che richiede una decisione. Sii concreto: quali
 forze sono in gioco? Quali vincoli esistono? Qual è il problema che
 stiamo cercando di risolvere?]

## Fattori Decisionali

- [Fattore 1: es. performance richiesta]
- [Fattore 2: es. competenze del team]
- [Fattore 3: es. vincoli di budget]
- [Fattore 4: es. requisiti di sicurezza]

## Opzioni Considerate

### Opzione 1: [Nome]
[Descrizione]
- Pro: [lista]
- Contro: [lista]
- Costo di implementazione: [stima]

### Opzione 2: [Nome]
[Descrizione]
- Pro: [lista]
- Contro: [lista]
- Costo di implementazione: [stima]

### Opzione 3: [Nome] (se applicabile)
...

## Decisione

**Scelta: Opzione [N] — [Nome]**

[Motivazione in 3-5 frasi: perché questa opzione rispetto alle altre,
 dati i fattori decisionali sopra elencati.]

## Conseguenze

### Positive
- [Beneficio 1]
- [Beneficio 2]

### Negative (trade-off accettati)
- [Svantaggio 1]
- [Svantaggio 2]

### Rischi Residui
- [Rischio 1] → Mitigazione: [come lo gestiamo]

## Note di Implementazione
[Eventuali dettagli implementativi, link a documentazione tecnica,
 esempi di codice, pattern da seguire]

## ADR Correlati
- ADR-[NNN]: [relazione]
- ADR-[NNN]: [relazione]

## Log delle Revisioni
| Data | Modificato da | Motivo |
|------|---------------|--------|
| [data] | [nome] | Prima stesura |
| [data] | [nome] | Approvazione |
```

---

### Esempi di ADR Reali

#### ADR-001: Scelta del Database Relazionale

```markdown
# ADR-001: PostgreSQL come database principale

**Stato:** Accettata
**Data:** 2024-03-15
**Deciso da:** Marco Rossi (Lead Dev), Sara Bianchi (Architect)
**Approvato da:** Giovanni Ferri (CTO)

## Contesto e Problema

Il sistema richiede un database per la persistenza dei dati transazionali.
Dobbiamo scegliere tra diverse opzioni SQL e NoSQL. Il team ha esperienza
prevalente su database relazionali. I dati hanno una struttura fortemente
relazionale (ordini, clienti, prodotti, fatture).

## Fattori Decisionali
- ACID compliance richiesta per le transazioni finanziarie
- Competenze del team (SQL, non MongoDB/DynamoDB)
- Costo operativo (managed service disponibile)
- Supporto JSONB per dati semi-strutturati futuri
- Licenza open-source (no vendor lock-in con Oracle/MSSQL)

## Opzioni Considerate
### Opzione 1: PostgreSQL
- Pro: ACID, JSONB, estensioni, community enorme, managed su AWS (RDS)/GCP/Azure
- Contro: non orizzontalmente scalabile nativamente per write

### Opzione 2: MySQL/MariaDB
- Pro: performance in lettura, molto diffuso
- Contro: JSONB limitato, funzionalità avanzate meno potenti di PG

### Opzione 3: MongoDB
- Pro: schema flessibile, scaling orizzontale
- Contro: no ACID multi-document pre-4.0, team non esperto, non ideale per dati relazionali

## Decisione
**Scelta: Opzione 1 — PostgreSQL**

PostgreSQL offre il miglior equilibrio tra ACID compliance (necessaria per
le transazioni finanziarie), flessibilità (JSONB), e competenze del team.
Il rischio di scaling orizzontale in write è accettabile per la dimensione
attuale del sistema e può essere affrontato in futuro con read replica.

## Conseguenze
### Positive
- Zero rischio per transazioni finanziarie (ACID)
- Velocità di sviluppo (team già esperto)
- Flessibilità con JSONB per dati semi-strutturati

### Negative
- Scaling verticale limitato (affrontabile con sharding in futuro)
- Costo leggermente superiore a MySQL su managed services

## ADR Correlati
- ADR-005: Schema migration strategy (Alembic/Flyway)
- ADR-012: Read replica per reporting
```

---

### Dove Tenere gli ADR

**Opzione standard:** nella repository del codice, in una cartella `docs/decisions/` o `adr/`.

```
progetto/
├── src/
├── tests/
└── docs/
    └── decisions/
        ├── 0001-postgresql-database.md
        ├── 0002-hexagonal-architecture.md
        ├── 0003-jwt-authentication.md
        └── README.md  (indice degli ADR)
```

**Vantaggi di tenerli nella repo:**
- Versionate con il codice (git blame, git log)
- Linkabili nei code review
- Parte del PR process
- Sempre aggiornati con il codice

**Strumenti per gli ADR:**
- `adr-tools` (CLI di Nygard): crea template e gestisce ADR da terminale
- Architectural Haiku (formato minimalista)
- Log4Brains (web UI per navigare gli ADR)
- Backstage.io (Spotify): portale developer con supporto ADR

---

## Decision Log

Più leggero degli ADR, il Decision Log cattura tutte le decisioni (non solo quelle architetturali) in formato tabellare:

```markdown
# Decision Log — Progetto [Nome]

| ID | Data | Decisione | Contesto | Opzioni Valutate | Deciso da | Revisione |
|----|------|-----------|----------|------------------|-----------|-----------|
| DL-001 | 2024-03-01 | Usare TypeScript invece di JavaScript | Necessità di type safety e refactoring più sicuro | JS, TS, Flow | Team + PO | 2025-03 |
| DL-002 | 2024-03-15 | Utilizzare Kubernetes per orchestrazione | Requisiti di scaling auto | K8s, ECS, Nomad | Architect + CTO | 2025-03 |
| DL-003 | 2024-04-01 | Adottare GitFlow come branching strategy | Gestione di multiple release | GitFlow, Trunk-based, Feature Flags | Lead Dev | 2024-10 |
```

---

## Meeting Minutes (Verbali di Riunione)

Ogni meeting significativo deve produrre un verbale. Questo non è burocrazia: è protezione.

### Template Verbale Standard

```markdown
# Verbale — [Tipo Meeting] — [Data]

**Progetto:** [nome]
**Data/Ora:** [data e ora]
**Luogo/Link:** [sala riunioni o link Meet/Zoom]
**Facilitatore:** [nome]
**Note-taker:** [nome]

## Partecipanti
| Nome | Ruolo | Presenza |
|------|-------|----------|
| [nome] | [ruolo] | Presente / Assente con delega a [nome] |

## Ordine del Giorno
1. [Punto 1]
2. [Punto 2]
3. [Punto 3]

## Discussione

### [Punto 1]: [Titolo]
[Riassunto della discussione]
**Decisione presa:** [descrizione chiara]
**Motivazione:** [perché]

### [Punto 2]: [Titolo]
[Riassunto]
**Decisione presa:** ...

## Azioni (Action Items)

| # | Azione | Owner | Scadenza | Status |
|---|--------|-------|----------|--------|
| 1 | [descrizione azione] | [nome] | [data] | ⏳ Aperto |
| 2 | [descrizione azione] | [nome] | [data] | ⏳ Aperto |

## Prossimo Meeting
**Data:** [data]
**Agenda preliminare:** [lista]

---
*Questo verbale verrà considerato approvato se non vengono segnalate
correzioni entro 48 ore dalla distribuzione.*

**Distribuito a:** [lista email]
**Data distribuzione:** [data]
```

---

## Spike Tecnici — Documentazione

Uno spike è un'attività di ricerca e prototipazione per ridurre l'incertezza tecnica. Va documentato formalmente:

```markdown
# Spike — [ID]: [Titolo]

**Data:** [data]
**Condotto da:** [nome]
**Durata:** [ore/giorni]

## Domanda da Rispondere
[Quale incertezza vogliamo eliminare?]

## Metodo
[Come abbiamo investigato?]

## Risultati
[Cosa abbiamo scoperto?]

## Raccomandazione
[Cosa facciamo adesso?]

## Prossimi Passi
- [Azione 1]
- [Azione 2]

## Riferimenti
- [Link a PoC, benchmark, documentazione]
```

---

## RFC — Request for Comments

Processo formale per proporre e discutere cambiamenti significativi al sistema, usato da molte big tech (Rust lang, React, TypeScript, etc.):

### Processo RFC

```
1. DRAFT
   Il developer scrive una proposta in formato RFC
   e la condivide nel repository docs/rfcs/

2. REVIEW (7-14 giorni)
   Il team commenta, suggerisce, critica.
   I commenti vengono gestiti come thread nel PR.

3. FINAL COMMENT PERIOD (FCP)
   Annuncio che la decisione è imminente.
   Ultimi commenti raccolti.

4. DECISIONE
   - Accepted: il cambio procede
   - Rejected: motivazione documentata
   - Postponed: rimandato con motivazione

5. IMPLEMENTATION
   L'RFC accettato diventa un ADR + issue/epic nel tracker.
```

### Template RFC

```markdown
# RFC-[NNN]: [Titolo]

**Autore:** [nome]
**Stato:** Draft | In Review | FCP | Accepted | Rejected
**Data proposta:** [data]
**Data decisione:** [data]

## Summary (3-5 righe)
[Cosa stai proponendo e perché in breve]

## Motivazione
[Perché è necessario questo cambiamento? Quale problema risolve?
 Quali casi d'uso abilita?]

## Proposta Dettagliata
[Come funzionerà esattamente? Design, API, struttura.]

## Trade-off e Svantaggi
[Cosa sacrifichiamo con questa scelta?]

## Alternative Considerate
[Cosa hai valutato prima di proporre questo?]

## Domande Aperte
[Cosa non hai ancora risolto? Dove hai bisogno di input?]

## Riferimenti
[Link, paper, implementazioni simili in altri progetti]
```

---

## Traceability: Chiudere il Cerchio

La documentazione delle decisioni ha pieno valore solo se è **navigabile e interconnessa**:

```
REQUISITO (RTM)
    │ implementato da
    ▼
USER STORY (backlog)
    │ derivata da
    ▼
TASK / COMMIT (git)
    │ giustificato da
    ▼
ADR / RFC (docs/decisions)
    │ validato da
    ▼
TEST di ACCETTAZIONE (CI/CD)
    │ verificato da
    ▼
PRODUCTION METRICS (monitoring)
```

Questa catena di tracciabilità permette di rispondere a qualsiasi domanda del tipo "perché il sistema fa X?" navigando dal comportamento osservato fino al requisito originale che lo ha motivato.

---

*Precedente: [05 — Defensive Architecture](./05-defensive-architecture.md) | Prossimo: [07 — Agile come Scudo](./07-agile-protection.md)*

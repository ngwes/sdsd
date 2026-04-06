# SDSD — Stupid-Driven Software Development

> *"Il miglior codice è quello che sopravvive al contatto con gli stakeholder."*

## Cos'è SDSD?

**Stupid-Driven Software Development (SDSD)** è un framework pragmatico di pratiche, pattern e metodologie pensato per sviluppatori software che operano in contesti ad alta entropia: ambienti in cui gli stakeholder, i domain expert, gli analisti e il business non riescono a definire requisiti chiari, non comprendono il prodotto che richiedono, cambiano idea frequentemente e — nella peggiore delle ipotesi — attribuiscono al team di sviluppo la responsabilità dei propri fallimenti.

SDSD non è cinismo. È **ingegneria difensiva applicata alla dimensione umana del software**. È l'insieme di strumenti che un professionista maturo usa per proteggere:

- la **qualità del prodotto** da interferenze esterne mal gestite;
- il **progetto** da scope creep, requisiti volatili e ambiguità strutturale;
- il **team di sviluppo** da critiche infondate, ritorsioni e attribuzioni di colpa arbitrarie;
- il **valore economico** generato dal software da decisioni irrazionali.

---

## Struttura della Documentazione

Questa suite documentale è organizzata in sezioni progressive. Si consiglia una lettura sequenziale per chi si avvicina per la prima volta; i professionisti esperti possono navigare direttamente alle sezioni di interesse.

| # | File | Contenuto |
|---|------|-----------|
| 01 | [Manifesto SDSD](./01-manifesto.md) | Principi fondanti, filosofia e dichiarazione d'intenti |
| 02 | [Dati e Statistiche](./02-dati-statistiche.md) | Ricerche, studi e dati sui fallimenti software |
| 03 | [Requirements Engineering](./03-requirements-engineering.md) | Tecniche per gestire requisiti ambigui, incompleti o mutevoli |
| 04 | [Communication Patterns](./04-communication-patterns.md) | Strategie di comunicazione con stakeholder non tecnici |
| 05 | [Defensive Architecture](./05-defensive-architecture.md) | Pattern architetturali che resistono all'interferenza esterna |
| 06 | [ADR & Documentazione Decisionale](./06-adr-documentation.md) | Architecture Decision Records, log delle decisioni, traceability |
| 07 | [Agile come Scudo](./07-agile-protection.md) | DoD, DoR, acceptance criteria, BDD — usare l'Agile per proteggersi |
| 08 | [Scope Management](./08-scope-management.md) | Prevenire e gestire lo scope creep |
| 09 | [Anti-Pattern degli Stakeholder](./09-stakeholder-antipatterns.md) | Catalogazione dei comportamenti disfunzionali più comuni |
| 10 | [Domain-Driven Design](./10-ddd-protection.md) | DDD come linguaggio comune e strumento di protezione |
| 11 | [Template e Strumenti](./11-templates-tools.md) | Template pratici, checklist, script di difesa |
| 12 | [Riferimenti e Letture](./12-references.md) | Libri, paper, ricerche, risorse online |
| — | [Diagrammi](./diagrams/) | SVG e Mermaid di supporto |

---

## Quick Start: Le 10 Regole d'Oro SDSD

Per chi ha fretta, queste sono le pratiche ad impatto immediato:

1. **Scrivi tutto.** Ogni decisione verbale è come se non esistesse.
2. **Fai firmare i requisiti.** Un requisito non approvato non è un requisito.
3. **Usa un ADR per ogni decisione architetturale rilevante.**
4. **Definisci DoD e DoR prima di iniziare ogni sprint.**
5. **Nessun cambiamento senza Change Request formale.**
6. **Demo frequenti.** Chi non vede, inventa.
7. **Crea un vocabolario condiviso (Ubiquitous Language) con il business.**
8. **Traccia i requisiti end-to-end** (RTM: Requirements Traceability Matrix).
9. **Automatizza la verifica** — i test sono prove legali di conformità.
10. **Documenta le tue assunzioni** — esplicitarle è più potente che nasconderle.

---

## A Chi è Rivolto

- **Senior/Lead Developer** che gestiscono l'interfaccia con il business
- **Software Architect** che devono difendere le proprie scelte
- **Tech Lead** che vogliono proteggere il proprio team
- **CTO / VP of Engineering** che devono gestire la governance tecnica
- **Developer** (a qualsiasi livello) che si trovano in contesti disfunzionali

---

## Nota Filosofica

SDSD non presuppone mala fede degli stakeholder. Presuppone che **l'incompetenza, l'ambiguità e l'incapacità di articolare bisogni complessi siano condizioni normali**, non eccezioni. Il medico non si lamenta dei pazienti che non sanno fare diagnosi. L'avvocato non si lamenta dei clienti che non conoscono la legge. Il software developer professionista non si lamenta degli stakeholder che non capiscono il software: **si attrezza.**

---

*Versione: 1.0 — Aprile 2026*
*Licenza: MIT — Condividi, adatta, contribuisci.*

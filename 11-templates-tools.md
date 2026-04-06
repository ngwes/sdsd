# 11 — Template e Strumenti Pratici

> *"Un template vuoto è meglio di un documento assente."*

Questa sezione raccoglie template pronti all'uso, checklist operative e configurazioni di strumenti per implementare le pratiche SDSD immediatamente.

---

## Template Fondamentali

### TEMPLATE 1: Kick-off Meeting Agenda

```markdown
# Agenda Kick-off — [Nome Progetto]

**Data/Ora:** [data] [ora]
**Luogo/Link:** [dove]
**Durata:** 2-3 ore

## Partecipanti Richiesti
- [ ] Product Owner / Business Sponsor
- [ ] Tech Lead / Architect
- [ ] Developer (almeno 1 senior)
- [ ] QA Lead
- [ ] UX Designer (se applicabile)
- [ ] Rappresentante Operations/Security (se applicabile)

## Agenda

### 1. Obiettivi del Progetto (15 min)
- Qual è il problema che stiamo risolvendo?
- Qual è il valore atteso?
- Come misuriamo il successo?

### 2. Stakeholder Map (20 min)
- Chi sono tutti gli stakeholder?
- Chi ha potere decisionale?
- Chi deve essere consultato?
- Chi deve essere informato?

### 3. Scope e Out-of-Scope (30 min)
- Cosa è sicuramente IN scope?
- Cosa è sicuramente OUT of scope?
- Cosa è ancora da decidere (aree grigie)?

### 4. Assunzioni e Rischi (20 min)
- Cosa stiamo assumendo come vero?
- Quali sono i rischi principali?
- Come li mitigiamo?

### 5. Vincoli (15 min)
- Timeline fissa o flessibile?
- Budget disponibile?
- Vincoli tecnologici?
- Vincoli normativi?

### 6. Processo di Lavoro (20 min)
- Metodologia (Agile, Scrum, Kanban)?
- Cerimonie e loro frequenza
- Canali di comunicazione
- Processo di change request
- Escalation path

### 7. Definizione di Successo (10 min)
- DoD di alto livello
- Criteri di acceptance della release

### 8. Prossimi Passi (10 min)
- Azioni immediate con owner e data

## Output Atteso da Questo Meeting
- [ ] Project Charter bozza
- [ ] Stakeholder Map
- [ ] Risk Register iniziale
- [ ] Scope Baseline bozza (da raffinare)
- [ ] Accordo sul processo di lavoro
```

---

### TEMPLATE 2: Project Charter

```markdown
# Project Charter — [Nome Progetto]

**Versione:** 1.0
**Data:** [data]
**Sponsor:** [nome e ruolo]

## 1. Visione e Obiettivi

**Problema da risolvere:**
[Descrizione del problema in termini di business]

**Soluzione proposta:**
[Descrizione ad alto livello della soluzione]

**Obiettivi misurabili:**
| Obiettivo | Metrica | Target | Baseline |
|-----------|---------|--------|----------|
| [Obj 1] | [come si misura] | [valore target] | [valore attuale] |

## 2. Scope

### In Scope
- [Funzionalità 1]
- [Funzionalità 2]

### Out of Scope
- [Cosa esplicitamente escluso]

### Da Definire
- [Aree ancora aperte]

## 3. Stakeholder

| Nome | Ruolo | Tipo | Responsabilità |
|------|-------|------|----------------|
| [nome] | [ruolo] | Sponsor/PO/Dev/QA... | [cosa fa in questo progetto] |

## 4. Timeline e Milestone

| Milestone | Data Target | Descrizione |
|-----------|-------------|-------------|
| [M1] | [data] | [cosa deve essere pronto] |

## 5. Budget

**Budget approvato:** € ___________
**Contingency:** ___ %

## 6. Rischi Principali

| Rischio | Probabilità | Impatto | Mitigazione | Owner |
|---------|-------------|---------|-------------|-------|
| [rischio] | A/M/B | A/M/B | [come] | [chi] |

## 7. Assunzioni

1. [Assunzione 1]
2. [Assunzione 2]

## 8. Vincoli

1. [Vincolo 1]
2. [Vincolo 2]

## 9. Dipendenze Esterne

| Dipendenza | Team/Sistema | Tipo | ETA |
|------------|--------------|------|-----|
| [dipendenza] | [da chi dipende] | Blocca/Impatta | [data] |

## 10. Processo di Governance

**Change Request:** [link al processo]
**Escalation:** [chi → chi → chi]
**Reporting:** [cadenza, format, destinatari]

---

## Firma di Approvazione

Con la firma di questo documento, le parti approvano il progetto come descritto
e si impegnano a seguire il processo di governance definito.

| Ruolo | Nome | Firma | Data |
|-------|------|-------|------|
| Business Sponsor | | ________ | [data] |
| Product Owner | | ________ | [data] |
| Tech Lead | | ________ | [data] |
```

---

### TEMPLATE 3: RAID Log

```markdown
# RAID Log — [Progetto]

*Aggiornato ogni sprint. Owner: [chi lo gestisce]*

## Risks (Rischi)

| ID | Rischio | Probabilità | Impatto | Score | Mitigazione | Owner | Status |
|----|---------|-------------|---------|-------|-------------|-------|--------|
| R01 | [desc] | Alta=3/Med=2/Bassa=1 | Alto=3/Med=2/Basso=1 | P×I | [come] | [chi] | Aperto/Mitigato/Chiuso |

## Assumptions (Assunzioni)

| ID | Assunzione | Verificata? | Fonte | Data verifica | Rischio se falsa |
|----|------------|-------------|-------|---------------|-----------------|
| A01 | [cosa stiamo assumendo] | Sì/No | [chi ha confermato] | [data] | [cosa succede se è sbagliata] |

## Issues (Problemi Aperti)

| ID | Problema | Impatto | Owner | ETA | Status | Note |
|----|----------|---------|-------|-----|--------|------|
| I01 | [desc] | [su cosa impatta] | [chi risolve] | [quando] | Aperto/In corso/Chiuso | |

## Dependencies (Dipendenze)

| ID | Dipendenza | Da Chi | Tipo | Data Necessaria | Status |
|----|------------|--------|------|-----------------|--------|
| D01 | [cosa serve] | [chi deve darlo] | Blocca/Impatta | [data] | In attesa/Ricevuta/A rischio |
```

---

### TEMPLATE 4: User Story Completa

```markdown
# US-[NNN]: [Titolo]

**Epic:** [nome dell'epic padre]
**Sprint:** [sprint pianificato]
**Priorità:** Must / Should / Could / Won't
**Story Points:** [N]
**Owner:** [Product Owner che ha approvato]

## User Story

Come [tipo di utente],
voglio [funzionalità/azione],
in modo da [beneficio/obiettivo].

## Contesto e Background

[Perché questa storia è necessaria? Quale problema risolve?
 Qualsiasi contesto utile per il developer.]

## Criteri di Accettazione

**Scenario 1: [Happy Path]**
```gherkin
Dato che [contesto iniziale]
Quando [azione dell'utente]
Allora [risultato atteso]
  E [altra conseguenza]
```

**Scenario 2: [Edge Case]**
```gherkin
Dato che [contesto]
Quando [azione]
Allora [risultato]
```

**Scenario 3: [Error Case]**
```gherkin
Dato che [contesto di errore]
Quando [azione che causa errore]
Allora [messaggio di errore o comportamento difensivo]
```

## Assunzioni

- [Cosa assumiamo come vero per questa storia]
- [Es: l'utente è già autenticato]
- [Es: il prodotto esiste nel catalogo]

## Out of Scope per questa storia

- [Cosa NON è incluso e andrà in una storia separata]

## Dipendenze

- [US-NNN]: [descrizione della dipendenza]
- [Sistema esterno]: [descrizione]

## Note Tecniche

[Eventuali vincoli o indicazioni tecniche concordate]

## Mockup / Wireframe

[Link o immagine allegata]

---

**Definition of Ready checklist:**
- [ ] Formato corretto (As/Want/So that)
- [ ] Acceptance Criteria completi
- [ ] Story Points stimati
- [ ] Nessuna dipendenza bloccante
- [ ] Mockup disponibili (se richiesti)
- [ ] Approvata dal PO: [nome] il [data]
```

---

## Checklist Operative

### CHECKLIST 1: Pre-Sprint

```
PRE-SPRINT CHECKLIST

□ Sprint precedente chiuso (tutte le storie accepted o moved)
□ Velocity dell'ultimo sprint registrata
□ Backlog groomed (storie pronte hanno DoR)
□ Priorità aggiornate dal PO
□ Dipendenze esterne verificate
□ Nessun blocco tecnico aperto non gestito
□ RAID log aggiornato
□ Retrospective actions dal sprint precedente trackate
□ Sprint planning schedulato con PO presente
```

### CHECKLIST 2: Definition of Ready (per ogni storia)

```
DEFINITION OF READY

□ Formato User Story corretto
□ Acceptance Criteria scritti in Gherkin (o equivalente)
□ Story Points stimati dal team
□ Priorità MoSCoW assegnata
□ Mockup/wireframe allegati (se UI)
□ Dipendenze identificate e non bloccanti
□ Dati di test identificati e disponibili
□ API esterne documentate (se integrazione)
□ No open questions critiche
□ PO disponibile per chiarimenti durante lo sprint
□ Firmata/approvata dal PO
```

### CHECKLIST 3: Definition of Done (per ogni storia)

```
DEFINITION OF DONE

□ Tutti gli acceptance criteria soddisfatti
□ Unit test scritti e verdi (copertura ≥ 80%)
□ Integration test aggiornati
□ Code review approvata da almeno 1 peer
□ Nessun linting error bloccante
□ Nessun security vulnerability (SAST scan)
□ API documentata (se modificata)
□ README aggiornato (se necessario)
□ ADR creato (se decisione architetturale)
□ Story demo-ata al PO
□ Accettata dal PO: [firma/data]
□ Mergiata in develop/main
□ CI/CD verde
□ Deployata in staging
```

### CHECKLIST 4: Release Readiness

```
RELEASE READINESS CHECKLIST

QUALITÀ
□ Tutti i test passanti (unit, integration, e2e)
□ Performance test superato (conformità SLA)
□ Security scan superato (no critical/high vulnerabilities)
□ Accessibility test (se applicabile)

DOCUMENTAZIONE
□ Release notes scritte
□ Changelog aggiornato
□ Documentazione utente aggiornata
□ Runbook operativo aggiornato

OPERAZIONI
□ Rollback plan documentato e testato
□ Database migration testata su staging
□ Feature flags configurati correttamente
□ Monitoring e alerting configurati
□ On-call notificato

BUSINESS
□ UAT completata e firmata dal PO
□ Go/No-Go approvato da: [PO] e [Tech Lead]
□ Comunicazione utenti preparata (se impatto UX)
□ Training completato (se necessario)

FIRMA GO/NO-GO
□ Tech Lead: _________________ Data: _______
□ Product Owner: _____________ Data: _______
```

---

## Strumenti Consigliati

### Per la Gestione dei Requisiti

| Strumento | Tipo | Pro | Contro |
|-----------|------|-----|--------|
| **Jira** | Ticket + Backlog | Molto diffuso, integrazioni | Costoso, complesso |
| **Linear** | Ticket moderno | Veloce, UX eccellente | Meno feature enterprise |
| **GitHub Issues + Projects** | Ticket + Board | Gratuito, vicino al codice | Funzionalità limitate |
| **Azure DevOps** | Suite completa | Eccellente integrazione MS | Curva di apprendimento |
| **Notion** | Documenti + DB | Flessibile per documentazione | Meno struttura per ticket |

### Per la Documentazione

| Strumento | Tipo | Pro |
|-----------|------|-----|
| **Confluence** | Wiki aziendale | Integrazione Jira, maturo |
| **Notion** | Wiki moderno | Flessibile, bello |
| **GitBook** | Docs-as-code | Versionabile, per dev |
| **Obsidian** | Note personale | Offline, gratuito |
| **MkDocs + Material** | Docs nel repo | Versionabile, open source |

### Per gli ADR

| Strumento | Descrizione |
|-----------|-------------|
| **adr-tools** | CLI tool, crea e gestisce ADR da terminale |
| **Log4Brains** | Web UI per navigare ADR, supporta multiple repo |
| **Backstage.io** | Developer portal con tech docs integrati |
| **File Markdown nel repo** | Il modo più semplice e versionabile |

### Per il BDD/ATDD

| Tool | Linguaggio | Framework |
|------|------------|-----------|
| **Cucumber** | Java, JS, Ruby | Gherkin nativo |
| **Behave** | Python | Gherkin per Python |
| **SpecFlow** | .NET | Gherkin per .NET |
| **Cypress** | JavaScript | BDD nativo |
| **Playwright** | Multi-linguaggio | Può integrare BDD |

### Per il Diagramming

| Strumento | Tipo | Note |
|-----------|------|------|
| **Mermaid** | Diagrammi nel codice | Integrato in GitHub/GitLab |
| **PlantUML** | Diagrammi nel codice | Standard enterprise |
| **Lucidchart** | Visuale collaborativo | Ottimo per stakeholder |
| **Miro** | Whiteboard digitale | Perfetto per Event Storming |
| **draw.io** | Diagrammi gratuiti | Desktop + web, gratuito |

---

## Script di Risposta — Il "Phrase Book" SDSD

Situazioni comuni e risposte professionali pre-costruite:

```
"Perché ci vuole così tanto?"
→ "Posso mostrarti la breakdown della stima. [Componente A]
   richiede X giorni per [motivo specifico]. Vuoi vedere i dettagli?"

"Non mi avevi detto che ci voleva così tanto"
→ "La stima è stata comunicata il [data] via [email/ticket ID].
   Posso mandarti il link. Vuoi rivederla insieme?"

"Ma è una piccola modifica!"
→ "Hai ragione che sembra piccola. La mia stima tecnica è di
   [N giorni] perché [motivo]. Posso mostrarti la breakdown
   se vuoi verificare insieme."

"Non è quello che avevo chiesto"
→ "Capisco. Ho implementato ciò che era specificato nell'
   acceptance criteria concordata il [data] con [nome].
   Posso mostrarti il documento. Cosa vorresti fosse diverso?
   Creiamo una Change Request?"

"Fate questo entro domani"
→ "Posso fare una stima adesso. Guardando lo scope, stimo [N]
   giorni. Per rispettare la tua timeline, potremmo:
   A) ridurre lo scope a [funzionalità core]
   B) aggiungere risorse (ma vedi Brooks's Law)
   C) accettare un rischio di qualità ridotta (devo documentarlo)
   Quale preferisci?"

"Il sistema non funziona"
→ "Puoi descrivere il comportamento specifico che osservi?
   Quale azione stai eseguendo? Cosa ti aspetti che succeda?
   Cosa succede invece? Così posso investigare l'issue correttamente."

"Era ovvio che doveva funzionare anche in questo modo"
→ "Capisco che sembri ovvio. Non era nei requisiti concordati,
   ma posso aggiungere questo comportamento tramite una Change
   Request. Vuoi che ne faccia la stima?"
```

---

*Precedente: [10 — DDD](./10-ddd-protection.md) | Prossimo: [12 — Riferimenti](./12-references.md)*

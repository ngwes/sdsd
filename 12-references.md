# 12 — Riferimenti, Letture e Risorse

> *"Chi ha imparato solo dal proprio errore ha un campione di un."*

Questa sezione raccoglie i libri, i paper accademici, gli articoli e le risorse online che costituiscono la base intellettuale di SDSD. Ogni risorsa è accompagnata da una nota su perché è rilevante per il developer che vuole proteggersi.

---

## Libri Fondamentali

### Requirements Engineering & Domain Understanding

**"Domain-Driven Design: Tackling Complexity in the Heart of Software"**
— Eric Evans (2003, Addison-Wesley)

Il libro che ha definito DDD. Fondamentale per comprendere Ubiquitous Language, Bounded Contexts, Aggregates, e come il linguaggio protegge l'architettura. Lettura obbligatoria per ogni developer che lavora su domini complessi.

**Rilevanza SDSD:** ⭐⭐⭐⭐⭐ — Fornisce il framework più completo per gestire la complessità del dominio.

---

**"Implementing Domain-Driven Design"**
— Vaughn Vernon (2013, Addison-Wesley)

La controparte pratica del libro di Evans. Mostra come implementare DDD con esempi concreti di codice.

**Rilevanza SDSD:** ⭐⭐⭐⭐ — Traduce i concetti di Evans in pratica quotidiana.

---

**"User Story Mapping"**
— Jeff Patton (2014, O'Reilly)

Tecnica per costruire una mappa visuale delle user story che rivela le lacune nei requisiti e crea un linguaggio condiviso con gli stakeholder.

**Rilevanza SDSD:** ⭐⭐⭐⭐⭐ — Strumento pratico per elicitare requisiti in modo collaborativo e visibile.

---

**"Impact Mapping: Making a Big Impact with Software Products and Projects"**
— Gojko Adzic (2012, Provoking Thoughts)

Tecnica per collegare deliverable tecnici agli obiettivi di business, rendendo esplicito perché si costruisce qualcosa.

**Rilevanza SDSD:** ⭐⭐⭐⭐ — Strumento di allineamento tra business goal e feature sviluppate.

---

### Software Engineering Classics

**"The Mythical Man-Month: Essays on Software Engineering"**
— Fred Brooks (1975, Addison-Wesley) — Aggiornato nel 1995

Il testo fondante del software engineering manageriale. Contiene Brooks's Law, il saggio "No Silver Bullet", e decenni di saggezza sul perché il software è difficile.

**Rilevanza SDSD:** ⭐⭐⭐⭐⭐ — Fornisce gli argomenti storici per difendere stime realistiche.

---

**"Clean Code: A Handbook of Agile Software Craftsmanship"**
— Robert C. Martin (2008, Prentice Hall)

Standard de-facto per il codice leggibile e manutenibile. Il codice pulito si difende da solo: è più facile comprendere, testare, e modificare.

**Rilevanza SDSD:** ⭐⭐⭐⭐ — Il codice pulito riduce i "misteri" che gli stakeholder interpretano come inefficienza.

---

**"Refactoring: Improving the Design of Existing Code"**
— Martin Fowler (1999, 2a ed. 2018, Addison-Wesley)

Il catalogo dei refactoring. Fondamentale per giustificare il tempo speso sul debito tecnico.

**Rilevanza SDSD:** ⭐⭐⭐⭐ — Fornisce un vocabolario professionale per comunicare il lavoro tecnico agli stakeholder.

---

### Agile & Process

**"The Art of Agile Development"**
— James Shore & Shane Warden (2007, 2a ed. 2021, O'Reilly)

Guida completa alle pratiche XP (Extreme Programming). Include TDD, pair programming, continuous integration, e molto altro.

**Rilevanza SDSD:** ⭐⭐⭐⭐ — Le pratiche XP sono alcune delle più efficaci contromisure ai problemi di stakeholder.

---

**"BDD in Action: Behavior-Driven Development for the whole software lifecycle"**
— John Ferguson Smart (2014, Manning)

La guida completa al Behavior-Driven Development con esempi pratici.

**Rilevanza SDSD:** ⭐⭐⭐⭐⭐ — BDD è lo strumento principale per trasformare i requisiti in contratti eseguibili.

---

**"Specification by Example: How Successful Teams Deliver the Right Software"**
— Gojko Adzic (2011, Manning)

Pattern per creare specifiche di requisiti che diventano test eseguibili. La base teorica di ATDD.

**Rilevanza SDSD:** ⭐⭐⭐⭐⭐ — Fornisce il metodo per creare prove formali che il software fa ciò che era concordato.

---

**"Agile Estimating and Planning"**
— Mike Cohn (2005, Prentice Hall)

Tecniche pratiche per stimare in modo realistico e comunicare le incertezze agli stakeholder.

**Rilevanza SDSD:** ⭐⭐⭐⭐ — Le stime documentate sono protezione contro l'ottimismo degli stakeholder.

---

### Project Management & Governance

**"The Deadline: A Novel About Project Management"**
— Tom DeMarco (1997, Dorset House)

Un romanzo sui progetti software. Leggibile, divertente, e profondo.

**Rilevanza SDSD:** ⭐⭐⭐ — Illustra i problemi di progetto in modo narrativo, utile per spiegarli agli stakeholder non tecnici.

---

**"Death March"**
— Edward Yourdon (1997, 2a ed. 2003, Prentice Hall)

Analisi dei progetti "death march" — quelli che tutti sanno che falliranno ma nessuno dice.

**Rilevanza SDSD:** ⭐⭐⭐ — Riconosci i segnali di un progetto condannato e sai come rispondere.

---

**"Waltzing with Bears: Managing Risk on Software Projects"**
— Tom DeMarco & Timothy Lister (2003, Dorset House)

Gestione del rischio nei progetti software, con approccio quantitativo.

**Rilevanza SDSD:** ⭐⭐⭐⭐ — Il Risk Register e la gestione quantitativa del rischio sono strumenti di protezione fondamentali.

---

## Paper Accademici e Ricerche

### The Standish Group Chaos Report (1994–presente)
*https://www.standishgroup.com/*

La ricerca più longeva sui fallimenti dei progetti IT. Analizza migliaia di progetti ogni anno. I dati citati nel capitolo 02 di questa documentazione provengono da questo report.

**Accesso:** Report annuale a pagamento; sommari e dati storici disponibili gratuitamente online.

---

### "No Silver Bullet — Essence and Accident in Software Engineering"
— Fred Brooks (1986)
*https://worrydream.com/refs/Brooks_1986_-_No_Silver_Bullet.pdf*

Il paper più citato nel software engineering. Distingue la complessità essenziale (intrinseca) dall'accidentale (risolvibile con buone pratiche).

---

### "How Do Committees Invent?"
— Melvin Conway (1968)

Il paper originale che formula Conway's Law. Disponibile su http://www.melconway.com/Home/Committees_Paper.html

---

### "Out of the Tar Pit"
— Ben Moseley & Peter Marks (2006)
*https://curtclifton.net/papers/MoseleyMarks06a.pdf*

Analisi della complessità nel software. Fondamentale per comprendere la differenza tra complessità necessaria e accidentale.

---

### NIST Special Publication 002: "The Economic Impacts of Inadequate Infrastructure for Software Testing"
*https://www.nist.gov/system/files/documents/director/planning/report02-3.pdf*

Studio del 2002 che quantifica il costo economico dei bug software nell'economia americana.

---

## Risorse Online

### Architettura e Pattern

**Martin Fowler's Blog**
*https://martinfowler.com*
Il sito più influente sull'architettura software. Contiene cataloghi di pattern, articoli su microservizi, DDD, refactoring, e molto altro.

**ADR GitHub Repository (Michael Nygard)**
*https://github.com/joelparkerhenderson/architecture-decision-record*
Repository con template ADR e centinaia di esempi reali.

**ADR.github.io**
*https://adr.github.io*
Il sito ufficiale degli Architecture Decision Records.

---

### Requirements Engineering

**IEEE 830 — Recommended Practice for Software Requirements Specifications**
Lo standard IEEE per le specifiche di requisiti software. Reference formale per la struttura di un documento SRS.

**IREB — International Requirements Engineering Board**
*https://www.ireb.org*
Organizzazione che certifica i Requirements Engineer. Ha pubblicato le "Fundamentals of Requirements Engineering" — lettura gratuita ottima.

---

### Agile e BDD

**Cucumber Documentation**
*https://cucumber.io/docs/guides/*
Documentazione ufficiale di Cucumber con tutorial su BDD e Gherkin.

**Behaviour-Driven Development (Wikipedia)**
*https://en.wikipedia.org/wiki/Behavior-driven_development*
Overview completa di BDD con storia, pratica e risorse.

**The Three Amigos (Agile Alliance)**
*https://www.agilealliance.org/glossary/three-amigos/*
Spiegazione della tecnica Three Amigos per la scrittura degli acceptance criteria.

---

### Difesa del Developer

**The Joel Test**
*https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/*
Joel Spolsky (co-fondatore di Stack Overflow) — 12 domande per valutare la qualità di un team di sviluppo. Un team che risponde "sì" a tutto è un team che si protegge.

**"Blameless Postmortems" (Google SRE Book)**
*https://sre.google/sre-book/postmortem-culture/*
Il capitolo del libro SRE di Google sul post-mortem blameless. Gratuito online.

---

## Standard di Industria

### IEEE Standards

| Standard | Titolo | Rilevanza |
|----------|--------|-----------|
| **IEEE 830** | Recommended Practice for Software Requirements Specifications | Requirements Engineering |
| **IEEE 1016** | Software Design Descriptions | Documentazione architetturale |
| **IEEE 829** | Software Test Documentation | Testing e acceptance criteria |
| **IEEE 1028** | Software Reviews and Audits | Code review formale |
| **IEEE 12207** | Software Life Cycle Processes | Processo di sviluppo completo |

### ISO Standards

| Standard | Titolo | Rilevanza |
|----------|--------|-----------|
| **ISO/IEC 25010** | System and software quality requirements (SQuaRE) | Quality characteristics |
| **ISO/IEC 27001** | Information Security Management | Security requirements |
| **ISO 9001** | Quality Management Systems | Processo qualità |

---

## Glossario delle Abbreviazioni

| Sigla | Significato |
|-------|-------------|
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

*Fine della documentazione SDSD v1.0*

*← Precedente: [11 — Template e Strumenti](./11-templates-tools.md) | → Torna al [README](./README.md)*

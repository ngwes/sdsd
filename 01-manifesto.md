# 01 — Il Manifesto SDSD

## Dichiarazione d'Intenti

Noi, software developer che operano quotidianamente nel caos organizzativo, riconosciamo una verità fondamentale che raramente viene detta ad alta voce:

> **La maggior parte dei problemi software non sono problemi tecnici. Sono problemi umani con conseguenze tecniche.**

Il codice sbagliato è quasi sempre il sintomo. La causa è a monte: requisiti interpretati, decisioni non documentate, cambi di rotta non tracciati, responsabilità attribuite al team di sviluppo per decisioni prese altrove.

SDSD nasce dalla necessità di dotare il developer di una serie di pratiche, pattern e comportamenti che permettano di:

1. **Fare software di qualità** nonostante l'ambiente circostante
2. **Proteggersi** da attribuzioni di colpa ingiuste
3. **Proteggere il prodotto** da interferenze irrazionali
4. **Proteggere il progetto** da requisiti volatili e scope creep
5. **Creare un ambiente di lavoro professionale** anche dove non esiste

---

## I 12 Principi SDSD

### Principio 1: La Scrittura È Legge
*"Ciò che non è scritto non esiste."*

Ogni decisione, ogni requisito, ogni cambio di direzione deve essere documentato. Le conversazioni verbali evaporano. Le email vengono cancellate. I messaggi su Slack scompaiono. Un documento firmato è permanente.

**Pratica derivata:** nessuna decisione architettuale, nessun requirement change, nessun accordo progettuale senza documento scritto e approvato.

---

### Principio 2: La Firma è Responsabilità
*"Chi firma, possiede."*

I requisiti approvati verbalmente appartengono a nessuno. I requisiti firmati appartengono a chi li ha firmati. Il meccanismo di sign-off formale trasferisce la responsabilità della definizione al suo legittimo proprietario: il business.

**Pratica derivata:** ogni documento di requisito, ogni ADR, ogni Change Request deve avere un campo "approvato da" con firma (digitale o analogica) e data.

---

### Principio 3: Il Cambiamento Ha un Costo
*"Non esiste la piccola modifica."*

Ogni modifica ai requisiti ha un costo: di tempo, di refactoring, di test, di regressione, di coordinamento. Questo costo deve essere reso visibile e comunicato prima che il cambiamento venga approvato. Rendere i costi trasparenti riduce i cambi arbitrari.

**Pratica derivata:** ogni Change Request deve includere una stima d'impatto (effort, costo, rischi, funzionalità impattate).

---

### Principio 4: Le Assunzioni Sono Pericolose Solo se Implicite
*"Se devi assumere, documenta l'assunzione."*

In assenza di requisiti completi, i developer fanno assunzioni. Questo è inevitabile. Ciò che non è inevitabile è fare assunzioni senza dichiararle. Un'assunzione documentata è difendibile. Un'assunzione implicita è una trappola.

**Pratica derivata:** ogni User Story, ogni ADR, ogni documento tecnico deve avere una sezione "Assunzioni" esplicita.

---

### Principio 5: Il Demo è la Verita
*"Mostra, non descrivere."*

Gli stakeholder non capiscono i documenti. Capiscono ciò che vedono. I demo frequenti (anche di prototipi, anche di wireframe, anche di mock) sono il meccanismo più efficace per correggere la rotta prima che il costo della correzione diventi insostenibile.

**Pratica derivata:** demo incrementali ad ogni sprint/milestone, con feedback strutturato e documentato.

---

### Principio 6: Il Linguaggio Condiviso è Pace
*"Se chiamate la stessa cosa con nomi diversi, state parlando di cose diverse."*

Uno dei principali vettori di incomprensione è il linguaggio. Business e developer usano termini diversi per gli stessi concetti, o gli stessi termini per concetti diversi. Creare e mantenere un vocabolario condiviso (Ubiquitous Language) è un atto difensivo fondamentale.

**Pratica derivata:** glossario condiviso, aggiornato, visibile a tutti. Nessun documento di requisito senza riferimento al glossario.

---

### Principio 7: I Test Sono Prove
*"Un test verde è una garanzia firmata."*

I test automatici non sono solo strumenti di qualità. Sono prove formali che il software si comporta come concordato. In caso di contestazione, una suite di test completa è il documento più potente che un developer può produrre.

**Pratica derivata:** Acceptance Test Driven Development (ATDD) — i test di accettazione vengono scritti insieme al business prima dello sviluppo.

---

### Principio 8: La Tracciabilità è Protezione
*"Ogni riga di codice ha un padre."*

Essere in grado di tracciare un comportamento del sistema fino al requisito che lo ha originato è la difesa più efficace contro l'accusa di "avete fatto la cosa sbagliata". La Requirements Traceability Matrix (RTM) è il meccanismo formale per questa protezione.

**Pratica derivata:** ogni Feature/Story/Task deve essere collegata al requisito padre. Il codice deve essere collegabile alla storia che lo ha originato.

---

### Principio 9: L'Architettura si Spiega, Non si Subisce
*"Una decisione architettuale non documentata è una bomba a orologeria."*

Le decisioni architetturali hanno una vita lunghissima e un impatto enorme. Devono essere documentate, motivate e approvate. Gli Architecture Decision Records (ADR) sono lo strumento standard per questo.

**Pratica derivata:** ADR per ogni decisione architetturale rilevante, con contesto, opzioni considerate, decisione presa e conseguenze.

---

### Principio 10: Il Confine del Progetto è Sacro
*"Scope creep non è un'aggiunta. È un furto."*

Ogni funzionalità non pianificata che entra nel progetto senza passare dal processo formale di change management è un furto di risorse, tempo e attenzione. Il confine del progetto (scope) deve essere definito, approvato e difeso.

**Pratica derivata:** processo formale di Change Request, con valutazione dell'impatto e approvazione esplicita prima di qualsiasi cambiamento.

---

### Principio 11: L'Incertezza si Gestisce, Non si Nega
*"Se non sai, dillo. E documentalo."*

Negare l'incertezza è il modo più rapido per creare false aspettative e fallire le scadenze. Identificare esplicitamente le aree di incertezza, comunicarle e pianificare meccanismi di gestione del rischio è segno di professionalità, non di debolezza.

**Pratica derivata:** Risk Register, spike tecnici per la riduzione dell'incertezza, comunicazione proattiva dei rischi.

---

### Principio 12: Il Professionista si Forma Continuamente
*"L'ignoranza del dominio è temporanea. L'ignoranza delle pratiche è una scelta."*

SDSD non giustifica l'arroganza tecnica. Un developer che non fa sforzi per comprendere il dominio di business è parte del problema, non della soluzione. La protezione offerta da SDSD è tanto più efficace quanto più il developer è genuinamente competente — sia tecnicamente che nel dominio.

**Pratica derivata:** domain learning continuo, Event Storming, shadowing con domain expert, lettura della documentazione di dominio.

---

## Il Manifesto SDSD (Versione Compatta)

```
Preferiamo:

  Documentazione scritta e firmata
    piuttosto che accordi verbali

  Responsabilità esplicite e tracciate
    piuttosto che responsabilità diffuse e implicite

  Change Request formali con impatto valutato
    piuttosto che "piccole modifiche" non tracciate

  Demo frequenti con feedback documentato
    piuttosto che lunghi periodi di sviluppo al buio

  Un linguaggio condiviso e preciso
    piuttosto che termini ambigui interpretati liberamente

  Test di accettazione concordati prima dello sviluppo
    piuttosto che validazioni post-hoc soggettive

  Rischi e incertezze comunicati proattivamente
    piuttosto che ottimismo sistematico e scadenze mancate

Questo non significa che gli elementi a destra non abbiano valore.
Significa che siamo stati bruciati troppe volte da essi.
```

---

## La Mappa Mentale di SDSD

```
SDSD
├── Protezione dei Requisiti
│   ├── Requirements Engineering rigoroso
│   ├── Sign-off formale
│   ├── Requirements Traceability Matrix
│   └── Ubiquitous Language / Glossario
│
├── Protezione delle Decisioni
│   ├── Architecture Decision Records
│   ├── Decision Log
│   ├── RFC Process
│   └── Meeting Minutes con azioni tracciate
│
├── Protezione dallo Scope
│   ├── Change Request Process
│   ├── Impact Assessment
│   ├── Definition of Ready
│   └── Backlog grooming formale
│
├── Protezione della Qualità
│   ├── Definition of Done
│   ├── Acceptance Criteria espliciti
│   ├── BDD / ATDD
│   └── Test come contratto
│
├── Protezione Architetturale
│   ├── Anti-Corruption Layer (DDD)
│   ├── Bounded Contexts
│   ├── Feature Flags
│   └── Defensive Programming
│
└── Protezione della Comunicazione
    ├── Demo driven development
    ├── Strutture di escalation
    ├── Stakeholder matrix
    └── Risk Register pubblico
```

---

*Prossimo: [02 — Dati e Statistiche sui Fallimenti Software](./02-dati-statistiche.md)*

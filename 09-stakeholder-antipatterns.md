# 09 — Anti-Pattern degli Stakeholder

> *"Non puoi risolvere un problema che non hai nominato."*

Catalogare gli anti-pattern degli stakeholder non è un esercizio di cinismo: è **pattern recognition professionale**. Chi riconosce un anti-pattern può applicare la contromisura corretta invece di reagire emotivamente o casualmente.

---

## Catalogo degli Anti-Pattern

---

### AP-01: Il Requisito Fantasma

**Descrizione:** Il business richiede qualcosa che non aveva mai menzionato, dicendo "pensavo fosse ovvio" o "l'avevo detto nel meeting di 6 mesi fa".

**Segnali:**
- "Ma ovviamente il sistema deve anche..."
- "Non c'è bisogno di dirlo esplicitamente, si capisce"
- "L'avevo detto, forse non eri presente"

**Danno:** Lavoro non pianificato che emerge in fase di UAT o produzione.

**Contromisura:**
- Sezione "Assunzioni" esplicita in ogni documento di requisiti
- Tecnica "5 Whys" durante l'elicitazione per scoprire i requisiti impliciti
- Domande dirette: "Cosa devo sapere che non mi hai ancora detto?"
- Review dei requisiti con checklist di scenari standard (login, logout, errori, permessi, edge case)

---

### AP-02: Il Cambia-Idea Seriale

**Descrizione:** Gli stakeholder cambiano i requisiti frequentemente e in modo non coordinato, spesso contraddicendo decisioni prese precedentemente.

**Segnali:**
- Requirements che cambiano a ogni meeting
- Decisioni che sembrano risolte tornano in discussione
- "Non avevo capito bene, in realtà voglio..."
- Diverse versioni del "voluto" da parte di persone diverse

**Danno:** Regressioni continue, demotivazione del team, costi esplosivi.

**Contromisura:**
- Sign-off formale dei requisiti (se non c'è firma, non c'è accordo)
- Decision Log visibile e condiviso
- Change Request process che rende il costo del cambiamento visibile
- Retrospettiva dei cambiamenti: "Negli ultimi 3 sprint, abbiamo avuto 8 cambiamenti di requisito. Questo ci ha costato X punti extra."

---

### AP-03: Il Tunnel della Soluzione

**Descrizione:** Lo stakeholder descrive la soluzione tecnica invece del problema. Viene richiesta un'implementazione specifica senza capire perché.

**Segnali:**
- "Voglio un pulsante rosso in alto a destra"
- "Deve funzionare esattamente come Excel"
- "Aggiungi una colonna qui"
- Richieste di UI/UX dettagliate da persone non designer

**Danno:** Il developer implementa la soluzione sbagliata al problema giusto. Spesso risulta in UX scadente o architettura contorta.

**Contromisura:**
- Tecnica "5 Whys" per risalire al problema reale
- Domanda chiave: "Cosa stai cercando di fare quando hai bisogno di questo?"
- Tradurre la soluzione in problema, poi proporre soluzioni alternative
- Coinvolgere UX designer nel processo di elicitazione

---

### AP-04: Lo Stakeholder Invisibile

**Descrizione:** C'è qualcuno (senior manager, legal, compliance, utente finale) che ha requisiti rilevanti ma non partecipa al processo di elicitazione. Emerge tardi, spesso dopo il rilascio.

**Segnali:**
- "Bisogna sentire anche il responsabile di [reparto X]"
- "Legal non sa ancora del progetto"
- "Ma i commerciali sanno come funzionerà?"
- Utenti finali che vengono consultati solo durante l'UAT

**Danno:** Requisiti scoperti tardi con costi di correzione altissimi.

**Contromisura:**
- Stakeholder Analysis formale all'inizio del progetto
- Checklist: "Chi altro potrebbe avere requisiti su questo sistema?"
- Riunioni di kick-off allargate per identificare tutti gli stakeholder
- Sezione "Stakeholder non ancora consultati" nel documento di requisiti

---

### AP-05: Il Proxy del Business

**Descrizione:** La persona che fa da tramite tra il business reale e il team di sviluppo non ha l'autorità o la conoscenza per prendere decisioni. Deve sempre "andare a chiedere", con cicli di feedback infiniti.

**Segnali:**
- Risposte che richiedono sempre l'approvazione di qualcun altro
- Direzioni contraddittorie perché riportate male
- "Non so, devo controllare" come risposta prevalente
- Demo che non possono essere accettate perché "devo mostrarlo al mio manager"

**Danno:** Rallentamenti, incomprensioni, decisioni prese senza autorità reale.

**Contromisura:**
- Identificare e richiedere accesso diretto al decision-maker reale
- Documentare chiaramente il RACI (Responsible, Accountable, Consulted, Informed)
- Includere il decision-maker nelle ceremony di sprint review
- Escalation proattiva quando il proxy non riesce a sbloccare decisioni

---

### AP-06: Il Pessimista Costruttivo (o: "Sì ma...")

**Descrizione:** Ogni proposta viene accettata con un "sì ma" che aggiunge requisiti aggiuntivi, ridefinisce il perimetro, o pone veto su soluzioni già concordate.

**Segnali:**
- "Sì, ma ci vuole anche..."
- "Funziona, però manca..."
- Acceptance criteria che si allargano a ogni demo
- Demo concluse con più lavoro di quante ne sia stato completato

**Danno:** Demo che non finiscono mai, sprint che non si chiudono, velocity apparente pari a zero.

**Contromisura:**
- Freeze degli acceptance criteria prima dello sprint (DoR)
- Distinzione formale: "Questo è un bug?" (va fixato) vs "Questo è una nuova feature?" (nuova CR)
- Separare fisicamente il momento di accettazione dal momento di raccolta del nuovo feedback
- "Siamo d'accordo che questa storia è DONE? Le nuove richieste vanno nel backlog?"

---

### AP-07: L'Ottimista Cronico

**Descrizione:** Lo stakeholder sottostima sistematicamente la complessità, i tempi e i rischi. "Non è mica difficile" è la risposta a qualsiasi stima.

**Segnali:**
- "Non ci vorrà così tanto"
- "Lo abbiamo fatto in un weekend 10 anni fa"
- Pressione per ridurre le stime senza modificare lo scope
- "Con i tool di AI moderni questo si fa in un'ora"

**Danno:** Stime irrealistiche, schedule impossibili, team sotto pressione costante.

**Contromisura:**
- Stime documentate con breakdown dettagliata (non solo il numero finale)
- Riferimento a dati storici di progetto
- "Sono felice di discutere come ridurre l'effort. Possiamo ridurre lo scope oppure aumentare la semplicità dell'implementazione. Ma non posso ridurre la stima senza cambiare qualcosa."
- Three-point estimation (ottimistica, realistica, pessimistica) per rendere visibile l'incertezza

---

### AP-08: Il HIPPO (Highest Paid Person's Opinion)

**Descrizione:** Le decisioni vengono prese in base al grado gerarchico, non alla conoscenza del dominio o dei dati. Il senior manager che parla per ultimo "ha ragione" per default.

**Segnali:**
- Decisioni che cambiano quando entra il manager senior
- Dati e analisi ignorati in favore dell'intuizione del "boss"
- Team che non esprime opinioni contrarie perché "tanto decide lui/lei"

**Danno:** Decisioni subottimali prese per ragioni politiche, demotivazione del team tecnico.

**Contromisura:**
- Pre-caricare le decisioni con dati oggettivi (ADR, benchmark, ricerche)
- Struttura RFC che richiede motivazione basata su fatti
- "Chi parla per ultimo ha ragione" è un anti-pattern — promuovere cultura del "show me the data"
- Coinvolgere il HIPPO presto per influenzarlo con dati invece di combatterlo con opinioni

---

### AP-09: Il Deadliner Arbitrario

**Descrizione:** Le scadenze vengono imposte senza relazione con la complessità del lavoro o con vincoli di business reali. La data è "perché voglio che sia pronto per [evento]" senza analisi.

**Segnali:**
- Date scadute che vengono spostate senza conseguenze (quindi non erano reali)
- "Deve essere pronto per il Q1" senza motivazione commerciale
- Stessa urgenza per tutto ("tutto è priorità 1")
- Conseguenze non definite in caso di mancato rispetto della scadenza

**Danno:** Team sotto pressione costante, technical debt accumulato per rispettare deadline irrealistiche, qualità compromessa.

**Contromisura:**
- "Qual è la conseguenza commerciale se slittiamo di 2 settimane?" — spesso la risposta rivela che la scadenza era arbitraria
- Offrire opzioni: "Possiamo rispettare la data riducendo lo scope, oppure rispettare lo scope slittando di [N] settimane. Quale preferite?"
- Documentare esplicitamente il trade-off scope/quality/time nel change request
- La "deadline impossibile" va comunicata per iscritto appena identificata, con stima alternativa

---

### AP-10: Il Blame Shifter

**Descrizione:** Quando qualcosa va storto, la colpa viene attribuita al team tecnico indipendentemente dalle responsabilità reali.

**Segnali:**
- "Il sistema non funziona" (senza specificare cosa, quando, come)
- "Il team non ha capito i requisiti" (ma i requisiti erano ambigui)
- "Non è quello che avevo chiesto" (ma è esattamente quanto concordato per iscritto)
- Cambio di versione della storia dei fatti dopo un fallimento

**Danno:** Cultura del blame, team demotivato, perdita di professionisti.

**Contromisura:**
- CYA (Cover Your Ass) sistematico: ogni decisione, ogni cambiamento, ogni accordo — per iscritto
- Post-mortem blameless: "Cosa ha causato il problema?" non "Chi ha causato il problema?"
- Tracciabilità completa: requirements → tasks → code → tests
- Blameless post-mortem template (vedi sezione 04 — Communication Patterns)

---

### AP-11: Il Feature Smuggler

**Descrizione:** Funzionalità non pianificate entrano nel sistema senza passare dal processo formale — direttamente negli sviluppatori, via chat informale, "mentre ci sei".

**Segnali:**
- "Mentre fai quella cosa, aggiungi anche..."
- Conversazioni dirette con developer bypassando il Product Owner
- Funzionalità che appaiono nel sistema senza storia nel backlog
- "L'ho chiesto a [developer] direttamente"

**Danno:** Scope non tracciato, effort non pianificato, inconsistenza del prodotto.

**Contromisura:**
- Cultura di team: ogni richiesta funzionale va al Product Owner / backlog, non direttamente al developer
- Il developer risponde: "Creo una storia nel backlog e la metto in prioritizzazione con il PO"
- Nessuno sviluppo senza ticket/storia approvata
- Il PO deve essere il filtro unico per le priorità del team

---

### AP-12: Il Tester a Posteriori

**Descrizione:** Il business vuole validare il sistema solo quando è "finito", senza coinvolgimento durante lo sviluppo. Poi, durante l'UAT, emergono centinaia di problemi.

**Segnali:**
- Rifiuto di partecipare ai demo intermedi
- "Fatevi le vostre cose, poi ci chiamate quando è pronto"
- UAT lanciata a ridosso della deadline
- Cambio di requisiti durante l'UAT

**Danno:** Bug discovery tardiva (costosa), cambiamenti dell'ultimo minuto, deadline mancate.

**Contromisura:**
- Demo obbligatorie ogni sprint (non opzionali)
- UAT pianificata come fase esplicita del progetto con durata fissa
- Acceptance criteria scritti prima dello sviluppo (BDD/ATDD)
- "Se non partecipate ai demo intermedi, i rischi di cambio in UAT sono a carico del business"

---

## Matrice Anti-Pattern / Contromisura

| Anti-Pattern | Strumento Principale di Difesa |
|-------------|-------------------------------|
| Requisito Fantasma | Sezione Assunzioni + 5 Whys |
| Cambia-Idea Seriale | Sign-off + Decision Log + CR process |
| Tunnel della Soluzione | "Perché hai bisogno di questo?" + UX designer |
| Stakeholder Invisibile | Stakeholder Analysis + Kick-off allargato |
| Proxy senza Autorità | RACI matrix + accesso al decision-maker |
| Sì ma... | DoR + freeze AC + separazione demo/feedback |
| Ottimista Cronico | Stima dettagliata + dati storici + three-point |
| HIPPO | ADR + data-driven decision + RFC |
| Deadliner Arbitrario | Trade-off analysis + comunicazione scritta |
| Blame Shifter | CYA + tracciabilità + blameless post-mortem |
| Feature Smuggler | Cultura "tutto passa dal PO" + no ticket = no work |
| Tester a Posteriori | Demo obbligatorie + BDD + UAT pianificata |

---

*Precedente: [08 — Scope Management](./08-scope-management.md) | Prossimo: [10 — Domain-Driven Design](./10-ddd-protection.md)*

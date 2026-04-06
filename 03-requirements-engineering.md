# 03 — Requirements Engineering

> *"Un requisito ambiguo è un bug in attesa di essere scritto."*

Il Requirements Engineering (RE) è la disciplina che si occupa di elicitare, analizzare, specificare, validare e gestire i requisiti software. È la prima e più critica linea di difesa SDSD.

---

## Il Problema Fondamentale

Gli stakeholder raramente sanno cosa vogliono. Sanno cosa fanno oggi, sanno che hanno un problema, e hanno una vaga idea di come una soluzione potrebbe apparire. Ma:

- Non conoscono il vocabolario tecnico per descriverla precisamente
- Non possono prevedere i casi limite
- Cambiano idea quando vedono il prodotto reale
- Descrivono soluzioni invece di problemi ("voglio un pulsante rosso" invece di "ho bisogno di annullare l'operazione facilmente")
- Omettono requisiti impliciti che loro considerano ovvi ma che il developer non può indovinare

Questo è normale. Non è stupidità: è la struttura cognitiva del problema.

---

## Livelli di Requisiti

### La Gerarchia dei Requisiti

```
BISOGNO AZIENDALE
       │
       ▼
OBIETTIVO DI BUSINESS (Goal)
       │
       ▼
REQUISITO UTENTE (User Requirement)
       │
       ▼
REQUISITO DI SISTEMA (System Requirement)
       │
       ▼
REQUISITO SOFTWARE (Software Requirement)
       │
       ▼
SPECIFICA DI DESIGN (Design Spec)
```

**Ogni salto verso il basso introduce opportunità di malinteso.** SDSD mira a rendere ogni livello esplicito e tracciabile al livello superiore.

### Tipi di Requisiti

**Requisiti Funzionali (RF):** cosa deve fare il sistema.
> Es.: "Il sistema deve permettere all'utente di reimpostare la propria password tramite email."

**Requisiti Non Funzionali (RNF):** come deve farlo.
> Es.: "Il sistema deve rispondere alle richieste entro 200ms al 95° percentile."

**Requisiti di Vincolo:** in quale contesto opera.
> Es.: "Il sistema deve essere conforme al GDPR."

> ⚠️ **Trappola comune:** gli stakeholder descrivono quasi esclusivamente requisiti funzionali e dimenticano i non funzionali. I RNF spesso guidano le decisioni architetturali più importanti e sono i più costosi da correggere in ritardo.

---

## Tecniche di Elicitazione dei Requisiti

### 1. Interviste Strutturate

Non fare domande aperte del tipo "Di cosa hai bisogno?". Usa domande strutturate:

- **Domande di contesto:** "Descrivimi come fai questa operazione oggi."
- **Domande di problema:** "Qual è la parte più frustrante del processo attuale?"
- **Domande di obiettivo:** "Se questo sistema funzionasse perfettamente, cosa saresti in grado di fare che oggi non puoi?"
- **Domande di priorità:** "Se potessimo fare solo una cosa, quale sarebbe la più importante?"
- **Domande di criticalità:** "Cosa succederebbe se il sistema facesse X invece di Y?"

### 2. Observation (Job Shadowing)

Osservare direttamente il domain expert mentre fa il suo lavoro rivela:
- Requisiti impliciti ("ovvii" per chi conosce il dominio)
- Workaround su processi inefficienti
- Dati e oggetti non menzionati nelle interviste
- Frequenza e volume delle operazioni

### 3. Workshop Facilitati

Riunioni strutturate con più stakeholder per:
- Allineare visioni divergenti
- Identificare conflitti tra requisiti di reparti diversi
- Produrre un documento condiviso alla fine

Tecniche di workshop utili:
- **Event Storming** (Dan Berardi): mappatura visuale dei processi di business
- **User Story Mapping** (Jeff Patton): organizzazione delle storie per flusso utente
- **Impact Mapping** (Gojko Adzic): collegamento obiettivi → attori → impatti → deliverable

### 4. Prototyping

I prototipi (wireframe, mockup, clickthrough) sono il modo più efficace per far capire agli stakeholder cosa stanno richiedendo. L'adagio è:

> *"Non so cosa voglio, ma lo riconoscerò quando lo vedo."*

Trasforma questa debolezza in un processo strutturato: prototipo → feedback → requisiti aggiornati → prototipo aggiornato.

**Tipi di prototipo:**
- **Paper prototype:** abbozzato a mano, massima velocità, zero investimento
- **Wireframe:** struttura senza estetica (Figma, Balsamiq)
- **Mockup:** struttura con estetica ma senza interazione
- **Clickthrough prototype:** simulazione dell'interazione senza codice

### 5. Analisi dei Documenti Esistenti

Prima di intervistare, analizza:
- Documenti di processo (manuali operativi, procedure)
- Report e dashboard attuali
- Schermate del sistema legacy
- Email con richieste o lamentele degli utenti

---

## La Specifica dei Requisiti

### INVEST: criteri per User Stories di qualità

Ogni User Story dovrebbe essere:

| Lettera | Criterio | Significato |
|---------|----------|-------------|
| **I** | Independent | Indipendente dalle altre storie |
| **N** | Negotiable | Negoziabile, non è un contratto fisso |
| **V** | Valuable | Porta valore all'utente o al business |
| **E** | Estimable | Stimabile in effort |
| **S** | Small | Abbastanza piccola da completare in uno sprint |
| **T** | Testable | Verificabile con criteri oggettivi |

### La Formula delle User Stories

```
Come [tipo di utente],
voglio [azione/funzionalità],
in modo da [beneficio/obiettivo].

Criteri di Accettazione:
  Dato che [contesto/stato iniziale],
  Quando [evento/azione]
  Allora [risultato atteso]
```

**Esempio ben formato:**
```
Come operatore di magazzino,
voglio ricevere una notifica quando le scorte di un prodotto
scendono sotto la soglia minima,
in modo da poter riordinare prima di esaurire le scorte.

Criteri di Accettazione:
  Dato che le scorte di "Prodotto A" hanno soglia minima = 50
  Quando le scorte scendono a 49
  Allora il sistema invia una notifica email all'operatore
    E la notifica include: nome prodotto, quantità attuale, soglia
    E la notifica è inviata entro 5 minuti dal cambiamento
```

### Criteri di Accettazione: le 3 C

- **Card:** la descrizione della storia
- **Conversation:** la discussione con il business
- **Confirmation:** i criteri di accettazione verificabili

---

## Gestione dei Requisiti Non Funzionali (RNF)

I RNF sono spesso dimenticati dagli stakeholder ma determinanti per l'architettura. Usa questo checklist per elicitarli sistematicamente:

### Checklist RNF — FURPS+

| Categoria | Domande da Porre |
|-----------|-----------------|
| **F**unctionality | Sicurezza, conformità normativa, licenze |
| **U**sability | Facilità d'uso, accessibilità, documentazione |
| **R**eliability | Disponibilità (uptime), MTBF, MTTR |
| **P**erformance | Tempi di risposta, throughput, scalabilità |
| **S**upportability | Manutenibilità, testabilità, installabilità |
| **+** Design | Vincoli architetturali |
| **+** Implementation | Linguaggi, framework, standard |
| **+** Interface | Integrazione con sistemi esterni |
| **+** Physical | Hardware, ambiente di deployment |

---

## Validazione dei Requisiti

Prima di iniziare lo sviluppo, ogni requisito dovrebbe superare questa verifica:

### Checklist di Validazione

- [ ] **Correttezza:** Descrive accuratamente ciò che il business vuole?
- [ ] **Completezza:** Copre tutti i casi (happy path, edge case, error case)?
- [ ] **Consistenza:** Non contraddice altri requisiti?
- [ ] **Non ambiguità:** Può essere interpretato in un solo modo?
- [ ] **Verificabilità:** Può essere testato in modo oggettivo?
- [ ] **Tracciabilità:** È collegato a un obiettivo di business?
- [ ] **Fattibilità:** È tecnicamente realizzabile nei vincoli dati?
- [ ] **Priorità:** Ha una priorità assegnata (MoSCoW)?
- [ ] **Firma:** È stato approvato dal responsabile di business?

### MoSCoW Prioritization

| Label | Significato |
|-------|-------------|
| **M**ust Have | Requisito irrinunciabile (MVP) |
| **S**hould Have | Importante, ma non bloccante |
| **C**ould Have | Desiderabile, entra se c'è tempo |
| **W**on't Have (this time) | Fuori scope per ora, pianificato in futuro |

> 💡 **Difesa SDSD:** la prioritizzazione MoSCoW, fatta insieme agli stakeholder e documentata, è la tua protezione quando ti viene chiesto "perché non avete fatto anche X?" — "Perché X era classificato Won't Have, come concordato in data [X] con [stakeholder]."

---

## Requirements Traceability Matrix (RTM)

La RTM è un documento che collega ogni requisito alla sua fonte, ai test che lo verificano e al codice che lo implementa. È la **prova documentale** che ogni requisito è stato gestito correttamente.

### Struttura Base di una RTM

| ID Req | Descrizione | Fonte | Priorità | US/Task | Test Case | Status | Firmato da |
|--------|-------------|-------|----------|---------|-----------|--------|------------|
| REQ-001 | Autenticazione utente via email | Intervista 2024-03-01 | Must | US-012 | TC-045, TC-046 | ✅ Done | M. Rossi |
| REQ-002 | Reset password | Intervista 2024-03-01 | Must | US-013 | TC-047 | 🔄 In Dev | M. Rossi |
| REQ-003 | Login social (Google) | Workshop 2024-03-15 | Should | US-020 | TC-060 | ⏳ Todo | F. Bianchi |

### Utilizzo Difensivo della RTM

La RTM serve come risposta a domande del tipo:
- *"Perché il sistema non fa X?"* → "X non era nei requisiti approvati."
- *"Avete fatto Y?"* → "Sì, come da REQ-045 firmato da Lei il [data]."
- *"Ma io pensavo che Z fosse incluso"* → "Z è stato classificato Won't Have nel workshop del [data], come da verbale."

---

## Gestione dei Requisiti Volatili

La volatilità dei requisiti è inevitabile. SDSD non cerca di eliminarla, cerca di **renderla costosa e visibile** così che avvenga solo quando davvero necessario.

### Il Processo di Change Request (CR)

```
RICHIESTA DI CAMBIAMENTO
        │
        ▼
  Compilazione CR formale
  (descrizione, richiedente, data)
        │
        ▼
  Impact Assessment
  (effort, rischi, dipendenze)
        │
        ▼
  Revisione da Product Owner + Tech Lead
        │
        ▼
     Decisione
     ┌────┴────┐
   Approve   Reject / Defer
     │             │
     ▼             ▼
  Aggiorna     Documenta
  backlog      motivazione
  e RTM
```

### Template Change Request

```markdown
# Change Request — CR-[NUM]

**Data:** [data]
**Richiedente:** [nome e ruolo]
**Priorità stimata:** Must / Should / Could / Won't

## Descrizione del Cambiamento
[Cosa deve cambiare e perché]

## Requisiti Impattati
- REQ-XXX: [descrizione]
- REQ-YYY: [descrizione]

## Stima dell'Impatto
- Effort stimato: [giorni/punti]
- Componenti software impattate: [lista]
- Test da aggiornare: [lista]
- Rischi: [lista]
- Funzionalità impattate: [lista]

## Decisione
- [ ] Approvato
- [ ] Rifiutato (motivazione: ___)
- [ ] Deferito a sprint [N]

**Firma approvante:** ___________________  **Data:** ___________
```

---

## Anti-Pattern dei Requisiti

### Anti-Pattern 1: Il Requisito Vago
*"Il sistema deve essere veloce."*
→ **Fix:** "Il sistema deve rispondere alle richieste API entro 200ms al P95 con 500 utenti concorrenti."

### Anti-Pattern 2: Il Requisito Soluzione
*"Voglio un pulsante rosso in alto a destra."*
→ **Fix:** "Gli utenti devono poter annullare un'operazione in modo visibile e immediato." (La soluzione tecnica è una decisione di design, non di business.)

### Anti-Pattern 3: Il Requisito Implicito
*"Ovviamente il sistema deve essere sicuro."*
→ **Fix:** "Il sistema deve implementare autenticazione multi-fattore, crittografia AES-256 dei dati a riposo, e conformità OWASP Top 10."

### Anti-Pattern 4: Il Requisito Contraddittorio
*REQ-001: "Il sistema deve salvare ogni cambiamento automaticamente."*
*REQ-045: "Il sistema deve chiedere conferma prima di ogni salvataggio."*
→ **Fix:** validazione della consistenza prima del sign-off.

### Anti-Pattern 5: Il Requisito Impossibile
*"Il sistema deve avere uptime del 100%."*
→ **Fix:** "Il sistema deve avere uptime del 99.9% (SLA tier 3), con RTO < 4 ore e RPO < 1 ora."

---

*Precedente: [02 — Dati e Statistiche](./02-dati-statistiche.md) | Prossimo: [04 — Communication Patterns](./04-communication-patterns.md)*

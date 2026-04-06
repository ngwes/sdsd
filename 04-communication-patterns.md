# 04 — Communication Patterns

> *"Il codice è semplice. Le persone sono complesse. Impara entrambi."*

La comunicazione è il vettore principale attraverso cui i problemi entrano in un progetto software. Un developer che sa comunicare bene è un developer che si trova raramente in situazioni di "ma io non lo sapevo" o "pensavo si capisse da sé".

---

## Il Principio Fondamentale: Asimmetria Cognitiva

Gli stakeholder e i developer vivono in mondi cognitivi diversi:

| Dominio | Stakeholder | Developer |
|---------|-------------|-----------|
| **Linguaggio** | Business, processo, KPI | Tecnico, astratto, preciso |
| **Orizzonte temporale** | Trimestrale/annuale | Sprint/ticket |
| **Metrica di successo** | Revenue, NPS, efficienza | Performance, qualità, copertura test |
| **Modello mentale del software** | Scatola nera magica | Sistema complesso con vincoli |
| **Attitudine al rischio** | Spesso high-risk/high-reward | Preferibilmente low-risk/incremental |

**Non è stupidità: è specializzazione.** Comprendere questa asimmetria è il primo passo per comunicare efficacemente.

---

## Pattern di Comunicazione SDSD

### Pattern 1: La Conferma Scritta (CYA — Cover Your Ass)

**Problema:** accordi verbali che scompaiono.

**Soluzione:** dopo ogni meeting o conversazione significativa, invia un'email di riepilogo:

```
Oggetto: Riepilogo decisioni — [nome progetto] — [data meeting]

Ciao [nome],

Come concordato nella call di oggi, riepilogo le decisioni prese:

1. [Decisione 1] → Owner: [nome] → Entro: [data]
2. [Decisione 2] → Owner: [nome] → Entro: [data]
3. [Requisito approvato/modificato] → Impatto: [descrizione]

Prossimi step:
- [Azione 1] → [Chi] → [Quando]
- [Azione 2] → [Chi] → [Quando]

Se non ricevo correzioni entro [24/48 ore], considero questo riepilogo
come conferma delle decisioni prese.

Grazie,
[firma]
```

> 💡 **L'ultimo paragrafo è cruciale.** Il silenzio diventa consenso implicito, documentato.

---

### Pattern 2: Speak Business, Not Tech

Quando comunichi con stakeholder non tecnici, **traduci sempre in termini di impatto sul business**:

| Invece di... | Di'... |
|-------------|--------|
| "Dobbiamo fare refactoring del modulo di autenticazione" | "Dobbiamo ridurre il rischio di violazioni di sicurezza e ridurre i tempi di sviluppo di nuove funzionalità del 30%" |
| "C'è un memory leak nel processo di esportazione" | "Il sistema di esportazione diventa lento e instabile dopo ore di utilizzo. Dobbiamo correggere questo bug o gli utenti perderanno fiducia nel sistema" |
| "Non possiamo fare TDD su questa codebase legacy" | "Aggiungere nuove funzionalità in questo sistema richiede il doppio del tempo e aumenta significativamente il rischio di regressioni. Vi presento un piano di modernizzazione graduale" |
| "L'architettura è un monolite accoppiato" | "Il sistema è strutturato in modo che ogni modifica richieda di testare tutto il sistema, rallentando i rilasci. Con una ristrutturazione, potremmo rilasciare indipendentemente ogni area" |

---

### Pattern 3: La Comunicazione Proattiva del Rischio

**Regola d'oro:** comunica i problemi prima che diventino crisi.

Il meccanismo del "semaforo" (RAID log):

| Sigla | Significato | Azione |
|-------|-------------|--------|
| **R**isks | Cosa potrebbe andare storto | Mitigazione preventiva |
| **A**ssumptions | Cosa stiamo assumendo | Validazione |
| **I**ssues | Problemi già manifesti | Risoluzione |
| **D**ependencies | Da cosa dipende il progetto | Tracking |

Il RAID log va aggiornato ad ogni sprint e condiviso con gli stakeholder. **Chi è stato avvisato di un rischio non può attribuire la responsabilità del problema al team.**

---

### Pattern 4: Il Demo Strutturato

I demo non sono spettacoli. Sono **cerimonie di validazione** con una struttura precisa:

```
STRUTTURA DEL DEMO SDSD

1. CONTESTO (2 min)
   "Nello sprint X, ci eravamo impegnati a sviluppare Y e Z."

2. DIMOSTRAZIONE (10-15 min)
   Mostra le funzionalità in un flusso utente reale.
   Non mostrare il codice. Mostra il comportamento.

3. VERIFICA DEGLI ACCEPTANCE CRITERIA (5 min)
   "Come concordato, i criteri erano [A], [B], [C].
    Verifichiamo insieme che siano soddisfatti."

4. RACCOLTA FEEDBACK (10 min)
   Struttura il feedback:
   - "Cosa funziona come atteso?"
   - "Cosa vorreste modificare?"
   - "C'è qualcosa di mancante?" (→ Change Request!)

5. AZIONI (5 min)
   Documento scritto del feedback con:
   - Feature approvate → chiuse nel tracker
   - Modifiche richieste → Change Request formale
   - Nuove richieste → Backlog, non sprint corrente
```

> ⚠️ **Anti-pattern:** il demo diventa una sessione di "mi è venuta un'idea". Ogni nuova richiesta durante un demo è una Change Request, non una modifica immediata.

---

### Pattern 5: La Stakeholder Matrix

Prima di comunicare, capisce *con chi* stai comunicando:

| Stakeholder | Interesse | Potere | Strategia |
|-------------|-----------|--------|-----------|
| CEO | ROI, visione strategica | Alto | Aggiorna raramente, su big picture |
| CFO | Budget, costi | Alto | Report di costi/benefici chiari |
| Product Owner | Funzionalità, priorità | Medio | Collaborazione continua |
| Team di Vendita | Feature per i clienti | Medio | Demo, roadmap |
| Utenti finali | Usabilità, efficienza | Basso-medio | Interviste, test di usabilità |
| IT/Ops | Infrastruttura, sicurezza | Medio | Requisiti tecnici condivisi |

La matrice **Interesse/Potere** divide gli stakeholder in 4 quadranti:

```
          ALTO POTERE
               │
  Gestisci     │   Tieni Informato
  Attivamente  │   e Coinvolto
               │
BASSO ─────────┼─────────── ALTO
INTERESSE      │             INTERESSE
               │
  Monitora     │   Tieni
  Minimalmente │   Soddisfatto
               │
          BASSO POTERE
```

---

### Pattern 6: Escalation Strutturata

Quando un problema non si risolve al livello corrente, l'escalation deve essere strutturata, non emotiva:

```
Livello 1: Risoluzione diretta con lo stakeholder
           (documentata via email/ticket)
    ↓ se non risolto in [X giorni]
Livello 2: Risoluzione con il PM / Product Owner
           (meeting formale, decisione documentata)
    ↓ se non risolto in [X giorni]
Livello 3: Risoluzione con il management (Sponsor)
           (presentazione formale dell'impasse, opzioni, raccomandazione)
    ↓ decisione presa al livello più alto necessario
```

> 💡 **Regola SDSD:** ogni step di escalation va documentato. Chi decide, firma la decisione. L'escalation non è sconfitta: è professionalità.

---

### Pattern 7: Il Linguaggio dell'Impatto

Quando devi dire "no" o "non è possibile", usa il **linguaggio dell'impatto** invece del rifiuto diretto:

| ❌ Invece di... | ✅ Di'... |
|----------------|----------|
| "Non si può fare" | "Se facciamo X, possiamo farlo in [tempo/costo]. Altrimenti l'alternativa Y richiede [meno/più]" |
| "È troppo complicato" | "Questa funzionalità richiede una stima di 3 settimane e impatta il modulo Z. Volete procedere spostando [altra feature]?" |
| "Me lo dicono all'ultimo" | "Questa richiesta arriva a 2 giorni dalla release. L'impatto è [descrizione]. Propongo di includere nel prossimo sprint e fare una release ad hoc" |
| "Il business non capisce" | "Credo che ci sia un'incomprensione sul funzionamento di questo componente. Posso preparare una demo per chiarire?" |

---

### Pattern 8: Meeting Efficaci

Ogni meeting senza agenda è tempo sprecato. Ogni meeting senza azioni documentate è un'opportunità mancata di protezione.

**Checklist per ogni meeting:**

**Prima:**
- [ ] Agenda inviata almeno 24h prima
- [ ] Obiettivo chiaro: decisione, brainstorming, o aggiornamento?
- [ ] Materiali preparati

**Durante:**
- [ ] Un facilitatore
- [ ] Un note-taker
- [ ] Azioni identificate con owner e scadenza

**Dopo:**
- [ ] Verbale inviato entro 24h
- [ ] Azioni trackate nel sistema di project management
- [ ] "Se non ricevo correzioni entro [data], il verbale è confermato"

---

### Pattern 9: Il "Pre-Mortem"

Invece di aspettare il post-mortem (analisi dei fallimenti a posteriori), fai un **pre-mortem** all'inizio del progetto:

> "Immaginiamo che sia passato un anno e che il progetto sia fallito. Cosa è andato storto?"

Questo esercizio, proposto da Gary Klein e reso popolare da Daniel Kahneman, ha due effetti:
1. Identifica rischi che sarebbero stati ignorati per ottimismo
2. Crea un documento di rischi condiviso e concordato (nessuno può dire "non lo sapevo")

---

### Pattern 10: La Comunicazione dei Trade-Off

Ogni decisione tecnica implica dei trade-off. Renderli espliciti protegge il developer:

```
FRAMEWORK DI COMUNICAZIONE DEI TRADE-OFF

Opzione A: [descrizione]
  PRO: [lista]
  CONTRO: [lista]
  Costo: [stima]
  Rischio: [livello]

Opzione B: [descrizione]
  PRO: [lista]
  CONTRO: [lista]
  Costo: [stima]
  Rischio: [livello]

Raccomandazione del team tecnico: Opzione [X]
Motivazione: [spiegazione in linguaggio business]

Decisione finale: ________________________________
Firmato da: _________________ Data: ______________
```

Quando il business sceglie l'opzione che il team tecnico sconsigliava, è documentato. Se va male, la responsabilità è chiaramente attribuita.

---

## Comunicazione in Situazioni di Crisi

### Quando il Sistema Va in Down in Produzione

```
TEMPLATE COMUNICAZIONE INCIDENTE (Minuto 0-15)

Oggetto: [SEV-1] Incidente in produzione — [Sistema] — in gestione

Sistema impattato: [nome]
Impatto utenti: [descrizione]
Severità: SEV-1 / SEV-2 / SEV-3
Orario rilevamento: [ora]
Team in gestione: [nomi]

Stato attuale: Indagine in corso / Workaround attivo / Fix in deploy

Prossimo aggiornamento: tra 30 minuti

— Team Engineering
```

```
TEMPLATE AGGIORNAMENTO (ogni 30 min)

Aggiornamento #[N] — [ora]

Causa identificata: [sì/no — descrizione]
Workaround disponibile: [sì/no — descrizione]
ETA risoluzione: [stima]
Azioni in corso: [lista]

Prossimo aggiornamento: [ora]
```

```
TEMPLATE POST-INCIDENT REPORT (entro 48h)

Oggetto: Post-Incident Report — [Sistema] — [data]

Executive Summary: [2-3 righe]
Timeline: [cronologia dettagliata]
Root Cause: [analisi tecnica]
Impatto: [durata, utenti, dati]
Mitigazione applicata: [descrizione]
Correzione permanente: [piano con date]
Azioni preventive: [lista con owner e date]
Lezioni apprese: [lista]
```

---

*Precedente: [03 — Requirements Engineering](./03-requirements-engineering.md) | Prossimo: [05 — Defensive Architecture](./05-defensive-architecture.md)*

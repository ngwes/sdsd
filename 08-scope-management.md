# 08 — Scope Management

> *"Lo scope creep non è un'aggiunta. È un furto silenzioso di tempo, qualità e morale."*

Lo scope creep è l'espansione graduale e non controllata del perimetro di un progetto. È una delle cause più frequenti di ritardi, sforamenti di budget e fallimenti. La sua caratteristica principale è che avviene lentamente, spesso con richieste che sembrano "piccole" e "ragionevoli", finché il progetto non è irriconoscibile rispetto alla pianificazione originale.

---

## Anatomia dello Scope Creep

### Le 5 Forme dello Scope Creep

**1. Gold Plating (dal team)**
Il team aggiunge funzionalità non richieste perché "sembra utile" o "è una buona idea". Anche quando viene dal team, è scope creep.

**2. Feature Creep (dagli stakeholder)**
Il business aggiunge funzionalità progressive, ognuna "piccola", che nel complesso stravolgono lo scope.

**3. Requirement Drift (ambiguità risolta in corsa)**
I requisiti erano ambigui, ogni stakeholder li ha interpretati diversamente, e il team ha risolto le ambiguità in corso d'opera senza documentazione.

**4. Integration Creep**
"Basta collegarlo al sistema X" — un'integrazione che sembrava triviale si rivela complessa e assorbe risorse non pianificate.

**5. Quality Creep**
Standard di qualità non definiti inizialmente che vengono imposti a progetto avanzato ("non sapevo che si aspettassero anche questo livello di testing").

---

## Il Processo Formale di Change Request

La Change Request (CR) è il meccanismo che rende lo scope creep *visibile e costoso*. Se una CR viene approvata, il cambiamento entra con le sue conseguenze chiare. Se viene rifiutata, il team non deve implementarla.

### Workflow CR

```
                    RICHIESTA
                       │
                       ▼
            ┌──────────────────┐
            │  Compilazione CR │
            │  (richiedente)   │
            └──────────────────┘
                       │
                       ▼
            ┌──────────────────┐
            │ Impact Analysis  │
            │  (tech lead)     │
            │  - effort        │
            │  - costo         │
            │  - rischi        │
            │  - dipendenze    │
            └──────────────────┘
                       │
                       ▼
            ┌──────────────────┐
            │ Review & Decide  │
            │  (PO + TL)       │
            └──────────────────┘
               ┌───────┴───────┐
               ▼               ▼
          APPROVATA         RIFIUTATA
               │               │
               ▼               ▼
        Aggiorna         Documenta
        backlog +        motivazione
        roadmap +        e notifica
        budget          richiedente
```

### Template Change Request Completo

```markdown
# Change Request — CR-[NNN]

**ID:** CR-[NNN]
**Data:** [YYYY-MM-DD]
**Richiedente:** [nome] — [ruolo] — [email]
**Priorità Richiesta:** Critica / Alta / Media / Bassa
**Urgenza:** Deve entrare nello sprint corrente? [Sì/No — motivazione]

---

## 1. Descrizione del Cambiamento

### Cosa si vuole aggiungere/modificare/rimuovere:
[Descrizione chiara e completa]

### Perché è necessario:
[Motivazione di business]

### Quale valore aggiunge:
[Beneficio atteso, se possibile quantificato]

---

## 2. Requisiti Impattati

| ID Requisito | Descrizione | Tipo di Impatto |
|--------------|-------------|-----------------|
| REQ-XXX | [desc] | Modifica / Sostituzione / Integrazione |
| REQ-YYY | [desc] | Dipendenza |

---

## 3. Impact Analysis (compilata dal tech lead)

**Effort stimato:** [ore / story points]

**Componenti software impattate:**
- [Componente A]: [tipo di modifica]
- [Componente B]: [tipo di modifica]

**Test da aggiungere/aggiornare:**
- [Test 1]
- [Test 2]

**Database: schema migration necessaria?** [Sì/No — dettagli]

**API: breaking changes?** [Sì/No — dettagli]

**Rischi:**
| Rischio | Probabilità | Impatto | Mitigazione |
|---------|-------------|---------|-------------|
| [Rischio 1] | Alta/Media/Bassa | Alto/Medio/Basso | [come] |

**Funzionalità che potrebbero slittare** (se entra questa CR):
- [Feature A]: da sprint [N] a sprint [N+1]
- [Feature B]: ...

**Stima costo (se applicabile):**
- Effort sviluppo: [N] giorni × [€/giorno] = €[totale]
- Testing extra: [N] giorni × [€/giorno] = €[totale]
- **Totale CR:** €[totale]

---

## 4. Opzioni

**Opzione A (implementazione completa):**
Effort: [N] punti — Include: [tutto ciò che è stato richiesto]

**Opzione B (implementazione minima):**
Effort: [N] punti — Include: [il minimo necessario]
Non include: [cosa viene escluso e perché]

---

## 5. Decisione

- [ ] **APPROVATA** — Opzione: [A/B] — Entra in: Sprint [N] / Roadmap [Q]
- [ ] **RIFIUTATA** — Motivazione: [descrizione]
- [ ] **DEFERITA** — A Sprint [N] — Motivazione: [descrizione]
- [ ] **RINVIATA** — Rivederla dopo: [data/evento]

**Firmato da:** _______________________ **Ruolo:** _____________ **Data:** _______
**Firmato da:** _______________________ **Ruolo:** _____________ **Data:** _______
```

---

## La Baseline dello Scope

All'inizio del progetto (o di ogni release), lo scope deve essere definito e *congelato* in un documento di baseline:

```markdown
# Scope Baseline — [Progetto] Release [N]

**Data approvazione:** [data]
**Approvato da:** [Product Owner], [Sponsor], [Tech Lead]

## In Scope (funzionalità incluse in questa release)

### MUST HAVE (MVP)
- [Feature 1]: [descrizione breve] — Story points: [N]
- [Feature 2]: [descrizione breve] — Story points: [N]
- [Feature 3]: [descrizione breve] — Story points: [N]

**Totale MUST:** [N] story points ≈ [N] settimane

### SHOULD HAVE (se il tempo lo permette)
- [Feature 4]: [descrizione breve] — Story points: [N]

## Esplicitamente Out of Scope

Le seguenti funzionalità sono **esplicitamente escluse** da questa release:
- [Feature X]: prevista per Release [N+1]
- [Feature Y]: nessuna pianificazione attuale
- [Integrazione Z]: out of scope per vincoli tecnici/budget

## Assunzioni

Questa baseline assume:
1. [Assunzione 1]
2. [Assunzione 2]
3. [Assunzione 3]

## Firma di Accettazione

Con la firma di questo documento, le parti concordano che qualsiasi
aggiunta alle funzionalità "In Scope" richiede una Change Request formale.

| Nome | Ruolo | Firma | Data |
|------|-------|-------|------|
| [nome] | Product Owner | ________ | [data] |
| [nome] | Business Sponsor | ________ | [data] |
| [nome] | Tech Lead | ________ | [data] |
```

---

## Il Concetto di "Budget di Cambiamento"

Una tecnica avanzata per gestire lo scope creep è il **Change Budget**: all'inizio del progetto o del trimestre, si riserva esplicitamente una percentuale del budget/effort per i cambiamenti imprevedibili.

```
Budget totale sprint: 100 punti

80 punti → Feature pianificate (scope baseline)
20 punti → Change Budget (per CR approvate durante lo sprint)

Se il Change Budget è esaurito, le nuove CR vanno al prossimo sprint.
Se il Change Budget non viene usato, può andare a feature aggiuntive.
```

Questo meccanismo ha un duplice effetto:
1. Rende esplicito che i cambiamenti hanno un costo
2. Crea un meccanismo di auto-regolazione: quando il budget è esaurito, gli stakeholder iniziano a prioritizzare meglio

---

## Scope Creep: I Segnali d'Allarme

Monitora questi indicatori per identificare lo scope creep precocemente:

| Segnale | Cosa Significa |
|---------|----------------|
| "Basta aggiungere..." detto spesso | Minimizzazione sistematica dei costi |
| Storie che crescono durante lo sprint | Requirements non stabili al momento del commit |
| Velocity in calo progressivo | Debito tecnico o scope non tracciato |
| Riunioni sempre più frequenti per "allineamento" | Requisiti non chiari o in evoluzione |
| "Era sottinteso" detto dal business | Requisiti impliciti non elicitati |
| Continui spostamenti della deadline | Scope non controllato |
| Feature "piccole" che si moltiplicano | Gold plating o feature creep sistematico |

---

## Tecniche di Contenimento

### Timeboxing
Ogni attività ha una durata fissa. Se non si finisce entro il timebox, si rivaluta la priorità — non si espande il tempo.

### Scope Freezing
A un certo punto prima della release, il backlog viene "congelato": nessuna nuova storia entra, solo bug critici.

### YAGNI — You Ain't Gonna Need It
Principio di XP: non implementare funzionalità finché non sono necessarie. Ogni funzionalità ha un costo di sviluppo, manutenzione, e complessità. Se non serve adesso, non si fa.

### Minimum Viable Product (MVP)
Identificare il minimo indispensabile che porta valore e rilasciarlo. Poi iterare. Questo obbliga gli stakeholder a prioritizzare esplicitamente.

---

## Risposta alle Richieste Urgenti Non Pianificate

Script di risposta professionale per le situazioni più comuni:

**"Mi serve questa cosa entro venerdì"**
> "Posso analizzare l'impatto adesso e darti una stima entro [ora]. Se approvi la CR e sei disponibile a spostare [feature X] al prossimo sprint, possiamo procedere."

**"Non è una cosa grande, ci vuole poco"**
> "Capisco che sembri piccola. Lasciami fare la stima tecnica — di solito ci sono aspetti non ovvi. Ti rispondo entro [ora]."

**"Ma è urgentissimo, non c'è tempo per le procedure"**
> "Se è un'emergenza di produzione che impatta i ricavi, possiamo seguire il processo hot-fix (15 minuti invece di 2 giorni). Per tutto il resto, saltare il processo mette a rischio la stabilità del sistema."

**"Non capisco perché ci vuole così tanto"**
> "Posso mostrarti la breakdown della stima. [Componente A] richiede X per [motivo tecnico], [componente B] richiede Y per [motivo tecnico]. Preferisci fare solo la parte A per ridurre l'effort?"

---

*Precedente: [07 — Agile come Scudo](./07-agile-protection.md) | Prossimo: [09 — Anti-Pattern degli Stakeholder](./09-stakeholder-antipatterns.md)*

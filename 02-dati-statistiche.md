# 02 — Dati e Statistiche sui Fallimenti Software

> *"Non stai affrontando un problema eccezionale. Stai affrontando la norma statistica."*

Uno degli argomenti più potenti a favore delle pratiche SDSD è l'evidenza empirica: i progetti software falliscono sistematicamente, e le cause principali non sono tecniche. Conoscere questi dati ti permetterà di difendere le pratiche preventive anche di fronte a stakeholder scettici.

---

## Il Chaos Report — Standish Group

Il **Chaos Report** è la più longeva e citata ricerca sui fallimenti dei progetti IT, pubblicata dal Standish Group dal 1994. Analizza decine di migliaia di progetti ogni anno.

### Risultati Principali (2020)

| Categoria | Percentuale |
|-----------|-------------|
| **Successful** (nei tempi, nel budget, con le funzionalità previste) | 31% |
| **Challenged** (ritardi, sforamenti di budget, funzionalità ridotte) | 52% |
| **Failed** (cancellati o mai utilizzati) | 17% |

**Conclusione:** il 69% dei progetti software ha problemi significativi. Questo non è un'anomalia: è la condizione di base.

### Fattori di Successo (in ordine di importanza)

Secondo il Chaos Report, i tre fattori che più correlano con il successo sono:

1. **User involvement** (coinvolgimento degli utenti)
2. **Executive management support** (supporto del management)
3. **Clear statement of requirements** (requisiti chiari)

> 💡 **Implicazione SDSD:** due dei tre fattori di successo riguardano la gestione dei requisiti e il coinvolgimento umano. Non la tecnologia. Non il framework. Le persone e i requisiti.

### Cause Principali di Fallimento

| Causa | % Progetti Impattati |
|-------|---------------------|
| Requisiti poveri o incompleti | 39% |
| Mancanza di coinvolgimento degli utenti | 33% |
| Mancanza di risorse | 29% |
| Aspettative non realistiche | 29% |
| Mancanza di supporto esecutivo | 29% |
| Cambio di requisiti e specifiche | 24% |
| Mancanza di pianificazione | 23% |
| Progetto non più necessario | 9% |

> 💡 **Implicazione SDSD:** le prime due cause (requisiti e coinvolgimento) rappresentano da sole quasi il 75% dei fallimenti. Il problema dei "requisiti stupid" non è un'eccezione: è la principale causa di fallimento dell'industria.

---

## Dati sull'Impatto Economico

### Costo dei Difetti per Fase

Un principio consolidato dell'ingegneria del software (derivato dagli studi di Barry Boehm negli anni '70 e confermato da ricerche successive) è che il **costo di correzione di un difetto cresce esponenzialmente con il ritardo nella sua rilevazione**:

```
Fase di rilevazione        Costo relativo
─────────────────────────────────────────
Requirements                    1x
Design                         5x
Implementation                10x
Testing                       20x
Production                   100x
```

> 💡 **Implicazione SDSD:** un requisito sbagliato identificato durante il requirements engineering costa 100 volte meno dello stesso requisito sbagliato identificato in produzione. Investire in pratiche rigorose di elicitazione dei requisiti non è overhead: è risparmio economico.

### Costo della Volatilità dei Requisiti

Uno studio di IBM Systems Sciences Institute ha quantificato che:
- Il 45% delle funzionalità sviluppate non vengono mai usate
- Il 19% viene usato raramente
- Solo il 36% viene effettivamente utilizzato

Questo significa che **quasi 2/3 dello sviluppo software è spreco**, originato direttamente da requisiti mal definiti o non validati con gli utenti reali.

---

## Studi Accademici Rilevanti

### "No Silver Bullet" — Fred Brooks (1986)

Fred Brooks, nel suo seminale articolo pubblicato su *IEEE Computer*, identifica le cause fondamentali della difficoltà del software engineering:

**Complessità Essenziale** (non eliminabile):
- I sistemi software sono intrinsecamente complessi
- La complessità cresce non linearmente con la dimensione
- Non esiste una soluzione tecnologica che la elimini

**Complessità Accidentale** (eliminabile):
- Derivata da strumenti, linguaggi, processi inadeguati
- Riducibile con buone pratiche

> 💡 **Implicazione SDSD:** la complessità dei requisiti stakeholder è in parte *essenziale* (il dominio è davvero complesso) e in parte *accidentale* (derivata da processi comunicativi inadeguati). SDSD riduce la complessità accidentale.

### "The Mythical Man-Month" — Fred Brooks (1975)

Introduce **Brooks's Law**: *"Aggiungere personale a un progetto in ritardo lo fa ritardare ulteriormente."*

Il meccanismo: ogni nuovo membro del team deve essere formato, e la formazione usa risorse del team esistente. Più persone significano più canali di comunicazione (n*(n-1)/2), più overhead di coordinamento.

> 💡 **Implicazione SDSD:** la soluzione ai problemi di progetto non è aggiungere persone. È rimuovere ambiguità e migliorare i processi — esattamente ciò che SDSD propone.

### Conway's Law — Melvin Conway (1968)

> *"Any organization that designs a system will produce a design whose structure is a copy of the organization's communication structure."*

Le architetture software rispecchiano le strutture organizzative che le producono. Se l'organizzazione è frammentata, incoerente, con silos di potere, anche il software lo sarà.

> 💡 **Implicazione SDSD:** capire la struttura organizzativa dello stakeholder ti aiuta a prevedere dove nasceranno i problemi di requisiti e dove saranno le zone di conflitto.

### Studi sulla Root Cause Analysis

Una meta-analisi condotta da NIST nel 2002 stima che i bug software costano all'economia americana $59,5 miliardi l'anno, e che **più della metà potrebbe essere eliminata con migliori pratiche di testing e requirements**.

---

## Il Paradosso della Visibilità

Un fenomeno documentato in letteratura è il **paradosso della visibilità del software**: il software, essendo invisibile, è incomprensibile per i non tecnici. Questa invisibilità porta a:

- Sottostima dell'effort richiesto
- Incomprensione della complessità
- Aspettative irrazionali sui tempi di sviluppo
- Incapacità di valutare la qualità del lavoro svolto

Brooks stesso identifica questa invisibilità come una delle quattro proprietà essenziali del software (assieme a complessità, conformità e mutabilità) che la rendono fondamentalmente diversa da qualsiasi altra disciplina ingegneristica.

> 💡 **Implicazione SDSD:** il problema non è la malafede degli stakeholder. È che il software è strutturalmente invisibile e quindi incomprensibile per chi non lo costruisce. Le pratiche SDSD (demo, visualizzazioni, prototipi, test) sono strumenti per rendere il software *visibile*.

---

## Dati sull'Impatto dell'Agile

La proliferazione delle metodologie Agile ha migliorato la situazione, ma non l'ha risolta:

| Metrica | Waterfall | Agile |
|---------|-----------|-------|
| % progetti di successo | 14% | 42% |
| % progetti falliti | 29% | 9% |
| % progetti challenged | 57% | 49% |

Fonte: Standish Group Chaos Report 2020

**Agile migliora significativamente i risultati, ma non è la panacea.** La ragione per cui Agile funziona meglio è esattamente il motivo per cui SDSD funziona: **iterazioni brevi, feedback frequente, adattamento continuo** — tutti meccanismi che riducono il danno causato da requisiti incomprensibili o mutevoli.

---

## Il Costo dell'Incomprensione

Uno studio del PMI (Project Management Institute) del 2017 rivela che **ogni miliardo di dollari investito in progetti vede $97 milioni sprecati a causa di scarse performance**, e che la causa principale è la **mancanza di chiari requisiti di progetto**.

Lo stesso studio indica che le organizzazioni con alta maturità nel project management completano il 92% dei progetti con successo, contro il 33% delle organizzazioni a bassa maturità.

> 💡 **Implicazione SDSD:** la maturità nei processi — esattamente ciò che SDSD promuove — è il fattore più predittivo del successo di un progetto, più della tecnologia usata, del team, o del budget.

---

## Riepilogo Visivo

```
CAUSE DI FALLIMENTO SOFTWARE
(fonte: Standish Group Chaos Report aggregato)

Requisiti poveri/incompleti  ████████████████████████████ 39%
Mancanza user involvement    ██████████████████████ 33%
Mancanza risorse             ████████████████████ 29%
Aspettative irrazionali      ████████████████████ 29%
Mancanza supporto esecutivo  ████████████████████ 29%
Cambio requisiti in corsa    ████████████████ 24%
Mancanza pianificazione      ███████████████ 23%
Progetto non più necessario  ██████ 9%

I problemi di requisiti e comunicazione → 87% dei casi
I problemi tecnici puri → < 15% dei casi
```

---

## Cosa Fare con Questi Dati

Questi dati sono uno **strumento di persuasione e legittimazione**. Quando uno stakeholder ti chiede perché stai "perdendo tempo" a documentare i requisiti o a fare una Change Request formale, la risposta è:

> *"Perché l'industria ci dice che il 39% dei progetti fallisce proprio per requisiti poveri, e non voglio che questo progetto sia parte di quella statistica."*

---

*Precedente: [01 — Manifesto](./01-manifesto.md) | Prossimo: [03 — Requirements Engineering](./03-requirements-engineering.md)*

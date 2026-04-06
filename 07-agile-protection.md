# 07 — Agile come Scudo

> *"L'Agile non è assenza di processo. È processo adattivo — e il processo protegge."*

L'Agile è spesso frainteso dagli stakeholder come "possiamo cambiare tutto in qualsiasi momento". In realtà, usato correttamente, l'Agile è uno degli strumenti più potenti di SDSD: fornisce cerimonie formali, artefatti e criteri che creano confini chiari e proteggono il team da interferenze non strutturate.

---

## I Tre Artefatti di Protezione Agile

### 1. Definition of Done (DoD)

La DoD è l'accordo formale su cosa significa "completato". Non è la lista degli acceptance criteria di una singola storia: è il set di condizioni *sempre* applicabili a qualsiasi lavoro.

**Funzione difensiva:** quando il business dice "ma non è finita, manca X", puoi rispondere con il DoD concordato. Se X non era nel DoD, non era parte dell'accordo.

#### Template DoD — Livelli

```markdown
# Definition of Done — [Progetto]
*Approvata da: [Product Owner] il [data]*
*Versione: [N]*

## Livello Story
Una User Story è DONE quando:
- [ ] Il codice implementa tutti gli acceptance criteria
- [ ] Il codice è stato revisionato (code review approvata)
- [ ] Unit test scritti e passanti (copertura ≥ 80%)
- [ ] Integration test aggiornati se necessario
- [ ] Nessun linting error / nessun warning bloccante
- [ ] Documentazione tecnica aggiornata (se API modificata)
- [ ] La storia è stata dimostrata al Product Owner
- [ ] Il Product Owner ha accettato la storia

## Livello Sprint
Lo Sprint è DONE quando:
- [ ] Tutte le storie impegnate nello sprint sono DONE
- [ ] La pipeline CI/CD è verde
- [ ] Il branch è mergiato in develop/main
- [ ] Il sistema è deployabile in staging
- [ ] Il regression test suite è verde

## Livello Release
Una Release è DONE quando:
- [ ] Tutte le feature pianificate sono DONE
- [ ] Performance test superato (conformità SLA)
- [ ] Security review completata
- [ ] Documentazione utente aggiornata
- [ ] Release notes scritte
- [ ] Deployment procedure testata
- [ ] Go/No-Go firmato da [Product Owner] e [Tech Lead]
```

---

### 2. Definition of Ready (DoR)

La DoR è il contratto sul *pre-requisito* per iniziare a lavorare su una storia. Una storia non ready non entra nello sprint.

**Funzione difensiva:** impedisce che il team si trovi a metà sprint senza informazioni, decisioni, o risorse necessarie. Quando succede un ritardo per una storia non-ready, la responsabilità è documentata: la storia non rispettava il DoR.

#### Template DoR

```markdown
# Definition of Ready — [Progetto]
*Approvata da: [Product Owner] il [data]*

Una User Story è READY per entrare nello sprint quando:
- [ ] È scritta nel formato standard (As/Want/So that)
- [ ] Gli acceptance criteria sono scritti e concordati
- [ ] Ha una stima in story point approvata dal team
- [ ] Non ha dipendenze bloccanti non risolte
- [ ] I mockup/wireframe necessari sono disponibili
- [ ] Le API esterne necessarie sono documentate (o accessibili)
- [ ] I dati di test necessari sono disponibili
- [ ] Il Product Owner è disponibile per chiarimenti durante lo sprint
- [ ] È classificata con priorità MoSCoW
```

---

### 3. Acceptance Criteria

Gli acceptance criteria trasformano il requisito da descrizione vaga a contratto verificabile.

**Funzione difensiva:** se il software rispetta tutti gli acceptance criteria, il software è corretto per definizione. Se il business dice "non funziona", puoi rispondere "verifichiamo insieme gli acceptance criteria concordati".

#### Formato Gherkin (BDD)

Il formato Gherkin (usato con Cucumber, Behave, SpecFlow) è lo standard de-facto per gli acceptance criteria verificabili:

```gherkin
Feature: Login utente

  Background:
    Given il sistema è online
    And il database contiene l'utente "mario.rossi@email.com" con password "SecurePass123"

  Scenario: Login con credenziali corrette
    Given l'utente è sulla pagina di login
    When inserisce email "mario.rossi@email.com"
    And inserisce password "SecurePass123"
    And clicca "Accedi"
    Then viene reindirizzato alla dashboard
    And vede il messaggio "Benvenuto, Mario"
    And il token di sessione è impostato

  Scenario: Login con password sbagliata
    Given l'utente è sulla pagina di login
    When inserisce email "mario.rossi@email.com"
    And inserisce password "WrongPass"
    And clicca "Accedi"
    Then rimane sulla pagina di login
    And vede il messaggio di errore "Email o password non corretti"
    And non viene impostato alcun token di sessione
    And l'evento di sicurezza "failed_login" viene registrato nel log

  Scenario: Blocco dopo 5 tentativi falliti
    Given l'utente ha già effettuato 4 tentativi di login falliti
    When inserisce credenziali errate per la quinta volta
    Then l'account viene bloccato per 30 minuti
    And l'utente riceve un'email di notifica all'indirizzo registrato
```

Questi scenario Gherkin diventano **test eseguibili** — prove automatizzate che il sistema si comporta come concordato.

---

## Le Cerimonie Agile come Meccanismi di Protezione

### Sprint Planning — Il Contratto dello Sprint

Lo sprint planning non è solo "cosa facciamo questa settimana". È la negoziazione di un **contratto formale** tra il team e il Product Owner.

**Protezioni chiave:**
1. **Il team decide quanto entra nello sprint**, non il business. La velocity è un dato tecnico.
2. **Solo storie READY entrano nello sprint.** La DoR è il filtro.
3. **Il commitment è registrato** — cosa ci siamo impegnati a fare in questo sprint.
4. **Le storie accettate in corso di sprint devono compensare** — se entra qualcosa di nuovo, esce qualcosa di equivalente.

**Output documentale:**
```
SPRINT [N] — COMMITMENT
Data: [data]
Durata: [data inizio] → [data fine]
Team: [lista]
Velocity stimata: [N] punti

Storie committate:
- US-042: [titolo] — [N] punti
- US-043: [titolo] — [N] punti
- BUG-017: [titolo] — [N] punti

Totale: [N] punti

Storie escluse (next sprint):
- US-044: non-ready (mancano mockup)
- US-045: priorità ridotta dal PO

Firmato: [Product Owner] _________________ Data: _______
```

---

### Daily Standup — Il Report Quotidiano

Tre domande, risposta breve:
1. Cosa ho fatto ieri?
2. Cosa faccio oggi?
3. Ci sono blocchi/impedimenti?

**Funzione difensiva:** i blocchi vengono comunicati quotidianamente. Non si può dire "il team non ha comunicato il problema" se è documentato nel blocco del daily del [data].

**Pro tip:** i blocchi vanno comunicati appena identificati, non aspettare il daily. Il daily è il meccanismo di back-stop, non il canale primario.

---

### Sprint Review — La Validazione Formale

La Sprint Review è diversa da un semplice demo. È la cerimonia in cui il Product Owner (e gli stakeholder) **formalmente accettano o rifiutano** le storie completate.

**Struttura:**
1. Presentazione di ogni storia completata
2. Verifica degli acceptance criteria (non "sembra che funzioni", ma "acceptance criterion N è soddisfatto")
3. Accettazione formale da parte del PO
4. Feedback strutturato (→ nuove storie se necessario)
5. Aggiornamento della velocity

**Output documentale:**
```
SPRINT REVIEW — Sprint [N]
Data: [data]

Storie Accettate:
✅ US-042 — [titolo] — Accettata da [PO] il [data]
✅ US-043 — [titolo] — Accettata da [PO] il [data]

Storie Non Accettate:
❌ BUG-017 — [titolo] — Motivo: [descrizione]
   Azione: revisione AC e nuovo tentativo Sprint [N+1]

Feedback Ricevuto:
- [Feedback 1] → nuovo backlog item: US-[NNN]
- [Feedback 2] → Change Request formale: CR-[NNN]
- [Feedback 3] → nota per informazione

Velocity Realizzata: [N] punti
Velocity Media (ultimi 3 sprint): [N] punti
```

---

### Sprint Retrospective — L'Auto-Miglioramento Difensivo

La retrospettiva non è solo miglioramento del processo. È anche un'opportunità per documentare i problemi ricorrenti e le loro cause, specialmente se originati da interferenze esterne:

**Framework "5 Whys" per problemi ricorrenti:**
```
Problema: "Abbiamo mancato la velocity per il terzo sprint di fila"

Why 1: Perché abbiamo completato meno storie del previsto?
→ Perché abbiamo avuto molte modifiche in corso di sprint.

Why 2: Perché ci sono state modifiche in corso di sprint?
→ Perché il PO ha cambiato le priorità 3 volte durante lo sprint.

Why 3: Perché il PO ha cambiato le priorità?
→ Perché ha ricevuto richieste urgenti dal business senza filtro.

Why 4: Perché il business bypassa il processo di prioritizzazione?
→ Perché non esiste un processo formale di Change Request durante lo sprint.

Why 5: Perché non esiste un tale processo?
→ Perché non è mai stato definito e concordato esplicitamente.

AZIONE: Definire e far firmare una politica di Change Request durante lo sprint.
OWNER: Product Owner + Lead Dev
ENTRO: Fine settimana
```

---

## Behavior-Driven Development (BDD)

### Il Triangolo BDD

```
         Business / Stakeholder
               /\
              /  \
             /    \
            / Gherkin\
           /  Scenarios\
          /─────────────\
         /               \
        /  Developer      \
       /  (Step Definitions)\
      /─────────────────────\
     /                       \
    /   QA / Tester           \
   /    (Test Execution)       \
  /──────────────────────────── \
```

BDD è il ponte tra il linguaggio del business e il codice. I Gherkin scenario sono scritti insieme, comprensibili da tutti, ed eseguiti automaticamente.

### Il Ciclo BDD

```
1. DISCOVERY (business + developer + QA insieme)
   "Cosa deve fare il sistema?" → Gherkin scenarios

2. FORMULATION (developer + QA)
   Traduzione degli scenari in Gherkin formale

3. AUTOMATION (developer)
   Implementazione degli step definitions
   (codice che esegue gli step Gherkin)

4. VALIDATION (tutti)
   I test girano in CI/CD
   I risultati sono leggibili da tutti
```

### Step Definitions (Python/Behave)

```python
from behave import given, when, then
from myapp import create_user, login_user

@given('l\'utente è sulla pagina di login')
def step_user_on_login_page(context):
    context.browser.get('/login')
    assert context.browser.current_url.endswith('/login')

@when('inserisce email "{email}"')
def step_insert_email(context, email):
    context.browser.find_element_by_id('email').send_keys(email)

@when('inserisce password "{password}"')
def step_insert_password(context, password):
    context.browser.find_element_by_id('password').send_keys(password)

@when('clicca "Accedi"')
def step_click_login(context):
    context.browser.find_element_by_id('login-btn').click()

@then('viene reindirizzato alla dashboard')
def step_redirected_to_dashboard(context):
    assert '/dashboard' in context.browser.current_url, \
        f"Expected /dashboard, got {context.browser.current_url}"

@then('vede il messaggio "{message}"')
def step_sees_message(context, message):
    body = context.browser.find_element_by_tag_name('body').text
    assert message in body, f"Expected '{message}' in page, but got: {body[:200]}"
```

---

## Acceptance Test-Driven Development (ATDD)

ATDD porta il BDD a un livello più formale: gli acceptance test vengono scritti **prima** dello sviluppo, come accordo contrattuale:

```
PROCESSO ATDD

FASE 1 — Three Amigos Meeting
  (Developer + QA + Product Owner)
  Obiettivo: scrivere gli acceptance test insieme
  Output: Gherkin scenarios firmati da PO

FASE 2 — Test automation
  Developer scrive step definitions
  I test sono rossi (fail) — il codice non esiste ancora

FASE 3 — Implementazione
  Developer implementa il codice
  Obiettivo: rendere i test verdi

FASE 4 — Review
  PO verifica i test verdi
  Accettazione formale della storia
```

**Il vantaggio difensivo:** gli acceptance test sono scritti e firmati PRIMA dello sviluppo. Se il PO dice "non è quello che volevo", la risposta è: "I test che avete approvato in fase 1 sono verdi. La funzionalità corrisponde a ciò che era stato concordato."

---

## Gestione delle "Hot Fix" Urgenti

Gli stakeholder spesso cercano di bypassare il processo con richieste "urgenti". SDSD ha un processo anche per questo:

```markdown
# Politica Hot Fix / Interruzione Sprint

## Definizione di "Urgente"
Un'urgenza giustifica l'interruzione dello sprint solo se:
- [ ] Impatta direttamente i ricavi (sistema produzione non funzionante)
- [ ] È un bug di sicurezza con exploit attivo
- [ ] Viola un SLA contrattuale con penali

## Processo Hot Fix

1. Il richiedente compila il form "Hot Fix Request" (< 5 minuti)
2. Il Tech Lead valuta l'urgenza (entro 30 minuti)
3. Se approvato: stima effort e determina cosa esce dallo sprint
4. Il PO firma l'approvazione con la lista di cosa viene spostato
5. Il team lavora sulla hot fix
6. La hot fix viene deployata, testata, e documentata

## Template Hot Fix Request
- Richiedente: ___________
- Sistema impattato: ___________
- Impatto business stimato per ora di inattività: € ___
- Urgenza: [Critica / Alta / Media] + motivazione
- Soluzione proposta: ___________
- Effort stimato: ___ ore

## Consenso richiesto per procedere
- Tech Lead: _____________ Data/Ora: _______
- Product Owner: _____________ Data/Ora: _______
```

---

## Il Backlog come Strumento di Difesa

Il backlog gestito bene è una lista prioritizzata, stimata e visibile di tutto il lavoro da fare. La sua gestione corretta protegge in diversi modi:

1. **Tutto è tracciato.** Nessuna richiesta può essere "dimenticata" o "non avete capito che l'avevo chiesto".
2. **Le priorità sono esplicite.** Se X non è stato fatto, è perché Y, Z, W erano prioritari — e questo è stato concordato.
3. **Le stime sono documentate.** Se X richiederebbe 3 settimane, questo è documentato prima che venga richiesto "perché ci vuole così tanto?".

---

*Precedente: [06 — ADR & Documentazione](./06-adr-documentation.md) | Prossimo: [08 — Scope Management](./08-scope-management.md)*

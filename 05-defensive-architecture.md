# 05 — Defensive Architecture

> *"Un'architettura difensiva non è paranoia. È ingegneria."*

La difesa architettuale è la pratica di progettare sistemi software che resistano non solo ai guasti tecnici, ma anche alle interferenze esterne: cambi di requisiti improvvisi, integrazioni con sistemi terzi inaffidabili, decisioni di business che impattano l'architettura, vendor lock-in, e la naturale evoluzione (spesso caotica) del dominio.

---

## Anti-Corruption Layer (ACL) — Domain-Driven Design

Il pattern più importante per SDSD a livello architetturale.

### Il Problema

Quando il tuo sistema deve integrarsi con:
- Sistemi legacy con modelli di dati obsoleti
- API di terze parti con semantica diversa dal tuo dominio
- Sistemi interni di altri team con terminologia diversa
- Requisiti di business che cambiano frequentemente

Il rischio è che il "linguaggio" dell'esterno contamini il tuo modello interno, creando codice che rispecchia le ambiguità e le inefficienze dell'esterno.

### La Soluzione: ACL

```
SISTEMA ESTERNO (legacy/terze parti)
         │
         │  (modello e linguaggio esterno)
         ▼
┌─────────────────────────────┐
│    Anti-Corruption Layer    │
│  ┌─────────────────────┐   │
│  │   Adapter/Translator │   │
│  │   Facade             │   │
│  │   Gateway            │   │
│  └─────────────────────┘   │
└─────────────────────────────┘
         │
         │  (modello e linguaggio interno, pulito)
         ▼
   TUO SISTEMA INTERNO
```

L'ACL traduce, converte e adatta il mondo esterno al tuo modello. **Il tuo modello non si contamina mai.**

### Esempio Pratico

```python
# SENZA ACL: il modello esterno inquina il tuo dominio
class OrderFromLegacyERP:
    def __init__(self):
        self.ord_num = None      # Questo è l'ID ordine nel legacy
        self.cust_cd = None      # Codice cliente
        self.qty_tot = None      # Quantità totale (ma in quale unità??)
        self.stat_flg = "P"      # "P"=Pending, "C"=Completed... nel legacy

# Il tuo codice deve sapere cosa significano questi campi cryptici.
# Se il legacy cambia, il tuo codice si rompe.

# CON ACL: il tuo dominio è pulito
class Order:
    def __init__(self):
        self.id: UUID = None
        self.customer_id: UUID = None
        self.total_quantity: Decimal = None
        self.status: OrderStatus = None  # Enum chiaro

class LegacyERPAdapter:
    """Anti-Corruption Layer verso il sistema legacy"""

    STATUS_MAP = {"P": OrderStatus.PENDING, "C": OrderStatus.COMPLETED, ...}

    def to_domain(self, legacy_order: dict) -> Order:
        order = Order()
        order.id = self._parse_order_id(legacy_order["ord_num"])
        order.customer_id = self._resolve_customer(legacy_order["cust_cd"])
        order.total_quantity = self._normalize_quantity(legacy_order["qty_tot"])
        order.status = self.STATUS_MAP[legacy_order["stat_flg"]]
        return order

    def from_domain(self, order: Order) -> dict:
        # Traduzione inversa per aggiornare il legacy
        return {
            "ord_num": str(order.id),
            "stat_flg": {v: k for k, v in self.STATUS_MAP.items()}[order.status]
        }
```

> 💡 **Protezione SDSD:** quando il sistema legacy cambia (e cambierà), modifichi **solo l'ACL**. Il tuo dominio rimane intatto. Il tuo core business logic non viene toccato.

---

## Bounded Contexts — Domain-Driven Design

### Il Problema

In sistemi grandi, lo stesso termine può significare cose diverse in contesti diversi. "Cliente" per il CRM è una persona con dati anagrafici e storico acquisti. "Cliente" per il sistema di fatturazione è una partita IVA con un limite di credito. "Cliente" per il sistema di assistenza è un utente con ticket aperti.

Se usi lo stesso oggetto `Customer` per tutti questi contesti, diventa un oggetto con decine di campi, la maggior parte nulli a seconda del contesto, con regole di business che si contraddicono.

### La Soluzione: Bounded Contexts

```
┌─────────────────┐  ┌──────────────────┐  ┌─────────────────┐
│   CRM Context   │  │ Billing Context  │  │ Support Context │
│                 │  │                  │  │                 │
│  Customer:      │  │  Customer:       │  │  Customer:      │
│  - firstName    │  │  - vatNumber     │  │  - userId       │
│  - lastName     │  │  - creditLimit   │  │  - openTickets  │
│  - email        │  │  - paymentTerms  │  │  - sla Tier     │
│  - history      │  │  - invoices      │  │  - lastContact  │
└─────────────────┘  └──────────────────┘  └─────────────────┘
         │                    │                     │
         └────────────────────┼─────────────────────┘
                     Context Map
              (definisce le relazioni tra contesti)
```

Ogni bounded context ha:
- Il proprio modello di dominio
- Il proprio vocabolario
- La propria base dati (idealmente)
- La propria squadra di sviluppo (Conway's Law)

> 💡 **Protezione SDSD:** quando il business chiede modifiche al concetto di "Cliente" per la fatturazione, impattano solo il Billing Context. Non tocchi il CRM. Non rompere l'assistenza.

---

## Feature Flags

### Il Problema

Stakeholder che vogliono attivare/disattivare funzionalità senza deployment. Rilasci che devono essere reversibili. A/B testing. Rollout graduali.

### La Soluzione

I Feature Flag (o Feature Toggle) sono condizioni runtime che controllano l'attivazione di funzionalità:

```python
class FeatureFlags:
    NEW_DASHBOARD_ENABLED = os.getenv("FF_NEW_DASHBOARD", "false") == "true"
    BETA_CHECKOUT_FLOW = os.getenv("FF_BETA_CHECKOUT", "false") == "true"

# Nel codice
def get_dashboard(user: User):
    if FeatureFlags.NEW_DASHBOARD_ENABLED and user.is_beta_tester:
        return new_dashboard_view(user)
    return legacy_dashboard_view(user)
```

**Tipi di Feature Flag:**

| Tipo | Scopo | Durata |
|------|-------|--------|
| **Release Flag** | Nasconde feature in sviluppo | Breve (poi rimosso) |
| **Experiment Flag** | A/B testing | Breve (poi rimosso) |
| **Ops Flag** | Controllo operativo (circuit breaker) | Lungo/permanente |
| **Permission Flag** | Funzionalità per ruolo/tenant | Permanente |

> 💡 **Protezione SDSD:** quando il business dice "spegni quella funzionalità immediatamente", puoi farlo senza deployment. Quando dicono "voglio testare la nuova versione solo su 10% degli utenti", puoi farlo. Quando dicono "ci siamo sbagliati, torna come prima", puoi farlo in 30 secondi.

---

## Defensive Programming

La difesa a livello di codice: ogni funzione assume che i suoi input possano essere sbagliati.

### Design by Contract (DbC)

Introdotto da Bertrand Meyer, formalizzato in Eiffel, applicabile in qualsiasi linguaggio:

```python
from dataclasses import dataclass
from typing import Optional

def process_order(order_id: str, quantity: int, discount: float) -> dict:
    # PRECONDIZIONI: validazione degli input
    assert order_id and len(order_id) > 0, "order_id non può essere vuoto"
    assert quantity > 0, f"quantity deve essere positivo, ricevuto: {quantity}"
    assert 0.0 <= discount <= 1.0, f"discount deve essere tra 0 e 1, ricevuto: {discount}"

    # Logica principale
    order = fetch_order(order_id)
    total = order.price * quantity * (1 - discount)

    # POSTCONDIZIONI: verifica degli output
    assert total >= 0, f"Il totale non può essere negativo: {total}"
    assert total <= order.price * quantity, "Il totale con sconto non può superare il prezzo pieno"

    return {"order_id": order_id, "total": total, "quantity": quantity}
```

### Principio di Fail Fast

Non aspettare che un errore si propaghi. Rileva e solleva l'eccezione il prima possibile:

```python
# ❌ Fail LATE: l'errore emerge 10 layer dopo
def process_payment(user_id, amount):
    user = get_user(user_id)  # user potrebbe essere None
    # ... 50 righe di codice ...
    result = charge_card(user.payment_method)  # NullPointerException qui
    # Impossibile capire dove è andato storto

# ✅ Fail FAST: errore rilevato subito con contesto chiaro
def process_payment(user_id: str, amount: Decimal) -> PaymentResult:
    if not user_id:
        raise ValueError("user_id è obbligatorio")
    if amount <= 0:
        raise ValueError(f"amount deve essere positivo, ricevuto: {amount}")

    user = get_user(user_id)
    if user is None:
        raise UserNotFoundError(f"Utente {user_id} non trovato")
    if user.payment_method is None:
        raise PaymentMethodMissingError(f"Utente {user_id} non ha un metodo di pagamento")

    return charge_card(user.payment_method, amount)
```

### Input Sanitization e Validation

Mai fidarsi dell'input esterno (form, API, database legacy, messaggi da altri servizi):

```python
from pydantic import BaseModel, validator, Field
from typing import Optional
import re

class OrderRequest(BaseModel):
    """Schema di validazione per le richieste di ordine"""

    customer_email: str = Field(..., description="Email del cliente")
    product_id: str = Field(..., min_length=1, max_length=50)
    quantity: int = Field(..., gt=0, le=1000)
    discount_code: Optional[str] = Field(None, max_length=20)

    @validator('customer_email')
    def email_must_be_valid(cls, v):
        if not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', v):
            raise ValueError(f'Email non valida: {v}')
        return v.lower()

    @validator('discount_code')
    def sanitize_discount_code(cls, v):
        if v is None:
            return v
        # Rimuovi caratteri non alfanumerici (prevenzione injection)
        return re.sub(r'[^A-Z0-9\-]', '', v.upper())
```

---

## Circuit Breaker Pattern

Quando il tuo sistema dipende da servizi esterni (API di terze parti, sistemi legacy), un Circuit Breaker previene che il fallimento dell'esterno causi il fallimento del tuo sistema:

```
CHIUSO (normale)         APERTO (protezione)      SEMI-APERTO (sonda)
   ┌─────────┐               ┌─────────┐               ┌─────────┐
   │  Req → │──successo──▶│  Blocca │──timeout──▶│  Testa  │
   │ Serv   │               │  tutto  │               │  1 req  │
   └─────────┘               └─────────┘               └─────────┘
        │                                                   │
        │ troppi errori                               successo │ errore
        └──────────────────────────────────────▶ APERTO   CHIUSO
```

```python
class CircuitBreaker:
    def __init__(self, failure_threshold=5, timeout=60):
        self.failure_count = 0
        self.failure_threshold = failure_threshold
        self.state = "CLOSED"
        self.last_failure_time = None
        self.timeout = timeout

    def call(self, func, *args, **kwargs):
        if self.state == "OPEN":
            if time.time() - self.last_failure_time > self.timeout:
                self.state = "HALF-OPEN"
            else:
                raise CircuitOpenError("Servizio non disponibile")

        try:
            result = func(*args, **kwargs)
            self._on_success()
            return result
        except Exception as e:
            self._on_failure()
            raise

    def _on_success(self):
        self.failure_count = 0
        self.state = "CLOSED"

    def _on_failure(self):
        self.failure_count += 1
        self.last_failure_time = time.time()
        if self.failure_count >= self.failure_threshold:
            self.state = "OPEN"
```

---

## Strangler Fig Pattern

Quando devi migrare un sistema legacy senza un "big bang rewrite":

```
FASE 1: Nuovo sistema a fianco del legacy
┌──────────┐    ┌─────────────┐
│  Facade  │───▶│  Sistema    │
│ (Router) │    │  Legacy     │
└──────────┘    └─────────────┘

FASE 2: Nuove feature nel nuovo sistema
┌──────────┐    ┌─────────────┐
│  Facade  │───▶│  Sistema    │
│ (Router) │    │  Legacy     │
│          │───▶│  Nuovo      │ (nuove feature qui)
└──────────┘    └─────────────┘

FASE 3: Migrazione graduale
┌──────────┐    ┌─────────────┐
│  Facade  │───▶│  Sistema    │ (solo feature non ancora migrate)
│ (Router) │    │  Legacy     │
│          │───▶│  Nuovo      │ (la maggioranza qui)
└──────────┘    └─────────────┘

FASE 4: Legacy deprecato
┌──────────┐    ┌─────────────┐
│  Facade  │───▶│  Nuovo      │ (tutto qui)
│ (Router) │    │  Sistema    │
└──────────┘    └─────────────┘
              (legacy spento)
```

> 💡 **Protezione SDSD:** il business può continuare a operare durante la migrazione. Non c'è un momento di "big freeze" in cui tutto si ferma. I rischi sono distribuiti nel tempo.

---

## Hexagonal Architecture (Ports & Adapters)

Alistair Cockburn (2005): il core business logic non deve dipendere da nulla di esterno.

```
                    ┌─────────────────────────────┐
                    │                             │
   REST API ───────▶│  Port (Input)               │
   CLI     ───────▶│                             │
   Queue   ───────▶│     CORE DOMAIN             │
                    │     (Business Logic)        │
                    │                             │
                    │  Port (Output)              │
                    │                   ─────────▶│ Database
                    │                   ─────────▶│ Email Service
                    │                   ─────────▶│ External API
                    └─────────────────────────────┘
```

Il core non sa nulla di HTTP, SQL, o librerie specifiche. Può essere testato isolatamente. Se il database cambia (da SQL a NoSQL, da vendor A a vendor B), cambi solo l'adapter, non il core.

> 💡 **Protezione SDSD:** quando il business dice "usiamo un'altra piattaforma di email" o "migriamo a un altro database", l'impatto è contenuto agli adapter, non al core. Questo argomento vale oro nelle discussioni di architettura.

---

## CQRS — Command Query Responsibility Segregation

Separa il modello di lettura dal modello di scrittura:

```
                    ┌─────────────┐
WRITE side          │  Commands   │
(modello            │  (Write)    │──▶ Database scrittura
 ottimizzato per    │  Handler    │    (normalizzato, consistente)
 le regole di       └─────────────┘
 business)
                    ┌─────────────┐
READ side           │  Queries    │
(modello            │  (Read)     │──▶ Database lettura
 ottimizzato per    │  Handler    │    (denormalizzato, veloce)
 le query UI)       └─────────────┘
```

> 💡 **Protezione SDSD:** quando il business chiede "aggiungi questo campo al report" (query), non tocchi il modello di write. Quando dice "aggiungi questa regola di validazione" (command), non impatti le performance delle query.

---

## Riepilogo: Pattern per Scenario

| Scenario | Pattern Consigliato |
|----------|---------------------|
| Integrazione con sistema legacy | Anti-Corruption Layer |
| Dominio complesso con molti team | Bounded Contexts |
| Feature sperimentali o rollout graduale | Feature Flags |
| Dipendenza da servizi esterni instabili | Circuit Breaker |
| Migrazione graduale legacy → nuovo | Strangler Fig |
| Sistema con molte integrazioni | Hexagonal Architecture |
| Report complessi + regole business complesse | CQRS |
| Input non fidati da stakeholder | Defensive Programming + DbC |

---

*Precedente: [04 — Communication Patterns](./04-communication-patterns.md) | Prossimo: [06 — ADR & Documentazione Decisionale](./06-adr-documentation.md)*

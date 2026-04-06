# 10 — Domain-Driven Design come Strumento di Protezione

> *"Se non hai un linguaggio condiviso, non hai capito niente — e non puoi dimostrare che il problema è tuo."*

Domain-Driven Design (DDD), introdotto da Eric Evans nel suo libro del 2003, è molto più di un approccio architetturale. È un **framework per la costruzione di un linguaggio e un modello condivisi** tra domain expert e developer. In ottica SDSD, il DDD è uno strumento di protezione fondamentale: crea tracciabilità linguistica, riduce l'ambiguità, e rende esplicite le responsabilità di dominio.

---

## Il Cuore del DDD: Ubiquitous Language

### Il Problema Linguistico

Il business usa parole come "ordine", "fattura", "cliente", "pagamento". I developer usano le stesse parole, ma spesso con significati diversi. Peggio: lo stesso business usa la stessa parola con significati diversi in contesti diversi.

```
"Ordine" nel CRM:         = opportunità di vendita
"Ordine" nel warehouse:   = lista di picking
"Ordine" in fatturazione: = documento legale
"Ordine" nell'API:        = record nel database

→ Quattro cose diverse chiamate allo stesso modo.
```

Questo crea ambiguità nei requisiti, incomprensioni nelle specifiche, e bug in produzione.

### La Soluzione: Ubiquitous Language

L'Ubiquitous Language (UL) è un vocabolario **preciso e condiviso**, usato da tutti (business e dev) in modo consistente, senza ambiguità.

**Caratteristiche:**
- Ogni termine ha una definizione univoca e formale
- I termini vengono usati nel codice (classi, metodi, variabili) esattamente come nel dominio
- Il vocabolario si evolve con il dominio, ma sempre in modo esplicito
- I conflitti linguistici sono segnali di Bounded Context diversi

### Come si costruisce

**1. Glossario Collaborativo:**
```markdown
# Glossario di Dominio — [Sistema]
*Ultima revisione: [data] — [autore]*

## Ordine (nel contesto Sales)
Un accordo tra un cliente e l'azienda per l'acquisto di uno o più prodotti.
L'ordine esiste quando il cliente ha confermato l'acquisto ma prima del pagamento.
Attributi: ID, cliente, data, prodotti, totale, stato (bozza/confermato/annullato).
**NON è** una fattura. **NON è** un'opportunità di vendita.

## Ordine (nel contesto Warehouse)
Istruzione di picking per il magazzino, derivata da un Ordine Sales confermato.
Contiene le posizioni fisiche dei prodotti da prelevare.
**Termine alternativo nel contesto Warehouse:** "Picking List"

## Cliente
Persona fisica o giuridica che ha effettuato almeno un acquisto.
**Differenza da Prospect:** il Prospect non ha ancora comprato.
**Differenza da Lead:** il Lead è solo un contatto, non ha avuto interazioni commerciali.
```

**2. Event Storming (Domain Modeling):**
Workshop facilitato in cui business e developer mappano insieme il dominio usando post-it:
- **Arancioni:** Domain Events ("Ordine Creato", "Pagamento Ricevuto")
- **Blu:** Commands ("Crea Ordine", "Approva Pagamento")
- **Gialli:** Aggregate/Policy
- **Rosa:** External Systems

---

## Bounded Contexts come Difesa Architetturale

### Mappatura dei Contesti

La Context Map è il documento che descrive le relazioni tra i Bounded Contexts:

```
┌─────────────┐    ┌──────────────┐    ┌─────────────────┐
│   SALES     │    │   BILLING    │    │    SHIPPING     │
│  Context    │    │   Context    │    │    Context      │
│             │    │              │    │                 │
│  Customer   │──▶ │  Customer    │──▶ │  Shipment       │
│  Order      │    │  Invoice     │    │  Address        │
│  Product    │    │  Payment     │    │  Carrier        │
└─────────────┘    └──────────────┘    └─────────────────┘
       │                  │                    │
       └──────────────────┴────────────────────┘
                    Context Map
```

**Tipi di Relazioni tra Contesti:**

| Pattern | Descrizione | Quando usarlo |
|---------|-------------|---------------|
| **Shared Kernel** | Due team condividono un sottoinsieme del modello | Team che collaborano strettamente |
| **Customer/Supplier** | Un team dipende dall'altro per i dati | Gerarchia chiara |
| **Conformist** | Uno si adatta all'altro senza influenza | Integrazione con sistema dominante |
| **ACL** | Anti-Corruption Layer tra contesti incompatibili | Integrazione con legacy o terze parti |
| **Open Host Service** | API pubblica con protocollo aperto | Molti consumatori |
| **Published Language** | Linguaggio formale condiviso | Integrazione tra sistemi multipli |

### Protezione SDSD dei Bounded Contexts

I Bounded Contexts proteggono in questo modo:

**Scenario:** il team di fatturazione vuole modificare il modello di "Cliente" per aggiungere la partita IVA.

**Senza BC:** tocchi la classe `Customer` condivisa → tutti i sistemi potrebbero rompersi → chi è responsabile?

**Con BC:** aggiungi `vatNumber` al `Customer` del Billing Context. Il Sales Context non è toccato. Il cambiamento è atomico e la responsabilità è chiara.

---

## Strategic DDD: Strumenti di Esplorazione del Dominio

### Event Storming — Pratica

**Partecipanti:** domain expert, developer, PO, UX designer

**Materiali:** muro grande, post-it di colori diversi, pennarelli

**Processo in 4 fasi:**

**Fase 1 — Chaotic Exploration** (30-60 min)
Ogni partecipante scrive domain events su post-it arancioni. Nessun ordine, nessuna critica. Solo eventi: cose che "sono accadute" nel sistema.

```
Ordine Creato  |  Pagamento Ricevuto  |  Prodotto Esaurito
Stock Aggiornato  |  Email Inviata  |  Spedizione Avviata
```

**Fase 2 — Timeline** (30-60 min)
Gli eventi vengono ordinati cronologicamente sul muro. Emergono duplicati e conflitti → si discutono e si risolvono.

**Fase 3 — Commands e Policy**
Per ogni evento: cosa lo ha causato? Un comando (umano) o una policy (automatica)?

```
[Crea Ordine] → <Ordine Creato>
              Se pagamento > €100 → [Richiedi Approvazione] → <Approvazione Richiesta>
```

**Fase 4 — Aggregate e Context**
Raggruppamento degli elementi in aggregati e identificazione dei bounded context.

**Output:** mappa visuale del dominio che diventa la base per:
- I requisiti del sistema
- La struttura dei bounded context
- L'ubiquitous language
- Le User Story

---

## Tactical DDD: Pattern di Implementazione

### Entities e Value Objects

```python
# Value Object: immutabile, definito dai suoi valori
@dataclass(frozen=True)
class Money:
    amount: Decimal
    currency: str

    def __post_init__(self):
        if self.amount < 0:
            raise ValueError("L'importo non può essere negativo")
        if self.currency not in ["EUR", "USD", "GBP"]:
            raise ValueError(f"Valuta non supportata: {self.currency}")

    def add(self, other: 'Money') -> 'Money':
        if self.currency != other.currency:
            raise ValueError("Non si possono sommare valute diverse")
        return Money(self.amount + other.amount, self.currency)

# Entity: identificata dal suo ID, mutabile
class Order:
    def __init__(self, order_id: UUID, customer_id: UUID):
        self._id = order_id
        self._customer_id = customer_id
        self._items: list[OrderItem] = []
        self._status = OrderStatus.DRAFT

    @property
    def id(self) -> UUID:
        return self._id

    def add_item(self, product_id: UUID, quantity: int, price: Money) -> None:
        # Business rule: non posso aggiungere item a un ordine confermato
        if self._status != OrderStatus.DRAFT:
            raise OrderNotDraftError(
                f"Impossibile aggiungere item: ordine in stato {self._status}"
            )
        self._items.append(OrderItem(product_id, quantity, price))

    def confirm(self) -> None:
        # Business rule: un ordine senza item non può essere confermato
        if not self._items:
            raise EmptyOrderError("Non si può confermare un ordine vuoto")
        self._status = OrderStatus.CONFIRMED
```

### Aggregates e Invarianti

Un Aggregate è un cluster di Entities e Value Objects trattato come un'unità. Ha un Aggregate Root che garantisce le invarianti (le regole di business che devono essere sempre vere).

```python
class Order:  # Aggregate Root
    """
    Invarianti dell'Aggregate Order:
    1. Un ordine senza item non può essere confermato
    2. Il totale non può essere negativo
    3. Un ordine annullato non può essere riattivato
    4. Solo l'Aggregate Root può modificare gli item (non accedere
       direttamente a OrderItem dall'esterno!)
    """

    def total(self) -> Money:
        """Invariante: il totale è la somma degli item"""
        if not self._items:
            return Money(Decimal('0'), 'EUR')
        return sum(
            (item.subtotal() for item in self._items),
            Money(Decimal('0'), 'EUR')
        )

    def cancel(self, reason: str) -> None:
        """Invariante: non si può annullare un ordine già spedito"""
        if self._status == OrderStatus.SHIPPED:
            raise OrderAlreadyShippedError(
                "Non è possibile annullare un ordine già spedito. "
                "Procedere con il reso."
            )
        self._status = OrderStatus.CANCELLED
        self._cancellation_reason = reason
        # Emette un Domain Event
        self._events.append(OrderCancelled(self._id, reason))
```

### Domain Events

Gli eventi di dominio permettono la comunicazione tra bounded context senza accoppiamento diretto:

```python
@dataclass
class OrderConfirmed:
    """Domain Event: emesso quando un ordine viene confermato"""
    order_id: UUID
    customer_id: UUID
    total: Money
    items: list[OrderItemSnapshot]
    confirmed_at: datetime

    # Questo evento verrà consumato da:
    # - Billing Context: per creare la fattura
    # - Warehouse Context: per creare il picking list
    # - Notification Context: per inviare l'email di conferma
```

---

## DDD come Strumento di Conversazione con il Business

### Il Pattern "Bring the Model"

Invece di spiegare il codice agli stakeholder, porta il **modello di dominio**:

```
NON fare:
"Abbiamo una classe Order con una lista di OrderItems e uno stato FSM"

FARE:
"Quando un cliente fa un ordine, il sistema tiene traccia di:
 - Quali prodotti ha ordinato (in che quantità, a quale prezzo)
 - In che stato si trova l'ordine (bozza → confermato → spedito → consegnato)
 - Chi ha effettuato l'ordine e quando

 Le regole sono:
 - Un ordine vuoto non può essere confermato
 - Un ordine spedito non può essere annullato direttamente

 Siamo d'accordo su questo? Ci sono casi che ho dimenticato?"
```

Questa conversazione usa il linguaggio del dominio, non il linguaggio tecnico. Gli stakeholder possono correggere le incomprensioni prima che vengano implementate.

---

## Il Valore del DDD in SDSD

| Pratica DDD | Protezione SDSD |
|-------------|-----------------|
| Ubiquitous Language | "Il termine X significa Y, come concordato nel glossario del [data]" |
| Bounded Contexts | I cambiamenti sono circoscritti, le responsabilità chiare |
| Domain Events | La comunicazione tra sistemi è tracciabile e auditabile |
| Aggregates con invarianti | Le regole di business sono nel codice, non in testa a qualcuno |
| Event Storming | La modellazione del dominio è un atto collaborativo, documentato |
| Context Map | "Questo problema è nel dominio del Billing Context, non del nostro" |

---

*Precedente: [09 — Anti-Pattern degli Stakeholder](./09-stakeholder-antipatterns.md) | Prossimo: [11 — Template e Strumenti](./11-templates-tools.md)*

# 10 — Domain-Driven Design as a Protection Tool

> *"If you don't have a shared language, you haven't understood anything — and you can't prove the problem is yours."*

Domain-Driven Design (DDD), introduced by Eric Evans in his 2003 book, is much more than an architectural approach. It is a **framework for building a shared language and model** between domain experts and developers. From an SDSD perspective, DDD is a fundamental protection tool: it creates linguistic traceability, reduces ambiguity, and makes domain responsibilities explicit.

---

## The Heart of DDD: Ubiquitous Language

### The Linguistic Problem

The business uses words like "order," "invoice," "customer," "payment." Developers use the same words, but often with different meanings. Worse: the same business uses the same word with different meanings in different contexts.

```
"Order" in CRM:         = sales opportunity
"Order" in warehouse:   = picking list
"Order" in billing:     = legal document
"Order" in API:         = database record

→ Four different things called the same name.
```

This creates ambiguity in requirements, misunderstandings in specifications, and bugs in production.

### The Solution: Ubiquitous Language

The Ubiquitous Language (UL) is a **precise and shared** vocabulary, used by everyone (business and dev) consistently, without ambiguity.

**Characteristics:**
- Every term has a unique and formal definition
- Terms are used in the code (classes, methods, variables) exactly as in the domain
- The vocabulary evolves with the domain, but always explicitly
- Linguistic conflicts are signals of different Bounded Contexts

### How to Build It

**1. Collaborative Glossary:**
```markdown
# Domain Glossary — [System]
*Last revision: [date] — [author]*

## Order (in Sales context)
An agreement between a customer and the company for the purchase of one or more products.
The order exists when the customer has confirmed the purchase but before payment.
Attributes: ID, customer, date, products, total, status (draft/confirmed/cancelled).
**Is NOT** an invoice. **Is NOT** a sales opportunity.

## Order (in Warehouse context)
Picking instruction for the warehouse, derived from a confirmed Sales Order.
Contains the physical locations of the products to be retrieved.
**Alternative term in Warehouse context:** "Picking List"

## Customer
Individual or legal entity who has made at least one purchase.
**Difference from Prospect:** the Prospect has not yet bought.
**Difference from Lead:** the Lead is just a contact, has had no commercial interactions.
```

**2. Event Storming (Domain Modeling):**
Facilitated workshop in which business and developers map the domain together using sticky notes:
- **Orange:** Domain Events ("Order Created", "Payment Received")
- **Blue:** Commands ("Create Order", "Approve Payment")
- **Yellow:** Aggregate/Policy
- **Pink:** External Systems

---

## Bounded Contexts as Architectural Defense

### Context Mapping

The Context Map is the document that describes the relationships between Bounded Contexts:

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

**Types of Relationships Between Contexts:**

| Pattern | Description | When to Use |
|---------|-------------|-------------|
| **Shared Kernel** | Two teams share a subset of the model | Closely collaborating teams |
| **Customer/Supplier** | One team depends on the other for data | Clear hierarchy |
| **Conformist** | One adapts to the other without influence | Integration with a dominant system |
| **ACL** | Anti-Corruption Layer between incompatible contexts | Integration with legacy or third parties |
| **Open Host Service** | Public API with open protocol | Many consumers |
| **Published Language** | Formal shared language | Integration between multiple systems |

### SDSD Protection of Bounded Contexts

Bounded Contexts protect in this way:

**Scenario:** the billing team wants to modify the "Customer" model to add a VAT number.

**Without BC:** you touch the shared `Customer` class → all systems could break → who is responsible?

**With BC:** you add `vatNumber` to the `Customer` of the Billing Context. The Sales Context is untouched. The change is atomic and responsibility is clear.

---

## Strategic DDD: Domain Exploration Tools

### Event Storming — Practice

**Participants:** domain experts, developers, PO, UX designers

**Materials:** large wall, differently colored sticky notes, markers

**4-phase process:**

**Phase 1 — Chaotic Exploration** (30-60 min)
Each participant writes domain events on orange sticky notes. No order, no criticism. Only events: things that "have happened" in the system.

```
Order Created  |  Payment Received  |  Product Out of Stock
Stock Updated  |  Email Sent        |  Shipment Started
```

**Phase 2 — Timeline** (30-60 min)
Events are ordered chronologically on the wall. Duplicates and conflicts emerge → they are discussed and resolved.

**Phase 3 — Commands and Policy**
For each event: what caused it? A command (human) or a policy (automated)?

```
[Create Order] → <Order Created>
              If payment > $100 → [Request Approval] → <Approval Requested>
```

**Phase 4 — Aggregate and Context**
Grouping of elements into aggregates and identification of bounded contexts.

**Output:** visual domain map that becomes the basis for:
- System requirements
- Bounded context structure
- Ubiquitous language
- User Stories

---

## Tactical DDD: Implementation Patterns

### Entities and Value Objects

```python
# Value Object: immutable, defined by its values
@dataclass(frozen=True)
class Money:
    amount: Decimal
    currency: str

    def __post_init__(self):
        if self.amount < 0:
            raise ValueError("Amount cannot be negative")
        if self.currency not in ["EUR", "USD", "GBP"]:
            raise ValueError(f"Unsupported currency: {self.currency}")

    def add(self, other: 'Money') -> 'Money':
        if self.currency != other.currency:
            raise ValueError("Cannot add different currencies")
        return Money(self.amount + other.amount, self.currency)

# Entity: identified by its ID, mutable
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
        # Business rule: cannot add items to a confirmed order
        if self._status != OrderStatus.DRAFT:
            raise OrderNotDraftError(
                f"Cannot add item: order in status {self._status}"
            )
        self._items.append(OrderItem(product_id, quantity, price))

    def confirm(self) -> None:
        # Business rule: an order without items cannot be confirmed
        if not self._items:
            raise EmptyOrderError("Cannot confirm an empty order")
        self._status = OrderStatus.CONFIRMED
```

### Aggregates and Invariants

An Aggregate is a cluster of Entities and Value Objects treated as a unit. It has an Aggregate Root that guarantees invariants (business rules that must always be true).

```python
class Order:  # Aggregate Root
    """
    Order Aggregate Invariants:
    1. An order without items cannot be confirmed
    2. The total cannot be negative
    3. A cancelled order cannot be reactivated
    4. Only the Aggregate Root can modify items (do not access
       OrderItem directly from outside!)
    """

    def total(self) -> Money:
        """Invariant: the total is the sum of items"""
        if not self._items:
            return Money(Decimal('0'), 'EUR')
        return sum(
            (item.subtotal() for item in self._items),
            Money(Decimal('0'), 'EUR')
        )

    def cancel(self, reason: str) -> None:
        """Invariant: cannot cancel an already-shipped order"""
        if self._status == OrderStatus.SHIPPED:
            raise OrderAlreadyShippedError(
                "Cannot cancel an already-shipped order. "
                "Proceed with a return."
            )
        self._status = OrderStatus.CANCELLED
        self._cancellation_reason = reason
        # Emits a Domain Event
        self._events.append(OrderCancelled(self._id, reason))
```

### Domain Events

Domain events allow communication between bounded contexts without direct coupling:

```python
@dataclass
class OrderConfirmed:
    """Domain Event: emitted when an order is confirmed"""
    order_id: UUID
    customer_id: UUID
    total: Money
    items: list[OrderItemSnapshot]
    confirmed_at: datetime

    # This event will be consumed by:
    # - Billing Context: to create the invoice
    # - Warehouse Context: to create the picking list
    # - Notification Context: to send the confirmation email
```

---

## DDD as a Conversation Tool with the Business

### The "Bring the Model" Pattern

Instead of explaining code to stakeholders, bring the **domain model**:

```
DON'T do this:
"We have an Order class with a list of OrderItems and an FSM state"

DO this:
"When a customer places an order, the system keeps track of:
 - Which products they ordered (in what quantity, at what price)
 - What state the order is in (draft → confirmed → shipped → delivered)
 - Who placed the order and when

 The rules are:
 - An empty order cannot be confirmed
 - A shipped order cannot be cancelled directly

 Do we agree on this? Are there any cases I've missed?"
```

This conversation uses the domain language, not the technical language. Stakeholders can correct misunderstandings before they are implemented.

---

## The Value of DDD in SDSD

| DDD Practice | SDSD Protection |
|-------------|-----------------|
| Ubiquitous Language | "Term X means Y, as agreed in the glossary of [date]" |
| Bounded Contexts | Changes are circumscribed, responsibilities clear |
| Domain Events | Communication between systems is traceable and auditable |
| Aggregates with invariants | Business rules are in the code, not in someone's head |
| Event Storming | Domain modeling is a collaborative, documented act |
| Context Map | "This problem is in the Billing Context domain, not ours" |

---

*Previous: [09 — Stakeholder Anti-Patterns](./09-stakeholder-antipatterns.md) | Next: [11 — Templates and Tools](./11-templates-tools.md)*

# 05 — Defensive Architecture

> *"A defensive architecture is not paranoia. It is engineering."*

Architectural defense is the practice of designing software systems that resist not only technical failures, but also external interference: sudden requirement changes, integrations with unreliable third-party systems, business decisions that impact architecture, vendor lock-in, and the natural (often chaotic) evolution of the domain.

---

## Anti-Corruption Layer (ACL) — Domain-Driven Design

The most important pattern for SDSD at the architectural level.

### The Problem

When your system needs to integrate with:
- Legacy systems with outdated data models
- Third-party APIs with semantics different from your domain
- Internal systems from other teams with different terminology
- Business requirements that change frequently

The risk is that the "language" of the external system contaminates your internal model, creating code that mirrors the ambiguities and inefficiencies of the outside world.

### The Solution: ACL

```
EXTERNAL SYSTEM (legacy/third party)
         │
         │  (external model and language)
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
         │  (clean internal model and language)
         ▼
   YOUR INTERNAL SYSTEM
```

The ACL translates, converts, and adapts the external world to your model. **Your model is never contaminated.**

### Practical Example

```python
# WITHOUT ACL: the external model pollutes your domain
class OrderFromLegacyERP:
    def __init__(self):
        self.ord_num = None      # This is the order ID in the legacy system
        self.cust_cd = None      # Customer code
        self.qty_tot = None      # Total quantity (but in what units??)
        self.stat_flg = "P"      # "P"=Pending, "C"=Completed... in the legacy

# Your code must know what these cryptic fields mean.
# If the legacy changes, your code breaks.

# WITH ACL: your domain is clean
class Order:
    def __init__(self):
        self.id: UUID = None
        self.customer_id: UUID = None
        self.total_quantity: Decimal = None
        self.status: OrderStatus = None  # Clear enum

class LegacyERPAdapter:
    """Anti-Corruption Layer toward the legacy system"""

    STATUS_MAP = {"P": OrderStatus.PENDING, "C": OrderStatus.COMPLETED, ...}

    def to_domain(self, legacy_order: dict) -> Order:
        order = Order()
        order.id = self._parse_order_id(legacy_order["ord_num"])
        order.customer_id = self._resolve_customer(legacy_order["cust_cd"])
        order.total_quantity = self._normalize_quantity(legacy_order["qty_tot"])
        order.status = self.STATUS_MAP[legacy_order["stat_flg"]]
        return order

    def from_domain(self, order: Order) -> dict:
        # Reverse translation to update the legacy
        return {
            "ord_num": str(order.id),
            "stat_flg": {v: k for k, v in self.STATUS_MAP.items()}[order.status]
        }
```

> 💡 **SDSD Protection:** when the legacy system changes (and it will), you modify **only the ACL**. Your domain remains intact. Your core business logic is not touched.

---

## Bounded Contexts — Domain-Driven Design

### The Problem

In large systems, the same term can mean different things in different contexts. "Customer" for CRM is a person with personal data and purchase history. "Customer" for the billing system is a VAT number with a credit limit. "Customer" for the support system is a user with open tickets.

If you use the same `Customer` object for all these contexts, it becomes an object with dozens of fields, most of which are null depending on the context, with business rules that contradict each other.

### The Solution: Bounded Contexts

```
┌─────────────────┐  ┌──────────────────┐  ┌─────────────────┐
│   CRM Context   │  │ Billing Context  │  │ Support Context │
│                 │  │                  │  │                 │
│  Customer:      │  │  Customer:       │  │  Customer:      │
│  - firstName    │  │  - vatNumber     │  │  - userId       │
│  - lastName     │  │  - creditLimit   │  │  - openTickets  │
│  - email        │  │  - paymentTerms  │  │  - slaTier      │
│  - history      │  │  - invoices      │  │  - lastContact  │
└─────────────────┘  └──────────────────┘  └─────────────────┘
         │                    │                     │
         └────────────────────┼─────────────────────┘
                     Context Map
              (defines the relationships between contexts)
```

Each bounded context has:
- Its own domain model
- Its own vocabulary
- Its own database (ideally)
- Its own development team (Conway's Law)

> 💡 **SDSD Protection:** when the business requests changes to the "Customer" concept for billing, they only impact the Billing Context. You don't touch the CRM. You don't break support.

---

## Feature Flags

### The Problem

Stakeholders who want to activate/deactivate features without deployment. Releases that must be reversible. A/B testing. Gradual rollouts.

### The Solution

Feature Flags (or Feature Toggles) are runtime conditions that control feature activation:

```python
class FeatureFlags:
    NEW_DASHBOARD_ENABLED = os.getenv("FF_NEW_DASHBOARD", "false") == "true"
    BETA_CHECKOUT_FLOW = os.getenv("FF_BETA_CHECKOUT", "false") == "true"

# In code
def get_dashboard(user: User):
    if FeatureFlags.NEW_DASHBOARD_ENABLED and user.is_beta_tester:
        return new_dashboard_view(user)
    return legacy_dashboard_view(user)
```

**Types of Feature Flags:**

| Type | Purpose | Duration |
|------|---------|----------|
| **Release Flag** | Hides features under development | Short (then removed) |
| **Experiment Flag** | A/B testing | Short (then removed) |
| **Ops Flag** | Operational control (circuit breaker) | Long/permanent |
| **Permission Flag** | Features by role/tenant | Permanent |

> 💡 **SDSD Protection:** when the business says "turn off that feature immediately," you can do it without deployment. When they say "I want to test the new version on only 10% of users," you can do it. When they say "we were wrong, go back to the old way," you can do it in 30 seconds.

---

## Defensive Programming

Defense at the code level: every function assumes its inputs could be wrong.

### Design by Contract (DbC)

Introduced by Bertrand Meyer, formalized in Eiffel, applicable in any language:

```python
from dataclasses import dataclass
from typing import Optional

def process_order(order_id: str, quantity: int, discount: float) -> dict:
    # PRECONDITIONS: input validation
    assert order_id and len(order_id) > 0, "order_id cannot be empty"
    assert quantity > 0, f"quantity must be positive, received: {quantity}"
    assert 0.0 <= discount <= 1.0, f"discount must be between 0 and 1, received: {discount}"

    # Main logic
    order = fetch_order(order_id)
    total = order.price * quantity * (1 - discount)

    # POSTCONDITIONS: output verification
    assert total >= 0, f"Total cannot be negative: {total}"
    assert total <= order.price * quantity, "Total with discount cannot exceed full price"

    return {"order_id": order_id, "total": total, "quantity": quantity}
```

### Fail Fast Principle

Don't wait for an error to propagate. Detect and raise the exception as early as possible:

```python
# ❌ Fail LATE: error surfaces 10 layers later
def process_payment(user_id, amount):
    user = get_user(user_id)  # user could be None
    # ... 50 lines of code ...
    result = charge_card(user.payment_method)  # NullPointerException here
    # Impossible to understand what went wrong

# ✅ Fail FAST: error detected immediately with clear context
def process_payment(user_id: str, amount: Decimal) -> PaymentResult:
    if not user_id:
        raise ValueError("user_id is required")
    if amount <= 0:
        raise ValueError(f"amount must be positive, received: {amount}")

    user = get_user(user_id)
    if user is None:
        raise UserNotFoundError(f"User {user_id} not found")
    if user.payment_method is None:
        raise PaymentMethodMissingError(f"User {user_id} has no payment method")

    return charge_card(user.payment_method, amount)
```

### Input Sanitization and Validation

Never trust external input (forms, APIs, legacy databases, messages from other services):

```python
from pydantic import BaseModel, validator, Field
from typing import Optional
import re

class OrderRequest(BaseModel):
    """Validation schema for order requests"""

    customer_email: str = Field(..., description="Customer email")
    product_id: str = Field(..., min_length=1, max_length=50)
    quantity: int = Field(..., gt=0, le=1000)
    discount_code: Optional[str] = Field(None, max_length=20)

    @validator('customer_email')
    def email_must_be_valid(cls, v):
        if not re.match(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', v):
            raise ValueError(f'Invalid email: {v}')
        return v.lower()

    @validator('discount_code')
    def sanitize_discount_code(cls, v):
        if v is None:
            return v
        # Remove non-alphanumeric characters (injection prevention)
        return re.sub(r'[^A-Z0-9\-]', '', v.upper())
```

---

## Circuit Breaker Pattern

When your system depends on external services (third-party APIs, legacy systems), a Circuit Breaker prevents the failure of the external system from causing the failure of your system:

```
CLOSED (normal)          OPEN (protection)        HALF-OPEN (probe)
   ┌─────────┐               ┌─────────┐               ┌─────────┐
   │  Req →  │──success──▶  │  Block  │──timeout──▶  │  Test   │
   │  Svc    │               │  all    │               │  1 req  │
   └─────────┘               └─────────┘               └─────────┘
        │                                                   │
        │ too many errors                         success │ error
        └──────────────────────────────────────▶ OPEN   CLOSED
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
                raise CircuitOpenError("Service unavailable")

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

When you need to migrate a legacy system without a "big bang rewrite":

```
PHASE 1: New system alongside legacy
┌──────────┐    ┌─────────────┐
│  Facade  │───▶│  Legacy     │
│ (Router) │    │  System     │
└──────────┘    └─────────────┘

PHASE 2: New features in the new system
┌──────────┐    ┌─────────────┐
│  Facade  │───▶│  Legacy     │
│ (Router) │    │  System     │
│          │───▶│  New        │ (new features here)
└──────────┘    └─────────────┘

PHASE 3: Gradual migration
┌──────────┐    ┌─────────────┐
│  Facade  │───▶│  Legacy     │ (only features not yet migrated)
│ (Router) │    │  System     │
│          │───▶│  New        │ (majority here)
└──────────┘    └─────────────┘

PHASE 4: Legacy deprecated
┌──────────┐    ┌─────────────┐
│  Facade  │───▶│  New        │ (everything here)
│ (Router) │    │  System     │
└──────────┘    └─────────────┘
              (legacy shut down)
```

> 💡 **SDSD Protection:** the business can continue operating during the migration. There is no "big freeze" moment where everything stops. Risks are distributed over time.

---

## Hexagonal Architecture (Ports & Adapters)

Alistair Cockburn (2005): the core business logic must not depend on anything external.

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

The core knows nothing about HTTP, SQL, or specific libraries. It can be tested in isolation. If the database changes (from SQL to NoSQL, from vendor A to vendor B), you only change the adapter, not the core.

> 💡 **SDSD Protection:** when the business says "we're using a different email platform" or "we're migrating to another database," the impact is contained to the adapters, not the core. This argument is golden in architecture discussions.

---

## CQRS — Command Query Responsibility Segregation

Separates the read model from the write model:

```
                    ┌─────────────┐
WRITE side          │  Commands   │
(model              │  (Write)    │──▶ Write database
 optimized for      │  Handler    │    (normalized, consistent)
 business rules)    └─────────────┘

                    ┌─────────────┐
READ side           │  Queries    │
(model              │  (Read)     │──▶ Read database
 optimized for      │  Handler    │    (denormalized, fast)
 UI queries)        └─────────────┘
```

> 💡 **SDSD Protection:** when the business asks "add this field to the report" (query), you don't touch the write model. When they say "add this validation rule" (command), you don't impact query performance.

---

## Summary: Pattern by Scenario

| Scenario | Recommended Pattern |
|----------|---------------------|
| Integration with legacy system | Anti-Corruption Layer |
| Complex domain with many teams | Bounded Contexts |
| Experimental features or gradual rollout | Feature Flags |
| Dependency on unstable external services | Circuit Breaker |
| Gradual legacy → new migration | Strangler Fig |
| System with many integrations | Hexagonal Architecture |
| Complex reports + complex business rules | CQRS |
| Untrusted input from stakeholders | Defensive Programming + DbC |

---

*Previous: [04 — Communication Patterns](./04-communication-patterns.md) | Next: [06 — ADR & Decision Documentation](./06-adr-documentation.md)*

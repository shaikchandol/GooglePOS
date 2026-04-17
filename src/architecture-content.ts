
export const ARCHITECTURE_SECTIONS = [
  {
    id: 'business',
    title: 'Business Architecture',
    content: `
### Retail POS Core Business Capabilities
- **Multi-tenancy (SaaS)**: Isolating data per retailer/store.
- **Sales & Checkout**: Basket management, discounts, taxes, payments.
- **Inventory Management**: Real-time stock tracking, SKU management, low-stock alerts.
- **Customer Relationship (CRM)**: Loyalty programs, purchase history.
- **Store Operations**: Employee shifts, cash drawer reconciliation.
- **Reporting & Analytics**: Sales trends, inventory turnover, tax compliance.
    `
  },
  {
    id: 'application',
    title: 'Application Architecture',
    content: `
### Modular Monolith with DDD
Using a **Modular Monolith** approach provides the best balance between development speed and future scalability (to microservices).

- **Domain-Driven Design (DDD)**: Each module owns its domain logic and data.
- **Separation of Concerns**: Horizontal layers (API, Application, Domain, Infrastructure).
- **Communication Boundaries**: Modules communicate via strictly defined interfaces or events.
- **Modular Packaging**: Each module is a separate assembly (.csproj).
    `
  },
  {
    id: 'data',
    title: 'Data Architecture',
    content: `
### Multi-tenant Data Strategies
- **Tenant Isolation**:
  - *Option A: Shared Database, Shared Schema*: Using \`TenantId\` on every table with EF Core Global Query Filters. (Recommended for POS).
  - *Option B: Shared Database, Separate Schemas*: Schema-per-tenant isolation.
  - *Option C: Separate Databases*: Maximum isolation, highest cost.
- **Technology**: PostgreSQL + EF Core.
- **Caching**: Redis for distributed session and tenant configuration caching.
    `
  },
  {
    id: 'technology',
    title: 'Technology Stack',
    content: `
### Primary Tools & NuGets
- **Runtime**: .NET 8/9
- **Web API**: ASP.NET Core
- **Database**: PostgreSQL
- **ORM**: Entity Framework Core
- **Validation**: FluentValidation
- **Messaging**: MediatR (In-process), MassTransit (Out-process/Bus)
- **Authentication**: Keycloak or Auth0 (Multi-tenant OIDC)
- **Monitoring**: OpenTelemetry & Seq
    `
  }
];

export const SDLC_PROMPT_FLOW = `
### SDLC Phase-by-Phase AI Prompting

1. **Foundation**: "Generate a .NET 8 Modular Monolith solution structure. Include a 'Shared' project for common utilities and a 'Identity.Module' for multi-tenant authentication using OIDC."
2. **Catalog Module**: "Add a 'Catalog' module to the solution following DDD. Implement SKU management with EF Core and MediatR for CRUD operations. Use FluentValidation for inputs."
3. **Inventory Module**: "Implement an 'Inventory' module. It should listen to 'ProductCreated' domain events from the Catalog module via MediatR to initialize stock levels."
4. **Sales Module**: "Create a 'Sales' module. Implement a checkout process that creates an Order and emits an 'OrderPlaced' integration event using MassTransit."
5. **Bus Integration**: "Set up MassTransit with RabbitMQ in the Web API project. Configure the Inventory module to consume 'OrderPlaced' to decrement stock levels."
6. **Multi-tenancy Logic**: "Implement a 'TenantProvider' in the Shared project that extracts TenantId from JWT claims. Add a global query filter to EF Core to enforce data isolation."
`;

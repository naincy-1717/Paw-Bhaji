 🚀 STOCKPILOT — AI-Powered Warehouse & Supply Chain Control Tower

<div align="center">

**Turn warehouse operations from reactive inventory management into an intelligent, real-time fulfillment system.**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)](#)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)](#)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)](#)
[![Gemini](https://img.shields.io/badge/Google%20Gemini-AI-4285F4?logo=google&logoColor=white)](#)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](#)

</div>

---

## 🏆 Hackathon Pitch

### The Problem

Modern warehouses are often managed through disconnected spreadsheets, manual barcode checks, static inventory reports, and fragmented communication between manufacturers, warehouse teams, managers, and delivery partners.

This creates a costly chain of problems:

- ❌ Stockouts are discovered too late.
- ❌ Pickers waste time walking inefficient routes.
- ❌ Product locations are difficult to track.
- ❌ Inbound shipments and warehouse capacity are disconnected.
- ❌ Delivery handovers depend on manual coordination.
- ❌ Manufacturers have limited visibility into stock and dispatches.
- ❌ Managers receive data, but not enough actionable intelligence.

### The Solution

**STOCKPILOT** is an end-to-end warehouse intelligence platform that connects:

> **Inventory → Warehouse → Orders → Picking → Delivery → Manufacturer → AI Insights**

It provides a unified operational control tower with barcode scanning, intelligent bin allocation, order picking, warehouse visualization, delivery workflows, manufacturer collaboration, analytics, activity tracking, and AI-powered operational recommendations.

---

# 🌟 What Makes STOCKPILOT Hackathon-Worthy?

STOCKPILOT is not just an inventory dashboard.

It demonstrates a complete operational loop:

```text
PRODUCT ARRIVES
      ↓
BARCODE / INBOUND SCAN
      ↓
INTELLIGENT BIN ALLOCATION
      ↓
REAL-TIME INVENTORY
      ↓
CUSTOMER ORDER
      ↓
PICKING + BARCODE VERIFICATION
      ↓
DISPATCH
      ↓
DELIVERY PARTNER HANDOVER
      ↓
DELIVERY TASK TRACKING
      ↓
ANALYTICS + ACTIVITY LOG
      ↓
AI-POWERED OPTIMIZATION
```

### Core value proposition

**“Know what you have, know where it is, know what needs to move, and know what to do next.”**

---

# 🎯 Key Features

## 1. 📊 Real-Time Operations Dashboard

The dashboard acts as the warehouse control tower.

It provides visibility into:

- Inventory health
- Low-stock products
- Pending and picking orders
- Warehouse occupancy
- Operational activity
- Fulfillment status
- Warehouse performance indicators
- AI-generated operational recommendations

Badge counters automatically surface:

- Pending/Picking orders
- Low-stock items

This makes important exceptions visible without requiring managers to manually inspect every page.

---

## 2. 📦 Smart Inventory Management

STOCKPILOT supports full product lifecycle management:

- Add products
- Edit product information
- Delete products
- Search products
- Barcode-based lookup
- SKU management
- Minimum stock thresholds
- Quantity tracking
- Inventory transactions
- Product location assignment

Inventory changes are connected to operational events rather than being treated as isolated database values.

---

## 3. 🧠 Intelligent Bin Allocation

One of the strongest technical features is the warehouse allocation engine.

When stock enters the warehouse, the allocation service:

1. Checks whether the SKU already exists in a bin.
2. Attempts to consolidate stock into the existing location.
3. Checks available bin capacity.
4. Searches rows sequentially.
5. Selects the first suitable bin.
6. Updates bin occupancy.
7. Updates row occupancy.
8. Updates warehouse occupancy.
9. Records the allocation event.
10. Automatically creates/activates a new row if existing capacity is insufficient.

### Allocation strategy

```text
Existing SKU?
   │
   ├── YES → Enough capacity?
   │            ├── YES → Consolidate
   │            └── NO  → Find another bin
   │
   └── NO → Search Row A
                ↓
             Row B
                ↓
             Row C
                ↓
        No suitable bin?
                ↓
        Create next row
                ↓
        Create 6 bins
```

This demonstrates an important hackathon principle:

> **Automate an operational decision instead of simply visualizing the data.**

---

# 📷 4. Barcode & Camera Scanning

The platform supports barcode-oriented workflows for warehouse operations.

Components include:

- Camera scanner modal
- Automatic barcode scanner
- Barcode renderer
- Image barcode decoding utility
- Barcode-based product lookup
- Barcode-verified pickup
- Inbound scanning

### Example operational flow

```text
Open Scanner
     ↓
Capture Barcode
     ↓
Decode / Identify Product
     ↓
Validate SKU
     ↓
Update Inventory / Order
     ↓
Create Transaction
     ↓
Refresh Operational State
```

This reduces manual data entry and creates a more realistic warehouse-floor experience.

---

# 🛒 5. Order Fulfillment

The order module covers the operational journey from pending order to dispatch.

Supported workflow:

```text
Pending
  ↓
Picking
  ↓
Item Verification
  ↓
Picked
  ↓
Dispatch
```

The system supports:

- Order listing
- Order details
- Pick-item operations
- Barcode verification
- Dispatch
- Order status updates
- Integration with inventory transactions

The UI also exposes pending/picking order counts for faster operational awareness.

---

# 🚚 6. Delivery Partner Portal

STOCKPILOT includes a dedicated delivery workflow rather than stopping at warehouse dispatch.

Delivery functionality includes:

- Delivery partner authentication
- Partner registration
- Partner management
- Pickup assignment
- Assigned pickup visibility
- Daily pickup tasks
- Date-wise task management
- Warehouse location information
- Warehouse inventory visibility
- Barcode-confirmed pickup
- Daily manifest sending
- Delivery task status updates

### Delivery flow

```text
Warehouse Order
      ↓
Assign Delivery Partner
      ↓
Pickup Task Created
      ↓
Partner Arrives
      ↓
Barcode Verification
      ↓
Pickup Confirmed
      ↓
Manifest / Handover
      ↓
Delivery Tracking
```

This creates a stronger end-to-end hackathon story because fulfillment continues beyond the warehouse.

---

# 🏭 7. Manufacturer Portal

Manufacturers get a dedicated portal for collaboration with the warehouse.

Features include:

- Manufacturer dashboard
- Warehouse visibility
- Shipment creation
- Shipment receiving
- Manufacturer product management
- Product quantity adjustments
- Manufacturer notifications
- Manufacturer chat
- Delivery/dispatch coordination
- Slot booking

This turns STOCKPILOT into a multi-stakeholder platform rather than a single-user inventory tool.

### Stakeholder model

| Stakeholder | Primary Need | STOCKPILOT Capability |
|---|---|---|
| Warehouse Operator | Execute daily operations | Inventory, scanning, picking |
| Manager | Monitor & optimize | Dashboard, analytics, AI |
| Manufacturer | Supply visibility | Shipments, products, chat |
| Delivery Partner | Collect & hand over orders | Pickup portal, barcode confirmation |

---

# 🤖 8. AI-Powered Warehouse Intelligence

STOCKPILOT integrates Google Gemini for operational intelligence.

The AI service analyzes warehouse data including:

- Total products
- Low-stock products
- Current inventory
- Minimum stock thresholds
- Pending orders
- Recent pick transactions

It can generate:

- Warehouse health summaries
- Restock recommendations
- Slotting recommendations
- Throughput optimization tips

### AI + deterministic fallback

A key engineering decision is that AI is **not required for the core application to remain useful**.

The system first calculates deterministic recommendations using warehouse rules.

If Gemini is available:

```text
Warehouse Data
      ↓
Deterministic Safety Logic
      ↓
Gemini Operational Reasoning
      ↓
Actionable Recommendations
```

If Gemini is unavailable:

```text
Warehouse Data
      ↓
Deterministic Heuristics
      ↓
Operational Recommendations
```

This is a strong production-minded design because a temporary AI/API failure does not disable inventory operations.

---

# 💡 AI Recommendation Logic

For low-stock products, the system considers:

- Current quantity
- Minimum stock level
- Pending order demand
- Safety buffer

It then estimates a suggested reorder quantity and assigns a priority:

- 🔴 **CRITICAL** — out of stock
- 🟠 **HIGH** — significantly below threshold
- 🟡 **MEDIUM** — below safety threshold

Example reasoning:

```text
Current Stock: 10
Minimum Stock: 50
Pending Demand: 20

→ Detect deficit
→ Include pending demand
→ Add safety buffer
→ Generate reorder recommendation
```

---

# 🗺️ 9. Warehouse Visualization

The project includes a 3D warehouse component and warehouse-oriented UI.

The warehouse model provides a visual representation of physical storage operations and complements the data-driven warehouse pages.

The system models:

```text
Warehouse
 ├── Rows
 │    ├── Bin A01
 │    ├── Bin A02
 │    ├── ...
 │    └── Bin A06
 │
 ├── Row B
 │    ├── Bin B01
 │    └── ...
 │
 └── Row C
      ├── Bin C01
      └── ...
```

This helps bridge the gap between abstract inventory records and physical warehouse space.

---

# 📈 10. Analytics & Activity Tracking

STOCKPILOT includes operational analytics and an activity log.

Important events can be recorded such as:

- Product allocation
- Inventory activity
- Picking
- Order operations
- Warehouse events
- Delivery events
- Operational status changes

This creates an auditable operational timeline.

---

# 🔐 11. Authentication & Role-Based Experience

The application includes a unified login/signup portal and differentiates user experiences by role.

Supported roles include:

- Warehouse/operations users
- Managers
- Manufacturers
- Delivery partners

After login, the application routes users to the appropriate portal.

Example:

```text
Login
  │
  ├── Manufacturer → Manufacturer Portal
  │
  ├── Delivery → Delivery Portal
  │
  └── Warehouse / Manager → Operations Dashboard
```

---

# 🧪 12. Demo-Friendly Architecture

A major hackathon advantage is the zero/low-configuration demo path.

The backend:

1. Attempts to connect to `MONGODB_URI`.
2. If a configured MongoDB connection fails or is unavailable, it can fall back to `MongoMemoryServer`.
3. Automatically seeds realistic warehouse data when the database is empty.

This means judges can evaluate the product without spending significant time configuring a database.

---

# 🏗️ System Architecture

```text
                         ┌─────────────────────────┐
                         │      STOCKPILOT UI      │
                         │ React + TypeScript      │
                         │ Vite + Tailwind         │
                         └────────────┬────────────┘
                                      │
                              REST API Requests
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │     Express Server      │
                         │       Node.js           │
                         └────────────┬────────────┘
                                      │
          ┌───────────────────────────┼──────────────────────────┐
          │                           │                          │
          ▼                           ▼                          ▼
 ┌─────────────────┐        ┌──────────────────┐       ┌────────────────┐
 │ Business Routes │        │ Operational      │       │ AI Service     │
 │ Products        │        │ Services         │       │ Gemini         │
 │ Orders          │        │ Allocation       │       │ Insights       │
 │ Warehouse       │        │ Inventory        │       └────────────────┘
 │ Delivery        │        │ Seed / Demo      │
 │ Manufacturer    │        └──────────────────┘
 │ Analytics       │
 └────────┬────────┘
          │
          ▼
 ┌─────────────────────────┐
 │ MongoDB / MongoMemory   │
 │                         │
 │ Products                │
 │ Orders                  │
 │ Warehouses              │
 │ Rows / Bins             │
 │ Transactions            │
 │ Users                   │
 │ Deliveries              │
 │ Shipments               │
 │ Activity Logs           │
 └─────────────────────────┘
```

---

# 🧩 Technology Stack

## Frontend

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Lucide React
- Recharts
- Motion
- Three.js
- HTML5 QR/Barcode tooling
- JsBarcode
- Canvas Confetti

## Backend

- Node.js
- Express
- TypeScript
- Mongoose
- CORS
- dotenv

## Database

- MongoDB
- MongoMemoryServer fallback for demo/offline-friendly execution

## AI

- Google Gemini via `@google/genai`

---

# 📁 Project Structure

```text
storepilot-main/
│
├── api/
│   └── index.ts                 # Serverless API entry point
│
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── AddProductModal.tsx
│   │   ├── AutoBarcodeScanner.tsx
│   │   ├── BarcodeRenderer.tsx
│   │   ├── CameraScannerModal.tsx
│   │   ├── InboundArrivalsModal.tsx
│   │   ├── PickOrderModal.tsx
│   │   ├── ManufacturerChatbot.tsx
│   │   ├── Warehouse3DModel.tsx
│   │   └── delivery/
│   │
│   ├── pages/
│   │   ├── LoginPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── ProductsPage.tsx
│   │   ├── OrdersPage.tsx
│   │   ├── WarehousePage.tsx
│   │   ├── ScanPage.tsx
│   │   ├── AnalyticsPage.tsx
│   │   ├── ActivityPage.tsx
│   │   ├── DeliveryPage.tsx
│   │   ├── ManufacturerPage.tsx
│   │   └── SettingsPage.tsx
│   │
│   ├── services/
│   │   └── api.ts               # Frontend API client
│   │
│   ├── utils/
│   │   ├── imageBarcodeDecoder.ts
│   │   └── sound.ts
│   │
│   ├── App.tsx
│   ├── main.tsx
│   └── types.ts
│
├── server/
│   ├── models/
│   │   ├── ActivityLog.ts
│   │   ├── Bin.ts
│   │   ├── DeliveryHandover.ts
│   │   ├── DeliveryPartner.ts
│   │   ├── InboundShipment.ts
│   │   ├── InventoryTransaction.ts
│   │   ├── ManufacturerChat.ts
│   │   ├── ManufacturerProduct.ts
│   │   ├── Order.ts
│   │   ├── Product.ts
│   │   ├── Row.ts
│   │   ├── User.ts
│   │   └── Warehouse.ts
│   │
│   ├── routes/
│   │   ├── activityRoutes.ts
│   │   ├── analyticsRoutes.ts
│   │   ├── authRoutes.ts
│   │   ├── deliveryRoutes.ts
│   │   ├── demoRoutes.ts
│   │   ├── manufacturerRoutes.ts
│   │   ├── orderRoutes.ts
│   │   ├── productRoutes.ts
│   │   ├── scanRoutes.ts
│   │   └── warehouseRoutes.ts
│   │
│   ├── services/
│   │   ├── allocationService.ts
│   │   └── geminiService.ts
│   │
│   ├── db.ts
│   └── seed.ts
│
├── index.html
├── server.ts
├── package.json
└── metadata.json
```

---

# 🔌 API Overview

Base URL during local development:

```text
http://localhost:3000/api
```

## Health

```http
GET /api/health
```

Returns service and database status.

---

## Products

```http
GET    /api/products
GET    /api/products/:id
GET    /api/products/barcode/:barcode
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
```

---

## Orders

```http
GET  /api/orders
GET  /api/orders/:id
POST /api/orders
POST /api/orders/:id/pick-item
POST /api/orders/:id/dispatch
```

---

## Warehouse

```http
GET  /api/warehouse
GET  /api/warehouse/bins
GET  /api/warehouse/bin/:binCode
POST /api/warehouse/add-row
```

---

## Scanning

```http
POST /api/scan
POST /api/scan/inward
POST /api/scan/decode-image
```

---

## Analytics & Activity

```http
GET /api/analytics
GET /api/activity
```

---

## Delivery

Representative endpoints:

```http
GET   /api/deliveries/partners
POST  /api/deliveries/auth/login
POST  /api/deliveries/auth/register
GET   /api/deliveries/my-pickups/:phone
GET   /api/deliveries/datewise-tasks
PATCH /api/deliveries/tasks/:orderId/update
POST  /api/deliveries/assign-order
GET   /api/deliveries/assigned-pickups
POST  /api/deliveries/confirm-barcode-pickup
POST  /api/deliveries/send-daily-manifest
```

---

## Manufacturer

Representative endpoints:

```http
GET    /api/manufacturer/warehouses
GET    /api/manufacturer/shipments
POST   /api/manufacturer/shipments
POST   /api/manufacturer/shipments/:id/receive

GET    /api/manufacturer/my-products
POST   /api/manufacturer/my-products
PUT    /api/manufacturer/my-products/:id
POST   /api/manufacturer/my-products/:id/adjust
DELETE /api/manufacturer/my-products/:id

GET    /api/manufacturer/chat/messages
POST   /api/manufacturer/chat/messages
POST   /api/manufacturer/chat/book-slot
GET    /api/manufacturer/warehouse-notifications
```

---

# ⚙️ Installation & Local Setup

## Prerequisites

Install:

- Node.js
- npm
- Git

MongoDB is optional for a local demo because the project can fall back to an embedded MongoDB memory server.

---

## 1. Clone the Repository

```bash
git clone <your-repository-url>
cd storepilot-main
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create a `.env` or `.env.local` file.

Recommended:

```env
GEMINI_API_KEY=your_gemini_api_key
MONGODB_URI=your_mongodb_connection_string
```

### Notes

- `GEMINI_API_KEY` enables Gemini-powered recommendations.
- `MONGODB_URI` points to an external MongoDB database.
- If `MONGODB_URI` is unavailable, the application attempts to use `MongoMemoryServer`.

For a basic demo, the AI key can be omitted and the deterministic warehouse recommendation logic can still operate.

---

## 4. Start Development Server

```bash
npm run dev
```

The application runs at:

```text
http://localhost:3000
```

---

# 🏭 Production Build

Build the frontend and bundled backend:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

Type-check the project:

```bash
npm run lint
```

Manually reseed demo data:

```bash
npm run seed
```

---

# 🧪 Demo Data

The seed system creates a realistic warehouse environment containing:

- Multiple warehouses
- Warehouse rows
- Storage bins
- Products
- Orders
- Inventory transactions
- Activity logs
- Delivery partners
- Delivery handovers
- Inbound shipments
- Users

The seeded data is designed to make the dashboard immediately demonstrable during a hackathon presentation.

---

# 🎬 Recommended 3–5 Minute Hackathon Demo

A strong demo should tell a story rather than click randomly through pages.

## Scene 1 — The Problem

Start on the dashboard.

Say:

> “A warehouse manager can see inventory numbers, but the real problem is deciding what needs attention right now.”

Point to:

- Low-stock count
- Pending orders
- Warehouse occupancy
- Activity feed
- AI recommendations

---

## Scene 2 — Product Arrives

Open the inbound/scanning workflow.

Demonstrate:

1. Scan or identify a product.
2. Process inbound stock.
3. Show the system assigning a storage location.
4. Explain the allocation logic.

Highlight:

> “Instead of manually deciding where stock goes, STOCKPILOT automatically finds capacity and consolidates existing SKU inventory where possible.”

---

## Scene 3 — Customer Order

Open Orders.

Demonstrate:

1. Select a pending order.
2. Start picking.
3. Pick an item.
4. Verify the barcode.
5. Complete the fulfillment step.

Highlight:

> “The inventory and order workflows are connected, so warehouse actions create operational state changes instead of isolated UI updates.”

---

## Scene 4 — Delivery Handover

Switch to the Delivery Portal.

Show:

- Assigned pickup
- Warehouse location
- Pickup task
- Barcode confirmation
- Handover/manifest workflow

Highlight:

> “Our workflow doesn't stop when the warehouse packs the order. The delivery partner becomes part of the same operational system.”

---

## Scene 5 — AI Intelligence

Return to the dashboard.

Show the AI recommendation area.

Explain:

> “The platform doesn't just tell managers that inventory is low. It combines stock thresholds and pending demand to suggest what to reorder and provides slotting and throughput recommendations.”

Then mention:

> “If Gemini is unavailable, deterministic recommendations keep the operational system running.”

---

# 🧠 Hackathon Judging Angle

## Innovation

STOCKPILOT combines:

- Warehouse management
- Barcode operations
- Intelligent storage allocation
- Delivery coordination
- Manufacturer collaboration
- AI recommendations
- Warehouse visualization

into one platform.

---

## Technical Complexity

The solution demonstrates:

- React frontend architecture
- Express REST APIs
- MongoDB data modeling
- Multiple operational entities
- Stateful workflows
- Allocation algorithms
- Barcode processing
- AI integration
- Role-specific portals
- Serverless-compatible API entry point
- Demo database fallback
- Seeded realistic data

---

## Business Impact

Potential impact areas:

### Reduced picking time

Better slotting and warehouse organization can reduce unnecessary picker travel.

### Fewer stockouts

Low-stock detection + demand-aware recommendations provide earlier intervention.

### Faster receiving

Barcode/inbound workflows reduce manual entry.

### Better handovers

Barcode-confirmed pickup creates clearer accountability between warehouse and delivery teams.

### Better supplier collaboration

Manufacturers gain visibility into shipments, products, warehouse status, and communication.

---

# 📊 Success Metrics

For a production deployment, the platform can be evaluated using:

| KPI | What it Measures |
|---|---|
| Inventory Accuracy | System stock vs physical stock |
| Pick Cycle Time | Time required to fulfill a pick |
| Order Fulfillment Rate | Orders completed successfully |
| Stockout Rate | Frequency of unavailable SKUs |
| Picking Distance | Picker movement per order |
| Dock-to-Stock Time | Inbound receiving efficiency |
| Dispatch SLA | Time from order ready to dispatch |
| Pickup Confirmation Rate | Successful barcode handovers |
| Warehouse Utilization | Occupied vs available capacity |
| AI Recommendation Adoption | Actions taken from recommendations |

---

# 🔮 Future Roadmap

## Phase 1 — Operational Intelligence

- Demand forecasting
- Historical velocity analysis
- Smarter reorder quantities
- ABC inventory classification

## Phase 2 — Advanced Optimization

- AI-based dynamic slotting
- Pick-path optimization
- Multi-order batching
- Warehouse congestion prediction

## Phase 3 — Computer Vision

- Camera-based shelf verification
- Automated barcode recognition
- Visual stock counting
- Empty-bin detection
- Damaged-product detection

## Phase 4 — Enterprise Integration

- ERP integrations
- WMS integrations
- E-commerce integrations
- Logistics provider APIs
- Supplier APIs

## Phase 5 — Autonomous Warehouse

```text
Sensor / Camera Data
       ↓
Real-Time Warehouse State
       ↓
AI Decision Engine
       ↓
Optimization
       ↓
Human / Robot Execution
       ↓
Feedback Loop
```

---

# 🔒 Production Hardening Checklist

Before enterprise deployment, consider:

- [ ] JWT/session-based authentication
- [ ] Password hashing with a dedicated auth strategy
- [ ] Role-based authorization middleware
- [ ] Request validation with schemas
- [ ] Rate limiting
- [ ] Audit logging
- [ ] Database indexes
- [ ] Transactional inventory updates
- [ ] Concurrency control for stock allocation
- [ ] Secrets management
- [ ] HTTPS
- [ ] CORS restrictions
- [ ] Structured logging
- [ ] Monitoring and alerting
- [ ] Automated tests
- [ ] CI/CD
- [ ] Backup and disaster recovery

---

# 🧱 Important Engineering Considerations

## Inventory Concurrency

In a real warehouse, two operators may try to allocate or pick the same SKU simultaneously.

Production implementation should use database transactions, atomic updates, or optimistic concurrency controls to prevent overselling or over-allocation.

## AI Reliability

AI recommendations should remain advisory.

Critical inventory operations should use deterministic business rules and validated database state rather than relying solely on an LLM response.

## Physical Validation

A production warehouse should pair digital inventory with periodic cycle counts and physical verification.

---

# 🏅 Why STOCKPILOT Fits a Hackathon

A strong hackathon project should demonstrate three things:

### 1. A real problem

Warehouse inefficiency directly impacts:

- Cost
- Delivery speed
- Customer satisfaction
- Working capital

### 2. A believable solution

STOCKPILOT provides an actual operational workflow rather than a static prototype.

### 3. A memorable differentiator

The combination of:

> **Smart Allocation + Barcode Operations + Multi-Portal Collaboration + AI Warehouse Intelligence**

makes the project easy to explain and demonstrate.

---

# 🎤 One-Minute Pitch

> **STOCKPILOT is an AI-powered warehouse control tower that connects inventory, storage, order fulfillment, delivery partners, and manufacturers in one real-time platform.**
>
> Instead of simply showing warehouse data, STOCKPILOT takes operational decisions — automatically allocating incoming stock to suitable bins, detecting low-stock risks, assisting barcode-based picking, coordinating delivery handovers, and generating AI-powered recommendations for restocking and warehouse optimization.
>
> Our goal is simple: **make every warehouse decision faster, smarter, and more traceable.**

---

# 🧑‍⚖️ Suggested Judge Q&A

### Q: What is innovative about this?

**A:** We combine warehouse execution and intelligence. The system doesn't only monitor inventory; it automatically allocates stock, supports barcode-driven operations, connects delivery and manufacturer portals, and generates actionable optimization recommendations.

### Q: Why use AI?

**A:** AI converts operational data into recommendations such as warehouse health summaries, restocking priorities, slotting improvements, and throughput tips. Core inventory safety logic remains deterministic.

### Q: What happens if the AI API fails?

**A:** The application falls back to deterministic heuristic recommendations, so essential warehouse operations continue.

### Q: Can it scale?

**A:** The architecture separates frontend, REST APIs, business services, and persistence. The API also includes a serverless-compatible entry point. Production scaling would add database indexing, transactions, authorization, observability, and horizontal scaling.

### Q: What is your biggest future opportunity?

**A:** Predictive warehouse optimization — combining historical demand, real-time inventory, pick paths, congestion, and inbound schedules to proactively optimize warehouse operations.

---

# 🛡️ Responsible AI

STOCKPILOT treats AI as an operational decision-support layer.

The system should:

- Keep humans responsible for critical decisions.
- Validate AI-generated structured output.
- Avoid exposing sensitive operational data unnecessarily.
- Maintain deterministic safeguards.
- Log important operational decisions.
- Provide explainable reasons for recommendations where possible.

---

# 🤝 Team Presentation Structure

For a team hackathon presentation, divide the story into:

### Member 1 — Problem & Product

- Warehouse pain points
- STOCKPILOT overview
- Dashboard

### Member 2 — Technical Architecture

- React
- Express
- MongoDB
- API architecture
- Data models

### Member 3 — AI & Algorithms

- Bin allocation
- Low-stock intelligence
- Gemini integration
- Fallback logic

### Member 4 — Demo & Impact

- Barcode workflow
- Delivery portal
- Manufacturer portal
- Business impact
- Roadmap

---

# 📜 Available Scripts

| Command | Purpose |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build frontend + backend |
| `npm start` | Start production build |
| `npm run seed` | Seed/reseed database |
| `npm run lint` | Type-check project |
| `npm run clean` | Remove build artifacts |

---

# 📄 License

Add the project's chosen license here before public release.

---

# 🌍 Vision

STOCKPILOT starts as a warehouse management platform and can evolve into an **AI-native logistics operating system**.

The long-term vision is:

```text
SEE
↓
UNDERSTAND
↓
PREDICT
↓
OPTIMIZE
↓
ACT
↓
LEARN
```

### STOCKPILOT

**From warehouse data → to warehouse decisions.**

### 🚀 Built for speed. Designed for operations. Powered by intelligence.

**STOCKPILOT — The intelligent control tower for modern warehouses.**

</div>

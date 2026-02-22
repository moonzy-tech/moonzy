# Moonzy Admin Portal

Separate Next.js app for brand admins: dashboard, products, orders, customers, and shipments (Shiprocket).

## Setup

1. Copy `.env.local.example` to `.env.local`.
2. Set `NEXT_PUBLIC_API_URL` to your API URL (e.g. `http://localhost:4000`).
3. Set `NEXT_PUBLIC_GOOGLE_CLIENT_ID` (same as the API’s Google OAuth client).
4. Ensure the API is running and allows this origin in CORS (e.g. `http://localhost:3001`).
5. In the API, set `GOOGLE_CLIENT_SECRET` so the auth-code flow works.

## Run

From repo root:

```bash
npm run dev
```

Runs all apps; admin portal is at **http://localhost:3001**.

Or only the admin portal:

```bash
cd apps/admin-portal && npm run dev
```

## Access

- Open http://localhost:3001 and sign in with Google.
- Only users with `role: "admin"` in the database can use the dashboard. Promote a user in MongoDB:

  ```js
  db.users.updateOne({ email: "your@email.com" }, { $set: { role: "admin" } })
  ```

## Features

- **Dashboard**: Orders, revenue, pending/paid counts, recent orders.
- **Products**: List, add, edit, delete (CRUD).
- **Orders**: List (with status filter), view detail, update status.
- **Customers**: List with order count and total spent, view detail with order history.
- **Shipments**: List; create Shiprocket shipment from a paid/processing order (on order detail page).

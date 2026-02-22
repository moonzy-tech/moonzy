# Moonzy API

Backend for the Moonzy brand store: products, orders, payments (Razorpay), shipping (Shiprocket), and admin.

## Setup

1. Copy `.env.example` to `.env` and fill in values.
2. Ensure MongoDB is running (`MONGODB_URI`).
3. Install and run from repo root:
   - `npm install`
   - `npm run dev` (runs all workspaces) or `cd apps/api && npm run dev`

## Environment

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default 4000) |
| `MONGODB_URI` | MongoDB connection string |
| `SESSION_SECRET` | Secret for signing session cookie (min 16 chars) |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID for sign-in |
| `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` | Razorpay API keys |
| `RAZORPAY_WEBHOOK_SECRET` | For verifying Razorpay webhooks |
| `SHIPROCKET_EMAIL` / `SHIPROCKET_PASSWORD` | Shiprocket API login |

## Making an admin

Admins are users with `role: "admin"`. After signing in with Google once, set the role in MongoDB:

```js
db.users.updateOne(
  { email: "your@email.com" },
  { $set: { role: "admin" } }
)
```

## API overview

- **Auth**: `POST /auth/google` (body: `{ idToken }`), `GET /auth/me`, `POST /auth/logout`
- **Products**: `GET /products`, `GET /products/by-slug/:slug` (public); admin CRUD under `/products/admin` and `/products/admin/:id`
- **Orders**: `POST /orders` (create), `GET /orders`, `GET /orders/:id` (authenticated)
- **Payments**: `POST /payments/create-order` (body: `{ orderId }`), `POST /payments/verify` (Razorpay payload), `POST /payments/webhook` (Razorpay webhook)
- **Admin**: All under `/admin` (require admin role)
  - `GET /admin/dashboard` – stats, revenue, recent orders
  - `GET /admin/orders`, `GET /admin/orders/:id`, `PATCH /admin/orders/:id`
  - `GET /admin/customers`, `GET /admin/customers/:id`
  - `GET /admin/shipments`, `POST /admin/shipments/create/:orderId`, `PATCH /admin/shipments/:id`

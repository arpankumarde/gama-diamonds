# Auth + Product Routes Testing Guide

This guide helps you test the backend endpoints implemented in:
- `src/routes/auth.routes.ts`
- `src/controllers/auth.controller.ts`
- `src/routes/product.routes.ts`
- `src/controllers/product.controller.ts`
- `src/middleware/auth.middleware.ts`
- `src/middleware/product.middleware.ts`

## 1) Prerequisites

- MongoDB running (the code uses `MONGO_URI`)
- Backend running from `server/` (example: `pnpm dev`)

### Required environment variables

Create a `.env` file inside `server/`.

Minimum needed by the code:
- `PORT` (optional; defaults to `5000` in `src/index.ts`)
- `MONGO_URI`
- `JWT_SECRET` (required for JWT verification)

Recommended:
- `CLIENT_URL` (CORS `origin` in `src/index.ts`)

Example `.env`:
```env
PORT=5001
MONGO_URI="mongodb://localhost:27017/gama"
JWT_SECRET="change-this-secret"
CLIENT_URL="http://localhost:3000"
```

## 2) Notes about data needed for product creation

Admin product creation requires a valid `category` id:
- In `src/middleware/product.middleware.ts`, `validateProductData` checks category existence (if `category` is provided).
- `category` routes do not exist in the current codebase, so you must create at least one `Category` document in MongoDB before calling `POST /api/products`.

A minimal `Category` document needs:
- `name`
- `slug` (unique, lowercase)
- `isActive` (optional; defaults to `true`)

## 3) Obtain a JWT token (login/register)

### Admin vs superadmin

Admin endpoints require `req.user.role` to be either:
- `"admin"` or `"superadmin"`

Create a user with the desired role:

### Register
`POST {BASE_URL}/api/auth/register`

Body:
```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "password123",
  "role": "admin"
}
```

Response includes `token`.

### Login (alternative)
`POST {BASE_URL}/api/auth/login`

Body:
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```

Response includes `token`.

## 4) Public product endpoints

All public product endpoints are mounted under `GET /api/products`.

### List products (with filters + pagination)
`GET {BASE_URL}/api/products?page=1&limit=12&category=...&minPrice=...&maxPrice=...`

Supported query params (as implemented):
- `page`, `limit`
- `category`
- `minPrice`, `maxPrice`
- `carat`
- `color`, `clarity`, `cut`, `shape`
- `metal`
- `search` (matches `name`, `description`, `tags`)
- `sort` (optional; default `-createdAt` in controller)

### Featured products
`GET {BASE_URL}/api/products/featured?limit=8`

### Filter options
`GET {BASE_URL}/api/products/filters`

### Product by slug
`GET {BASE_URL}/api/products/slug/:slug`

### Product by id
`GET {BASE_URL}/api/products/:id`

### Related products
`GET {BASE_URL}/api/products/:id/related?limit=4`

## 5) Admin product endpoints (require token)

Admin routes are protected by:
- `authenticate` + `authorize("admin","superadmin")`

Send header:
- `Authorization: Bearer {TOKEN}`

### Create product
`POST {BASE_URL}/api/products`

Body (minimum required fields):
```json
{
  "name": "Diamond Ring",
  "price": 1000,
  "sku": "SKU-ABC-001",
  "category": "PUT_VALID_CATEGORY_ID_HERE"
}
```

Optional fields (supported by schema + middleware):
- `description`
- `images` (array of strings)
- `stock` (>= 0)
- `carat` (>= 0)
- `color`, `clarity`, `cut`, `shape` (validated against allowed lists)
- `metal` (validated against allowed metals)
- `salePrice` (>= 0, must be `< price` when provided)
- `tags` (array of strings; sanitized to lowercase)
- `isActive` (boolean)

### Update product
`PUT {BASE_URL}/api/products/:id`

Body: same shape as create. `validateProductExists` runs before controller logic.

### Delete product
`DELETE {BASE_URL}/api/products/:id`

### Toggle product active status
`PATCH {BASE_URL}/api/products/:id/status`

### Update stock
`PATCH {BASE_URL}/api/products/:id/stock`

Body:
```json
{
  "stock": 12
}
```

## 6) Auth endpoints you can test quickly

### Get current user by token
`GET {BASE_URL}/api/auth/users`

Header:
- `Authorization: Bearer {TOKEN}`

### Logout
`GET {BASE_URL}/api/auth/logout`

This implementation returns a success message and does not invalidate JWT server-side.

## 7) Example curl commands (quick smoke tests)

Set:
```bash
BASE_URL="http://localhost:5001"
TOKEN="paste_jwt_here"
```

Register admin:
```bash
curl -X POST "$BASE_URL/api/auth/register" ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Admin User\",\"email\":\"admin@example.com\",\"password\":\"password123\",\"role\":\"admin\"}"
```

Login:
```bash
curl -X POST "$BASE_URL/api/auth/login" ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@example.com\",\"password\":\"password123\"}"
```

Get auth user:
```bash
curl -X GET "$BASE_URL/api/auth/users" ^
  -H "Authorization: Bearer $TOKEN"
```

Create product:
```bash
curl -X POST "$BASE_URL/api/products" ^
  -H "Authorization: Bearer $TOKEN" ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Diamond Ring\",\"price\":1000,\"sku\":\"SKU-ABC-001\",\"category\":\"PUT_VALID_CATEGORY_ID_HERE\"}"
```


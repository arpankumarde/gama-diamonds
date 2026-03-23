# Product API Test Data

## Base URL
```
http://localhost:5000/api
```

## Postman Environment Variables
| Variable | Value |
|----------|-------|
| `baseUrl` | `http://localhost:5000/api` |
| `adminToken` | paste token after admin login |
| `categoryId` | paste category _id from DB |
| `productId` | paste product _id after creating |

---

## 1. Create Product
**POST** `{{baseUrl}}/products`

| Header | Value |
|--------|-------|
| Authorization | Bearer `{{adminToken}}` |
| Content-Type | application/json |

> Slug is auto-generated from name — do NOT send slug in body.

### Diamond Ring
```json
{
  "name": "Classic Solitaire Diamond Ring",
  "description": "Elegant 1 carat round brilliant diamond set in 18K white gold. Perfect for engagements.",
  "price": 5999.99,
  "salePrice": 4999.99,
  "sku": "DR-SOL-001",
  "category": "{{categoryId}}",
  "images": [
    "https://example.com/images/ring1-front.jpg",
    "https://example.com/images/ring1-side.jpg"
  ],
  "carat": 1.0,
  "color": "F",
  "clarity": "VS1",
  "cut": "Excellent",
  "shape": "Round",
  "metal": "White Gold",
  "stock": 5,
  "tags": ["engagement", "solitaire", "classic", "wedding"]
}
```

### Diamond Necklace
```json
{
  "name": "Princess Cut Diamond Pendant Necklace",
  "description": "Stunning princess cut diamond pendant on 18K yellow gold chain.",
  "price": 3499.99,
  "sku": "DN-PEN-002",
  "category": "{{categoryId}}",
  "images": [
    "https://example.com/images/necklace1.jpg"
  ],
  "carat": 0.75,
  "color": "G",
  "clarity": "VVS2",
  "cut": "Very Good",
  "shape": "Princess",
  "metal": "Yellow Gold",
  "stock": 8,
  "tags": ["necklace", "pendant", "gift"]
}
```

### Diamond Earrings
```json
{
  "name": "Round Diamond Stud Earrings",
  "description": "Timeless round diamond stud earrings in platinum. 1.5 carats total weight.",
  "price": 7999.99,
  "salePrice": 6999.99,
  "sku": "DE-STU-003",
  "category": "{{categoryId}}",
  "images": [
    "https://example.com/images/earrings1.jpg"
  ],
  "carat": 1.5,
  "color": "D",
  "clarity": "IF",
  "cut": "Excellent",
  "shape": "Round",
  "metal": "Platinum",
  "stock": 3,
  "tags": ["earrings", "studs", "classic"]
}
```

### Diamond Bracelet
```json
{
  "name": "Emerald Cut Diamond Tennis Bracelet",
  "description": "Luxurious tennis bracelet featuring emerald cut diamonds in 18K white gold.",
  "price": 15999.99,
  "sku": "DB-TEN-004",
  "category": "{{categoryId}}",
  "images": [
    "https://example.com/images/bracelet1.jpg"
  ],
  "carat": 5.0,
  "color": "E",
  "clarity": "VVS1",
  "cut": "Very Good",
  "shape": "Emerald",
  "metal": "White Gold",
  "stock": 2,
  "tags": ["bracelet", "tennis", "luxury"]
}
```

### Engagement Ring
```json
{
  "name": "Cushion Cut Halo Diamond Engagement Ring",
  "description": "Breathtaking cushion cut center stone surrounded by micro-pave diamonds in rose gold.",
  "price": 8999.99,
  "sku": "DR-HAL-005",
  "category": "{{categoryId}}",
  "images": [
    "https://example.com/images/halo-ring1.jpg"
  ],
  "carat": 2.0,
  "color": "H",
  "clarity": "VS2",
  "cut": "Excellent",
  "shape": "Cushion",
  "metal": "Rose Gold",
  "stock": 4,
  "tags": ["engagement", "halo", "romantic"]
}
```

### Heart Shape Pendant
```json
{
  "name": "Heart Shape Diamond Pendant",
  "description": "Romantic heart-shaped diamond pendant perfect for Valentine's Day.",
  "price": 2999.99,
  "sku": "DN-HRT-006",
  "category": "{{categoryId}}",
  "images": [
    "https://example.com/images/heart-pendant1.jpg"
  ],
  "carat": 0.5,
  "color": "G",
  "clarity": "VS2",
  "cut": "Very Good",
  "shape": "Heart",
  "metal": "White Gold",
  "stock": 10,
  "tags": ["heart", "romantic", "gift", "valentine"]
}
```

---

## 2. Update Product
**PUT** `{{baseUrl}}/products/{{productId}}`

| Header | Value |
|--------|-------|
| Authorization | Bearer `{{adminToken}}` |
| Content-Type | application/json |

```json
{
  "name": "Classic Solitaire Diamond Ring - Updated",
  "price": 6299.99,
  "salePrice": 5299.99,
  "stock": 8,
  "description": "Updated description with more details about the craftsmanship."
}
```

---

## 3. Update Stock
**PATCH** `{{baseUrl}}/products/{{productId}}/stock`

| Header | Value |
|--------|-------|
| Authorization | Bearer `{{adminToken}}` |
| Content-Type | application/json |

```json
{
  "stock": 15
}
```

---

## 4. Toggle Status
**PATCH** `{{baseUrl}}/products/{{productId}}/status`

| Header | Value |
|--------|-------|
| Authorization | Bearer `{{adminToken}}` |

No body required — toggles `isActive` between true/false.

---

## 5. Delete Product
**DELETE** `{{baseUrl}}/products/{{productId}}`

| Header | Value |
|--------|-------|
| Authorization | Bearer `{{adminToken}}` |

No body required.

---

## 6. Get All Products
**GET** `{{baseUrl}}/products`

No auth required.

### Query Examples

| Purpose | URL |
|---------|-----|
| Basic | `{{baseUrl}}/products` |
| Pagination | `{{baseUrl}}/products?page=1&limit=12` |
| Price range | `{{baseUrl}}/products?minPrice=1000&maxPrice=8000` |
| By color | `{{baseUrl}}/products?color=F` |
| By clarity | `{{baseUrl}}/products?clarity=VS1` |
| By cut | `{{baseUrl}}/products?cut=Excellent` |
| By shape | `{{baseUrl}}/products?shape=Round` |
| By metal | `{{baseUrl}}/products?metal=White Gold` |
| By category | `{{baseUrl}}/products?category={{categoryId}}` |
| Search | `{{baseUrl}}/products?search=engagement` |
| Sort low-high | `{{baseUrl}}/products?sort=price` |
| Sort high-low | `{{baseUrl}}/products?sort=-price` |
| Newest first | `{{baseUrl}}/products?sort=-createdAt` |
| Combined | `{{baseUrl}}/products?minPrice=2000&maxPrice=8000&color=F&shape=Round&sort=-price&page=1&limit=12` |

---

## 7. Get Product by ID
**GET** `{{baseUrl}}/products/{{productId}}`

No auth required.

---

## 8. Get Product by Slug
**GET** `{{baseUrl}}/products/slug/classic-solitaire-diamond-ring`

No auth required.

---

## 9. Get Featured Products
**GET** `{{baseUrl}}/products/featured?limit=8`

No auth required.

---

## 10. Get Related Products
**GET** `{{baseUrl}}/products/{{productId}}/related?limit=4`

No auth required.

---

## 11. Get Filter Options
**GET** `{{baseUrl}}/products/filters`

No auth required.

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "colors": ["D", "E", "F", "G", "H"],
    "clarities": ["IF", "VVS1", "VVS2", "VS1", "VS2"],
    "cuts": ["Excellent", "Very Good", "Good"],
    "shapes": ["Round", "Princess", "Cushion", "Emerald", "Oval"],
    "metals": ["White Gold", "Yellow Gold", "Rose Gold", "Platinum"],
    "categories": [],
    "priceRange": { "min": 2999.99, "max": 15999.99 }
  }
}
```

---

## Validation Test Cases (Should Fail)

### Missing Required Fields → 400
```json
{
  "description": "Missing name, price and sku"
}
```

### Negative Price → 400
```json
{
  "name": "Test Product",
  "price": -100,
  "sku": "TEST-001"
}
```

### Invalid Color (not in enum) → 400
```json
{
  "name": "Test Product",
  "price": 1000,
  "sku": "TEST-002",
  "color": "Z"
}
```

### Invalid Clarity → 400
```json
{
  "name": "Test Product",
  "price": 1000,
  "sku": "TEST-003",
  "clarity": "INVALID"
}
```

### Invalid Cut → 400
```json
{
  "name": "Test Product",
  "price": 1000,
  "sku": "TEST-004",
  "cut": "Super Excellent"
}
```

### Invalid Metal → 400
```json
{
  "name": "Test Product",
  "price": 1000,
  "sku": "TEST-005",
  "metal": "Copper"
}
```

### Invalid Shape → 400
```json
{
  "name": "Test Product",
  "price": 1000,
  "sku": "TEST-006",
  "shape": "Triangle"
}
```

### Duplicate SKU → 400
```json
{
  "name": "Duplicate Product",
  "price": 1000,
  "sku": "DR-SOL-001"
}
```

### No Token on Admin Route → 401
```
POST {{baseUrl}}/products
(no Authorization header)
```

### Customer Token on Admin Route → 403
```
POST {{baseUrl}}/products
Authorization: Bearer {{customerToken}}
```

---

## Test Order
```
1. Login as admin          → copy token to {{adminToken}}
2. Create category         → copy _id to {{categoryId}}
3. POST   /products        → create products, copy _id to {{productId}}
4. GET    /products        → get all with filters
5. GET    /products/featured
6. GET    /products/filters
7. GET    /products/:id
8. GET    /products/slug/:slug
9. GET    /products/:id/related
10. PUT   /products/:id    → update product
11. PATCH /products/:id/stock
12. PATCH /products/:id/status
13. DELETE /products/:id
```

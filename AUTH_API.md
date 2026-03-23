# Auth API - Postman Test Data

## Base URL
```
http://localhost:5000/api
```

## Environment Variables
| Variable | Value |
|----------|-------|
| `baseUrl` | `http://localhost:5000/api` |
| `token` | paste token after customer login |
| `adminToken` | paste token after admin login |

---

## Endpoints

### 1. Register
**POST** `{{baseUrl}}/auth/register`

| Header | Value |
|--------|-------|
| Content-Type | application/json |

**Customer**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Test@1234",
  "phone": "9876543210"
}
```

**Missing Fields → 400**
```json
{
  "email": "john@example.com"
}
```

**Duplicate Email → 400**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Test@1234"
}
```

---

### 2. Login
**POST** `{{baseUrl}}/auth/login`

| Header | Value |
|--------|-------|
| Content-Type | application/json |

**Customer Login → 200**
```json
{
  "email": "john@example.com",
  "password": "Test@1234"
}
```

**Admin Login → 200**
```json
{
  "email": "admin@gamadiamond.com",
  "password": "Admin@1234"
}
```

**Wrong Password → 401**
```json
{
  "email": "john@example.com",
  "password": "wrongpassword"
}
```

**Non-existent User → 401**
```json
{
  "email": "ghost@example.com",
  "password": "Test@1234"
}
```

**Missing Fields → 400**
```json
{
  "email": "john@example.com"
}
```

---

### 3. Get Me
**GET** `{{baseUrl}}/auth/me`

| Header | Value |
|--------|-------|
| Authorization | Bearer `{{token}}` |

**No Body Required**

| Scenario | Token | Expected |
|----------|-------|----------|
| Valid token | `{{token}}` | 200 - user data |
| No token | none | 401 |
| Expired token | expired JWT | 401 |

---

### 4. Logout
**POST** `{{baseUrl}}/auth/logout`

| Header | Value |
|--------|-------|
| Authorization | Bearer `{{token}}` |

**No Body Required**

| Scenario | Token | Expected |
|----------|-------|----------|
| Valid token | `{{token}}` | 200 - logged out |
| No token | none | 401 |

---

### 5. Get All Users
**GET** `{{baseUrl}}/auth/users`

| Header | Value |
|--------|-------|
| Authorization | Bearer `{{adminToken}}` |

**No Body Required**

| Scenario | Token | Expected |
|----------|-------|----------|
| Admin token | `{{adminToken}}` | 200 - users list |
| Customer token | `{{token}}` | 403 - access denied |
| No token | none | 401 |

---

## Test Order

```
1. POST /auth/register     → create customer account
2. POST /auth/login        → login and copy token to {{token}}
3. POST /auth/login        → login as admin and copy token to {{adminToken}}
4. GET  /auth/me           → verify token works
5. GET  /auth/users        → test admin access
6. POST /auth/logout       → logout
```

---

## Expected Responses

### Success - Register (201)
```json
{
  "success": true,
  "message": "Registered successfully",
  "token": "eyJ...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

### Success - Login (200)
```json
{
  "success": true,
  "message": "Logged in successfully",
  "token": "eyJ...",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

### Error - Unauthorized (401)
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

### Error - Access Denied (403)
```json
{
  "success": false,
  "message": "Access denied"
}
```

### Error - Account Locked (423)
```json
{
  "success": false,
  "message": "Account temporarily locked"
}
```

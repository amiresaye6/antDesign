# IVITASA API Documentation

## Base URL

https://sys.ivitasa.com/api


## Authentication & User Management

### 1. **User Sign Up**
- **Endpoint:** `/signup`
- **Method:** `POST`
- **Description:** Registers a new user.
- **Request Parameters:**
  | Parameter   | Type   | Required | Description |
  |------------|--------|----------|-------------|
  | first_name | String | Yes      | User's first name |
  | last_name  | String | Yes      | User's last name |
  | email      | String | Yes      | User's email (must be unique) |
  | password   | String | Yes      | User's password |

- **Response Example (Success)**:
```json
{
  "status": "success",
  "message": "User registered successfully."
}
```

---

### 2. **User Login**
- **Endpoint:** `/login`
- **Method:** `POST`
- **Description:** Logs in a user.
- **Request Parameters:**
  | Parameter | Type   | Required | Description |
  |----------|--------|----------|-------------|
  | email    | String | Yes      | User's email |
  | password | String | Yes      | User's password |

- **Response Example (Success)**:
```json
{
  "status": "success",
  "user": {
    "id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "johndoe@example.com",
    "created_at": "2024-01-01 10:00:00",
    "activated": 1
  }
}
```

---

### 3. **Get User by ID**
- **Endpoint:** `/get_user`
- **Method:** `GET`
- **Request Parameters:**
  | Parameter | Type | Required | Description |
  |----------|------|----------|-------------|
  | id       | Int  | Yes      | User ID |

- **Response Example (Success)**:
```json
{
  "status": "success",
  "user": {
    "first_name": "John",
    "last_name": "Doe",
    "email": "johndoe@example.com",
    "created_at": "2024-01-01 10:00:00",
    "activated": 1
  }
}
```

---

### 4. **Change Password**
- **Endpoint:** `/change_password`
- **Method:** `POST`
- **Request Parameters:**
  | Parameter         | Type   | Required | Description |
  |------------------|--------|----------|-------------|
  | user_id         | Int    | Yes      | User ID |
  | old_password    | String | Yes      | Current password |
  | new_password    | String | Yes      | New password |
  | confirm_password | String | Yes      | Confirm new password |

- **Response Example (Success)**:
```json
{
  "status": "success",
  "message": "Password changed successfully."
}
```

---

## Role Management

### 5. **Create Role**
- **Endpoint:** `/create_role`
- **Method:** `POST`
- **Request Parameters:**
  | Parameter | Type   | Required | Description |
  |----------|--------|----------|-------------|
  | name     | String | Yes      | Role name |

---

### 6. **Get Role by ID**
- **Endpoint:** `/get_role`
- **Method:** `GET`
- **Request Parameters:**
  | Parameter | Type | Required | Description |
  |----------|------|----------|-------------|
  | id       | Int  | Yes      | Role ID |

---

### 7. **Update Role**
- **Endpoint:** `/update_role`
- **Method:** `POST`
- **Request Parameters:**
  | Parameter | Type   | Required | Description |
  |----------|--------|----------|-------------|
  | role_id  | Int    | Yes      | Role ID |
  | name     | String | Yes      | New role name |

---

### 8. **Assign Role to User**
- **Endpoint:** `/assign_role`
- **Method:** `POST`
- **Request Parameters:**
  | Parameter | Type | Required | Description |
  |----------|------|----------|-------------|
  | user_id  | Int  | Yes      | User ID |
  | role_id  | Int  | Yes      | Role ID |

---

### 9. **Get User Roles**
- **Endpoint:** `/get_user_roles`
- **Method:** `GET`
- **Request Parameters:**
  | Parameter | Type | Required | Description |
  |----------|------|----------|-------------|
  | user_id  | Int  | Yes      | User ID |

- **Response Example (Success)**:
```json
{
  "status": "success",
  "roles": [
    {
      "id": 1,
      "name": "Admin"
    },
    {
      "id": 2,
      "name": "Editor"
    }
  ]
}
```

---

### 10. **Remove Role From User**
- **Endpoint:** `/remove_user_role`
- **Method:** `POST`
- **Request Parameters:**
  | Parameter | Type | Required | Description |
  |----------|------|----------|-------------|
  | user_id  | Int  | Yes      | User ID |
  | role_id  | Int  | Yes      | Role ID |

---

## Platform Management

### 11. **Create Platform**
- **Endpoint:** `/create_platform`
- **Method:** `POST`
- **Request Parameters:**
  | Parameter | Type   | Required | Description |
  |----------|--------|----------|-------------|
  | name     | String | Yes      | Platform name |

---

### 12. **Get Platform by ID**
- **Endpoint:** `/get_platform`
- **Method:** `GET`
- **Request Parameters:**
  | Parameter | Type | Required | Description |
  |----------|------|----------|-------------|
  | id       | Int  | Yes      | Platform ID |

---

### Curl Requests

```
curl -X POST "https://sys.ivitasa.com/api/signup" -H "Content-Type: application/json" -d "{\"first_name\":\"John\",\"last_name\":\"Doe\",\"email\":\"johndoe@example.com\",\"password\":\"securepassword\"}"

curl -X POST "https://sys.ivitasa.com/api/login" -H "Content-Type: application/json" -d "{\"email\":\"johndoe@example.com\", \"password\":\"securepassword\"}"

curl -X GET "https://sys.ivitasa.com/api/get_user?id=1"

curl -X POST "https://sys.ivitasa.com/api/change_password" -H "Content-Type: application/json" -d "{\"user_id\":1,\"old_password\":\"securepassword\",\"new_password\":\"newpassword\",\"confirm_password\":\"newpassword\"}"

curl -X POST "https://sys.ivitasa.com/api/create_role" -H "Content-Type: application/json" -d "{\"name\":\"Admin\"}"

curl -X GET "https://sys.ivitasa.com/api/get_role?id=1"

curl -X POST "https://sys.ivitasa.com/api/update_role" -H "Content-Type: application/json" -d "{\"role_id\":1,\"name\":\"SuperAdmin\"}"

curl -X POST "https://sys.ivitasa.com/api/assign_role" -H "Content-Type: application/json" -d "{\"user_id\":1,\"role_id\":1}"

curl -X GET "https://sys.ivitasa.com/api/get_user_roles?user_id=1"

curl -X POST "https://sys.ivitasa.com/api/remove_user_role" -H "Content-Type: application/json" -d "{\"user_id\":1,\"role_id\":1}"

curl -X POST "https://sys.ivitasa.com/api/create_platform" -H "Content-Type: application/json" -d "{\"name\":\"Main Platform\"}"

curl -X GET "https://sys.ivitasa.com/api/get_platform?id=1"
```
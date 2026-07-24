# Employee Management System API Documentation

## Base URL

http://localhost:5000

---

## Authentication

### Login

POST /auth/login

Request

```json
{
  "email": "admin@gmail.com",
  "password": "admin123"
}
```

Response

```json
{
  "token": "JWT_TOKEN"
}
```

---

## Employee APIs

### Get Employees

GET /employees

Query Parameters

- page
- limit
- sortBy
- order
- search
- role
- salary

Example

GET /employees?page=1&limit=5&sortBy=name&order=ASC

---

### Get Employee By ID

GET /employees/:id

---

### Add Employee

POST /employees

Form Data

- name
- email
- department
- role
- salary
- image

---

### Update Employee

PUT /employees/:id

---

### Upload Profile Image

PUT /employees/:id/image

---

### Delete Employee

DELETE /employees/:id

---

## Department APIs

GET /departments

POST /departments

PUT /departments/:id

DELETE /departments/:id

Supports search

---

## Product APIs

GET /products

POST /products

PUT /products/:id

DELETE /products/:id

Supports search

---

## Authentication

All protected APIs require

Authorization

Bearer <JWT_TOKEN>
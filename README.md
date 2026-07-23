# Employee Management System

A full-stack Employee Management System built using Next.js, Express.js, PostgreSQL, MongoDB, Redis, JWT Authentication, Docker, and automated testing.

## Project Overview

This application allows organizations to manage employees, departments, and products through a secure dashboard. It demonstrates a modern full-stack architecture with authentication, caching, containerization, testing, and dual database synchronization.

---

## Features

- JWT Authentication
- Protected Routes
- Employee CRUD Operations
- Department CRUD Operations
- Product CRUD Operations
- PostgreSQL Integration
- MongoDB Integration
- Redis Caching
- File Uploads
- Pagination
- Search
- Filtering
- Sorting
- Docker Containerization
- API Testing with Jest & Supertest
- UI Testing with Playwright
- Responsive Dashboard using Next.js

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express.js

### Database

- PostgreSQL
- MongoDB

### Cache

- Redis

### Authentication

- JWT (JSON Web Token)

### Testing

- Jest
- Supertest
- Playwright

### DevOps

- Docker
- Docker Compose

---

## Project Structure

```
employee-management-system
│
├── backend
├── frontend
├── screenshots
├── docker-compose.yml
├── package.json
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/sowmiya-nandy/employee-management-system.git
```

```
cd employee-management-system
```

---

## Run with Docker

```
docker compose up --build
```

Backend

```
http://localhost:5000
```

Frontend

```
http://localhost:3000
```

---

## Authentication

Users must log in to receive a JWT token.

The token is used to access all protected API endpoints.

---

## Database

### PostgreSQL

Stores

- Employees
- Departments
- Products

### MongoDB

Stores

- Employees
- Departments
- Products

---

## Redis Cache

Employee API responses are cached using Redis.

Cache is automatically cleared whenever data is:

- Added
- Updated
- Deleted

---

## Dual Database Synchronization

Migration scripts are included to synchronize data between PostgreSQL and MongoDB.

### Employees

```
node scripts/migrateEmployees.js
```

### Departments

```
node scripts/migrateDepartments.js
```

### Products

```
node scripts/migrateProducts.js
```

---

## Testing

### Backend

```
npm test
```

### Frontend

```
npm run test
```

### Playwright

```
npx playwright test
```

---

## API Modules

### Authentication

- Login

### Employees

- Get Employees
- Get Employee
- Add Employee
- Update Employee
- Delete Employee

### Departments

- Get Departments
- Add Department
- Update Department
- Delete Department

### Products

- Get Products
- Add Product
- Update Product
- Delete Product

---

## Screenshots

Project screenshots can be found inside the `screenshots` folder.

---

## Future Enhancements

- Email Notifications
- Role Based Access Control
- Dashboard Analytics
- Export Reports
- Audit Logs
- Dark Mode
- CI/CD Pipeline

---

## Author

**Sowmiya G**

GitHub:
https://github.com/sowmiya-nandy

---

## License

This project is licensed under the MIT License.
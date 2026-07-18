# Employee Management System API Documentation

## Base URL

```
https://employee-management-system-production-e08b.up.railway.app
```

---

# Authentication

## Register Employee

**POST**

```
/api/auth/register
```

### Request

```json
{
  "employeeId": "EMP001",
  "name": "Admin",
  "email": "admin@test.com",
  "password": "123456",
  "phone": "9876543210",
  "designation": "HR Manager",
  "salary": 60000,
  "joiningDate": "2026-07-16",
  "departmentId": "<department_id>"
}
```

---

## Login

**POST**

```
/api/auth/login
```

### Request

```json
{
  "email": "admin@test.com",
  "password": "123456"
}
```

---

## Logout

**POST**

```
/api/auth/logout
```

---

# Employees

## Get All Employees

**GET**

```
/api/employees
```

Authorization: Bearer Token

---

## Get Employee By ID

**GET**

```
/api/employees/:id
```

Authorization: Bearer Token

---

## Update Employee

**PUT**

```
/api/employees/:id
```

Authorization: Bearer Token

---

## Delete Employee

**DELETE**

```
/api/employees/:id
```

Authorization: Bearer Token

---

# Organization

## Organization Tree

**GET**

```
/api/employees/organization/tree
```

Authorization: Bearer Token

---

## Get Reportees

**GET**

```
/api/employees/:id/reportees
```

Authorization: Bearer Token

---

## Assign Manager

**PATCH**

```
/api/employees/:id/manager
```

Authorization: Bearer Token

### Body

```json
{
  "managerId": "<employee_id>"
}
```
# Bold Path HR API Documentation

## Overview
This document provides documentation for the Bold Path HR REST API, which powers the HR Management System.

## Base URL
```
https://api.boldpathhr.com/v1
```

For local development:
```
http://localhost:3000/api
```

## Authentication
Most API endpoints require authentication via JWT tokens. Tokens are obtained through the authentication endpoints.

### Headers
```
Authorization: Bearer <token>
Content-Type: application/json
```

## API Endpoints

### Authentication

#### POST /auth/register
Register a new user account

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword",
  "firstName": "John",
  "lastName": "Doe",
  "company": "Acme Corp"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "company": "Acme Corp"
  },
  "token": "jwt_token_here"
}
```

#### POST /auth/login
Authenticate a user and obtain a JWT token

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "company": "Acme Corp"
  },
  "token": "jwt_token_here"
}
```

#### GET /auth/profile
Get the authenticated user's profile

**Response:**
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "company": "Acme Corp",
    "role": "admin"
  }
}
```

### Employees

#### GET /employees
Get all employees

**Response:**
```json
{
  "employees": [
    {
      "id": 1,
      "userId": 1,
      "firstName": "John",
      "lastName": "Doe",
      "position": "Software Engineer",
      "department": "Engineering",
      "hireDate": "2023-01-15",
      "phone": "+1234567890",
      "address": "123 Main St, City, State"
    }
  ]
}
```

#### GET /employees/:id
Get a specific employee by ID

**Response:**
```json
{
  "employee": {
    "id": 1,
    "userId": 1,
    "firstName": "John",
    "lastName": "Doe",
    "position": "Software Engineer",
    "department": "Engineering",
    "hireDate": "2023-01-15",
    "phone": "+1234567890",
    "address": "123 Main St, City, State"
  }
}
```

#### POST /employees
Create a new employee

**Request Body:**
```json
{
  "userId": 2,
  "firstName": "Jane",
  "lastName": "Smith",
  "position": "Product Manager",
  "department": "Product",
  "hireDate": "2023-03-20",
  "phone": "+1234567891",
  "address": "456 Oak Ave, City, State"
}
```

**Response:**
```json
{
  "message": "Employee created successfully",
  "employee": {
    "id": 2,
    "userId": 2,
    "firstName": "Jane",
    "lastName": "Smith",
    "position": "Product Manager",
    "department": "Product",
    "hireDate": "2023-03-20",
    "phone": "+1234567891",
    "address": "456 Oak Ave, City, State"
  }
}
```

#### PUT /employees/:id
Update an employee

**Request Body:**
```json
{
  "position": "Senior Product Manager",
  "department": "Product"
}
```

**Response:**
```json
{
  "message": "Employee updated successfully",
  "employee": {
    "id": 2,
    "userId": 2,
    "firstName": "Jane",
    "lastName": "Smith",
    "position": "Senior Product Manager",
    "department": "Product",
    "hireDate": "2023-03-20",
    "phone": "+1234567891",
    "address": "456 Oak Ave, City, State"
  }
}
```

#### DELETE /employees/:id
Delete an employee

**Response:**
```json
{
  "message": "Employee deleted successfully"
}
```

### Departments

#### GET /departments
Get all departments

**Response:**
```json
{
  "departments": [
    {
      "id": 1,
      "name": "Engineering",
      "description": "Software development and technical operations"
    },
    {
      "id": 2,
      "name": "Product",
      "description": "Product management and strategy"
    }
  ]
}
```

#### GET /departments/:id
Get a specific department by ID

**Response:**
```json
{
  "department": {
    "id": 1,
    "name": "Engineering",
    "description": "Software development and technical operations"
  }
}
```

#### POST /departments
Create a new department

**Request Body:**
```json
{
  "name": "Marketing",
  "description": "Marketing and brand management"
}
```

**Response:**
```json
{
  "message": "Department created successfully",
  "department": {
    "id": 3,
    "name": "Marketing",
    "description": "Marketing and brand management"
  }
}
```

#### PUT /departments/:id
Update a department

**Request Body:**
```json
{
  "description": "Marketing, brand management, and customer engagement"
}
```

**Response:**
```json
{
  "message": "Department updated successfully",
  "department": {
    "id": 3,
    "name": "Marketing",
    "description": "Marketing, brand management, and customer engagement"
  }
}
```

#### DELETE /departments/:id
Delete a department

**Response:**
```json
{
  "message": "Department deleted successfully"
}
```

### Positions

#### GET /positions
Get all positions

**Response:**
```json
{
  "positions": [
    {
      "id": 1,
      "title": "Software Engineer",
      "departmentId": 1,
      "description": "Develops and maintains software applications"
    }
  ]
}
```

#### GET /positions/:id
Get a specific position by ID

**Response:**
```json
{
  "position": {
    "id": 1,
    "title": "Software Engineer",
    "departmentId": 1,
    "description": "Develops and maintains software applications"
  }
}
```

#### POST /positions
Create a new position

**Request Body:**
```json
{
  "title": "Marketing Specialist",
  "departmentId": 3,
  "description": "Creates and executes marketing campaigns"
}
```

**Response:**
```json
{
  "message": "Position created successfully",
  "position": {
    "id": 2,
    "title": "Marketing Specialist",
    "departmentId": 3,
    "description": "Creates and executes marketing campaigns"
  }
}
```

#### PUT /positions/:id
Update a position

**Request Body:**
```json
{
  "description": "Creates and executes marketing campaigns and brand strategies"
}
```

**Response:**
```json
{
  "message": "Position updated successfully",
  "position": {
    "id": 2,
    "title": "Marketing Specialist",
    "departmentId": 3,
    "description": "Creates and executes marketing campaigns and brand strategies"
  }
}
```

#### DELETE /positions/:id
Delete a position

**Response:**
```json
{
  "message": "Position deleted successfully"
}
```

### Attendance

#### GET /attendance
Get all attendance records

**Response:**
```json
{
  "attendance": [
    {
      "id": 1,
      "employeeId": 1,
      "date": "2023-06-01",
      "clockIn": "09:00:00",
      "clockOut": "17:00:00",
      "status": "present"
    }
  ]
}
```

#### GET /attendance/:id
Get a specific attendance record by ID

**Response:**
```json
{
  "attendance": {
    "id": 1,
    "employeeId": 1,
    "date": "2023-06-01",
    "clockIn": "09:00:00",
    "clockOut": "17:00:00",
    "status": "present"
  }
}
```

#### POST /attendance
Create a new attendance record

**Request Body:**
```json
{
  "employeeId": 1,
  "date": "2023-06-02",
  "clockIn": "09:05:00",
  "status": "present"
}
```

**Response:**
```json
{
  "message": "Attendance record created successfully",
  "attendance": {
    "id": 2,
    "employeeId": 1,
    "date": "2023-06-02",
    "clockIn": "09:05:00",
    "clockOut": null,
    "status": "present"
  }
}
```

#### POST /attendance/clock-in
Clock in for the current day

**Request Body:**
```json
{
  "employeeId": 1
}
```

**Response:**
```json
{
  "message": "Clocked in successfully",
  "attendance": {
    "id": 3,
    "employeeId": 1,
    "date": "2023-06-03",
    "clockIn": "08:55:00",
    "clockOut": null,
    "status": "present"
  }
}
```

#### POST /attendance/clock-out
Clock out for the current day

**Request Body:**
```json
{
  "employeeId": 1
}
```

**Response:**
```json
{
  "message": "Clocked out successfully",
  "attendance": {
    "id": 3,
    "employeeId": 1,
    "date": "2023-06-03",
    "clockIn": "08:55:00",
    "clockOut": "17:05:00",
    "status": "present"
  }
}
```

#### PUT /attendance/:id
Update an attendance record

**Request Body:**
```json
{
  "clockOut": "17:10:00"
}
```

**Response:**
```json
{
  "message": "Attendance record updated successfully",
  "attendance": {
    "id": 3,
    "employeeId": 1,
    "date": "2023-06-03",
    "clockIn": "08:55:00",
    "clockOut": "17:10:00",
    "status": "present"
  }
}
```

#### DELETE /attendance/:id
Delete an attendance record

**Response:**
```json
{
  "message": "Attendance record deleted successfully"
}
```

### Leave Requests

#### GET /leave
Get all leave requests

**Response:**
```json
{
  "leaveRequests": [
    {
      "id": 1,
      "employeeId": 1,
      "leaveType": "vacation",
      "startDate": "2023-06-15",
      "endDate": "2023-06-20",
      "reason": "Family vacation",
      "status": "approved"
    }
  ]
}
```

#### GET /leave/:id
Get a specific leave request by ID

**Response:**
```json
{
  "leaveRequest": {
    "id": 1,
    "employeeId": 1,
    "leaveType": "vacation",
    "startDate": "2023-06-15",
    "endDate": "2023-06-20",
    "reason": "Family vacation",
    "status": "approved"
  }
}
```

#### POST /leave
Create a new leave request

**Request Body:**
```json
{
  "employeeId": 1,
  "leaveType": "sick",
  "startDate": "2023-06-05",
  "endDate": "2023-06-05",
  "reason": "Medical appointment"
}
```

**Response:**
```json
{
  "message": "Leave request created successfully",
  "leaveRequest": {
    "id": 2,
    "employeeId": 1,
    "leaveType": "sick",
    "startDate": "2023-06-05",
    "endDate": "2023-06-05",
    "reason": "Medical appointment",
    "status": "pending"
  }
}
```

#### PUT /leave/:id/status
Update leave request status

**Request Body:**
```json
{
  "status": "approved"
}
```

**Response:**
```json
{
  "message": "Leave request status updated successfully",
  "leaveRequest": {
    "id": 2,
    "employeeId": 1,
    "leaveType": "sick",
    "startDate": "2023-06-05",
    "endDate": "2023-06-05",
    "reason": "Medical appointment",
    "status": "approved"
  }
}
```

#### PUT /leave/:id
Update a leave request

**Request Body:**
```json
{
  "endDate": "2023-06-06",
  "reason": "Medical appointment and follow-up"
}
```

**Response:**
```json
{
  "message": "Leave request updated successfully",
  "leaveRequest": {
    "id": 2,
    "employeeId": 1,
    "leaveType": "sick",
    "startDate": "2023-06-05",
    "endDate": "2023-06-06",
    "reason": "Medical appointment and follow-up",
    "status": "approved"
  }
}
```

#### DELETE /leave/:id
Delete a leave request

**Response:**
```json
{
  "message": "Leave request deleted successfully"
}
```

## Error Responses

All error responses follow this format:

```json
{
  "error": "Error message describing the issue"
}
```

Common HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

## Rate Limiting

The API implements rate limiting to prevent abuse:
- 100 requests per 15 minutes per IP address

Exceeding the rate limit will result in a 429 (Too Many Requests) response.

## Versioning

This documentation covers version 1 of the API. Future versions will be accessible at `/v2/`, `/v3/`, etc.

## Support

For API support, please contact:
- Email: api-support@boldpathhr.com
- Phone: +1 (555) 123-4567
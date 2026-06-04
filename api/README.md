# API Documentation

This directory contains the backend API for the BoldPath HR platform.

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Password reset request
- `POST /api/auth/reset-password` - Password reset

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user information
- `DELETE /api/users/:id` - Delete user (admin only)

### Employees
- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get employee by ID
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee information
- `DELETE /api/employees/:id` - Delete employee

### Departments
- `GET /api/departments` - Get all departments
- `GET /api/departments/:id` - Get department by ID
- `POST /api/departments` - Create new department
- `PUT /api/departments/:id` - Update department
- `DELETE /api/departments/:id` - Delete department

### Positions
- `GET /api/positions` - Get all positions
- `GET /api/positions/:id` - Get position by ID
- `POST /api/positions` - Create new position
- `PUT /api/positions/:id` - Update position
- `DELETE /api/positions/:id` - Delete position

### Time & Attendance
- `GET /api/attendance` - Get attendance records
- `POST /api/attendance` - Create attendance record
- `GET /api/attendance/:id` - Get attendance record by ID
- `PUT /api/attendance/:id` - Update attendance record
- `DELETE /api/attendance/:id` - Delete attendance record

### Leave Management
- `GET /api/leave` - Get leave requests
- `POST /api/leave` - Create leave request
- `GET /api/leave/:id` - Get leave request by ID
- `PUT /api/leave/:id` - Update leave request
- `DELETE /api/leave/:id` - Delete leave request

### Performance Reviews
- `GET /api/reviews` - Get performance reviews
- `POST /api/reviews` - Create performance review
- `GET /api/reviews/:id` - Get performance review by ID
- `PUT /api/reviews/:id` - Update performance review
- `DELETE /api/reviews/:id` - Delete performance review

## Authentication

All API requests (except authentication endpoints) require a valid JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

## Error Handling

The API uses standard HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

Error responses follow this format:
```json
{
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

## Rate Limiting

API requests are rate-limited to prevent abuse:
- 100 requests per hour for authenticated users
- 10 requests per hour for unauthenticated users

## Versioning

The API is currently at version 1. All endpoints are prefixed with `/v1`:
```
/api/v1/users
```
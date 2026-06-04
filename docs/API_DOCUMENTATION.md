# BoldPath HR API Documentation

## Overview
This document provides detailed information about the BoldPath HR API endpoints. All endpoints are prefixed with `/api`.

## Authentication
Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Base URL
```
http://localhost:3000/api
```

## Authentication Endpoints

### Register User
- **URL**: `/auth/register`
- **Method**: `POST`
- **Auth Required**: No
- **Data Params**:
  ```json
  {
    "email": "[email]",
    "password": "[password]",
    "role": "[admin|hr_manager|employee]" (optional, defaults to employee)
  }
  ```
- **Success Response**:
  - Code: 201
  - Content: `{ "message": "User registered successfully", "token": "[jwt-token]" }`

### Login User
- **URL**: `/auth/login`
- **Method**: `POST`
- **Auth Required**: No
- **Data Params**:
  ```json
  {
    "email": "[email]",
    "password": "[password]"
  }
  ```
- **Success Response**:
  - Code: 200
  - Content: `{ "message": "Login successful", "token": "[jwt-token]", "user": { "id": 1, "email": "[email]", "role": "[role]" } }`

### Get User Profile
- **URL**: `/auth/profile`
- **Method**: `GET`
- **Auth Required**: Yes
- **Success Response**:
  - Code: 200
  - Content: `{ "user": { "id": 1, "email": "[email]", "role": "[role]", "is_verified": true, "is_active": true } }`

## Employee Endpoints

### Get All Employees
- **URL**: `/employees`
- **Method**: `GET`
- **Auth Required**: No
- **Success Response**:
  - Code: 200
  - Content: `{ "employees": [ { "id": 1, "user_id": 1, "first_name": "John", "last_name": "Doe", ... } ] }`

### Get Employee by ID
- **URL**: `/employees/:id`
- **Method**: `GET`
- **Auth Required**: No
- **Success Response**:
  - Code: 200
  - Content: `{ "employee": { "id": 1, "user_id": 1, "first_name": "John", "last_name": "Doe", ... } }`

### Create Employee
- **URL**: `/employees`
- **Method**: `POST`
- **Auth Required**: Yes (admin or hr_manager)
- **Data Params**:
  ```json
  {
    "user_id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "position": "Software Engineer",
    "department": "Engineering",
    "hire_date": "2023-01-15",
    "phone": "+1234567890",
    "address": "123 Main St, City, Country"
  }
  ```
- **Success Response**:
  - Code: 201
  - Content: `{ "message": "Employee created successfully", "employee": { ... } }`

### Update Employee
- **URL**: `/employees/:id`
- **Method**: `PUT`
- **Auth Required**: Yes (admin or hr_manager)
- **Data Params**:
  ```json
  {
    "first_name": "John",
    "last_name": "Doe",
    "position": "Senior Software Engineer",
    "department": "Engineering",
    "hire_date": "2023-01-15",
    "phone": "+1234567890",
    "address": "123 Main St, City, Country"
  }
  ```
- **Success Response**:
  - Code: 200
  - Content: `{ "message": "Employee updated successfully", "employee": { ... } }`

### Delete Employee
- **URL**: `/employees/:id`
- **Method**: `DELETE`
- **Auth Required**: Yes (admin or hr_manager)
- **Success Response**:
  - Code: 200
  - Content: `{ "message": "Employee deleted successfully" }`

## Department Endpoints

### Get All Departments
- **URL**: `/departments`
- **Method**: `GET`
- **Auth Required**: No
- **Success Response**:
  - Code: 200
  - Content: `{ "departments": [ { "id": 1, "name": "Engineering", "description": "..." } ] }`

### Get Department by ID
- **URL**: `/departments/:id`
- **Method**: `GET`
- **Auth Required**: No
- **Success Response**:
  - Code: 200
  - Content: `{ "department": { "id": 1, "name": "Engineering", "description": "..." } }`

### Create Department
- **URL**: `/departments`
- **Method**: `POST`
- **Auth Required**: Yes (admin or hr_manager)
- **Data Params**:
  ```json
  {
    "name": "Marketing",
    "description": "Responsible for brand management and customer engagement"
  }
  ```
- **Success Response**:
  - Code: 201
  - Content: `{ "message": "Department created successfully", "department": { ... } }`

### Update Department
- **URL**: `/departments/:id`
- **Method**: `PUT`
- **Auth Required**: Yes (admin or hr_manager)
- **Data Params**:
  ```json
  {
    "name": "Marketing",
    "description": "Responsible for brand management, advertising, and customer engagement"
  }
  ```
- **Success Response**:
  - Code: 200
  - Content: `{ "message": "Department updated successfully", "department": { ... } }`

### Delete Department
- **URL**: `/departments/:id`
- **Method**: `DELETE`
- **Auth Required**: Yes (admin or hr_manager)
- **Success Response**:
  - Code: 200
  - Content: `{ "message": "Department deleted successfully" }`

## Position Endpoints

### Get All Positions
- **URL**: `/positions`
- **Method**: `GET`
- **Auth Required**: No
- **Success Response**:
  - Code: 200
  - Content: `{ "positions": [ { "id": 1, "title": "Software Engineer", "description": "...", "requirements": "..." } ] }`

### Get Position by ID
- **URL**: `/positions/:id`
- **Method**: `GET`
- **Auth Required**: No
- **Success Response**:
  - Code: 200
  - Content: `{ "position": { "id": 1, "title": "Software Engineer", "description": "...", "requirements": "..." } }`

### Create Position
- **URL**: `/positions`
- **Method**: `POST`
- **Auth Required**: Yes (admin or hr_manager)
- **Data Params**:
  ```json
  {
    "title": "Senior Software Engineer",
    "department_id": 2,
    "description": "Develops and maintains complex software applications",
    "requirements": "5+ years experience in software development"
  }
  ```
- **Success Response**:
  - Code: 201
  - Content: `{ "message": "Position created successfully", "position": { ... } }`

### Update Position
- **URL**: `/positions/:id`
- **Method**: `PUT`
- **Auth Required**: Yes (admin or hr_manager)
- **Data Params**:
  ```json
  {
    "title": "Senior Software Engineer",
    "department_id": 2,
    "description": "Develops, maintains, and architects complex software applications",
    "requirements": "5+ years experience in software development, leadership experience preferred"
  }
  ```
- **Success Response**:
  - Code: 200
  - Content: `{ "message": "Position updated successfully", "position": { ... } }`

### Delete Position
- **URL**: `/positions/:id`
- **Method**: `DELETE`
- **Auth Required**: Yes (admin or hr_manager)
- **Success Response**:
  - Code: 200
  - Content: `{ "message": "Position deleted successfully" }`

## Attendance Endpoints

### Get All Attendance Records
- **URL**: `/attendance`
- **Method**: `GET`
- **Auth Required**: Yes (admin or hr_manager)
- **Success Response**:
  - Code: 200
  - Content: `{ "attendanceRecords": [ { "id": 1, "employee_id": 1, "date": "2023-01-15", "clockIn": "09:00:00", ... } ] }`

### Get Attendance by Employee
- **URL**: `/attendance/employee/:employeeId`
- **Method**: `GET`
- **Auth Required**: Yes (admin or hr_manager)
- **Success Response**:
  - Code: 200
  - Content: `{ "attendanceRecords": [ { "id": 1, "employee_id": 1, "date": "2023-01-15", "clockIn": "09:00:00", ... } ] }`

### Clock In
- **URL**: `/attendance/clock-in`
- **Method**: `POST`
- **Auth Required**: Yes
- **Data Params**:
  ```json
  {
    "employee_id": 1
  }
  ```
- **Success Response**:
  - Code: 201
  - Content: `{ "message": "Clocked in successfully", "attendanceRecord": { ... } }`

### Clock Out
- **URL**: `/attendance/clock-out`
- **Method**: `POST`
- **Auth Required**: Yes
- **Data Params**:
  ```json
  {
    "employee_id": 1
  }
  ```
- **Success Response**:
  - Code: 200
  - Content: `{ "message": "Clocked out successfully", "attendanceRecord": { ... } }`

### Update Attendance Record
- **URL**: `/attendance/:id`
- **Method**: `PUT`
- **Auth Required**: Yes (admin or hr_manager)
- **Data Params**:
  ```json
  {
    "date": "2023-01-15",
    "clockIn": "09:00:00",
    "clockOut": "17:00:00",
    "status": "present",
    "notes": "Regular work day"
  }
  ```
- **Success Response**:
  - Code: 200
  - Content: `{ "message": "Attendance record updated successfully", "attendanceRecord": { ... } }`

### Delete Attendance Record
- **URL**: `/attendance/:id`
- **Method**: `DELETE`
- **Auth Required**: Yes (admin or hr_manager)
- **Success Response**:
  - Code: 200
  - Content: `{ "message": "Attendance record deleted successfully" }`

## Leave Request Endpoints

### Get All Leave Requests
- **URL**: `/leave`
- **Method**: `GET`
- **Auth Required**: Yes (admin or hr_manager)
- **Success Response**:
  - Code: 200
  - Content: `{ "leaveRequests": [ { "id": 1, "employee_id": 1, "leaveType": "vacation", ... } ] }`

### Get Leave Requests by Employee
- **URL**: `/leave/employee/:employeeId`
- **Method**: `GET`
- **Auth Required**: Yes
- **Success Response**:
  - Code: 200
  - Content: `{ "leaveRequests": [ { "id": 1, "employee_id": 1, "leaveType": "vacation", ... } ] }`

### Create Leave Request
- **URL**: `/leave`
- **Method**: `POST`
- **Auth Required**: Yes
- **Data Params**:
  ```json
  {
    "employee_id": 1,
    "leave_type": "vacation",
    "start_date": "2023-02-01",
    "end_date": "2023-02-05",
    "reason": "Family vacation"
  }
  ```
- **Success Response**:
  - Code: 201
  - Content: `{ "message": "Leave request created successfully", "leaveRequest": { ... } }`

### Update Leave Request Status
- **URL**: `/leave/:id/status`
- **Method**: `PUT`
- **Auth Required**: Yes (admin or hr_manager)
- **Data Params**:
  ```json
  {
    "status": "approved",
    "approved_by": 2
  }
  ```
- **Success Response**:
  - Code: 200
  - Content: `{ "message": "Leave request approved successfully", "leaveRequest": { ... } }`

### Delete Leave Request
- **URL**: `/leave/:id`
- **Method**: `DELETE`
- **Auth Required**: Yes
- **Success Response**:
  - Code: 200
  - Content: `{ "message": "Leave request deleted successfully" }`

## Error Responses
All endpoints may return the following error responses:

- **400 Bad Request**: Invalid request data
- **401 Unauthorized**: Missing or invalid authentication token
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server error

Error response format:
```json
{
  "error": "Error message"
}
```
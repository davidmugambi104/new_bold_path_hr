# Bold Path HR Management System

A comprehensive Human Resources management system built with Node.js, Express, and PostgreSQL.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Setup and Installation](#setup-and-installation)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Frontend Pages](#frontend-pages)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

Bold Path HR is a modern HR management system designed to streamline human resources operations. The system provides tools for managing employees, departments, positions, attendance tracking, and leave requests.

## Features

- **User Authentication**: Secure login and registration system
- **Employee Management**: Create, read, update, and delete employee records
- **Department Management**: Organize employees into departments
- **Position Management**: Define job positions and roles
- **Attendance Tracking**: Clock in/out functionality and attendance records
- **Leave Management**: Request, approve, and track leave requests
- **Admin Dashboard**: Overview of HR metrics and quick access to all modules
- **Responsive Design**: Mobile-friendly interface for all devices

## Technology Stack

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Web application framework
- **PostgreSQL**: Relational database management system
- **Sequelize**: ORM for database operations
- **JWT**: JSON Web Tokens for authentication
- **Bcrypt**: Password hashing
- **Docker**: Containerization for database

### Frontend
- **HTML5**: Markup language
- **CSS3**: Styling and layout
- **JavaScript**: Client-side scripting
- **Font Awesome**: Icon library
- **Fetch API**: HTTP requests to backend

### Development Tools
- **Git**: Version control
- **npm**: Package manager
- **ESLint**: Code linting
- **Prettier**: Code formatting

## Project Structure

```
boldpath-hr-website/
├── admin/                 # Admin dashboard and management pages
├── api/                   # Backend API server and routes
├── config/                # Configuration files
├── controllers/           # API controllers
├── css/                   # Stylesheets
├── docs/                  # Documentation
├── js/                    # Client-side JavaScript
├── models/                # Database models
├── routes/                # API routes
├── scripts/               # Database initialization scripts
├── .env                   # Environment variables
├── .gitignore             # Git ignore file
├── docker-compose.yml     # Docker configuration
├── package.json           # Node.js dependencies
└── README.md              # Project documentation
```

## Setup and Installation

### Prerequisites
- Node.js (v14 or higher)
- Docker and Docker Compose
- npm or yarn

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd boldpath-hr-website
   ```

2. **Install backend dependencies**:
   ```bash
   cd api
   npm install
   cd ..
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=boldpath_hr
   DB_USER=boldpath_user
   DB_PASSWORD=your_secure_password
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Start the database**:
   ```bash
   docker-compose up -d
   ```

5. **Initialize the database**:
   ```bash
   node scripts/init-db.js
   ```

6. **Start the backend server**:
   ```bash
   cd api
   npm start
   ```

7. **Access the application**:
   Open your browser and navigate to `http://localhost:3000`

## Database Schema

The system uses PostgreSQL with the following main tables:

### Users
- `id`: Primary key
- `email`: Unique email address
- `password`: Hashed password
- `role`: User role (admin, hr_manager, employee)
- `created_at`: Timestamp

### Employees
- `id`: Primary key
- `user_id`: Foreign key to Users
- `first_name`: Employee's first name
- `last_name`: Employee's last name
- `position`: Job position
- `department`: Department name
- `hire_date`: Employment start date
- `phone`: Contact phone number
- `address`: Residential address

### Departments
- `id`: Primary key
- `name`: Department name
- `description`: Department description

### Positions
- `id`: Primary key
- `title`: Position title
- `department_id`: Foreign key to Departments
- `description`: Position description

### Attendance
- `id`: Primary key
- `employee_id`: Foreign key to Employees
- `date`: Attendance date
- `clock_in`: Clock in time
- `clock_out`: Clock out time
- `status`: Attendance status (present, absent, late, leave)
- `notes`: Additional notes

### Leave Requests
- `id`: Primary key
- `employee_id`: Foreign key to Employees
- `leave_type`: Type of leave (vacation, sick, personal, etc.)
- `start_date`: Leave start date
- `end_date`: Leave end date
- `reason`: Reason for leave
- `status`: Request status (pending, approved, rejected)
- `approved_by`: Foreign key to Users (approving manager)
- `created_at`: Request creation timestamp

## API Endpoints

All API endpoints are prefixed with `/api`.

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/profile` - Get user profile

### Employees
- `GET /employees` - Get all employees
- `GET /employees/:id` - Get employee by ID
- `POST /employees` - Create new employee
- `PUT /employees/:id` - Update employee
- `DELETE /employees/:id` - Delete employee

### Departments
- `GET /departments` - Get all departments
- `GET /departments/:id` - Get department by ID
- `POST /departments` - Create new department
- `PUT /departments/:id` - Update department
- `DELETE /departments/:id` - Delete department

### Positions
- `GET /positions` - Get all positions
- `GET /positions/:id` - Get position by ID
- `POST /positions` - Create new position
- `PUT /positions/:id` - Update position
- `DELETE /positions/:id` - Delete position

### Attendance
- `GET /attendance` - Get all attendance records
- `GET /attendance/:id` - Get attendance record by ID
- `GET /attendance/employee/:employeeId` - Get attendance by employee
- `POST /attendance` - Create new attendance record
- `POST /attendance/clock-in` - Clock in
- `POST /attendance/clock-out` - Clock out
- `PUT /attendance/:id` - Update attendance record
- `DELETE /attendance/:id` - Delete attendance record

### Leave Requests
- `GET /leave` - Get all leave requests
- `GET /leave/:id` - Get leave request by ID
- `GET /leave/employee/:employeeId` - Get leave requests by employee
- `POST /leave` - Create new leave request
- `PUT /leave/:id/status` - Update leave request status
- `PUT /leave/:id` - Update leave request
- `DELETE /leave/:id` - Delete leave request

## Frontend Pages

### Public Pages
- `index.html` - Homepage
- `about.html` - About page
- `services.html` - Services page
- `contact.html` - Contact page
- `login.html` - User login
- `register.html` - User registration

### Admin Pages
- `admin/dashboard.html` - Admin dashboard
- `admin/employees.html` - Employee management
- `admin/departments.html` - Department management
- `admin/positions.html` - Position management
- `admin/attendance.html` - Attendance tracking
- `admin/leave.html` - Leave management

## Development

### Running Tests
```bash
npm test
```

### Code Formatting
```bash
npm run format
```

### Linting
```bash
npm run lint
```

### Development Server
```bash
npm run dev
```

## Deployment

### Production Build
```bash
npm run build
```

### Environment Variables for Production
Set the following environment variables in production:
- `NODE_ENV=production`
- `DB_HOST` - Database host
- `DB_PORT` - Database port
- `DB_NAME` - Database name
- `DB_USER` - Database user
- `DB_PASSWORD` - Database password
- `JWT_SECRET` - JWT secret key

### Docker Deployment
The application can be deployed using Docker:
```bash
docker-compose up -d
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
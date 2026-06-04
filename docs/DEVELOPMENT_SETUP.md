# BoldPath HR Website - Development Setup Guide

## Prerequisites

Before starting development on the BoldPath HR platform, ensure you have the following installed:

1. **Node.js** (v18 or higher) - Already installed (v22.22.0)
2. **npm** (v8 or higher) - Already installed (v10.9.4)
3. **PostgreSQL** (v14 or higher) - Not yet installed
4. **Docker** (optional, for containerized development) - Already installed (v29.1.3)

## Database Setup Options

### Option 1: Install PostgreSQL Locally (Recommended for Production-like Environment)

Since we don't have PostgreSQL installed yet, you'll need to install it with proper permissions:

```bash
# Update package list
sudo apt update

# Install PostgreSQL and additional utilities
sudo apt install postgresql postgresql-contrib -y

# Start and enable PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Switch to postgres user and create database
sudo -u postgres psql

# In PostgreSQL shell, run:
# CREATE DATABASE boldpath_hr;
# CREATE USER boldpath_user WITH ENCRYPTED PASSWORD 'your_secure_password';
# GRANT ALL PRIVILEGES ON DATABASE boldpath_hr TO boldpath_user;
# \q

# Test connection
psql -h localhost -U boldpath_user -d boldpath_hr
```

### Option 2: Use Docker for Development (Recommended for Quick Setup)

Since Docker is installed but requires permissions, you can run PostgreSQL in a container:

```bash
# Run PostgreSQL in a Docker container
docker run --name boldpath-postgres \
  -e POSTGRES_DB=boldpath_hr \
  -e POSTGRES_USER=boldpath_user \
  -e POSTGRES_PASSWORD=your_secure_password \
  -p 5432:5432 \
  -d postgres:14

# To stop the container:
# docker stop boldpath-postgres

# To start the container again:
# docker start boldpath-postgres
```

## Project Setup

1. **Install Dependencies**
   ```bash
   cd ~/Documents/boldpath-hr-website
   npm install
   ```

2. **Environment Configuration**
   Create a `.env` file in the project root with the following variables:
   ```env
   # Database configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=boldpath_hr
   DB_USER=boldpath_user
   DB_PASSWORD=your_secure_password

   # JWT configuration
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRES_IN=24h

   # Server configuration
   PORT=3000
   NODE_ENV=development
   ```

3. **Database Migration**
   Once PostgreSQL is set up, run the database migrations:
   ```bash
   npm run migrate
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

## Development Workflow

1. **Frontend Development**
   - Work in the root directory for main website pages
   - Use the components/ directory for reusable UI elements
   - CSS files are in the css/ directory
   - JavaScript files are in the js/ directory

2. **Backend Development**
   - API endpoints are in the api/ directory
   - Database models and queries should be added to a new models/ directory
   - Controllers should be organized in a controllers/ directory
   - Middleware should be in a middleware/ directory

3. **Testing**
   - Unit tests should be in a tests/ directory
   - Use Jest for testing framework
   - Run tests with `npm test`

## Directory Structure

```
boldpath-hr-website/
├── api/                 # Backend API server
├── assets/              # Images and static assets
├── components/          # Reusable UI components
├── css/                 # Stylesheets
├── js/                  # Client-side JavaScript
├── docs/                # Documentation
├── admin/               # Admin portal
├── employee/            # Employee portal
├── .env                 # Environment variables (create this)
├── .gitignore           # Git ignore file
├── package.json         # Node.js dependencies
└── README.md            # Project overview
```

## Next Steps

1. Set up the database using either Option 1 or Option 2 above
2. Configure the environment variables
3. Implement the database models based on the schema in IMPLEMENTATION_PLAN.md
4. Add proper authentication with JWT
5. Implement role-based access control
6. Begin adding the core HR modules

This setup will provide a solid foundation for transforming the BoldPath HR website into a robust application.
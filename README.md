# Bold Path HR Website

This repository contains the complete website for Bold Path HR, including both the public-facing marketing site and the HR Management System (HRMS) login portal.

## Website Structure

### Public Pages
- `index.html` - Main landing page
- `company-profile.html` - Company information, mission, values, and team
- `our-services.html` - Detailed HR services offered
- `contact-us.html` - Contact information and form
- `client-success.html` - Case studies and client testimonials
- `hr-resources.html` - Downloadable HR resources and templates
- `hr-blog.html` - HR insights and articles
- `careers-opportunities.html` - Career opportunities and company culture
- `pricing-plans.html` - Pricing information for services

### Authentication Pages
- `user-login.html` - Login page for HRMS access
- `user-register.html` - Registration page for new accounts

### HRMS Pages (Admin Area)
- `admin/dashboard.html` - Main dashboard after login
- `admin/employees.html` - Employee management
- `admin/departments.html` - Department management
- `admin/positions.html` - Position management
- `admin/attendance.html` - Attendance tracking
- `admin/leave.html` - Leave management

## Features

### Public Website
- Responsive design that works on all devices
- Modern UI with clean aesthetics
- Comprehensive information about HR services
- Client testimonials and case studies
- Blog with HR insights and resources
- Career opportunities listing
- Contact form for inquiries

### HR Management System
- Employee database management
- Department and position tracking
- Attendance and leave management
- Performance review system
- User authentication and authorization

## Technology Stack

### Frontend
- HTML5
- CSS3 (with custom styling)
- JavaScript (Vanilla JS)
- Responsive design principles

### Backend
- Node.js with Express.js
- PostgreSQL database
- Sequelize ORM
- JWT for authentication
- Bcrypt for password hashing

## Setup Instructions

1. Clone the repository
2. Install Node.js dependencies:
   ```
   npm install
   ```
3. Set up PostgreSQL database
4. Configure environment variables in `.env` file
5. Run database initialization scripts:
   ```
   node scripts/init-db.js
   ```
6. Start the server:
   ```
   npm start
   ```

## Development

To run the development server with auto-reload:
```
npm run dev
```

## Deployment

The website can be deployed using:
- Traditional Node.js hosting (Heroku, DigitalOcean, etc.)
- Docker containers
- Static hosting for frontend with API endpoints

## Accessing the HRMS

1. Visit the website homepage
2. Click "Login" or "Get Started" 
3. Register for a new account or log in with existing credentials
4. Access the HRMS dashboard

## Customization

To customize the website for your organization:
1. Update company information in `company-profile.html`
2. Modify service descriptions in `our-services.html`
3. Replace images in the `assets` folder
4. Update contact information in `contact-us.html`
5. Add your own case studies in `client-success.html`

## Support

For support, please contact our team through the contact form on the website or email support@boldpathhr.com.# boldpathHr

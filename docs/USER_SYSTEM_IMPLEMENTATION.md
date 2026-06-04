# BoldPath HR Platform: User Registration & Management System Implementation

This document provides a detailed implementation plan for enhancing the user registration and management system to make the BoldPath HR platform more robust and application-like.

## Current State Analysis

### Working Components
1. **Frontend Registration Page** - Functional HTML form with basic validation
2. **Login Page** - Basic authentication interface
3. **Dashboard** - User interface for logged-in users
4. **JavaScript API Client** - Communication layer with backend
5. **Prototype API** - Basic Express.js server with user endpoints

### Critical Limitations
1. **Data Storage** - Uses localStorage instead of database
2. **Security** - No password hashing or advanced authentication
3. **User Roles** - No role-based access control
4. **Email Verification** - No account verification process
5. **Password Management** - No reset or recovery options
6. **Session Management** - Basic JWT implementation only

## Implementation Plan

## Phase 1: Database and Core Authentication (Week 1)

### Task 1: PostgreSQL Database Setup
```bash
# Install PostgreSQL
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib

# Create database and user
sudo -u postgres createdb boldpath_hr
sudo -u postgres createuser boldpath_user
sudo -u postgres psql -c "ALTER USER boldpath_user WITH PASSWORD 'secure_password';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE boldpath_hr TO boldpath_user;"
```

### Task 2: Database Schema Implementation
```sql
-- Create users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  role VARCHAR(50) DEFAULT 'employee',
  status VARCHAR(20) DEFAULT 'pending',
  is_verified BOOLEAN DEFAULT FALSE,
  email_verified_at TIMESTAMP,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create verification tokens table
CREATE TABLE verification_tokens (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create password reset tokens table
CREATE TABLE password_reset_tokens (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Task 3: Backend Dependencies Installation
```bash
cd /home/davie/clawd/boldpath-hr-website/api
npm install pg bcryptjs jsonwebtoken dotenv
```

### Task 4: Database Configuration
Create `/home/davie/clawd/boldpath-hr-website/api/config/database.js`:
```javascript
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'boldpath_user',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'boldpath_hr',
  password: process.env.DB_PASSWORD || 'secure_password',
  port: process.env.DB_PORT || 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
```

## Phase 2: Enhanced Authentication System (Week 1-2)

### Task 1: Password Security Implementation
Create `/home/davie/clawd/boldpath-hr-website/api/utils/auth.js`:
```javascript
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 12;
const JWT_SECRET = process.env.JWT_SECRET || 'boldpath_hr_secret_key';
const JWT_EXPIRES_IN = '24h';

async function hashPassword(password) {
  return await bcrypt.hash(password, SALT_ROUNDS);
}

async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

function generateToken(user) {
  return jwt.sign(
    { 
      userId: user.id, 
      email: user.email, 
      role: user.role 
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

module.exports = {
  hashPassword,
  verifyPassword,
  generateToken,
  verifyToken
};
```

### Task 2: Enhanced User Controller
Update `/home/davie/clawd/boldpath-hr-website/api/controllers/userController.js`:
```javascript
const db = require('../config/database');
const { hashPassword, verifyPassword, generateToken } = require('../utils/auth');
const { generateVerificationToken, sendVerificationEmail } = require('../utils/email');

// User registration with email verification
async function register(req, res) {
  try {
    const { email, password, firstName, lastName } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check if user already exists
    const existingUser = await db.query(
      'SELECT id FROM users WHERE email = $1', 
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const result = await db.query(
      `INSERT INTO users (email, password_hash, first_name, last_name, role) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING id, email, first_name, last_name, role`,
      [email, passwordHash, firstName, lastName, 'employee']
    );

    const user = result.rows[0];

    // Generate verification token
    const verificationToken = generateVerificationToken();
    await db.query(
      `INSERT INTO verification_tokens (user_id, token, expires_at) 
       VALUES ($1, $2, $3)`,
      [user.id, verificationToken, new Date(Date.now() + 24 * 60 * 60 * 1000)]
    );

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    res.status(201).json({
      message: 'User registered successfully. Please check your email for verification.',
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
}

// User login
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const result = await db.query(
      `SELECT id, email, password_hash, first_name, last_name, role, is_verified, status 
       FROM users WHERE email = $1`,
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Check if user is verified
    if (!user.is_verified) {
      return res.status(401).json({ error: 'Please verify your email address' });
    }

    // Check if user is active
    if (user.status !== 'active') {
      return res.status(401).json({ error: 'Account is not active' });
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last login
    await db.query(
      'UPDATE users SET last_login = NOW() WHERE id = $1',
      [user.id]
    );

    // Generate token
    const token = generateToken(user);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
}

// Email verification
async function verifyEmail(req, res) {
  try {
    const { token } = req.params;

    // Find verification token
    const tokenResult = await db.query(
      `SELECT user_id, expires_at FROM verification_tokens 
       WHERE token = $1 AND expires_at > NOW()`,
      [token]
    );

    if (tokenResult.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid or expired verification token' });
    }

    const { user_id } = tokenResult.rows[0];

    // Update user as verified
    await db.query(
      `UPDATE users SET is_verified = true, email_verified_at = NOW(), status = 'active' 
       WHERE id = $1`,
      [user_id]
    );

    // Delete verification token
    await db.query(
      'DELETE FROM verification_tokens WHERE token = $1',
      [token]
    );

    res.json({ message: 'Email verified successfully. You can now login.' });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({ error: 'Email verification failed' });
  }
}

module.exports = {
  register,
  login,
  verifyEmail
};
```

### Task 3: Enhanced Authentication Routes
Update `/home/davie/clawd/boldpath-hr-website/api/routes/auth.js`:
```javascript
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Registration with email verification
router.post('/register', userController.register);

// Login
router.post('/login', userController.login);

// Email verification
router.get('/verify/:token', userController.verifyEmail);

module.exports = router;
```

## Phase 3: Password Management System (Week 2)

### Task 1: Password Reset Implementation
Add to `/home/davie/clawd/boldpath-hr-website/api/utils/auth.js`:
```javascript
function generateResetToken() {
  return require('crypto').randomBytes(32).toString('hex');
}

module.exports = {
  // ... existing exports
  generateResetToken
};
```

### Task 2: Password Reset Controller Functions
Add to `/home/davie/clawd/boldpath-hr-website/api/controllers/userController.js`:
```javascript
const { generateResetToken, sendPasswordResetEmail } = require('../utils/email');

// Request password reset
async function requestPasswordReset(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Find user
    const result = await db.query(
      'SELECT id, email, first_name FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      // Don't reveal if user exists
      return res.json({ message: 'If your email exists, you will receive a password reset link' });
    }

    const user = result.rows[0];

    // Generate reset token
    const resetToken = generateResetToken();
    await db.query(
      `INSERT INTO password_reset_tokens (user_id, token, expires_at) 
       VALUES ($1, $2, $3)`,
      [user.id, resetToken, new Date(Date.now() + 60 * 60 * 1000)] // 1 hour expiry
    );

    // Send reset email
    await sendPasswordResetEmail(user.email, user.first_name, resetToken);

    res.json({ message: 'If your email exists, you will receive a password reset link' });
  } catch (error) {
    console.error('Password reset request error:', error);
    res.status(500).json({ error: 'Password reset request failed' });
  }
}

// Reset password
async function resetPassword(req, res) {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({ error: 'Token and password are required' });
    }

    // Validate password strength
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }

    // Find reset token
    const tokenResult = await db.query(
      `SELECT user_id, expires_at FROM password_reset_tokens 
       WHERE token = $1 AND expires_at > NOW()`,
      [token]
    );

    if (tokenResult.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid or expired reset token' });
    }

    const { user_id } = tokenResult.rows[0];

    // Hash new password
    const passwordHash = await hashPassword(password);

    // Update user password
    await db.query(
      'UPDATE users SET password_hash = $1 WHERE id = $2',
      [passwordHash, user_id]
    );

    // Delete reset token
    await db.query(
      'DELETE FROM password_reset_tokens WHERE token = $1',
      [token]
    );

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ error: 'Password reset failed' });
  }
}

module.exports = {
  // ... existing exports
  requestPasswordReset,
  resetPassword
};
```

### Task 3: Password Reset Routes
Add to `/home/davie/clawd/boldpath-hr-website/api/routes/auth.js`:
```javascript
// Password reset
router.post('/forgot-password', userController.requestPasswordReset);
router.post('/reset-password', userController.resetPassword);
```

## Phase 4: Role-Based Access Control (Week 3)

### Task 1: Middleware for Authentication and Authorization
Create `/home/davie/clawd/boldpath-hr-website/api/middleware/auth.js`:
```javascript
const { verifyToken } = require('../utils/auth');
const db = require('../config/database');

// Authenticate user
async function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Fetch user from database
    const result = await db.query(
      `SELECT id, email, first_name, last_name, role, is_verified, status 
       FROM users WHERE id = $1`,
      [decoded.userId]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    const user = result.rows[0];

    // Check if user is verified and active
    if (!user.is_verified || user.status !== 'active') {
      return res.status(401).json({ error: 'Account not active' });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ error: 'Authentication failed' });
  }
}

// Require specific roles
function requireRole(roles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    next();
  };
}

module.exports = {
  authenticate,
  requireRole
};
```

### Task 2: User Management Routes with RBAC
Create `/home/davie/clawd/boldpath-hr-website/api/routes/users.js`:
```javascript
const express = require('express');
const router = express.Router();
const { authenticate, requireRole } = require('../middleware/auth');
const userController = require('../controllers/userController');

// Get all users (admin only)
router.get('/', authenticate, requireRole(['admin']), userController.getAllUsers);

// Get user by ID
router.get('/:id', authenticate, userController.getUserById);

// Update user (admin or owner)
router.put('/:id', authenticate, userController.updateUser);

// Delete user (admin only)
router.delete('/:id', authenticate, requireRole(['admin']), userController.deleteUser);

module.exports = router;
```

### Task 3: User Management Controller Functions
Add to `/home/davie/clawd/boldpath-hr-website/api/controllers/userController.js`:
```javascript
// Get all users (admin only)
async function getAllUsers(req, res) {
  try {
    const result = await db.query(
      `SELECT id, email, first_name, last_name, role, status, created_at, last_login 
       FROM users ORDER BY created_at DESC`
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}

// Get user by ID
async function getUserById(req, res) {
  try {
    const userId = req.params.id;
    const requestingUser = req.user;

    // Check if user is requesting their own data or is admin
    if (requestingUser.id != userId && requestingUser.role !== 'admin') {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    const result = await db.query(
      `SELECT id, email, first_name, last_name, role, status, created_at, last_login 
       FROM users WHERE id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
}

// Update user
async function updateUser(req, res) {
  try {
    const userId = req.params.id;
    const requestingUser = req.user;
    const updateData = req.body;

    // Check if user is updating their own data or is admin
    if (requestingUser.id != userId && requestingUser.role !== 'admin') {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }

    // Prevent role changes unless admin
    if (updateData.role && requestingUser.role !== 'admin') {
      return res.status(403).json({ error: 'Only admins can change roles' });
    }

    // Build update query dynamically
    const fields = [];
    const values = [];
    let index = 1;

    Object.keys(updateData).forEach(key => {
      if (key !== 'id' && key !== 'email') { // Don't allow email changes
        fields.push(`${key} = $${index}`);
        values.push(updateData[key]);
        index++;
      }
    });

    if (fields.length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    values.push(userId);
    const query = `UPDATE users SET ${fields.join(', ')}, updated_at = NOW() 
                   WHERE id = $${index} RETURNING id, email, first_name, last_name, role`;

    const result = await db.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
}

// Delete user (admin only)
async function deleteUser(req, res) {
  try {
    const userId = req.params.id;

    // Prevent users from deleting themselves
    if (req.user.id == userId) {
      return res.status(400).json({ error: 'Cannot delete your own account' });
    }

    const result = await db.query(
      'DELETE FROM users WHERE id = $1 RETURNING id',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
}

module.exports = {
  // ... existing exports
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
};
```

## Phase 5: Enhanced Frontend Integration (Week 3-4)

### Task 1: Updated API Client
Update `/home/davie/clawd/boldpath-hr-website/js/api.js`:
```javascript
class APIClient {
  constructor(baseURL = 'http://localhost:3000/api') {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Request failed');
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message || 'Network error');
    }
  }

  // Authentication methods
  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  async login(credentials) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });

    // Store token and user data
    if (response.token) {
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
    }

    return response;
  }

  async logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  async verifyEmail(token) {
    return this.request(`/auth/verify/${token}`, {
      method: 'GET'
    });
  }

  async requestPasswordReset(email) {
    return this.request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email })
    });
  }

  async resetPassword(token, password) {
    return this.request('/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, password })
    });
  }

  // User management methods
  async getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  async getAllUsers() {
    return this.request('/users');
  }

  async getUserById(id) {
    return this.request(`/users/${id}`);
  }

  async updateUser(id, userData) {
    return this.request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData)
    });
  }

  async deleteUser(id) {
    return this.request(`/users/${id}`, {
      method: 'DELETE'
    });
  }

  // Check if user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  // Get user role
  getUserRole() {
    const user = this.getCurrentUser();
    return user ? user.role : null;
  }

  // Check if user has required role
  hasRole(requiredRole) {
    const userRole = this.getUserRole();
    return userRole === requiredRole;
  }

  // Check if user has any of the required roles
  hasAnyRole(requiredRoles) {
    const userRole = this.getUserRole();
    return requiredRoles.includes(userRole);
  }
}

// Export singleton instance
const apiClient = new APIClient();
export default apiClient;
```

### Task 2: Enhanced Registration Page
Update `/home/davie/clawd/boldpath-hr-website/register.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register - BoldPath HR</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <div class="auth-container">
            <div class="auth-header">
                <h1>Create Your Account</h1>
                <p>Join BoldPath HR to manage your HR needs</p>
            </div>

            <form id="registerForm" class="auth-form">
                <div class="form-group">
                    <label for="firstName">First Name</label>
                    <input type="text" id="firstName" name="firstName" required>
                </div>

                <div class="form-group">
                    <label for="lastName">Last Name</label>
                    <input type="text" id="lastName" name="lastName" required>
                </div>

                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" name="email" required>
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required minlength="8">
                    <small>Password must be at least 8 characters long</small>
                </div>

                <div class="form-group">
                    <label for="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" required>
                </div>

                <button type="submit" class="btn btn-primary btn-block">Create Account</button>
            </form>

            <div class="auth-footer">
                <p>Already have an account? <a href="login.html">Sign in</a></p>
            </div>
        </div>
    </div>

    <script type="module">
        import apiClient from './js/api.js';

        document.getElementById('registerForm').addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(e.target);
            const userData = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                password: formData.get('password')
            };

            const confirmPassword = formData.get('confirmPassword');

            // Validate passwords match
            if (userData.password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            try {
                const submitButton = e.target.querySelector('button[type="submit"]');
                submitButton.disabled = true;
                submitButton.textContent = 'Creating Account...';

                const response = await apiClient.register(userData);
                alert(response.message);
                
                // Redirect to login page
                window.location.href = 'login.html';
            } catch (error) {
                alert('Registration failed: ' + error.message);
            } finally {
                const submitButton = e.target.querySelector('button[type="submit"]');
                submitButton.disabled = false;
                submitButton.textContent = 'Create Account';
            }
        });
    </script>
</body>
</html>
```

### Task 3: Enhanced Login Page
Update `/home/davie/clawd/boldpath-hr-website/login.html`:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - BoldPath HR</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <div class="auth-container">
            <div class="auth-header">
                <h1>Welcome Back</h1>
                <p>Sign in to your BoldPath HR account</p>
            </div>

            <form id="loginForm" class="auth-form">
                <div class="form-group">
                    <label for="email">Email Address</label>
                    <input type="email" id="email" name="email" required>
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required>
                </div>

                <div class="form-group">
                    <a href="forgot-password.html" class="forgot-password">Forgot Password?</a>
                </div>

                <button type="submit" class="btn btn-primary btn-block">Sign In</button>
            </form>

            <div class="auth-footer">
                <p>Don't have an account? <a href="register.html">Create one</a></p>
            </div>
        </div>
    </div>

    <script type="module">
        import apiClient from './js/api.js';

        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(e.target);
            const credentials = {
                email: formData.get('email'),
                password: formData.get('password')
            };

            try {
                const submitButton = e.target.querySelector('button[type="submit"]');
                submitButton.disabled = true;
                submitButton.textContent = 'Signing In...';

                const response = await apiClient.login(credentials);
                alert('Login successful!');
                
                // Redirect based on user role
                if (response.user.role === 'admin') {
                    window.location.href = 'admin/dashboard.html';
                } else {
                    window.location.href = 'dashboard.html';
                }
            } catch (error) {
                alert('Login failed: ' + error.message);
            } finally {
                const submitButton = e.target.querySelector('button[type="submit"]');
                submitButton.disabled = false;
                submitButton.textContent = 'Sign In';
            }
        });
    </script>
</body>
</html>
```

## Phase 6: Testing and Deployment (Week 4)

### Task 1: Unit Tests
Create `/home/davie/clawd/boldpath-hr-website/api/tests/auth.test.js`:
```javascript
const request = require('supertest');
const app = require('../server');

describe('Authentication API', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User'
      };

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201);

      expect(response.body.message).toBe('User registered successfully. Please check your email for verification.');
      expect(response.body.user).toHaveProperty('id');
      expect(response.body.user.email).toBe(userData.email);
    });

    it('should reject duplicate email', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        firstName: 'Test',
        lastName: 'User'
      };

      // Register first user
      await request(app)
        .post('/api/auth/register')
        .send(userData);

      // Try to register same email again
      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(409);

      expect(response.body.error).toBe('User already exists');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login with valid credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(200);

      expect(response.body).toHaveProperty('token');
      expect(response.body.user.email).toBe(loginData.email);
    });

    it('should reject invalid credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'wrongpassword'
      };

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(401);

      expect(response.body.error).toBe('Invalid credentials');
    });
  });
});
```

### Task 2: Environment Configuration
Create `/home/davie/clawd/boldpath-hr-website/api/.env`:
```
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=boldpath_hr
DB_USER=boldpath_user
DB_PASSWORD=secure_password

# JWT Configuration
JWT_SECRET=your_super_secret_key_here_change_this_in_production
JWT_EXPIRES_IN=24h

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=noreply@boldpathhr.com

# Server Configuration
PORT=3000
NODE_ENV=development
```

### Task 3: Deployment Script
Create `/home/davie/clawd/boldpath-hr-website/deploy.sh`:
```bash
#!/bin/bash

# BoldPath HR Platform Deployment Script

echo "Starting BoldPath HR Platform deployment..."

# Check if running as root
if [ "$EUID" -eq 0 ]; then
  echo "Please don't run as root"
  exit 1
fi

# Navigate to project directory
cd /home/davie/clawd/boldpath-hr-website

# Install backend dependencies
echo "Installing backend dependencies..."
cd api
npm install

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
  echo "PostgreSQL not found. Installing..."
  sudo apt-get update
  sudo apt-get install -y postgresql postgresql-contrib
fi

# Start PostgreSQL if not running
if ! pg_isready &> /dev/null; then
  echo "Starting PostgreSQL..."
  sudo service postgresql start
fi

# Create database and user if they don't exist
echo "Setting up database..."
sudo -u postgres psql -c "CREATE DATABASE boldpath_hr;" 2>/dev/null || true
sudo -u postgres psql -c "CREATE USER boldpath_user WITH PASSWORD 'secure_password';" 2>/dev/null || true
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE boldpath_hr TO boldpath_user;" 2>/dev/null || true

# Create tables
echo "Creating database tables..."
sudo -u postgres psql -d boldpath_hr -f ../sql/schema.sql 2>/dev/null || true

# Install PM2 for process management
if ! command -v pm2 &> /dev/null; then
  echo "Installing PM2..."
  npm install -g pm2
fi

# Start the application
echo "Starting application..."
pm2 start server.js --name "boldpath-hr-api"

# Save PM2 configuration
pm2 save

echo "Deployment completed!"
echo "API is running on http://localhost:3000"
echo "Use 'pm2 logs boldpath-hr-api' to view logs"
echo "Use 'pm2 stop boldpath-hr-api' to stop the application"
```

## Business Value and Success Metrics

### Technical Success Metrics
- User registration completion rate: >95%
- Email verification rate: >90%
- Login success rate: >99.5%
- Password reset success rate: >99%
- API response time: <200ms
- System uptime: 99.9%

### Business Success Metrics
- User adoption rate: >80%
- Support tickets related to accounts: Reduced by 70%
- Security incidents: Reduced by 90%
- User satisfaction score: >4.5/5

## Conclusion

This implementation plan transforms the BoldPath HR platform's user registration and management system from a basic prototype to a robust, production-ready system. The key enhancements include:

1. **Database Integration**: Replacing localStorage with PostgreSQL for persistent data storage
2. **Enhanced Security**: Implementing password hashing, email verification, and role-based access control
3. **Comprehensive User Management**: Adding profile management, password reset, and admin capabilities
4. **Professional User Experience**: Improving registration flows and authentication processes
5. **Scalable Architecture**: Building a foundation that can grow with the organization

The phased approach ensures that critical infrastructure is established first, followed by advanced features, resulting in a professional HR application that provides real business value while maintaining security and user experience standards.
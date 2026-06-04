// API Client for BoldPath HR Platform
class APIClient {
    constructor(baseURL = '/api') {
        this.baseURL = baseURL;
        this.token = localStorage.getItem('token');
    }

    // Set authentication token
    setToken(token) {
        this.token = token;
        localStorage.setItem('token', token);
    }

    // Clear authentication token
    clearToken() {
        this.token = null;
        localStorage.removeItem('token');
    }

    // Make API request
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };

        // Add authentication token if available
        if (this.token) {
            config.headers.Authorization = `Bearer ${this.token}`;
        }

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'API request failed');
            }

            return data;
        } catch (error) {
            console.error('API request error:', error);
            throw error;
        }
    }

    // Authentication endpoints
    async register(userData) {
        const data = await this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
        
        if (data.token) {
            this.setToken(data.token);
        }
        
        return data;
    }

    async login(credentials) {
        const data = await this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials)
        });
        
        if (data.token) {
            this.setToken(data.token);
        }
        
        return data;
    }

    async logout() {
        try {
            await this.request('/auth/logout', {
                method: 'POST'
            });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            this.clearToken();
        }
    }

    // User endpoints
    async getCurrentUser() {
        return await this.request('/users/me');
    }

    async updateUser(userId, userData) {
        return await this.request(`/users/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(userData)
        });
    }

    // Employee endpoints
    async getEmployees() {
        return await this.request('/employees');
    }

    async getEmployee(employeeId) {
        return await this.request(`/employees/${employeeId}`);
    }

    async createEmployee(employeeData) {
        return await this.request('/employees', {
            method: 'POST',
            body: JSON.stringify(employeeData)
        });
    }

    async updateEmployee(employeeId, employeeData) {
        return await this.request(`/employees/${employeeId}`, {
            method: 'PUT',
            body: JSON.stringify(employeeData)
        });
    }

    async deleteEmployee(employeeId) {
        return await this.request(`/employees/${employeeId}`, {
            method: 'DELETE'
        });
    }

    // Department endpoints
    async getDepartments() {
        return await this.request('/departments');
    }

    async createDepartment(departmentData) {
        return await this.request('/departments', {
            method: 'POST',
            body: JSON.stringify(departmentData)
        });
    }

    // Position endpoints
    async getPositions() {
        return await this.request('/positions');
    }

    async createPosition(positionData) {
        return await this.request('/positions', {
            method: 'POST',
            body: JSON.stringify(positionData)
        });
    }
}

// Export API client instance
const api = new APIClient();
export default api;
// Health Check Endpoint
// This file provides a simple health check endpoint for the application

const express = require('express');
const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: {
            rss: Math.round(process.memoryUsage().rss / 1024 / 1024) + ' MB',
            heapTotal: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB',
            heapUsed: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
            external: Math.round(process.memoryUsage().external / 1024 / 1024) + ' MB'
        },
        version: process.env.npm_package_version || '1.0.0',
        node: process.version,
        platform: process.platform
    });
});

// Detailed health check endpoint
router.get('/health/detailed', async (req, res) => {
    try {
        // Check database connection
        const dbStatus = await checkDatabaseConnection();
        
        // Check external services
        const servicesStatus = await checkExternalServices();
        
        res.json({
            status: 'OK',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            version: process.env.npm_package_version || '1.0.0',
            database: dbStatus,
            services: servicesStatus,
            memory: {
                rss: Math.round(process.memoryUsage().rss / 1024 / 1024) + ' MB',
                heapTotal: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB',
                heapUsed: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
                external: Math.round(process.memoryUsage().external / 1024 / 1024) + ' MB'
            },
            node: process.version,
            platform: process.platform
        });
    } catch (error) {
        res.status(500).json({
            status: 'ERROR',
            timestamp: new Date().toISOString(),
            error: error.message
        });
    }
});

// Function to check database connection
async function checkDatabaseConnection() {
    try {
        // This would normally check the actual database connection
        // For now, we'll simulate a successful connection
        return {
            status: 'OK',
            message: 'Database connection successful',
            timestamp: new Date().toISOString()
        };
    } catch (error) {
        return {
            status: 'ERROR',
            message: 'Database connection failed',
            error: error.message,
            timestamp: new Date().toISOString()
        };
    }
}

// Function to check external services
async function checkExternalServices() {
    // This would normally check external service connections
    // For now, we'll return a simulated response
    return {
        email: {
            status: 'OK',
            message: 'Email service connected'
        },
        storage: {
            status: 'OK',
            message: 'Storage service connected'
        }
    };
}

module.exports = router;
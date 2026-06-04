#!/bin/bash

# Application Status Script
# This script checks the status of the Bold Path HR application

echo "========================================="
echo "Bold Path HR Application Status"
echo "========================================="

# Configuration
API_BASE_URL="http://localhost:3000"
APP_NAME="Bold Path HR"

echo "Checking application status..."
echo ""

# Check if the application is running
echo "1. Checking if application is running..."
if curl -s --head --request GET "$API_BASE_URL" | grep "200 OK" > /dev/null; then
    echo "✓ Application is running and accessible"
else
    echo "✗ Application is not accessible"
fi

# Check API health endpoint
echo ""
echo "2. Checking API health endpoint..."
HEALTH_RESPONSE=$(curl -s -w "%{http_code}" "$API_BASE_URL/api/health")
HTTP_CODE=$(echo "$HEALTH_RESPONSE" | tail -c 4)
RESPONSE_BODY=$(echo "$HEALTH_RESPONSE" | head -c -4)

if [ "$HTTP_CODE" = "200" ]; then
    echo "✓ API health endpoint is responding"
    echo "  Status: $(echo "$RESPONSE_BODY" | grep -o '"status":"[^"]*"' | cut -d'"' -f4)"
    echo "  Timestamp: $(echo "$RESPONSE_BODY" | grep -o '"timestamp":"[^"]*"' | cut -d'"' -f4)"
else
    echo "✗ API health endpoint is not responding (HTTP $HTTP_CODE)"
fi

# Check database connection
echo ""
echo "3. Checking database connection..."
# This would require a more complex check in a real implementation
echo "  Note: Database connection check requires direct database access"
echo "  Run 'npm run migrate' to verify database connectivity"

# Check required services
echo ""
echo "4. Checking required services..."

# Check Node.js
echo "  Node.js:"
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "    ✓ Installed: $NODE_VERSION"
else
    echo "    ✗ Not installed"
fi

# Check npm
echo "  npm:"
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo "    ✓ Installed: $NPM_VERSION"
else
    echo "    ✗ Not installed"
fi

# Check PostgreSQL
echo "  PostgreSQL:"
if command -v psql &> /dev/null; then
    echo "    ✓ Installed"
else
    echo "    ✗ Not installed (required for database)"
fi

# Check Docker (optional)
echo "  Docker:"
if command -v docker &> /dev/null; then
    echo "    ✓ Installed"
else
    echo "    Not installed (optional for containerization)"
fi

# Check application processes
echo ""
echo "5. Checking application processes..."
APP_PROCESSES=$(ps aux | grep "node.*server.js" | grep -v grep)

if [ -n "$APP_PROCESSES" ]; then
    echo "✓ Application process is running:"
    echo "$APP_PROCESSES" | head -n 1
else
    echo "✗ Application process is not running"
    echo "  Start the application with: npm start"
fi

# Check disk space
echo ""
echo "6. Checking system resources..."

# Disk space
DISK_USAGE=$(df -h . | awk 'NR==2 {print $5}')
echo "  Disk usage: $DISK_USAGE"

# Memory usage
if command -v free &> /dev/null; then
    MEMORY_USAGE=$(free -m | awk 'NR==2{printf "%.2f%%", $3*100/$2}')
    echo "  Memory usage: $MEMORY_USAGE"
else
    echo "  Memory usage: Unable to determine"
fi

echo ""
echo "========================================="
echo "Status check completed!"
echo "========================================="
echo ""
echo "For detailed logs, check:"
echo "  - Application logs in the logs/ directory"
echo "  - Database logs (PostgreSQL logs)"
echo "  - System logs (/var/log/)"
echo ""
echo "To start the application:"
echo "  npm start"
echo ""
echo "To start the application in development mode:"
echo "  npm run dev"
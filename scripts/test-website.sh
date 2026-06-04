#!/bin/bash

# Bold Path HR Website Test Script
# This script performs basic tests on the website

echo "========================================="
echo "Bold Path HR Website Test Script"
echo "========================================="

# Check if required tools are installed
echo "Checking required tools..."
for tool in curl python3; do
    if ! command -v $tool &> /dev/null; then
        echo "Error: $tool is not installed"
        exit 1
    fi
done

echo "All required tools are installed"
echo ""

# Test local server
echo "Testing local server..."
if ! command -v python3 &> /dev/null; then
    echo "Python 3 not found, skipping local server test"
else
    echo "Starting local server in background..."
    python3 -m http.server 8000 > /dev/null 2>&1 &
    SERVER_PID=$!
    
    # Give server time to start
    sleep 2
    
    echo "Testing homepage..."
    if curl -f http://localhost:8000 > /dev/null 2>&1; then
        echo "✓ Homepage is accessible"
    else
        echo "✗ Homepage is not accessible"
    fi
    
    echo "Testing key pages..."
    PAGES=("company-profile.html" "our-services.html" "contact-us.html" "client-success.html" "hr-resources.html" "hr-blog.html" "careers-opportunities.html" "pricing-plans.html" "user-login.html" "user-register.html")
    
    for page in "${PAGES[@]}"; do
        if curl -f "http://localhost:8000/$page" > /dev/null 2>&1; then
            echo "✓ $page is accessible"
        else
            echo "✗ $page is not accessible"
        fi
    done
    
    echo "Testing admin pages..."
    ADMIN_PAGES=("admin/dashboard.html" "admin/employees.html" "admin/departments.html" "admin/positions.html" "admin/attendance.html" "admin/leave.html")
    
    for page in "${ADMIN_PAGES[@]}"; do
        if curl -f "http://localhost:8000/$page" > /dev/null 2>&1; then
            echo "✓ $page is accessible"
        else
            echo "✗ $page is not accessible"
        fi
    done
    
    # Stop the server
    kill $SERVER_PID
    echo ""
    echo "Local server tests completed"
fi

echo ""
echo "Testing file integrity..."
# Check that key files exist
KEY_FILES=("index.html" "css/style.css" "js/main.js" "admin/dashboard.html" "README.md" "sitemap.xml" "robots.txt" "404.html")

for file in "${KEY_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✓ $file exists"
    else
        echo "✗ $file is missing"
    fi
done

echo ""
echo "Testing CSS and JavaScript..."
# Check that CSS and JS files are not empty
if [ -s "css/style.css" ]; then
    echo "✓ style.css is not empty"
else
    echo "✗ style.css is empty"
fi

if [ -s "js/main.js" ]; then
    echo "✓ main.js is not empty"
else
    echo "✗ main.js is empty"
fi

echo ""
echo "========================================="
echo "Website testing completed!"
echo "========================================="
echo ""
echo "Summary:"
echo "- Local server test: Check if Python 3 is available"
echo "- File integrity: All key files should exist"
echo "- CSS/JS: Files should not be empty"
echo ""
echo "For detailed testing, consider using tools like:"
echo "- linkchecker: For broken link detection"
echo "- Lighthouse: For performance and accessibility testing"
echo "- W3C Validator: For HTML/CSS validation"
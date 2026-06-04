#!/bin/bash

# API Testing Script
# This script tests the Bold Path HR API endpoints

echo "========================================="
echo "Bold Path HR API Testing Script"
echo "========================================="

# Configuration
API_BASE_URL="http://localhost:3000/api"
TEST_EMAIL="test@example.com"
TEST_PASSWORD="testpassword123"

echo "Testing API endpoints..."
echo ""

# Test health endpoint
echo "Testing health endpoint..."
curl -s -w "\nHTTP Status: %{http_code}\n" -X GET "$API_BASE_URL/health" | grep -v "HTTP Status"
echo ""

# Test authentication endpoints
echo "Testing authentication endpoints..."
echo ""

# Test registration
echo "Testing user registration..."
curl -s -w "\nHTTP Status: %{http_code}\n" -X POST "$API_BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "'$TEST_EMAIL'",
    "password": "'$TEST_PASSWORD'",
    "firstName": "Test",
    "lastName": "User",
    "company": "Test Company"
  }' | grep -v "HTTP Status"
echo ""

# Test login
echo "Testing user login..."
LOGIN_RESPONSE=$(curl -s -X POST "$API_BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "'$TEST_EMAIL'",
    "password": "'$TEST_PASSWORD'"
  }')

echo "$LOGIN_RESPONSE"
echo ""

# Extract token from login response (this would require jq to be installed)
# TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token')

# Test profile endpoint (uncomment when token is available)
# echo "Testing profile endpoint..."
# curl -s -w "\nHTTP Status: %{http_code}\n" -X GET "$API_BASE_URL/auth/profile" \
#   -H "Authorization: Bearer $TOKEN" \
#   -H "Content-Type: application/json" | grep -v "HTTP Status"
# echo ""

# Test employees endpoints
echo "Testing employees endpoints..."
echo ""

# Test get all employees
echo "Testing get all employees..."
curl -s -w "\nHTTP Status: %{http_code}\n" -X GET "$API_BASE_URL/employees" \
  -H "Content-Type: application/json" | grep -v "HTTP Status"
echo ""

# Test departments endpoints
echo "Testing departments endpoints..."
echo ""

# Test get all departments
echo "Testing get all departments..."
curl -s -w "\nHTTP Status: %{http_code}\n" -X GET "$API_BASE_URL/departments" \
  -H "Content-Type: application/json" | grep -v "HTTP Status"
echo ""

# Test positions endpoints
echo "Testing positions endpoints..."
echo ""

# Test get all positions
echo "Testing get all positions..."
curl -s -w "\nHTTP Status: %{http_code}\n" -X GET "$API_BASE_URL/positions" \
  -H "Content-Type: application/json" | grep -v "HTTP Status"
echo ""

# Test attendance endpoints
echo "Testing attendance endpoints..."
echo ""

# Test get all attendance records
echo "Testing get all attendance records..."
curl -s -w "\nHTTP Status: %{http_code}\n" -X GET "$API_BASE_URL/attendance" \
  -H "Content-Type: application/json" | grep -v "HTTP Status"
echo ""

# Test leave endpoints
echo "Testing leave endpoints..."
echo ""

# Test get all leave requests
echo "Testing get all leave requests..."
curl -s -w "\nHTTP Status: %{http_code}\n" -X GET "$API_BASE_URL/leave" \
  -H "Content-Type: application/json" | grep -v "HTTP Status"
echo ""

echo "========================================="
echo "API testing completed!"
echo "========================================="
echo ""
echo "Note: Some endpoints require authentication."
echo "Install 'jq' to enable token-based testing."
echo ""
echo "For detailed API documentation, see docs/api-documentation.md"
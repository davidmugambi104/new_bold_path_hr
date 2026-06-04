#!/bin/bash

# Run All Tests Script
# This script runs all tests for the Bold Path HR application

echo "========================================="
echo "Bold Path HR - Run All Tests"
echo "========================================="

# Test results tracking
PASSED_TESTS=0
FAILED_TESTS=0

# Function to run a test and track results
run_test() {
    local test_name=$1
    local test_command=$2
    
    echo ""
    echo "Running test: $test_name"
    echo "----------------------------------------"
    
    # Run the test command
    eval $test_command
    local result=$?
    
    if [ $result -eq 0 ]; then
        echo "✓ $test_name: PASSED"
        PASSED_TESTS=$((PASSED_TESTS + 1))
    else
        echo "✗ $test_name: FAILED"
        FAILED_TESTS=$((FAILED_TESTS + 1))
    fi
    
    return $result
}

# Function to print summary
print_summary() {
    echo ""
    echo "========================================="
    echo "Test Results Summary"
    echo "========================================="
    echo "Passed: $PASSED_TESTS"
    echo "Failed: $FAILED_TESTS"
    echo "Total:  $((PASSED_TESTS + FAILED_TESTS))"
    
    if [ $FAILED_TESTS -eq 0 ]; then
        echo ""
        echo "🎉 All tests passed!"
        return 0
    else
        echo ""
        echo "❌ Some tests failed. Please review the output above."
        return 1
    fi
}

# Run configuration validation
run_test "Configuration Validation" "node scripts/validate-config.js"

# Run website tests
run_test "Website Tests" "bash scripts/test-website.sh"

# Run API tests
run_test "API Tests" "bash scripts/test-api.sh"

# Run unit tests (if they exist)
if [ -d "tests" ] && [ -n "$(ls -A tests)" ]; then
    run_test "Unit Tests" "npm test"
else
    echo ""
    echo "Skipping Unit Tests - no test files found"
    echo "To run unit tests, create test files in the tests/ directory"
fi

# Run database tests (if database is accessible)
echo ""
echo "Checking database connectivity..."
if command -v pg_isready &> /dev/null; then
    if pg_isready -h localhost -p 5432 -U boldpath_user > /dev/null 2>&1; then
        echo "✓ Database is accessible"
        # Run database tests if they exist
        if [ -f "tests/database.test.js" ]; then
            run_test "Database Tests" "node tests/database.test.js"
        else
            echo ""
            echo "Skipping Database Tests - no test files found"
        fi
    else
        echo "⚠ Database is not accessible - skipping database tests"
    fi
else
    echo "⚠ pg_isready not available - skipping database connectivity check"
fi

# Print final summary
print_summary
exit $?
#!/bin/bash

# Update Dependencies Script
# This script updates Node.js dependencies for the Bold Path HR application

echo "========================================="
echo "Bold Path HR Dependency Update Script"
echo "========================================="

# Check if npm is available
if ! command -v npm &> /dev/null; then
    echo "Error: npm is not installed"
    echo "Please install Node.js and npm to update dependencies"
    exit 1
fi

echo "Current Node.js version: $(node --version)"
echo "Current npm version: $(npm --version)"
echo ""

# Check for outdated dependencies
echo "Checking for outdated dependencies..."
npm outdated

if [ $? -ne 0 ]; then
    echo "No outdated dependencies found or npm outdated command failed"
fi

echo ""
echo "Updating dependencies..."
echo "========================"

# Update production dependencies
echo "Updating production dependencies..."
npm update --save

if [ $? -eq 0 ]; then
    echo "✓ Production dependencies updated successfully"
else
    echo "✗ Failed to update production dependencies"
fi

# Update development dependencies
echo ""
echo "Updating development dependencies..."
npm update --save-dev

if [ $? -eq 0 ]; then
    echo "✓ Development dependencies updated successfully"
else
    echo "✗ Failed to update development dependencies"
fi

# Check for major version updates
echo ""
echo "Checking for major version updates..."
echo "====================================="

# Get list of dependencies with major updates available
MAJOR_UPDATES=$(npm outdated --depth=0 --json | grep -o '"wanted":"[^"]*"' | cut -d'"' -f4 | grep -v "^$" | wc -l)

if [ "$MAJOR_UPDATES" -gt 0 ]; then
    echo "⚠ $MAJOR_UPDATES major version updates are available"
    echo "Run 'npm outdated' to see details"
    echo "To update to major versions, run 'npm install <package>@latest'"
else
    echo "✓ No major version updates available"
fi

# Audit security vulnerabilities
echo ""
echo "Auditing security vulnerabilities..."
echo "==================================="

npm audit

if [ $? -eq 0 ]; then
    echo "✓ No security vulnerabilities found"
else
    echo "⚠ Security vulnerabilities found"
    echo "Run 'npm audit fix' to automatically fix some vulnerabilities"
    echo "Run 'npm audit' for more details"
fi

# Update package-lock.json
echo ""
echo "Updating package-lock.json..."
npm install --package-lock-only

if [ $? -eq 0 ]; then
    echo "✓ package-lock.json updated successfully"
else
    echo "✗ Failed to update package-lock.json"
fi

echo ""
echo "========================================="
echo "Dependency update completed!"
echo "========================================="
echo ""
echo "Summary:"
echo "  - Production dependencies updated"
echo "  - Development dependencies updated"
echo "  - package-lock.json updated"
echo ""
echo "Next steps:"
echo "  1. Test the application thoroughly"
echo "  2. Run 'npm audit' to check for security issues"
echo "  3. Commit updated package.json and package-lock.json"
echo ""
echo "To check for outdated dependencies in the future:"
echo "  npm outdated"
echo ""
echo "To update a specific package to the latest version:"
echo "  npm install <package>@latest"
#!/bin/bash

# Cleanup Script
# This script cleans up temporary files and logs for the Bold Path HR application

echo "========================================="
echo "Bold Path HR Cleanup Script"
echo "========================================="

# Configuration
LOG_DIR="./logs"
BACKUP_DIR="./backups"
TEMP_DIR="./tmp"
NODE_MODULES_DIR="./node_modules"

echo "Cleaning up temporary files and logs..."
echo ""

# Clean up log files older than 30 days
if [ -d "$LOG_DIR" ]; then
    echo "Cleaning up old log files..."
    find "$LOG_DIR" -name "*.log" -mtime +30 -delete
    find "$LOG_DIR" -name "*.log.*" -mtime +30 -delete
    echo "✓ Old log files cleaned up"
else
    echo "✓ No log directory found"
fi

# Clean up backup files older than 30 days
if [ -d "$BACKUP_DIR" ]; then
    echo "Cleaning up old backup files..."
    find "$BACKUP_DIR" -name "*.sql.gz" -mtime +30 -delete
    find "$BACKUP_DIR" -name "*.tar.gz" -mtime +30 -delete
    echo "✓ Old backup files cleaned up"
else
    echo "✓ No backup directory found"
fi

# Clean up temporary files
if [ -d "$TEMP_DIR" ]; then
    echo "Cleaning up temporary files..."
    rm -rf "$TEMP_DIR"/*
    echo "✓ Temporary files cleaned up"
else
    echo "✓ No temporary directory found"
fi

# Clean up Node.js temporary files
echo "Cleaning up Node.js temporary files..."
find . -name "npm-debug.log*" -delete
find . -name "yarn-debug.log*" -delete
find . -name "yarn-error.log*" -delete
find . -name "*.log" -path "./node_modules/*" -delete

# Clean up OS generated files
echo "Cleaning up OS generated files..."
find . -name ".DS_Store" -delete
find . -name "Thumbs.db" -delete
find . -name "ehthumbs.db" -delete

# Clean up editor files
echo "Cleaning up editor files..."
find . -name "*.swp" -delete
find . -name "*.swo" -delete
find . -name "*~" -delete
find . -name "._*" -delete

# Clean up build artifacts
echo "Cleaning up build artifacts..."
find . -name "dist" -type d -exec rm -rf {} +
find . -name "build" -type d -exec rm -rf {} +
find . -name "out" -type d -exec rm -rf {} +

# Clean up coverage reports
echo "Cleaning up coverage reports..."
find . -name "coverage" -type d -exec rm -rf {} +

echo ""
echo "========================================="
echo "Cleanup completed!"
echo "========================================="
echo ""
echo "The following items were cleaned up:"
echo "  - Log files older than 30 days"
echo "  - Backup files older than 30 days"
echo "  - Temporary files"
echo "  - Node.js temporary files"
echo "  - OS generated files"
echo "  - Editor temporary files"
echo "  - Build artifacts"
echo "  - Coverage reports"
echo ""
echo "Note: node_modules directory was not removed."
echo "To remove node_modules, run: rm -rf node_modules"
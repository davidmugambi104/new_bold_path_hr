#!/bin/bash

# Database Restore Script
# This script restores the Bold Path HR database from a backup

echo "========================================="
echo "Bold Path HR Database Restore Script"
echo "========================================="

# Configuration
DB_NAME="boldpath_hr"
DB_USER="boldpath_user"
DB_HOST="localhost"
DB_PORT="5432"
BACKUP_DIR="./backups"

# Check if backup file is provided
if [ $# -eq 0 ]; then
    echo "Usage: $0 <backup-file>"
    echo ""
    echo "Available backup files:"
    ls -1 $BACKUP_DIR/boldpath-hr-backup-*.sql.gz 2>/dev/null || echo "No backup files found"
    echo ""
    echo "Example: $0 backups/boldpath-hr-backup-20230601-120000.sql.gz"
    exit 1
fi

BACKUP_FILE=$1

# Check if backup file exists
if [ ! -f "$BACKUP_FILE" ]; then
    echo "Error: Backup file not found: $BACKUP_FILE"
    exit 1
fi

echo "Restoring database: $DB_NAME"
echo "Backup file: $BACKUP_FILE"
echo ""

# Check if pg_restore is available
if ! command -v pg_restore &> /dev/null; then
    echo "Error: pg_restore is not installed"
    echo "Please install PostgreSQL client tools"
    exit 1
fi

# Confirm restore operation
echo "WARNING: This will overwrite the current database!"
echo "Are you sure you want to continue? (y/N)"
read -r response

if [[ ! "$response" =~ ^[Yy]$ ]]; then
    echo "Restore cancelled"
    exit 0
fi

# Extract backup file if it's compressed
if [[ "$BACKUP_FILE" == *.gz ]]; then
    echo "Extracting compressed backup file..."
    gunzip -c "$BACKUP_FILE" > "/tmp/boldpath-hr-restore-$$.sql"
    RESTORE_FILE="/tmp/boldpath-hr-restore-$$.sql"
else
    RESTORE_FILE="$BACKUP_FILE"
fi

# Restore database
echo "Restoring database from backup..."
psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f "$RESTORE_FILE"

if [ $? -eq 0 ]; then
    echo "✓ Database restore completed successfully"
else
    echo "✗ Database restore failed"
    # Clean up temporary file
    if [[ "$BACKUP_FILE" == *.gz ]]; then
        rm -f "$RESTORE_FILE"
    fi
    exit 1
fi

# Clean up temporary file
if [[ "$BACKUP_FILE" == *.gz ]]; then
    rm -f "$RESTORE_FILE"
fi

echo ""
echo "========================================="
echo "Database restore completed!"
echo "========================================="
echo ""
echo "Database: $DB_NAME"
echo "Restore date: $(date)"
echo ""
echo "Please verify the restored data by:"
echo "1. Logging into the application"
echo "2. Checking key data entries"
echo "3. Running basic functionality tests"
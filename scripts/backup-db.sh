#!/bin/bash

# Database Backup Script
# This script creates a backup of the Bold Path HR database

echo "========================================="
echo "Bold Path HR Database Backup Script"
echo "========================================="

# Configuration
DB_NAME="boldpath_hr"
DB_USER="boldpath_user"
DB_HOST="localhost"
DB_PORT="5432"
BACKUP_DIR="./backups"
TIMESTAMP=$(date +"%Y%m%d-%H%M%S")
BACKUP_FILE="$BACKUP_DIR/boldpath-hr-backup-$TIMESTAMP.sql"

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

echo "Creating backup of database: $DB_NAME"
echo "Backup file: $BACKUP_FILE"
echo ""

# Check if pg_dump is available
if ! command -v pg_dump &> /dev/null; then
    echo "Error: pg_dump is not installed"
    echo "Please install PostgreSQL client tools"
    exit 1
fi

# Create database backup
echo "Starting database backup..."
pg_dump -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME > $BACKUP_FILE

if [ $? -eq 0 ]; then
    echo "✓ Database backup completed successfully"
    echo "Backup file size: $(du -h $BACKUP_FILE | cut -f1)"
else
    echo "✗ Database backup failed"
    exit 1
fi

# Compress backup file
echo "Compressing backup file..."
gzip $BACKUP_FILE

if [ $? -eq 0 ]; then
    echo "✓ Backup file compressed successfully"
    COMPRESSED_FILE="$BACKUP_FILE.gz"
    echo "Compressed file size: $(du -h $COMPRESSED_FILE | cut -f1)"
else
    echo "✗ Backup file compression failed"
fi

# Remove backups older than 30 days
echo "Cleaning up old backups..."
find $BACKUP_DIR -name "boldpath-hr-backup-*.sql.gz" -mtime +30 -delete

if [ $? -eq 0 ]; then
    echo "✓ Old backups cleaned up"
else
    echo "⚠ Warning: Failed to clean up old backups"
fi

echo ""
echo "========================================="
echo "Database backup completed!"
echo "========================================="
echo ""
echo "Backup file: $COMPRESSED_FILE"
echo "Backup date: $(date)"
echo ""
echo "To restore the backup, use:"
echo "gunzip $COMPRESSED_FILE"
echo "psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -f ${BACKUP_FILE}"
#!/bin/bash

# Bold Path HR Website Deployment Script
# This script helps with deploying the website to a production server

echo "========================================="
echo "Bold Path HR Website Deployment Script"
echo "========================================="

# Configuration
DEPLOY_USER="webuser"
DEPLOY_HOST="your-server.com"
DEPLOY_PATH="/var/www/boldpathhr"
BACKUP_PATH="/var/backups/boldpathhr"

echo "Deploying website to $DEPLOY_HOST..."
echo ""

# Create timestamp for backup
TIMESTAMP=$(date +"%Y%m%d-%H%M%S")

# Create backup of current deployment
echo "Creating backup of current deployment..."
ssh $DEPLOY_USER@$DEPLOY_HOST "mkdir -p $BACKUP_PATH && tar -czf $BACKUP_PATH/backup-$TIMESTAMP.tar.gz $DEPLOY_PATH"

# Sync files to server
echo "Syncing files to server..."
rsync -avz --delete \
    --exclude='backups/' \
    --exclude='.git/' \
    --exclude='node_modules/' \
    --exclude='*.log' \
    ./ $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH/

# Set proper permissions
echo "Setting permissions..."
ssh $DEPLOY_USER@$DEPLOY_HOST "chown -R www-data:www-data $DEPLOY_PATH && chmod -R 755 $DEPLOY_PATH"

# Restart web server (if needed)
echo "Restarting web server..."
ssh $DEPLOY_USER@$DEPLOY_HOST "sudo systemctl reload nginx"

echo ""
echo "========================================="
echo "Deployment completed successfully!"
echo "========================================="
echo ""
echo "Website URL: https://$DEPLOY_HOST"
echo "Backup location: $BACKUP_PATH/backup-$TIMESTAMP.tar.gz"
echo ""
echo "Please verify the deployment by visiting the website."
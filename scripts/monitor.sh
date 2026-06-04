#!/bin/bash

# Application Monitoring Script
# This script monitors the Bold Path HR application and restarts it if needed

echo "========================================="
echo "Bold Path HR Application Monitor"
echo "========================================="

# Configuration
API_BASE_URL="http://localhost:3000"
CHECK_INTERVAL=60  # seconds
MAX_RESTARTS=3
RESTART_COUNT=0
LOG_FILE="./logs/monitor.log"

# Create logs directory if it doesn't exist
mkdir -p ./logs

# Function to log messages
log_message() {
    echo "[$(date)] $1" | tee -a "$LOG_FILE"
}

# Function to check if application is running
check_application() {
    if curl -s --head --request GET "$API_BASE_URL" | grep "200 OK" > /dev/null; then
        return 0
    else
        return 1
    fi
}

# Function to check API health
check_health() {
    HEALTH_RESPONSE=$(curl -s -w "%{http_code}" "$API_BASE_URL/api/health" 2>/dev/null)
    HTTP_CODE=$(echo "$HEALTH_RESPONSE" | tail -c 4)
    
    if [ "$HTTP_CODE" = "200" ]; then
        return 0
    else
        return 1
    fi
}

# Function to restart application
restart_application() {
    log_message "Restarting application..."
    
    # Kill existing processes
    pkill -f "node.*server.js" 2>/dev/null
    
    # Wait a moment
    sleep 5
    
    # Start application in background
    nohup npm start > ./logs/app.log 2>&1 &
    
    # Wait for startup
    sleep 10
    
    # Check if restart was successful
    if check_application; then
        log_message "Application restarted successfully"
        return 0
    else
        log_message "Failed to restart application"
        return 1
    fi
}

# Main monitoring loop
log_message "Starting application monitor"
log_message "Monitoring URL: $API_BASE_URL"
log_message "Check interval: ${CHECK_INTERVAL} seconds"

while true; do
    log_message "Performing health check..."
    
    # Check if application is running
    if check_application; then
        log_message "✓ Application is accessible"
        
        # Check API health
        if check_health; then
            log_message "✓ API health check passed"
        else
            log_message "✗ API health check failed"
            
            # Increment restart counter
            RESTART_COUNT=$((RESTART_COUNT + 1))
            
            if [ $RESTART_COUNT -le $MAX_RESTARTS ]; then
                log_message "Restarting application (attempt $RESTART_COUNT of $MAX_RESTARTS)"
                restart_application
            else
                log_message "Maximum restart attempts reached. Manual intervention required."
                exit 1
            fi
        fi
    else
        log_message "✗ Application is not accessible"
        
        # Increment restart counter
        RESTART_COUNT=$((RESTART_COUNT + 1))
        
        if [ $RESTART_COUNT -le $MAX_RESTARTS ]; then
            log_message "Restarting application (attempt $RESTART_COUNT of $MAX_RESTARTS)"
            restart_application
        else
            log_message "Maximum restart attempts reached. Manual intervention required."
            exit 1
        fi
    fi
    
    # Wait before next check
    log_message "Waiting ${CHECK_INTERVAL} seconds before next check..."
    sleep $CHECK_INTERVAL
done
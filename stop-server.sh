#!/bin/bash

# Simple script to stop the local server for Bold Path HR website

echo "Stopping local server for Bold Path HR website..."

# Find and kill the Python HTTP server process
pids=$(ps aux | grep "python3 -m http.server 8000" | grep -v grep | awk '{print $2}')

if [ -z "$pids" ]; then
    echo "No server process found running on port 8000"
else
    echo "Killing server process(es): $pids"
    kill $pids
    echo "Server stopped successfully"
fi
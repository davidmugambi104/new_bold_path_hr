#!/bin/bash

# Simple server script to test the Bold Path HR website locally
# Requires Python 3 to be installed

echo "Starting local server for Bold Path HR website..."
echo "Open your browser and go to http://localhost:8000"
echo "Press Ctrl+C to stop the server"

# Check if Python 3 is available
if command -v python3 &> /dev/null; then
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    python -m http.server 8000
else
    echo "Error: Python is not installed or not in PATH"
    echo "Please install Python 3 to run this server"
    exit 1
fi
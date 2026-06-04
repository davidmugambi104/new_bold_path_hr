#!/bin/bash

# BoldPath HR Website Setup Script

echo "Setting up BoldPath HR Website development environment..."

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "Node.js is not installed. Please install Node.js v18 or higher."
    exit 1
fi

echo "Node.js version: $(node --version)"
echo "npm version: $(npm --version)"

# Install dependencies
echo "Installing project dependencies..."
npm install

# Check if installation was successful
if [ $? -ne 0 ]; then
    echo "Failed to install dependencies. Please check the error messages above."
    exit 1
fi

echo "Dependencies installed successfully."

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file from template..."
    cp .env.example .env
    echo "Please update the .env file with your database configuration and other settings."
fi

echo "Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Update the .env file with your database configuration"
echo "2. Set up PostgreSQL database (see docs/DEVELOPMENT_SETUP.md)"
echo "3. Run the database initialization script: npm run migrate"
echo "4. Start the development server: npm run dev"
echo ""
echo "For detailed setup instructions, see docs/DEVELOPMENT_SETUP.md"
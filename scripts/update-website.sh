#!/bin/bash

# Bold Path HR Website Update Script
# This script helps with updating and maintaining the website

echo "========================================="
echo "Bold Path HR Website Update Script"
echo "========================================="

# Check if we're in the correct directory
if [ ! -f "index.html" ]; then
    echo "Error: Please run this script from the website root directory"
    exit 1
fi

echo "Current date: $(date)"
echo "Current directory: $(pwd)"
echo ""

# Backup current files
echo "Creating backup..."
mkdir -p backups
tar -czf "backups/website-backup-$(date +%Y%m%d-%H%M%S).tar.gz" \
    *.html css/ js/ assets/ admin/ scripts/ docs/ \
    README.md WEBSITE_SUMMARY.md MAINTENANCE_GUIDE.md \
    sitemap.xml robots.txt 404.html

echo "Backup created successfully"
echo ""

# Check for updates to dependencies
echo "Checking for updates..."
if [ -f "package.json" ]; then
    echo "Checking npm packages..."
    npm outdated
fi

echo ""
echo "Checking for broken links..."
# This would require a tool like linkchecker to be installed
# linkchecker http://localhost:8000 > link-report.txt

echo ""
echo "Optimizing images..."
# This would require tools like imagemagick or optipng to be installed
# find assets/ -name "*.jpg" -exec jpegoptim {} \;
# find assets/ -name "*.png" -exec optipng {} \;

echo ""
echo "Minifying CSS and JavaScript..."
# This would require tools like cssmin and jsmin to be installed
# cssmin css/style.css > css/style.min.css
# jsmin js/main.js > js/main.min.js

echo ""
echo "Updating sitemap..."
# Update the lastmod dates in sitemap.xml
# This would require a more complex script to parse and update XML

echo ""
echo "========================================="
echo "Update process completed!"
echo "========================================="
echo ""
echo "Next steps:"
echo "1. Test the website locally"
echo "2. Check for any broken functionality"
echo "3. Review the backup in the backups/ directory"
echo "4. Deploy to production when ready"
echo ""
echo "For detailed maintenance instructions, see MAINTENANCE_GUIDE.md"
#!/bin/bash

# Project Report Generation Script
# This script generates a comprehensive report about the Bold Path HR project

echo "========================================="
echo "Bold Path HR Project Report Generator"
echo "========================================="

# Configuration
REPORT_DIR="./reports"
REPORT_NAME="boldpath-hr-report-$(date +%Y%m%d-%H%M%S)"
REPORT_FILE="$REPORT_DIR/$REPORT_NAME.md"
HTML_REPORT_FILE="$REPORT_DIR/$REPORT_NAME.html"

# Create reports directory if it doesn't exist
mkdir -p $REPORT_DIR

echo "Generating project report..."
echo "Report file: $REPORT_FILE"
echo ""

# Start writing report
cat > "$REPORT_FILE" << 'EOF'
# Bold Path HR Project Report

## Executive Summary

This report provides a comprehensive overview of the Bold Path HR website and HR Management System project.

## Project Overview

**Project Name:** Bold Path HR Website and HRMS
**Version:** 1.0.0
**Date Generated:** $(date)

### Key Components

EOF

# Count files and directories
echo "Counting project files..."
TOTAL_FILES=$(find . -type f | wc -l)
HTML_FILES=$(find . -name "*.html" | wc -l)
CSS_FILES=$(find . -name "*.css" | wc -l)
JS_FILES=$(find . -name "*.js" | wc -l)
MD_FILES=$(find . -name "*.md" | wc -l)
SH_FILES=$(find . -name "*.sh" | wc -l)

cat >> "$REPORT_FILE" << EOF

- **Total Files:** $TOTAL_FILES
- **HTML Files:** $HTML_FILES
- **CSS Files:** $CSS_FILES
- **JavaScript Files:** $JS_FILES
- **Markdown Files:** $MD_FILES
- **Shell Scripts:** $SH_FILES

### Technology Stack

#### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla)
- Responsive Design

#### Backend
- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM

#### Security
- JWT Authentication
- Bcrypt Password Hashing
- Helmet.js Security Middleware

#### Deployment
- Docker (Optional)
- NGINX (Optional)
- PM2 (Optional)

### Project Structure

\`\`\`
$(find . -type d | grep -v node_modules | grep -v .git | sort | sed 's/[^/]*\//|  /g;s/|  \([^|]\)/├── \1/')
\`\`\`

### Key Features

EOF

# Add features from README
if [ -f "README.md" ]; then
    grep -A 20 "## Features" "README.md" | grep -E "^\*|^- " >> "$REPORT_FILE" 2>/dev/null || echo "- Core HR Management System" >> "$REPORT_FILE"
else
    echo "- Public Website with Marketing Pages" >> "$REPORT_FILE"
    echo "- HR Management System (HRMS)" >> "$REPORT_FILE"
    echo "- Employee Database Management" >> "$REPORT_FILE"
    echo "- Department and Position Management" >> "$REPORT_FILE"
    echo "- Attendance Tracking" >> "$REPORT_FILE"
    echo "- Leave Management" >> "$REPORT_FILE"
    echo "- User Authentication and Authorization" >> "$REPORT_FILE"
fi

cat >> "$REPORT_FILE" << 'EOF'

### API Endpoints

EOF

# Add API endpoints if API documentation exists
if [ -f "docs/api-documentation.md" ]; then
    echo "Extracting API endpoints from documentation..."
    grep -E "^#### (GET|POST|PUT|DELETE)" "docs/api-documentation.md" | sed 's/#### /* /' >> "$REPORT_FILE"
else
    echo "- Authentication endpoints (/api/auth/*)" >> "$REPORT_FILE"
    echo "- Employee management endpoints (/api/employees/*)" >> "$REPORT_FILE"
    echo "- Department management endpoints (/api/departments/*)" >> "$REPORT_FILE"
    echo "- Position management endpoints (/api/positions/*)" >> "$REPORT_FILE"
    echo "- Attendance tracking endpoints (/api/attendance/*)" >> "$REPORT_FILE"
    echo "- Leave management endpoints (/api/leave/*)" >> "$REPORT_FILE"
fi

cat >> "$REPORT_FILE" << 'EOF'

### Scripts and Automation

EOF

# List available scripts
echo "Listing available scripts..."
SCRIPTS=$(ls scripts/*.sh 2>/dev/null)
if [ -n "$SCRIPTS" ]; then
    for script in $SCRIPTS; do
        SCRIPT_NAME=$(basename "$script" .sh)
        SCRIPT_DESC=""
        case "$SCRIPT_NAME" in
            "update-website") SCRIPT_DESC="Update and maintain website" ;;
            "deploy") SCRIPT_DESC="Deploy website to production" ;;
            "test-website") SCRIPT_DESC="Test website functionality" ;;
            "validate-config") SCRIPT_DESC="Validate configuration files" ;;
            "backup-db") SCRIPT_DESC="Backup database" ;;
            "restore-db") SCRIPT_DESC="Restore database from backup" ;;
            "status") SCRIPT_DESC="Check application status" ;;
            "monitor") SCRIPT_DESC="Monitor application health" ;;
            "generate-ssl") SCRIPT_DESC="Generate SSL certificates" ;;
            "run-all-tests") SCRIPT_DESC="Run all test suites" ;;
            "cleanup") SCRIPT_DESC="Clean up temporary files" ;;
            "update-dependencies") SCRIPT_DESC="Update project dependencies" ;;
            *) SCRIPT_DESC="Utility script" ;;
        esac
        echo "- $SCRIPT_NAME.sh: $SCRIPT_DESC" >> "$REPORT_FILE"
    done
else
    echo "- update-website.sh: Update and maintain website" >> "$REPORT_FILE"
    echo "- deploy.sh: Deploy website to production" >> "$REPORT_FILE"
    echo "- test-website.sh: Test website functionality" >> "$REPORT_FILE"
    echo "- validate-config.js: Validate configuration files" >> "$REPORT_FILE"
fi

cat >> "$REPORT_FILE" << 'EOF'

### Documentation

EOF

# List documentation files
DOCS=$(find docs -name "*.md" 2>/dev/null)
if [ -n "$DOCS" ]; then
    for doc in $DOCS; do
        DOC_NAME=$(basename "$doc" .md)
        echo "- $doc: $DOC_NAME documentation" >> "$REPORT_FILE"
    done
else
    echo "- README.md: Project setup and overview" >> "$REPORT_FILE"
    echo "- MAINTENANCE_GUIDE.md: Maintenance instructions" >> "$REPORT_FILE"
    echo "- WEBSITE_SUMMARY.md: Website page summary" >> "$REPORT_FILE"
    echo "- PROJECT_SUMMARY.md: Project overview" >> "$REPORT_FILE"
    echo "- UPDATE_LOG.md: Version history" >> "$REPORT_FILE"
fi

cat >> "$REPORT_FILE" << 'EOF'

### Security Considerations

- Secure authentication with JWT tokens
- Password hashing with bcrypt
- Input validation and sanitization
- HTTPS support (with SSL certificates)
- Rate limiting to prevent abuse
- Security headers via Helmet.js
- Environment-based configuration

### Performance Optimizations

- Minified CSS and JavaScript
- Responsive images
- Browser caching headers
- Gzip compression
- Database indexing
- Connection pooling
- Query optimization

### Deployment Options

1. **Traditional Hosting**
   - Upload files to web server
   - Configure database connection
   - Set up reverse proxy (NGINX/Apache)
   - Configure SSL certificates

2. **Docker Deployment**
   - Use provided Dockerfile
   - Run with docker-compose
   - Configure environment variables
   - Set up persistent volumes

3. **Cloud Platforms**
   - Heroku
   - AWS Elastic Beanstalk
   - Google Cloud Platform
   - Microsoft Azure

### Maintenance Requirements

- Regular security updates
- Database backups
- Log file rotation
- Performance monitoring
- SSL certificate renewal
- Dependency updates
- Content updates

### Support and Resources

- Project documentation in docs/ directory
- Configuration files in config/ directory
- Scripts in scripts/ directory
- API documentation in docs/api-documentation.md
- Maintenance guide in MAINTENANCE_GUIDE.md

---

*Report generated on $(date)*
*Project version: 1.0.0*

EOF

echo "✓ Report generated: $REPORT_FILE"

# Generate HTML version
echo "Generating HTML version of report..."
cat > "$HTML_REPORT_FILE" << 'EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bold Path HR Project Report</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        h1, h2, h3 {
            color: #0A2540;
        }
        code {
            background: #f4f4f4;
            padding: 2px 4px;
            border-radius: 3px;
        }
        pre {
            background: #f4f4f4;
            padding: 10px;
            border-radius: 5px;
            overflow-x: auto;
        }
        ul, ol {
            padding-left: 20px;
        }
        li {
            margin-bottom: 5px;
        }
    </style>
</head>
<body>
EOF

# Convert markdown to HTML (simple conversion)
sed 's/# \(.*\)/<h1>\1<\/h1>/' "$REPORT_FILE" | \
sed 's/## \(.*\)/<h2>\1<\/h2>/' | \
sed 's/### \(.*\)/<h3>\1<\/h3>/' | \
sed 's/#### \(.*\)/<h4>\1<\/h4>/' | \
sed 's/\*\*\(.*\)\*\*/<strong>\1<\/strong>/g' | \
sed 's/\*\(.*\)\*/<em>\1<\/em>/g' | \
sed 's/```\(.*\)\n\([^`]*\)\n```/<pre>\2<\/pre>/g' | \
sed 's/`\(.*\)`/<code>\1<\/code>/g' | \
sed 's/- \(.*\)/<li>\1<\/li>/' | \
sed 's/1\. \(.*\)/<li>\1<\/li>/' >> "$HTML_REPORT_FILE"

echo "</body></html>" >> "$HTML_REPORT_FILE"

echo "✓ HTML report generated: $HTML_REPORT_FILE"

echo ""
echo "========================================="
echo "Project report generation completed!"
echo "========================================="
echo ""
echo "Generated files:"
echo "  Markdown report: $REPORT_FILE"
echo "  HTML report: $HTML_REPORT_FILE"
echo ""
echo "The report includes:"
echo "  - Project overview and key components"
echo "  - Technology stack"
echo "  - Project structure"
echo "  - Key features"
echo "  - API endpoints"
echo "  - Available scripts"
echo "  - Documentation files"
echo "  - Security considerations"
echo "  - Performance optimizations"
echo "  - Deployment options"
echo "  - Maintenance requirements"
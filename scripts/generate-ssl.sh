#!/bin/bash

# SSL Certificate Generation Script
# This script generates self-signed SSL certificates for development

echo "========================================="
echo "SSL Certificate Generation Script"
echo "========================================="

# Configuration
SSL_DIR="./ssl"
CERT_NAME="boldpathhr"
DAYS_VALID=365

# Create SSL directory if it doesn't exist
mkdir -p $SSL_DIR

echo "Generating SSL certificates for development..."
echo "Certificates will be valid for $DAYS_VALID days"
echo ""

# Check if openssl is available
if ! command -v openssl &> /dev/null; then
    echo "Error: openssl is not installed"
    echo "Please install openssl to generate SSL certificates"
    exit 1
fi

# Generate private key
echo "Generating private key..."
openssl genrsa -out "$SSL_DIR/$CERT_NAME.key" 2048

if [ $? -ne 0 ]; then
    echo "✗ Failed to generate private key"
    exit 1
fi

echo "✓ Private key generated: $SSL_DIR/$CERT_NAME.key"

# Generate certificate signing request
echo "Generating certificate signing request..."
openssl req -new -key "$SSL_DIR/$CERT_NAME.key" -out "$SSL_DIR/$CERT_NAME.csr" -subj "/C=US/ST=State/L=City/O=Bold Path HR/CN=localhost"

if [ $? -ne 0 ]; then
    echo "✗ Failed to generate certificate signing request"
    exit 1
fi

echo "✓ Certificate signing request generated: $SSL_DIR/$CERT_NAME.csr"

# Generate self-signed certificate
echo "Generating self-signed certificate..."
openssl x509 -req -days $DAYS_VALID -in "$SSL_DIR/$CERT_NAME.csr" -signkey "$SSL_DIR/$CERT_NAME.key" -out "$SSL_DIR/$CERT_NAME.crt"

if [ $? -ne 0 ]; then
    echo "✗ Failed to generate self-signed certificate"
    exit 1
fi

echo "✓ Self-signed certificate generated: $SSL_DIR/$CERT_NAME.crt"

# Generate DH parameters (optional but recommended)
echo "Generating DH parameters (this may take a few minutes)..."
openssl dhparam -out "$SSL_DIR/dhparam.pem" 2048

if [ $? -ne 0 ]; then
    echo "⚠ Warning: Failed to generate DH parameters"
else
    echo "✓ DH parameters generated: $SSL_DIR/dhparam.pem"
fi

# Set proper permissions
echo "Setting file permissions..."
chmod 600 "$SSL_DIR/$CERT_NAME.key"
chmod 644 "$SSL_DIR/$CERT_NAME.crt"
chmod 644 "$SSL_DIR/$CERT_NAME.csr"
chmod 600 "$SSL_DIR/dhparam.pem" 2>/dev/null

echo "✓ File permissions set"

echo ""
echo "========================================="
echo "SSL certificates generated successfully!"
echo "========================================="
echo ""
echo "Certificate files:"
echo "  Private key:  $SSL_DIR/$CERT_NAME.key"
echo "  Certificate:  $SSL_DIR/$CERT_NAME.crt"
echo "  CSR:          $SSL_DIR/$CERT_NAME.csr"
echo "  DH Parameters: $SSL_DIR/dhparam.pem"
echo ""
echo "To use these certificates with NGINX:"
echo "1. Update nginx.conf to uncomment SSL lines"
echo "2. Set ssl_certificate and ssl_certificate_key paths"
echo "3. Restart NGINX service"
echo ""
echo "For production, use certificates from a trusted CA like Let's Encrypt"
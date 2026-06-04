#!/usr/bin/env node

// Configuration Validation Script
// This script validates the website configuration file

const fs = require('fs');
const path = require('path');

// Configuration file path
const configPath = path.join(__dirname, '..', 'config', 'website-config.json');

console.log('=========================================');
console.log('Bold Path HR Configuration Validation');
console.log('=========================================');

// Check if config file exists
if (!fs.existsSync(configPath)) {
    console.error('Error: Configuration file not found at', configPath);
    process.exit(1);
}

console.log('✓ Configuration file found');

// Read and parse the configuration file
let config;
try {
    const configFile = fs.readFileSync(configPath, 'utf8');
    config = JSON.parse(configFile);
    console.log('✓ Configuration file parsed successfully');
} catch (error) {
    console.error('Error: Failed to parse configuration file');
    console.error(error.message);
    process.exit(1);
}

// Validation rules
const validationRules = {
    'website.name': { type: 'string', required: true },
    'website.url': { type: 'string', required: true, format: 'url' },
    'website.description': { type: 'string', required: true },
    'website.contact.email': { type: 'string', required: true, format: 'email' },
    'website.contact.supportEmail': { type: 'string', required: true, format: 'email' },
    'website.contact.phone': { type: 'string', required: true },
    'website.contact.address': { type: 'string', required: true },
    'branding.primaryColor': { type: 'string', required: true, format: 'color' },
    'branding.secondaryColor': { type: 'string', required: true, format: 'color' },
    'branding.accentColor': { type: 'string', required: true, format: 'color' },
    'branding.fontFamily': { type: 'string', required: true },
    'features.analytics': { type: 'boolean', required: true },
    'features.newsletter': { type: 'boolean', required: true },
    'features.search': { type: 'boolean', required: true },
    'features.multilingual': { type: 'boolean', required: true },
    'features.blog': { type: 'boolean', required: true },
    'features.resources': { type: 'boolean', required: true },
    'seo.defaultTitle': { type: 'string', required: true },
    'seo.defaultDescription': { type: 'string', required: true },
    'seo.defaultKeywords': { type: 'string', required: true },
    'security.httpsRequired': { type: 'boolean', required: true },
    'security.csrfProtection': { type: 'boolean', required: true },
    'security.twoFactorAuth': { type: 'boolean', required: true },
    'performance.lazyLoading': { type: 'boolean', required: true },
    'performance.caching': { type: 'boolean', required: true },
    'performance.compression': { type: 'boolean', required: true },
    'maintenance.mode': { type: 'string', required: true, allowed: ['normal', 'maintenance'] },
    'version': { type: 'string', required: true },
    'lastUpdated': { type: 'string', required: true, format: 'date' }
};

// Validation functions
function validateString(value) {
    return typeof value === 'string' && value.length > 0;
}

function validateBoolean(value) {
    return typeof value === 'boolean';
}

function validateUrl(value) {
    try {
        new URL(value);
        return true;
    } catch (error) {
        return false;
    }
}

function validateEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
}

function validateColor(value) {
    const colorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return colorRegex.test(value);
}

function validateDate(value) {
    return !isNaN(Date.parse(value));
}

function validateAllowed(value, allowed) {
    return allowed.includes(value);
}

// Validate configuration
let hasErrors = false;

for (const [key, rule] of Object.entries(validationRules)) {
    // Get the value from the config object
    const keys = key.split('.');
    let value = config;
    
    for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
            value = value[k];
        } else {
            value = undefined;
            break;
        }
    }
    
    // Check if required
    if (rule.required && (value === undefined || value === null)) {
        console.error(`✗ Missing required field: ${key}`);
        hasErrors = true;
        continue;
    }
    
    // Skip validation if value is undefined and not required
    if (value === undefined || value === null) {
        console.log(`⚠ Optional field missing: ${key}`);
        continue;
    }
    
    // Validate type
    let isValid = true;
    
    switch (rule.type) {
        case 'string':
            isValid = validateString(value);
            break;
        case 'boolean':
            isValid = validateBoolean(value);
            break;
    }
    
    if (!isValid) {
        console.error(`✗ Invalid type for ${key}: expected ${rule.type}, got ${typeof value}`);
        hasErrors = true;
        continue;
    }
    
    // Validate format if specified
    if (rule.format) {
        switch (rule.format) {
            case 'url':
                isValid = validateUrl(value);
                break;
            case 'email':
                isValid = validateEmail(value);
                break;
            case 'color':
                isValid = validateColor(value);
                break;
            case 'date':
                isValid = validateDate(value);
                break;
        }
        
        if (!isValid) {
            console.error(`✗ Invalid format for ${key}: ${value} is not a valid ${rule.format}`);
            hasErrors = true;
            continue;
        }
    }
    
    // Validate allowed values if specified
    if (rule.allowed && !validateAllowed(value, rule.allowed)) {
        console.error(`✗ Invalid value for ${key}: ${value} is not in allowed values [${rule.allowed.join(', ')}]`);
        hasErrors = true;
        continue;
    }
    
    console.log(`✓ ${key}: valid`);
}

console.log('');
if (hasErrors) {
    console.error('=========================================');
    console.error('Configuration validation failed!');
    console.error('=========================================');
    process.exit(1);
} else {
    console.log('=========================================');
    console.log('Configuration validation passed!');
    console.log('=========================================');
    process.exit(0);
}
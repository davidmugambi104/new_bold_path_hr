// Database Initialization Script
// This script initializes the database with required tables and seed data

const { Sequelize } = require('sequelize');
const config = require('../config/database')['development'];
const models = require('../models');
const { seed } = require('./seed');

console.log('=========================================');
console.log('Bold Path HR Database Initialization');
console.log('=========================================');

// Initialize Sequelize
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// Function to initialize database
async function initDatabase() {
  try {
    console.log('Connecting to database...');
    
    // Test database connection
    await sequelize.authenticate();
    console.log('✓ Database connection established');
    
    console.log('Creating database tables...');
    
    // Sync all models
    await sequelize.sync({ force: true });
    console.log('✓ Database tables created');
    
    console.log('Seeding database with initial data...');
    
    // Seed the database
    await seed();
    
    console.log('');
    console.log('=========================================');
    console.log('Database initialization completed successfully!');
    console.log('=========================================');
    
    // Close database connection
    await sequelize.close();
    console.log('Database connection closed');
    
  } catch (error) {
    console.error('Error during database initialization:', error.message);
    
    // Close database connection on error
    try {
      await sequelize.close();
      console.log('Database connection closed');
    } catch (closeError) {
      console.error('Error closing database connection:', closeError.message);
    }
    
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  initDatabase();
}

module.exports = {
  initDatabase
};
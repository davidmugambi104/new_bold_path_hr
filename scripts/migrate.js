// Database migration script
require('dotenv').config();
const models = require('../models');

const runMigrations = async () => {
  try {
    console.log('Running database migrations...');
    
    // Test database connection
    await models.sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Sync all models
    await models.sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');

    console.log('Database migrations completed successfully.');
  } catch (error) {
    console.error('Error running migrations:', error);
  }
};

// Run migrations if script is called directly
if (require.main === module) {
  runMigrations();
}

module.exports = { runMigrations };
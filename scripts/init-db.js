// Database initialization script
require('dotenv').config();
const models = require('../models');

const initDatabase = async () => {
  try {
    // Test database connection
    await models.sequelize.authenticate();
    console.log('Database connection established successfully.');

    // Sync all models
    await models.sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');

    console.log('Database initialization completed successfully.');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

// Run initialization if script is called directly
if (require.main === module) {
  initDatabase();
}

module.exports = { initDatabase };
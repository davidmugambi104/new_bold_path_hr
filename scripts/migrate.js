// Database Migration Script
// This script handles database migrations for the Bold Path HR application

const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const config = require('../config/database')['development'];

console.log('=========================================');
console.log('Bold Path HR Database Migration Script');
console.log('=========================================');

// Initialize Sequelize
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// Migration files directory
const migrationsDir = path.join(__dirname, '..', 'migrations');

// Create migrations directory if it doesn't exist
if (!fs.existsSync(migrationsDir)) {
  fs.mkdirSync(migrationsDir);
  console.log('Created migrations directory');
}

// Migration template
const migrationTemplate = `// Migration: {timestamp}
// Description: {description}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Migration code here
  },

  down: async (queryInterface, Sequelize) => {
    // Rollback code here
  }
};
`;

// Function to create a new migration
async function createMigration(description) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').replace('T', '_').substring(0, 19);
  const filename = `${timestamp}_${description.replace(/\s+/g, '_').toLowerCase()}.js`;
  const filepath = path.join(migrationsDir, filename);
  
  const content = migrationTemplate
    .replace('{timestamp}', timestamp)
    .replace('{description}', description);
  
  fs.writeFileSync(filepath, content);
  console.log(`Created migration: ${filename}`);
}

// Function to run migrations
async function runMigrations() {
  console.log('Running migrations...');
  
  // Get all migration files
  const files = fs.readdirSync(migrationsDir)
    .filter(file => file.endsWith('.js'))
    .sort();
  
  // Run each migration
  for (const file of files) {
    console.log(`Running migration: ${file}`);
    try {
      const migration = require(path.join(migrationsDir, file));
      if (migration.up) {
        await migration.up(sequelize.getQueryInterface(), Sequelize);
        console.log(`✓ Migration ${file} completed successfully`);
      }
    } catch (error) {
      console.error(`✗ Migration ${file} failed:`, error.message);
      process.exit(1);
    }
  }
  
  console.log('All migrations completed successfully');
}

// Function to rollback migrations
async function rollbackMigrations() {
  console.log('Rolling back migrations...');
  
  // Get all migration files
  const files = fs.readdirSync(migrationsDir)
    .filter(file => file.endsWith('.js'))
    .sort()
    .reverse();
  
  // Rollback each migration
  for (const file of files) {
    console.log(`Rolling back migration: ${file}`);
    try {
      const migration = require(path.join(migrationsDir, file));
      if (migration.down) {
        await migration.down(sequelize.getQueryInterface(), Sequelize);
        console.log(`✓ Migration ${file} rolled back successfully`);
      }
    } catch (error) {
      console.error(`✗ Migration ${file} rollback failed:`, error.message);
      process.exit(1);
    }
  }
  
  console.log('All migrations rolled back successfully');
}

// Main function
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Usage: node migrate.js [create|up|down] [description]');
    console.log('');
    console.log('Commands:');
    console.log('  create <description>  Create a new migration file');
    console.log('  up                   Run all pending migrations');
    console.log('  down                 Rollback last migration');
    process.exit(1);
  }
  
  const command = args[0];
  
  try {
    switch (command) {
      case 'create':
        if (args.length < 2) {
          console.error('Error: Description is required for create command');
          process.exit(1);
        }
        await createMigration(args.slice(1).join(' '));
        break;
        
      case 'up':
        await runMigrations();
        break;
        
      case 'down':
        await rollbackMigrations();
        break;
        
      default:
        console.error(`Error: Unknown command '${command}'`);
        process.exit(1);
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  createMigration,
  runMigrations,
  rollbackMigrations
};
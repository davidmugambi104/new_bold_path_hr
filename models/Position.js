// Position model
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database')['development'];

const Position = sequelize.define('Position', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT
  },
  requirements: {
    type: DataTypes.TEXT
  }
}, {
  timestamps: true,
  tableName: 'positions'
});

// Define associations
Position.associate = function(models) {
  Position.belongsTo(models.Department, {
    foreignKey: 'department_id',
    as: 'department'
  });
  
  Position.hasMany(models.Employee, {
    foreignKey: 'position',
    as: 'employees'
  });
};

module.exports = Position;
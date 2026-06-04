// Department model
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database')['development'];

const Department = sequelize.define('Department', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT
  }
}, {
  timestamps: true,
  tableName: 'departments'
});

// Define associations
Department.associate = function(models) {
  Department.hasMany(models.Position, {
    foreignKey: 'department_id',
    as: 'positions'
  });
  
  Department.hasMany(models.Employee, {
    foreignKey: 'department',
    as: 'employees'
  });
};

module.exports = Department;
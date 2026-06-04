// Attendance model
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database')['development'];

const Attendance = sequelize.define('Attendance', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  clockIn: {
    type: DataTypes.TIME
  },
  clockOut: {
    type: DataTypes.TIME
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'present',
    validate: {
      isIn: [['present', 'absent', 'late', 'leave']]
    }
  },
  notes: {
    type: DataTypes.TEXT
  }
}, {
  timestamps: true,
  tableName: 'attendance'
});

// Define associations
Attendance.associate = function(models) {
  Attendance.belongsTo(models.Employee, {
    foreignKey: 'employee_id',
    as: 'employee'
  });
};

module.exports = Attendance;
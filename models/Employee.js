// Employee model
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database')['development'];

const Employee = sequelize.define('Employee', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  first_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  position: {
    type: DataTypes.STRING
  },
  department: {
    type: DataTypes.STRING
  },
  hire_date: {
    type: DataTypes.DATE
  },
  phone: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.TEXT
  }
}, {
  timestamps: true,
  tableName: 'employees'
});

// Define associations
Employee.associate = function(models) {
  Employee.belongsTo(models.User, {
    foreignKey: 'user_id',
    as: 'user'
  });
  
  Employee.hasMany(models.Attendance, {
    foreignKey: 'employee_id',
    as: 'attendanceRecords'
  });
  
  Employee.hasMany(models.LeaveRequest, {
    foreignKey: 'employee_id',
    as: 'leaveRequests'
  });
};

module.exports = Employee;
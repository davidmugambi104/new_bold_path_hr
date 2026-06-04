// User model
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database')['development'];

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'employee',
    validate: {
      isIn: [['admin', 'hr_manager', 'employee']]
    }
  },
  is_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  timestamps: true,
  tableName: 'users'
});

// Define associations
User.associate = function(models) {
  User.hasOne(models.Employee, {
    foreignKey: 'user_id',
    as: 'employee'
  });
  
  User.hasMany(models.LeaveRequest, {
    foreignKey: 'approved_by',
    as: 'approvedLeaveRequests'
  });
};

module.exports = User;
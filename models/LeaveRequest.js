// Leave Request model
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database')['development'];

const LeaveRequest = sequelize.define('LeaveRequest', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  leaveType: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['vacation', 'sick', 'personal', 'maternity', 'paternity']]
    }
  },
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  reason: {
    type: DataTypes.TEXT
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'pending',
    validate: {
      isIn: [['pending', 'approved', 'rejected']]
    }
  }
}, {
  timestamps: true,
  tableName: 'leave_requests'
});

// Define associations
LeaveRequest.associate = function(models) {
  LeaveRequest.belongsTo(models.Employee, {
    foreignKey: 'employee_id',
    as: 'employee'
  });
  
  LeaveRequest.belongsTo(models.User, {
    foreignKey: 'approved_by',
    as: 'approver'
  });
};

module.exports = LeaveRequest;
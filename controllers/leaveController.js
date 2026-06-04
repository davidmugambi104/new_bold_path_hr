// Leave Request controller
const models = require('../models');

// Get all leave requests
const getAllLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await models.LeaveRequest.findAll({
      include: [
        {
          model: models.Employee,
          as: 'employee',
          include: [
            {
              model: models.User,
              as: 'user',
              attributes: ['id', 'email']
            }
          ]
        },
        {
          model: models.User,
          as: 'approver',
          attributes: ['id', 'email']
        }
      ],
      order: [['created_at', 'DESC']]
    });
    
    res.json({ leaveRequests });
  } catch (error) {
    console.error('Error fetching leave requests:', error);
    res.status(500).json({ error: 'Failed to fetch leave requests' });
  }
};

// Get leave requests by employee ID
const getLeaveRequestsByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;
    
    // Check if employee exists
    const employee = await models.Employee.findByPk(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    const leaveRequests = await models.LeaveRequest.findAll({
      where: { employee_id: employeeId },
      include: [
        {
          model: models.Employee,
          as: 'employee',
          include: [
            {
              model: models.User,
              as: 'user',
              attributes: ['id', 'email']
            }
          ]
        },
        {
          model: models.User,
          as: 'approver',
          attributes: ['id', 'email']
        }
      ],
      order: [['created_at', 'DESC']]
    });
    
    res.json({ leaveRequests });
  } catch (error) {
    console.error('Error fetching leave requests:', error);
    res.status(500).json({ error: 'Failed to fetch leave requests' });
  }
};

// Create new leave request
const createLeaveRequest = async (req, res) => {
  try {
    const { employee_id, leave_type, start_date, end_date, reason } = req.body;
    
    // Check if employee exists
    const employee = await models.Employee.findByPk(employee_id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    // Validate dates
    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    
    if (startDate > endDate) {
      return res.status(400).json({ error: 'Start date must be before end date' });
    }
    
    const leaveRequest = await models.LeaveRequest.create({
      employee_id,
      leaveType: leave_type,
      startDate: start_date,
      endDate: end_date,
      reason
    });
    
    res.status(201).json({ 
      message: 'Leave request created successfully', 
      leaveRequest 
    });
  } catch (error) {
    console.error('Error creating leave request:', error);
    res.status(500).json({ error: 'Failed to create leave request' });
  }
};

// Update leave request status (approve/reject)
const updateLeaveRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, approved_by } = req.body;
    
    // Validate status
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Must be approved or rejected' });
    }
    
    const leaveRequest = await models.LeaveRequest.findByPk(id);
    if (!leaveRequest) {
      return res.status(404).json({ error: 'Leave request not found' });
    }
    
    // Check if user has permission to approve/reject
    const user = await models.User.findByPk(approved_by);
    if (!user || (user.role !== 'admin' && user.role !== 'hr_manager')) {
      return res.status(403).json({ error: 'Insufficient permissions to approve/reject leave requests' });
    }
    
    await leaveRequest.update({
      status,
      approved_by
    });
    
    res.json({ 
      message: `Leave request ${status} successfully`, 
      leaveRequest 
    });
  } catch (error) {
    console.error('Error updating leave request status:', error);
    res.status(500).json({ error: 'Failed to update leave request status' });
  }
};

// Delete leave request
const deleteLeaveRequest = async (req, res) => {
  try {
    const { id } = req.params;
    
    const leaveRequest = await models.LeaveRequest.findByPk(id);
    if (!leaveRequest) {
      return res.status(404).json({ error: 'Leave request not found' });
    }
    
    // Only pending requests can be deleted
    if (leaveRequest.status !== 'pending') {
      return res.status(400).json({ error: 'Only pending leave requests can be deleted' });
    }
    
    await leaveRequest.destroy();
    res.json({ message: 'Leave request deleted successfully' });
  } catch (error) {
    console.error('Error deleting leave request:', error);
    res.status(500).json({ error: 'Failed to delete leave request' });
  }
};

module.exports = {
  getAllLeaveRequests,
  getLeaveRequestsByEmployee,
  createLeaveRequest,
  updateLeaveRequestStatus,
  deleteLeaveRequest
};
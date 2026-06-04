// Attendance controller
const models = require('../models');

// Get all attendance records
const getAllAttendance = async (req, res) => {
  try {
    const attendanceRecords = await models.Attendance.findAll({
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
        }
      ],
      order: [['date', 'DESC']]
    });
    
    res.json({ attendanceRecords });
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    res.status(500).json({ error: 'Failed to fetch attendance records' });
  }
};

// Get attendance by employee ID
const getAttendanceByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;
    
    // Check if employee exists
    const employee = await models.Employee.findByPk(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    const attendanceRecords = await models.Attendance.findAll({
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
        }
      ],
      order: [['date', 'DESC']]
    });
    
    res.json({ attendanceRecords });
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    res.status(500).json({ error: 'Failed to fetch attendance records' });
  }
};

// Clock in
const clockIn = async (req, res) => {
  try {
    const { employee_id } = req.body;
    const today = new Date().toISOString().split('T')[0];
    
    // Check if employee exists
    const employee = await models.Employee.findByPk(employee_id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    // Check if already clocked in today
    const existingRecord = await models.Attendance.findOne({
      where: {
        employee_id,
        date: today
      }
    });
    
    if (existingRecord && existingRecord.clockIn) {
      return res.status(400).json({ error: 'Already clocked in today' });
    }
    
    let attendanceRecord;
    if (existingRecord) {
      // Update existing record
      await existingRecord.update({
        clockIn: new Date().toTimeString().split(' ')[0],
        status: 'present'
      });
      attendanceRecord = existingRecord;
    } else {
      // Create new record
      attendanceRecord = await models.Attendance.create({
        employee_id,
        date: today,
        clockIn: new Date().toTimeString().split(' ')[0],
        status: 'present'
      });
    }
    
    res.status(201).json({ 
      message: 'Clocked in successfully', 
      attendanceRecord 
    });
  } catch (error) {
    console.error('Error clocking in:', error);
    res.status(500).json({ error: 'Failed to clock in' });
  }
};

// Clock out
const clockOut = async (req, res) => {
  try {
    const { employee_id } = req.body;
    const today = new Date().toISOString().split('T')[0];
    
    // Check if employee exists
    const employee = await models.Employee.findByPk(employee_id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    // Find today's attendance record
    const attendanceRecord = await models.Attendance.findOne({
      where: {
        employee_id,
        date: today
      }
    });
    
    if (!attendanceRecord) {
      return res.status(404).json({ error: 'No clock-in record found for today' });
    }
    
    if (attendanceRecord.clockOut) {
      return res.status(400).json({ error: 'Already clocked out today' });
    }
    
    // Update record
    await attendanceRecord.update({
      clockOut: new Date().toTimeString().split(' ')[0]
    });
    
    res.json({ 
      message: 'Clocked out successfully', 
      attendanceRecord 
    });
  } catch (error) {
    console.error('Error clocking out:', error);
    res.status(500).json({ error: 'Failed to clock out' });
  }
};

// Update attendance record
const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, clockIn, clockOut, status, notes } = req.body;
    
    const attendanceRecord = await models.Attendance.findByPk(id);
    if (!attendanceRecord) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }
    
    await attendanceRecord.update({
      date,
      clockIn,
      clockOut,
      status,
      notes
    });
    
    res.json({ 
      message: 'Attendance record updated successfully', 
      attendanceRecord 
    });
  } catch (error) {
    console.error('Error updating attendance record:', error);
    res.status(500).json({ error: 'Failed to update attendance record' });
  }
};

// Delete attendance record
const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    
    const attendanceRecord = await models.Attendance.findByPk(id);
    if (!attendanceRecord) {
      return res.status(404).json({ error: 'Attendance record not found' });
    }
    
    await attendanceRecord.destroy();
    res.json({ message: 'Attendance record deleted successfully' });
  } catch (error) {
    console.error('Error deleting attendance record:', error);
    res.status(500).json({ error: 'Failed to delete attendance record' });
  }
};

module.exports = {
  getAllAttendance,
  getAttendanceByEmployee,
  clockIn,
  clockOut,
  updateAttendance,
  deleteAttendance
};
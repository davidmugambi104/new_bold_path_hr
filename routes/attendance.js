// Attendance routes
const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const { authenticateToken, requireRole } = require('../middleware/auth');

// Protected routes
router.get('/', authenticateToken, requireRole(['admin', 'hr_manager']), attendanceController.getAllAttendance);
router.get('/employee/:employeeId', authenticateToken, requireRole(['admin', 'hr_manager']), attendanceController.getAttendanceByEmployee);
router.post('/clock-in', authenticateToken, attendanceController.clockIn);
router.post('/clock-out', authenticateToken, attendanceController.clockOut);
router.put('/:id', authenticateToken, requireRole(['admin', 'hr_manager']), attendanceController.updateAttendance);
router.delete('/:id', authenticateToken, requireRole(['admin', 'hr_manager']), attendanceController.deleteAttendance);

module.exports = router;
// Leave Request routes
const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');
const { authenticateToken, requireRole } = require('../middleware/auth');

// Protected routes
router.get('/', authenticateToken, requireRole(['admin', 'hr_manager']), leaveController.getAllLeaveRequests);
router.get('/employee/:employeeId', authenticateToken, leaveController.getLeaveRequestsByEmployee);
router.post('/', authenticateToken, leaveController.createLeaveRequest);
router.put('/:id/status', authenticateToken, requireRole(['admin', 'hr_manager']), leaveController.updateLeaveRequestStatus);
router.delete('/:id', authenticateToken, leaveController.deleteLeaveRequest);

module.exports = router;
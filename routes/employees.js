// Employee routes
const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const { authenticateToken, requireRole } = require('../middleware/auth');

// Public routes
router.get('/', employeeController.getAllEmployees);
router.get('/:id', employeeController.getEmployeeById);

// Protected routes (admin and HR manager only)
router.post('/', authenticateToken, requireRole(['admin', 'hr_manager']), employeeController.createEmployee);
router.put('/:id', authenticateToken, requireRole(['admin', 'hr_manager']), employeeController.updateEmployee);
router.delete('/:id', authenticateToken, requireRole(['admin', 'hr_manager']), employeeController.deleteEmployee);

module.exports = router;
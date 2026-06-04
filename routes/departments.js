// Department routes
const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const { authenticateToken, requireRole } = require('../middleware/auth');

// Public routes
router.get('/', departmentController.getAllDepartments);
router.get('/:id', departmentController.getDepartmentById);

// Protected routes (admin and HR manager only)
router.post('/', authenticateToken, requireRole(['admin', 'hr_manager']), departmentController.createDepartment);
router.put('/:id', authenticateToken, requireRole(['admin', 'hr_manager']), departmentController.updateDepartment);
router.delete('/:id', authenticateToken, requireRole(['admin', 'hr_manager']), departmentController.deleteDepartment);

module.exports = router;
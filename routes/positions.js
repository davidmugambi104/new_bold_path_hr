// Position routes
const express = require('express');
const router = express.Router();
const positionController = require('../controllers/positionController');
const { authenticateToken, requireRole } = require('../middleware/auth');

// Public routes
router.get('/', positionController.getAllPositions);
router.get('/:id', positionController.getPositionById);

// Protected routes (admin and HR manager only)
router.post('/', authenticateToken, requireRole(['admin', 'hr_manager']), positionController.createPosition);
router.put('/:id', authenticateToken, requireRole(['admin', 'hr_manager']), positionController.updatePosition);
router.delete('/:id', authenticateToken, requireRole(['admin', 'hr_manager']), positionController.deletePosition);

module.exports = router;
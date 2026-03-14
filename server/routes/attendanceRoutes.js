const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const { verifyToken, authorizeRoles } = require('../middleware/auth');

router.use(verifyToken);

// GET /api/attendance - staff/admin can view
router.get('/', authorizeRoles('admin', 'staff'), attendanceController.getAll);

// POST /api/attendance - staff/admin can mark
router.post('/', authorizeRoles('admin', 'staff'), attendanceController.create);

// PUT /api/attendance/:id - staff/admin can update
router.put('/:id', authorizeRoles('admin', 'staff'), attendanceController.update);

module.exports = router;

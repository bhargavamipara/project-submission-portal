const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { verifyToken, authorizeRoles } = require('../middleware/auth');

router.use(verifyToken);

// GET /api/bookings - admin/staff can view all
router.get('/', authorizeRoles('admin', 'staff'), bookingController.getAll);

// GET /api/bookings/user/:id - get bookings for a specific user
router.get('/user/:id', bookingController.getByUserId);

// POST /api/bookings - students can create
router.post('/', authorizeRoles('student'), bookingController.create);

// PUT /api/bookings/:id - update booking status
router.put('/:id', bookingController.update);

// DELETE /api/bookings/:id - cancel booking
router.delete('/:id', bookingController.delete);

module.exports = router;

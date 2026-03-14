const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const { verifyToken, authorizeRoles } = require('../middleware/auth');

// GET /api/menu - accessible to all authenticated users
router.get('/', verifyToken, menuController.getAll);

// GET /api/menu/:id
router.get('/:id', verifyToken, menuController.getById);

// POST /api/menu - admin only
router.post('/', verifyToken, authorizeRoles('admin'), menuController.create);

// PUT /api/menu/:id - admin only
router.put('/:id', verifyToken, authorizeRoles('admin'), menuController.update);

// DELETE /api/menu/:id - admin only
router.delete('/:id', verifyToken, authorizeRoles('admin'), menuController.delete);

module.exports = router;

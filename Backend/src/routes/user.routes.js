const express = require('express');
const router = express.Router();

const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/user.controller');

const { authMiddleware, adminOnly } = require('../middleware/auth.middleware');

// ✅ Protected admin routes
router.post('/', authMiddleware, adminOnly, createUser);
router.put('/:id', authMiddleware, adminOnly, updateUser);
router.delete('/:id', authMiddleware, adminOnly, deleteUser);

// ✅ Public / read-only routes (for APK / TV)
router.get('/', getAllUsers);
router.get('/:id', getUserById);

module.exports = router;
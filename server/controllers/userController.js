const bcrypt = require('bcryptjs');
const UserModel = require('../models/userModel');

const userController = {
  // GET /api/users
  async getAll(req, res) {
    try {
      const users = await UserModel.findAll();
      res.json({ users });
    } catch (error) {
      console.error('Get users error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  },

  // GET /api/users/:id
  async getById(req, res) {
    try {
      const user = await UserModel.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
      res.json({ user });
    } catch (error) {
      console.error('Get user error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  },

  // POST /api/users
  async create(req, res) {
    try {
      const { full_name, email, password, role } = req.body;

      if (!full_name || !email || !password) {
        return res.status(400).json({ error: 'Full name, email, and password are required.' });
      }

      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({ error: 'User with this email already exists.' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await UserModel.create({
        full_name,
        email,
        password: hashedPassword,
        role: role || 'student',
      });

      res.status(201).json({ user });
    } catch (error) {
      console.error('Create user error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  },

  // PUT /api/users/:id
  async update(req, res) {
    try {
      const { full_name, email, role } = req.body;
      const user = await UserModel.update(req.params.id, { full_name, email, role });
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
      res.json({ user });
    } catch (error) {
      console.error('Update user error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  },

  // DELETE /api/users/:id
  async delete(req, res) {
    try {
      const deleted = await UserModel.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'User not found.' });
      }
      res.json({ message: 'User deleted successfully.' });
    } catch (error) {
      console.error('Delete user error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  },
};

module.exports = userController;

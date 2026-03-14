const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

const authController = {
  // POST /api/auth/register
  async register(req, res) {
    try {
      const { full_name, email, password, role } = req.body;

      if (!full_name || !email || !password) {
        return res.status(400).json({ error: 'Full name, email, and password are required.' });
      }

      // Check if user already exists
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({ error: 'User with this email already exists.' });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create user
      const user = await UserModel.create({
        full_name,
        email,
        password: hashedPassword,
        role: role || 'student',
      });

      // Generate JWT
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(201).json({
        message: 'User registered successfully.',
        user: { id: user.id, full_name: user.full_name, email: user.email, role: user.role },
        token,
      });
    } catch (error) {
      console.error('Register error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  },

  // POST /api/auth/login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
      }

      // Find user
      const user = await UserModel.findByEmail(email);
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      // Verify password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      // Generate JWT
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        message: 'Login successful.',
        user: { id: user.id, full_name: user.full_name, email: user.email, role: user.role },
        token,
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  },

  // GET /api/auth/me
  async getMe(req, res) {
    try {
      const user = await UserModel.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
      res.json({ user });
    } catch (error) {
      console.error('GetMe error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  },
};

module.exports = authController;

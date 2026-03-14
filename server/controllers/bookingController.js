const BookingModel = require('../models/bookingModel');

const bookingController = {
  // GET /api/bookings
  async getAll(req, res) {
    try {
      const bookings = await BookingModel.findAll();
      res.json({ bookings });
    } catch (error) {
      console.error('Get bookings error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  },

  // GET /api/bookings/user/:id
  async getByUserId(req, res) {
    try {
      const bookings = await BookingModel.findByUserId(req.params.id);
      res.json({ bookings });
    } catch (error) {
      console.error('Get user bookings error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  },

  // POST /api/bookings
  async create(req, res) {
    try {
      const { user_id, menu_item_id, date, meal_type, status } = req.body;

      if (!user_id || !date || !meal_type) {
        return res.status(400).json({ error: 'User ID, date, and meal type are required.' });
      }

      const booking = await BookingModel.create({ user_id, menu_item_id, date, meal_type, status });
      res.status(201).json({ booking });
    } catch (error) {
      console.error('Create booking error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  },

  // PUT /api/bookings/:id
  async update(req, res) {
    try {
      const booking = await BookingModel.update(req.params.id, req.body);
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found.' });
      }
      res.json({ booking });
    } catch (error) {
      console.error('Update booking error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  },

  // DELETE /api/bookings/:id
  async delete(req, res) {
    try {
      const deleted = await BookingModel.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'Booking not found.' });
      }
      res.json({ message: 'Booking deleted successfully.' });
    } catch (error) {
      console.error('Delete booking error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  },
};

module.exports = bookingController;

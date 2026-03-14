const AttendanceModel = require('../models/attendanceModel');

const attendanceController = {
  // GET /api/attendance
  async getAll(req, res) {
    try {
      const records = await AttendanceModel.findAll();
      res.json({ attendance: records });
    } catch (error) {
      console.error('Get attendance error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  },

  // POST /api/attendance
  async create(req, res) {
    try {
      const { booking_id, status, marked_by } = req.body;

      if (!booking_id || !status) {
        return res.status(400).json({ error: 'Booking ID and status are required.' });
      }

      // Check if attendance already exists for this booking
      const existing = await AttendanceModel.findByBookingId(booking_id);
      if (existing) {
        return res.status(409).json({ error: 'Attendance already marked for this booking.' });
      }

      const record = await AttendanceModel.create({ booking_id, status, marked_by });
      res.status(201).json({ attendance: record });
    } catch (error) {
      console.error('Create attendance error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  },

  // PUT /api/attendance/:id
  async update(req, res) {
    try {
      await AttendanceModel.update(req.params.id, req.body);
      res.json({ message: 'Attendance updated successfully.' });
    } catch (error) {
      console.error('Update attendance error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  },
};

module.exports = attendanceController;

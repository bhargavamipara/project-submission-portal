const pool = require('../config/db');

const AttendanceModel = {
  async findAll() {
    const [rows] = await pool.query(`
      SELECT a.*, b.date, b.meal_type, b.user_id, u.full_name AS user_name, u.email AS user_email
      FROM attendance a
      JOIN bookings b ON a.booking_id = b.id
      JOIN users u ON b.user_id = u.id
      ORDER BY a.marked_at DESC
    `);
    return rows;
  },

  async findByBookingId(bookingId) {
    const [rows] = await pool.query('SELECT * FROM attendance WHERE booking_id = ?', [bookingId]);
    return rows[0] || null;
  },

  async create({ booking_id, status, marked_by }) {
    const [result] = await pool.query(
      'INSERT INTO attendance (booking_id, status, marked_by) VALUES (?, ?, ?)',
      [booking_id, status, marked_by || null]
    );
    return { id: result.insertId, booking_id, status, marked_by };
  },

  async update(id, data) {
    const fields = [];
    const values = [];
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined && key !== 'id') {
        fields.push(`${key} = ?`);
        values.push(value);
      }
    }
    values.push(id);
    await pool.query(`UPDATE attendance SET ${fields.join(', ')} WHERE id = ?`, values);
  },
};

module.exports = AttendanceModel;

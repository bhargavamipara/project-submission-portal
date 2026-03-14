const pool = require('../config/db');

const BookingModel = {
  async findAll() {
    const [rows] = await pool.query(`
      SELECT b.*, u.full_name AS user_name, u.email AS user_email, m.name AS menu_item_name
      FROM bookings b
      LEFT JOIN users u ON b.user_id = u.id
      LEFT JOIN menu_items m ON b.menu_item_id = m.id
      ORDER BY b.date DESC, b.created_at DESC
    `);
    return rows;
  },

  async findByUserId(userId) {
    const [rows] = await pool.query(`
      SELECT b.*, m.name AS menu_item_name, m.meal_type AS item_meal_type, m.price
      FROM bookings b
      LEFT JOIN menu_items m ON b.menu_item_id = m.id
      WHERE b.user_id = ?
      ORDER BY b.date DESC
    `, [userId]);
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM bookings WHERE id = ?', [id]);
    return rows[0] || null;
  },

  async create({ user_id, menu_item_id, date, meal_type, status = 'pending' }) {
    const [result] = await pool.query(
      'INSERT INTO bookings (user_id, menu_item_id, date, meal_type, status) VALUES (?, ?, ?, ?, ?)',
      [user_id, menu_item_id || null, date, meal_type, status]
    );
    return this.findById(result.insertId);
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
    await pool.query(`UPDATE bookings SET ${fields.join(', ')} WHERE id = ?`, values);
    return this.findById(id);
  },

  async delete(id) {
    const [result] = await pool.query('DELETE FROM bookings WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },
};

module.exports = BookingModel;

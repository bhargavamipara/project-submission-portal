const pool = require('../config/db');

const MenuModel = {
  async findAll() {
    const [rows] = await pool.query('SELECT * FROM menu_items ORDER BY meal_type, category');
    return rows;
  },

  async findById(id) {
    const [rows] = await pool.query('SELECT * FROM menu_items WHERE id = ?', [id]);
    return rows[0] || null;
  },

  async create({ name, meal_type, category, description, price, quantity, availability }) {
    const [result] = await pool.query(
      'INSERT INTO menu_items (name, meal_type, category, description, price, quantity, availability) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, meal_type, category, description || null, price || 0, quantity || 0, availability !== false]
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
    await pool.query(`UPDATE menu_items SET ${fields.join(', ')} WHERE id = ?`, values);
    return this.findById(id);
  },

  async delete(id) {
    const [result] = await pool.query('DELETE FROM menu_items WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },
};

module.exports = MenuModel;

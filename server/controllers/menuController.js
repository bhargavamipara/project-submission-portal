const MenuModel = require('../models/menuModel');

const menuController = {
  // GET /api/menu
  async getAll(req, res) {
    try {
      const items = await MenuModel.findAll();
      res.json({ menu_items: items });
    } catch (error) {
      console.error('Get menu error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  },

  // GET /api/menu/:id
  async getById(req, res) {
    try {
      const item = await MenuModel.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ error: 'Menu item not found.' });
      }
      res.json({ menu_item: item });
    } catch (error) {
      console.error('Get menu item error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  },

  // POST /api/menu
  async create(req, res) {
    try {
      const { name, meal_type, category, description, price, quantity, availability } = req.body;

      if (!name || !meal_type || !category) {
        return res.status(400).json({ error: 'Name, meal type, and category are required.' });
      }

      const item = await MenuModel.create({ name, meal_type, category, description, price, quantity, availability });
      res.status(201).json({ menu_item: item });
    } catch (error) {
      console.error('Create menu item error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  },

  // PUT /api/menu/:id
  async update(req, res) {
    try {
      const item = await MenuModel.update(req.params.id, req.body);
      if (!item) {
        return res.status(404).json({ error: 'Menu item not found.' });
      }
      res.json({ menu_item: item });
    } catch (error) {
      console.error('Update menu item error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  },

  // DELETE /api/menu/:id
  async delete(req, res) {
    try {
      const deleted = await MenuModel.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'Menu item not found.' });
      }
      res.json({ message: 'Menu item deleted successfully.' });
    } catch (error) {
      console.error('Delete menu item error:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  },
};

module.exports = menuController;

const express = require('express');
const router = express.Router();
const {
  createMenu,
  getMenus,
  getMenuById,
  updateMenu,
  deleteMenu,
} = require('../controllers/controller');

// Route to create a new menu
router.post('/', createMenu);

// Route to get all menus
router.get('/', getMenus);

// Route to get a specific menu by ID
router.get('/:id', getMenuById);

// Route to update a menu by ID
router.put('/edit/:id', updateMenu);

// Route to delete a menu by ID
router.delete('/delete/:id', deleteMenu);

module.exports = router;

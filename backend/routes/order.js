const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require('../controllers/controller');

// Route to create a new order
router.post('/', createOrder);

// Route to get all orders
router.get('/', getOrders);

// Route to get a specific order by ID
router.get('/:id', getOrderById);

// Route to update an order by ID
router.put('/:id', updateOrder);

// Route to delete an order by ID
router.delete('/:id', deleteOrder);

module.exports = router;

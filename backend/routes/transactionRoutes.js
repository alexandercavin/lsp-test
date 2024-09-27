const express = require('express');
const router = express.Router();
const {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} = require('../controllers/controller');

// Route to create a new transaction
router.post('/', createTransaction);

// Route to get all transactions
router.get('/', getTransactions);

// Route to get a specific transaction by ID
router.get('/:id', getTransactionById);

// Route to update a transaction by ID
router.put('/:id', updateTransaction);

// Route to delete a transaction by ID
router.delete('/:id', deleteTransaction);

module.exports = router;

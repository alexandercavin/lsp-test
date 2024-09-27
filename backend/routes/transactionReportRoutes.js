const express = require('express');
const router = express.Router();
const {
  createTransactionReport,
  getTransactionReports,
  getTransactionReportById,
  updateTransactionReport,
  deleteTransactionReport,
} = require('../controllers/controller');

// Route to create a new transaction report
router.post('/', createTransactionReport);

// Route to get all transaction reports
router.get('/', getTransactionReports);

// Route to get a specific transaction report by ID
router.get('/:id', getTransactionReportById);

// Route to update a transaction report by ID
router.put('/:id', updateTransactionReport);

// Route to delete a transaction report by ID
router.delete('/:id', deleteTransactionReport);

module.exports = router;

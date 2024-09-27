const express = require("express");
const router = express.Router();
const {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/controller");

// Route to create a new customer
router.post("/", createCustomer);

// Route to get all customers
router.get("/", getCustomers);

// Route to get a specific customer by ID
router.get("/:id", getCustomerById);

// Route to update a customer by ID
router.put("/:id", updateCustomer);

// Route to delete a customer by ID
router.delete("/:id", deleteCustomer);

module.exports = router;

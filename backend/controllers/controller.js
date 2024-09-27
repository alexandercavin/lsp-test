const express = require("express");
const router = express.Router();
const argon2 = require('argon2')
const bcrypt = require("bcryptjs");
const slugify = require('slugify');
// Import model
const {
  Customer,
  TransactionReport,
  Order,
  Transaction,
  Menu,
} = require("../models/Resto");
const Admin  = require("../models/Admin");
const { db, Sequelize } = require('../config/db.js'); 



// Controller for Customer
const createCustomer = async (req, res) => {
  try {
    const newCustomer = await Customer.create(req.body);
    res.status(201).json(newCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create customer" });
  }
};

const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get customers" });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (customer) {
      res.json(customer);
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get customer" });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const [updatedCount, [updatedCustomer]] = await Customer.update(req.body, {
      where: { idCustomer: req.params.id },
      returning: true,
    });
    if (updatedCount > 0) {
      res.json(updatedCustomer);
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update customer" });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const deletedCount = await Customer.destroy({
      where: { idCustomer: req.params.id },
    });
    if (deletedCount > 0) {
      res.json({ message: "Customer deleted successfully" });
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete customer" });
  }
};

// Controller for TransactionReport
const createTransactionReport = async (req, res) => {
  try {
    const newTransactionReport = await TransactionReport.create(req.body);
    res.status(201).json(newTransactionReport);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create transaction report" });
  }
};

const getTransactionReports = async (req, res) => {
  try {
    const transactionReports = await TransactionReport.findAll();
    res.json(transactionReports);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get transaction reports" });
  }
};

const getTransactionReportById = async (req, res) => {
  try {
    const transactionReport = await TransactionReport.findByPk(req.params.id);
    if (transactionReport) {
      res.json(transactionReport);
    } else {
      res.status(404).json({ message: "Transaction report not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get transaction report" });
  }
};

const updateTransactionReport = async (req, res) => {
  try {
    const [updatedCount, [updatedTransactionReport]] =
      await TransactionReport.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });
    if (updatedCount > 0) {
      res.json(updatedTransactionReport);
    } else {
      res.status(404).json({ message: "Transaction report not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update transaction report" });
  }
};

const deleteTransactionReport = async (req, res) => {
  try {
    const deletedCount = await TransactionReport.destroy({
      where: { id: req.params.id },
    });
    if (deletedCount > 0) {
      res.json({ message: "Transaction report deleted successfully" });
    } else {
      res.status(404).json({ message: "Transaction report not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete transaction report" });
  }
};

// Controller for Order
const createOrder = async (req, res) => {
  const { idCustomer, orderTime, menus } = req.body;

  try {
    // Step 1: Check if customer exists
    const customer = await db.models.Customer.findByPk(idCustomer);
    if (!customer) {
      return res.status(400).json({ message: "Invalid customer ID" });
    }

    // Step 2: Create the order
    const newOrder = await db.models.Order.create({
      idCustomer,
      orderTime,
    });

    // Step 3: Add the menus to the order through the OrderMenu table
    if (menus && menus.length > 0) {
      const orderMenus = menus.map(menu => ({
        MenuIdMenu: menu.idMenu,
        quantity: menu.quantity || 1,
      }));

      await newOrder.addMenus(orderMenus.map(menu => menu.MenuIdMenu), {
        through: orderMenus
      });
    }

    // Step 4: Fetch the created order with associated menus and customer details
    const createdOrder = await db.models.Order.findByPk(newOrder.idOrder, {
      include: [
        {
          model: db.models.Customer,
          attributes: ['idCustomer', 'name', 'tableNumber'],
        },
        {
          model: db.models.Menu,
          through: { attributes: ['quantity'] },
        },
      ],
    });

    // Debug logs to inspect the output
    console.log('New Order:', newOrder);
    console.log('Created Order:', createdOrder);

    res.status(201).json(createdOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create order" });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: Customer }, // Assuming associations exist
        { model: Menu }, // Assuming associations exist
      ],
    });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get orders" });
  }
};

// const getOrderById = async (req, res) => {
//   try {
//     const orderId = req.params.id;

//     // Find the order by ID
//     const order = await Order.findByPk(orderId);

//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     // Separate queries to fetch customer and menu details (not recommended for performance reasons)
//     const customer = await Customer.findByPk(order.idCustomer);
//     const menu = await Menu.findByPk(order.idMenu);

//     const response = {
//       order: order.toJSON(),
//       customer: customer ? customer.toJSON() : null, // Handle potential missing customer
//       menu: menu ? menu.toJSON() : null, // Handle potential missing menu
//     };

//     res.json(response);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to get order" });
//   }
// };

const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;

    // Find the order by ID, including customer and menus (with quantities)
    const order = await Order.findByPk(orderId, {
      include: [
        {
          model: Customer,
          attributes: ['idCustomer', 'name', 'email'],  // Select relevant customer attributes
        },
        {
          model: Menu,
          through: { attributes: ['quantity'] },  // Include quantity from OrderMenu join table
          attributes: ['idMenu', 'menuName', 'price'],  // Select relevant menu attributes
        },
      ],
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Return the order, customer, and menu details (including quantities)
    res.json(order.toJSON());
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get order" });
  }
};

const updateOrder = async (req, res) => {
  try {
    const [updatedCount, [updatedOrder]] = await Order.update(req.body, {
      where: { idOrder: req.params.id },
      returning: true,
    });
    if (updatedCount > 0) {
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update order" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const deletedCount = await Order.destroy({
      where: { idOrder: req.params.id },
    });
    if (deletedCount > 0) {
      res.json({ message: "Order deleted successfully" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete order" });
  }
};

// Controller for Transaction
const createTransaction = async (req, res) => {
  try {
    const newTransaction = await Transaction.create(req.body);
    res.status(201).json(newTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create transaction" });
  }
};

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll();
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get transactions" });
  }
};

const orderIdForTransaction = async (orderId) => {
  const order = await Order.findByPk(orderId);
  if (!order) return null;
  const customer = await Customer.findByPk(order.idCustomer);
  const menu = await Menu.findByPk(order.idMenu);

  return {
    order: order.toJSON(),
    customer: customer ? customer.toJSON() : null,
    menu: menu ? menu.toJSON() : null,
  };
};


const getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);
    if (transaction) {
      const orderDetails = await orderIdForTransaction(transaction.idOrder);

      if (!orderDetails) {
        return res.status(404).json({ message: "Order related to this transaction not found" });
      }

      // Send the transaction along with the associated order, customer, and menu details
      res.json({
        transaction: transaction.toJSON(),
        orderDetails,
      });
    } else {
      res.status(404).json({ message: "Transaction not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get transaction" });
  }
};

const updateTransaction = async (req, res) => {
  try {
    const [updatedCount, [updatedTransaction]] = await Transaction.update(
      req.body,
      {
        where: { idTransaction: req.params.id },
        returning: true,
      }
    );
    if (updatedCount > 0) {
      res.json(updatedTransaction);
    } else {
      res.status(404).json({ message: "Transaction not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update transaction" });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    const deletedCount = await Transaction.destroy({
      where: { idTransaction: req.params.id },
    });
    if (deletedCount > 0) {
      res.json({ message: "Transaction deleted successfully" });
    } else {
      res.status(404).json({ message: "Transaction not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete transaction" });
  }
};

// Controller for Menu
const createMenu = async (req, res) => {
  const { menuName, stock, category, price, image } = req.body;

  try {
    const newMenu = await Menu.create({
      menuName,
      stock,
      category,
      price,
      image,
      slug: slugify(menuName, { lower: true }), // Generating the slug
    });

    res.status(201).json(newMenu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create menu item" });
  }
};

const getMenus = async (req, res) => {
  try {
    const menus = await Menu.findAll();
    res.json(menus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get menus" });
  }
};

const getMenuById = async (req, res) => {
  try {
    const menu = await Menu.findByPk(req.params.id);
    if (menu) {
      res.json(menu);
    } else {
      res.status(404).json({ message: "Menu not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get menu" });
  }
};

const updateMenu = async (req, res) => {
  try {
    const updatedMenuData = await Menu.update(req.body, {
      where: { idMenu: req.params.id },
      returning: true,
    });
    console.log('Update Response:', updatedMenuData);

    const updatedCount = updatedMenuData[0]; // Number of affected rows
    const updatedMenus = updatedMenuData[1]; // Array of updated records

    console.log('Updated Count:', updatedCount); // Log the count
    console.log('Updated Menus:', updatedMenus); // Log the updated menu items

    if (updatedMenuData) {
      // Return the first updated menu item
      res.json(updatedMenus[0]);
    } else {
      res.status(404).json({ message: "Menu not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update menu" });
  }
};


const deleteMenu = async (req, res) => {
  try {
    const deletedCount = await Menu.destroy({
      where: { idMenu: req.params.id },
    });
    if (deletedCount > 0) {
      res.json({ message: "Menu deleted successfully" });
    } else {
      res.status(404).json({ message: "Menu not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete menu" });
  }
};

// Controller for Admin

const createAdmin = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Basic validation for required fields
  if (!name || !email || !password || !role) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    // Check if the email is already in use
    const existingAdmin = await Admin.findOne({ where: { email } });
    if (existingAdmin) {
      return res.status(400).json({ msg: "Email already in use" });
    }
    

    // Hash the password
    // const hashPassword = await bcrypt.hash(password, 10); // Using 10 rounds of salt

    // Create new admin
    await Admin.create({
      name,
      email,
      password,
      role,
    });

    res.status(201).json({ msg: "Register Success" });
  } catch (error) {
    console.error("Error creating admin:", error);
    res.status(500).json({ msg: "Failed to register admin" });
  }
};

const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.findAll();
    res.json(admins);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get admins" });
  }
};

const getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.params.id);
    if (admin) {
      res.json(admin);
    } else {
      res.status(404).json({ message: "Admin not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get admin" });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const [updatedCount, [updatedAdmin]] = await Admin.update(req.body, {
      where: { idAdmin: req.params.id },
      returning: true,
    });
    if (updatedCount > 0) {
      res.json(updatedAdmin);
    } else {
      res.status(404).json({ message: "Admin not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update admin" });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const deletedCount = await Admin.destroy({
      where: { idAdmin: req.params.id },
    });
    if (deletedCount > 0) {
      res.json({ message: "Admin deleted successfully" });
    } else {
      res.status(404).json({ message: "Admin not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete admin" });
  }
};

// Exports
module.exports = {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  createTransactionReport,
  getTransactionReports,
  getTransactionReportById,
  updateTransactionReport,
  deleteTransactionReport,
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  createMenu,
  getMenus,
  getMenuById,
  updateMenu,
  deleteMenu,
  createAdmin,
  getAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
};

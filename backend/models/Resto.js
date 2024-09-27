// Resto.js

const { Sequelize, DataTypes } = require('sequelize');
const {db} = require('../config/db');

// Define model Customer
const Customer = db.define('Customer', {
  idCustomer: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tableNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
});

// Define model TransactionReport
const TransactionReport = db.define('TransactionReport', {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  totalTransaction: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

// Define model Menu
const Menu = db.define('Menu', {
  idMenu: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  menuName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING(255),
  },
  slug: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false,
  },
});

// Define model Order
const Order = db.define('Order', {
    idOrder: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idCustomer: {
      type: DataTypes.INTEGER,
      references: {
        model: Customer,
        key: 'idCustomer',
      },
    },
    orderTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
  
  const OrderMenu = db.define('OrderMenu', {
    idOrderMenu: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,  // To store how many of the same menu item is ordered
    },
  });

// Define model Transaction
const Transaction = db.define('Transaction', {
  idTransaction: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  idOrder: {
    type: DataTypes.INTEGER,
    references: {
      model: Order,
      key: 'idOrder',
    },
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  paymentMethod: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  cardNumber: {
    type: DataTypes.STRING(16),
    allowNull: true, // Make it nullable if paymentMethod is "cash"
  },
  cardHolderName: {
    type: DataTypes.STRING(100), 
    allowNull: true, // Make it nullable if paymentMethod is "cash"
  },
  cardExpiryDate: {
    type: DataTypes.STRING(7), // Format: MM/YYYY
    allowNull: true, // Make it nullable if paymentMethod is "cash"
  },
  cardCvv: {
    type: DataTypes.STRING(4), // CVV is usually 3 or 4 digits
    allowNull: true, // Make it nullable if paymentMethod is "cash"
  },
});



// Customer-Order association
Customer.hasMany(Order, { foreignKey: 'idCustomer' });
Order.belongsTo(Customer, { foreignKey: 'idCustomer' });

// Menu-Order (Many-to-Many) association
Order.belongsToMany(Menu, { through: OrderMenu });
Menu.belongsToMany(Order, { through: OrderMenu });

// Transaction-Order association
Transaction.belongsTo(Order, { foreignKey: 'idOrder' });
Order.hasOne(Transaction, { foreignKey: 'idOrder' });

// db.sync().then(() => {
//   console.log('table created successfully!');
// }).catch((error) => {
//   console.error('Unable to create table : ', error);
// });

// if (ENV === "development") {
//   await db.sync({ alter: true });
// }
// console.log("Database connected...");

// Export models
module.exports = {
  Customer,
  TransactionReport,
  Order,
  Transaction,
  Menu,
};



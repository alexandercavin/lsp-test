const {db} = require("./config/db");
const express = require("express");
const app = express();
const cors = require("cors");
const session = require('express-session');
const bodyParser = require('body-parser')
const SequelizeStore = require('connect-session-sequelize')
const sessionStore = SequelizeStore(session.Store);
const adminRoutes = require("./routes/adminRoutes.js");
const customerRoutes = require("./routes/customerRoutes.js");
const menuRoutes = require("./routes/menu.js");
const orderRoutes = require("./routes/order.js");
const transactionReportRoutes = require("./routes/transactionReportRoutes.js");
const transactionRoutes = require("./routes/transactionRoutes.js");
const authRoutes = require('./routes/auth.js')
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(bodyParser.json());

const store = new sessionStore({
    db: db
});

app.use(session({
    secret: 'hgbtisuaokdsnmauiasdsuaoisuaodioj98i3', // Replace with your secret key
    resave: false,
    saveUninitialized: true,
    store: store, 
    cookie: { secure: 'auto' }, // Set to true if using HTTPS
  }));

  
app.use('/auth', authRoutes )
app.use("/admin", adminRoutes);
app.use("/customer", customerRoutes);
app.use("/order", orderRoutes);
app.use("/menu", menuRoutes);
app.use("/trans-report", transactionReportRoutes);
app.use("/trans", transactionRoutes);

// // "scripts": {
//     "start": "cross-env NODE_ENV=production node ./src/main.js",
//     "dev": "cross-env NODE_ENV=development nodemon ./src/main.js",
//     "lint": "eslint ./src/",
//     "format": "prettier --write ./src/"
//   },
app.listen(4000, () => {
  console.log(`Server up and running... on port 4000`);
});

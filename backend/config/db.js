// db.js

const { Sequelize } = require('sequelize');

// Konfigurasi koneksi database
const db = new Sequelize('db_resto', 'root', '1234', {
  host: "localhost",
  port: 4306,
  dialect: "mysql",
  logging: console.log
});

async function testConnection() {   
  try {     
        await db.authenticate();
        console.log('Database connected succefully');
  } catch (error) {
        console.error('Unable to connect to the database:', error);
     }
  }
  testConnection();

// Export the db variable
module.exports = {db, Sequelize};

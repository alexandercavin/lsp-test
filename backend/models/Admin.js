// import library - library
const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const {db} = require('../config/db')
const {Menu} = require('./Resto')

// Define model Admin
const Admin = db.define('Admin', {
    idAdmin: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false, // Enforce that name is required
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false, // Enforce that email is required
      unique: true,     // Ensure unique emails for each admin
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false, // Password is required
    },
    role: {
      type: DataTypes.STRING(50),
      allowNull: false, // Role is required
    },
  }, {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
  });
  
  // Relationship between Admin and Menu
  Admin.hasMany(Menu, {
    as: 'manages', // Alias for the relationship
    foreignKey: 'adminId', // Foreign key in Menu that references Admin
  });
  
  Menu.belongsTo(Admin, {
    as: 'managedBy', // Reverse alias for the relationship
    foreignKey: 'adminId', // Foreign key in Menu that references Admin
  });
  

  // db.sync().then(() => {
  //   console.log('table created successfully!');
  // }).catch((error) => {
  //   console.error('Unable to create table : ', error);
  // });


  // Export Admin model
  module.exports = Admin;



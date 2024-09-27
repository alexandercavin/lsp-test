const Admin = require('../models/Admin');
const argon2 = require('argon2');
const bcrypt = require("bcryptjs");


const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const admin = await Admin.findOne({ where: { email } });
      console.log(admin.password);
      if (!admin) {
        return res.status(404).json({ msg: "Admin not found" });
      }
      if (admin.password !== password) {
        return res.status(401).json({ msg: "Invalid password" });
      }
  
      // Compare the provided password with the stored hashed password
    //   const isMatch = await bcrypt.compare(password, admin.password);
    //   if (!isMatch) {
    //     return res.status(400).json({ msg: "Invalid password" });
    //   }
  
      // Successful login - you can proceed with session creation or whatever next steps
      req.session.adminId = admin.idAdmin; 
      const name = admin.name;
      const role= admin.role;
      const aemail = admin.email;
      res.json({ msg: "Login successful", adminId: admin.idAdmin, name, role, aemail });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ msg: "Failed to login admin" });
    }
  };
  
  const logoutAdmin = (req, res) => {
    // Destroy the session
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ msg: "Failed to log out" });
      }
      res.json({ msg: "Logged out successfully" });
    });
  };


const Me = async (req, res) =>{
    if(!req.session.adminId){
        return res.status(401).json({msg: "Please login"});
    }
    const admin = await Admin.findOne({
        attributes:['idAdmin','name','email','role'],
        where: {
            idAdmin: req.session.adminId
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    res.status(200).json(admin);
}
  
  
  module.exports = {
    loginAdmin,
    logoutAdmin,
    Me
  };


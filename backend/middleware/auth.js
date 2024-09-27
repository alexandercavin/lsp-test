const Admin = require('../models/Admin');

const protectAdminRoute = async (req, res, next) => {
  const adminId = req.session.adminId; // Get admin ID from session

  if (!adminId) {
    return res.status(403).json({ msg: "Access denied, admin only" });
  }

  try {
    const admin = await Admin.findByPk(adminId);
    if (!admin) {
      return res.status(404).json({ msg: "Admin not found" });
    }

    req.admin = admin; // Attach admin info to the request
    next();
  } catch (error) {
    console.error("Error in admin protection middleware:", error);
    res.status(500).json({ msg: "Failed to authorize admin" });
  }
};

module.exports = {
  protectAdminRoute,
};

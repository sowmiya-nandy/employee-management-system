const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const {
  getEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  updateEmployeeImage,
  deleteEmployee,
} = require("../controllers/employeeController");

// ==========================
// Get All Employees
// ==========================
router.get(
  "/",
  authenticateToken,
  getEmployees
);

// ==========================
// Get Employee By ID
// ==========================
router.get(
  "/:id",
  authenticateToken,
  getEmployeeById
);

// ==========================
// Add Employee
// ==========================
router.post(
  "/",
  authenticateToken,
  upload.single("image"),
  addEmployee
);

// ==========================
// Update Employee Details
// ==========================
router.put(
  "/:id",
  authenticateToken,
  updateEmployee
);

// ==========================
// Update Profile Picture
// ==========================
router.put(
  "/:id/image",
  authenticateToken,
  upload.single("image"),
  updateEmployeeImage
);

// ==========================
// Delete Employee
// ==========================
router.delete(
  "/:id",
  authenticateToken,
  deleteEmployee
);

module.exports = router;
const express = require("express");
const router = express.Router();

const departmentController = require("../controllers/departmentController");
const verifyToken = require("../middleware/authMiddleware");

// Get all departments
router.get("/", verifyToken, departmentController.getAllDepartments);

// Get department by ID
router.get("/:id", verifyToken, departmentController.getDepartmentById);

// Add department
router.post("/", verifyToken, departmentController.addDepartment);

// Update department
router.put("/:id", verifyToken, departmentController.updateDepartment);

// Delete department
router.delete("/:id", verifyToken, departmentController.deleteDepartment);

module.exports = router;
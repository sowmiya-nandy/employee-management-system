const departmentService = require("../services/departmentService");

// Get All Departments
const getAllDepartments = async (req, res) => {
  try {
    const departments = await departmentService.getAllDepartments();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Department By ID
const getDepartmentById = async (req, res) => {
  try {
    const department = await departmentService.getDepartmentById(req.params.id);

    if (!department) {
      return res.status(404).json({
        message: "Department not found",
      });
    }

    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Add Department
const addDepartment = async (req, res) => {
  try {
    const department = await departmentService.addDepartment(req.body);
console.log("Department Saved:", department);
    res.status(201).json({
      message: "Department Added Successfully",
      department,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Department
const updateDepartment = async (req, res) => {
  try {
    const department = await departmentService.updateDepartment(
      req.params.id,
      req.body
    );

    if (!department) {
      return res.status(404).json({
        message: "Department not found",
      });
    }

    res.status(200).json({
      message: "Department Updated Successfully",
      department,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Department
const deleteDepartment = async (req, res) => {
  try {
    await departmentService.deleteDepartment(req.params.id);

    res.status(200).json({
      message: "Department Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  getAllDepartments,
  getDepartmentById,
  addDepartment,
  updateDepartment,
  deleteDepartment,
};
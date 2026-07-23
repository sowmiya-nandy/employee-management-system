const redisClient = require("../config/redis");
const employeeService = require("../services/employeeService");

const getEmployees = async (req, res) => {
  try {
    const start = Date.now();

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const sortBy = req.query.sortBy || "id";
    const order = req.query.order || "ASC";

    const cacheKey = `employees:${page}:${limit}:${sortBy}:${order}`;

    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      const end = Date.now();

      console.log("✅ Data from Redis Cache");
      console.log(`⚡ Response Time: ${end - start} ms`);

      return res.status(200).json(JSON.parse(cachedData));
    }

    console.log("📦 Data from PostgreSQL");

    const result = await employeeService.getAllEmployees(
      page,
      limit,
      sortBy,
      order
    );

    const end = Date.now();

    console.log(`🐘 Response Time: ${end - start} ms`);
const response = await redisClient.set(
  cacheKey,
  JSON.stringify(result),
  {
    EX: 600,
  }
);

console.log("Redis SET:", response);

const value = await redisClient.get(cacheKey);
console.log("Redis GET after SET:", value ? "FOUND" : "NOT FOUND");
    return res.status(200).json(result);
  } catch (error) {
   console.error(error);

    res.status(500).json({
      message: "Failed to fetch employees",
    });
  }
};

// ==========================
// Get Employee By ID
// ==========================
const getEmployeeById = async (req, res) => {
  try {
    const employee = await employeeService.getEmployeeById(
      req.params.id
    );

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json(employee);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch employee",
    });
  }
};

// ==========================
// Add Employee
// ==========================
const addEmployee = async (req, res) => {
  try {
    const employeeData = {
      ...req.body,
      image: req.file ? req.file.filename : null,
    };

    const employee =
      await employeeService.addEmployee(employeeData);

   await redisClient.flushAll();

console.error("🗑 Employee cache cleared");

    res.status(201).json({
      message: "Employee Added Successfully",
      employee,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to add employee",
    });
  }
};

// ==========================
// Update Employee Details
// ==========================
const updateEmployee = async (req, res) => {
  try {
    const employee =
      await employeeService.updateEmployee(
        req.params.id,
        req.body
      );

    await redisClient.flushAll();
    console.log("🗑 Employee cache cleared");
    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json({
      message: "Employee Updated Successfully",
      employee,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update employee",
    });
  }
};

// ==========================
// Update Employee Profile Image
// ==========================
const updateEmployeeImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image selected",
      });
    }

    const employee =
      await employeeService.updateEmployeeImage(
        req.params.id,
        req.file.filename
      );

    await redisClient.flushAll();
    console.log("🗑 Employee cache cleared");

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json({
      message: "Profile picture updated successfully",
      employee,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Image upload failed",
    });
  }
};

// ==========================
// Delete Employee
// ==========================
const deleteEmployee = async (req, res) => {
  try {
    const employee =
      await employeeService.deleteEmployee(
        req.params.id
      );

    await redisClient.flushAll();
    console.log("🗑 Employee cache cleared");

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json({
      message: "Employee Deleted Successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete employee",
    });
  }
};

module.exports = {
  getEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  updateEmployeeImage,
  deleteEmployee,
};
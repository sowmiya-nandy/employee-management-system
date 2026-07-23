const db = require("../config/db");
const Department = require("../models/Department");

// Get all departments
const getAllDepartments = async () => {
  return await Department.find();
};

// Get department by ID
const getDepartmentById = async (id) => {
  return await Department.findById(id);
};

const addDepartment = async (data) => {
  // Save to MongoDB
  const department = new Department(data);
  const mongoDepartment = await department.save();

  // Save to PostgreSQL
  await db.query(
    `
    INSERT INTO departments
    (
      department_name,
      manager_name,
      location
    )
    VALUES ($1,$2,$3)
    `,
    [
      data.department_name,
      data.manager_name,
      data.location,
    ]
  );

  return mongoDepartment;
};
const updateDepartment = async (id, data) => {
  // Update MongoDB
  const mongoDepartment = await Department.findByIdAndUpdate(
    id,
    data,
    { new: true }
  );

  if (!mongoDepartment) {
    return null;
  }

  // Update PostgreSQL
  await db.query(
    `
    UPDATE departments
    SET
      department_name=$1,
      manager_name=$2,
      location=$3
    WHERE department_name=$4
    `,
    [
      data.department_name,
      data.manager_name,
      data.location,
      mongoDepartment.department_name,
    ]
  );

  return mongoDepartment;
};
const deleteDepartment = async (id) => {
  // Get department first
  const department = await Department.findById(id);

  if (!department) {
    return null;
  }

  // Delete MongoDB
  await Department.findByIdAndDelete(id);

  // Delete PostgreSQL
  await db.query(
    `
    DELETE FROM departments
    WHERE department_name=$1
    `,
    [department.department_name]
  );

  return department;
};
module.exports = {
  getAllDepartments,
  getDepartmentById,
  addDepartment,
  updateDepartment,
  deleteDepartment,
};
const db = require("../config/db");
const Employee = require("../models/Employee");
// ==========================
// Get All Employees
// ==========================
const getAllEmployees = async (
  page = 1,
  limit = 5,
  sortBy = "id",
  order = "ASC"
) => {
  const offset = (page - 1) * limit;

  const allowedColumns = [
    "id",
    "name",
    "department",
    "salary",
    "role",
  ];

  if (!allowedColumns.includes(sortBy)) {
    sortBy = "id";
  }

  order = order.toUpperCase() === "DESC" ? "DESC" : "ASC";

 const employeeResult = await db.query(
  `
  SELECT
    id,
    name,
    email,
    department,
    salary,
    image,
    role,
    contact
  FROM employees
  ORDER BY ${sortBy} ${order}
  LIMIT $1 OFFSET $2
  `,
  [limit, offset]
);

  const countResult = await db.query(
    "SELECT COUNT(*) FROM employees"
  );

  const totalEmployees = parseInt(
    countResult.rows[0].count
  );

  return {
    employees: employeeResult.rows,
    currentPage: page,
    totalEmployees,
    totalPages: Math.ceil(totalEmployees / limit),
  };
};

// ==========================
// Get Employee By ID
// ==========================
const getEmployeeById = async (id) => {
  const result = await db.query(
    `
    SELECT
  id,
  name,
  email,
  department,
  salary,
  image,
  role,
  contact
FROM employees
WHERE id=$1
    `,
    [id]
  );

  return result.rows[0];
};

// ==========================
// Add Employee
// ==========================
const addEmployee = async (employee) => {
  const {
    name,
    email,
    department,
    salary,
    image,
    role,
    contact,
  } = employee;

  // Save into PostgreSQL
  const result = await db.query(
    `
    INSERT INTO employees
    (
      name,
      email,
      department,
      salary,
      image,
      role,
      contact
    )
    VALUES
    (
      $1,$2,$3,$4,$5,$6,$7
    )
    RETURNING *
    `,
    [
      name,
      email,
      department,
      salary,
      image,
      role || "Employee",
      contact || "",
    ]
  );

  const postgresEmployee = result.rows[0];

  // Save into MongoDB
  await Employee.create({
    name,
    email,
    department,
    salary,
  });

  return postgresEmployee;
};

const updateEmployee = async (id, employee) => {
  const {
    name,
    email,
    department,
    salary,
    role,
    contact,
  } = employee;

  // Update PostgreSQL
  const result = await db.query(
    `
    UPDATE employees
    SET
      name=$1,
      email=$2,
      department=$3,
      salary=$4,
      role=$5,
      contact=$6
    WHERE id=$7
    RETURNING *
    `,
    [
      name,
      email,
      department,
      salary,
      role,
      contact,
      id,
    ]
  );

  const updatedEmployee = result.rows[0];

  if (updatedEmployee) {
    // Update MongoDB using email as the unique key
    await Employee.findOneAndUpdate(
      { email: updatedEmployee.email },
      {
        name,
        email,
        department,
        salary,
      }
    );
  }

  return updatedEmployee;
};

// ==========================
// Update Profile Image
// ==========================
const updateEmployeeImage = async (
  id,
  image
) => {
  const result = await db.query(
    `
    UPDATE employees
    SET image=$1
    WHERE id=$2
    RETURNING *
    `,
    [image, id]
  );

  return result.rows[0];
};
const deleteEmployee = async (id) => {
  // Get employee before deleting
  const employeeResult = await db.query(
    `
    SELECT * FROM employees
    WHERE id=$1
    `,
    [id]
  );

  const employee = employeeResult.rows[0];

  if (!employee) {
    return null;
  }

  // Delete from PostgreSQL
  await db.query(
    `
    DELETE FROM employees
    WHERE id=$1
    `,
    [id]
  );

  // Delete from MongoDB
  await Employee.deleteOne({
    email: employee.email,
  });

  return employee;
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  updateEmployeeImage,
  deleteEmployee,
};
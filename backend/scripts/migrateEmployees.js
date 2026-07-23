const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});
const mongoose = require("mongoose");
const db = require("../config/db");
const Employee = require("../models/Employee");
require("dotenv").config();

async function migrateEmployees() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    // Get employees from PostgreSQL
    const result = await db.query(`
      SELECT
        name,
        email,
        department,
        salary
      FROM employees
    `);

    const employees = result.rows;

    console.log(`Found ${employees.length} employees in PostgreSQL`);

    // Insert into MongoDB
    for (const employee of employees) {
      const exists = await Employee.findOne({
        email: employee.email,
      });

      if (!exists) {
        await Employee.create(employee);
        console.log(`Inserted: ${employee.name}`);
      } else {
        console.log(`Skipped: ${employee.name} (already exists)`);
      }
    }

    console.log("✅ Migration Completed");

    process.exit();

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

migrateEmployees();
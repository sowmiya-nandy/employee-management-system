const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

const mongoose = require("mongoose");
const db = require("../config/db");
const Department = require("../models/Department");

async function migrateDepartments() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const departments = await Department.find();

    console.log(`Found ${departments.length} departments`);

    for (const dept of departments) {
      const exists = await db.query(
        "SELECT * FROM departments WHERE department_name=$1",
        [dept.department_name]
      );

      if (exists.rows.length === 0) {
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
            dept.department_name,
            dept.manager_name,
            dept.location,
          ]
        );

        console.log(`Inserted: ${dept.department_name}`);
      } else {
        console.log(`Skipped: ${dept.department_name}`);
      }
    }

    console.log("Migration Completed");
    process.exit();

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

migrateDepartments();
const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    department_name: {
      type: String,
      required: true,
    },
    manager_name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Department", departmentSchema);
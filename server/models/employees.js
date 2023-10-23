const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  EmployeeID: Number,
  Name: String,
  Gender: String,
  BirthDay: String,
  Phone: String,
  Address: String,
  HireDate: String,
  Country: String,
  Designation: String,
  Department: String,
});

const employeeModel = mongoose.model("Employee", employeeSchema);
module.exports = employeeModel;

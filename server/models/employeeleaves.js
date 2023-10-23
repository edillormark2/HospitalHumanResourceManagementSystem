const mongoose = require("mongoose");

const employeeleavesSchema = new mongoose.Schema({
  EmployeeID: Number,
  Name: String,
  LeaveType: String,
  AppliedOn: String,
  StartDate: String,
  EndDate: String,
  TotalDays: String,
  LeaveReason: String,
  Status: String,
  StatusBg: String,
  Remarks: String,
});

const employeeleavesModel = mongoose.model(
  "EmployeeLeave",
  employeeleavesSchema
); // Use "EmployeeLeave" as the model name
module.exports = employeeleavesModel;

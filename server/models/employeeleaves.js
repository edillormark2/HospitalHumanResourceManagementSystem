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

const employeeleaveModel = mongoose.model(
  "EmployeeLeave", // Use singular form for the model name
  employeeleavesSchema
);

module.exports = employeeleaveModel;

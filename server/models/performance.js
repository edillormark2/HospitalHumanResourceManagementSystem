const mongoose = require("mongoose");

const performanceSchema = new mongoose.Schema({
    EmployeeID: Number,
    Name: String,
    Department: String,
    Position: String,
    Rating: Number,
    Feedback: String,
    CreatedAt: String
});

const performanceModel = mongoose.model(
  "Performance",
  performanceSchema
); // Use "EmployeeLeave" as the model name
module.exports = performanceModel;
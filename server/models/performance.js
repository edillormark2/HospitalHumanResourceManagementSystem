const mongoose = require("mongoose");

const performanceSchema = new mongoose.Schema({
    EmployeeID: Number,
    Name: String,
    Department: String,
    Position: String,
    Rating: String,
    Feedback: String,
    CreatedAt: String,
    OCLR: String,
    OCPMR: String,
    TCARR: String,
    BCOCR: String,
    BCBPR: String,

});

const performanceModel = mongoose.model(
  "Performance",
  performanceSchema
); // Use "EmployeeLeave" as the model name
module.exports = performanceModel;
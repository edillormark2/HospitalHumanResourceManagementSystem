const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    Username: String,
    Password: String,
    AccountType: Number,
    EmployeeID: Number,
});

const accountModel = mongoose.model(
  "Account",
  accountSchema
); // Use "EmployeeLeave" as the model name
module.exports = accountModel;
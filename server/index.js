const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { format, subDays, isAfter } = require('date-fns');
const employeeModel = require("./models/employees");
const employeeleavesModel = require("./models/employeeleaves");
const accountModel = require("./models/account");
const performanceModel = require("./models/performance");


const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/hhrms", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Create Employee
app.post("/createEmployee", async (req, res) => {
  try {
    const newEmployee = await employeeModel.create(req.body);
    res.json(newEmployee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all employees
app.get("/employees", async (req, res) => {
  try {
    const employees = await employeeModel.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get employee by ID
app.get("/employees/:id", async (req, res) => {
  try {
    const employee = await employeeModel.findOne({ EmployeeID: req.params.id });
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update employee by ID
app.put("/employees/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedEmployee = await employeeModel.findOneAndUpdate(
      { EmployeeID: id },
      { $set: req.body }, // Update employee with the request body
      { new: true } // Return the updated employee
    );

    if (!updatedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json(updatedEmployee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete employee by ID
app.delete("/employees/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEmployee = await employeeModel.findOneAndDelete({
      EmployeeID: id,
    });

    if (!deletedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json({ message: "Employee deleted successfully", deletedEmployee });
  } catch (err) {
    console.error("Error deleting employee:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
//start another queries
//Employee leave connection
// Get all employee leave records
app.get("/employeeLeaves", async (req, res) => {
  try {
    const employeeLeaves = await employeeleavesModel.find();
    res.json(employeeLeaves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create Employee Leave
app.post("/createEmployeeLeave", async (req, res) => {
  try {
    const newEmployeeLeave = await employeeleavesModel.create(req.body);
    res.json(newEmployeeLeave);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(400).json({ error: err.message });
  }
});

// Get employee leave record by ID
app.get("/employeeLeaves/:id", async (req, res) => {
  try {
    const employeeLeaves = await employeeleavesModel.find({
      EmployeeID: req.params.id, // Update the field to match EmployeeID
    });
    if (!employeeLeaves && employeeLeaves.length === 0) {
      return res.status(404).json({ error: "No employee leave records found" });
    }
    res.json(employeeLeaves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete employee by ID
app.delete("/deleteEmployeesLeaves/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEmployee = await employeeleavesModel.findOneAndDelete({
      EmployeeID: id,
    });

    if (!deletedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    return res
      .status(200)
      .json({ message: "Employee deleted successfully", deletedEmployee });
  } catch (err) {
    console.error("Error deleting employee:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Update employee leave status by ID
app.put("/updateEmployeeLeaveStatus/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedLeave = await employeeleavesModel.findOneAndUpdate(
      { EmployeeID: id }, // Assuming EmployeeLeaveID is the unique identifier for employee leaves
      { $set: req.body }, // Update employee leave status with the request body
      { new: true } // Return the updated employee leave
    );

    if (!updatedLeave) {
      return res.status(404).json({ error: "Employee leave not found" });
    }

    res.json(updatedLeave);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update employee leave data by ID
app.put("/updateEmployeesLeave/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedEmployee = await employeeleavesModel.findOneAndUpdate(
      { EmployeeID: id },
      { $set: req.body }, // Update employee with the request body
      { new: true } // Return the updated employee
    );

    if (!updatedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json(updatedEmployee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
      // Check if the user with the provided username and password exists in your MongoDB collection
      const user = await accountModel.findOne({ username, password });

      if (user) {
          // If the user exists and credentials are correct, send the user data
          res.json({ success: true, userData: user});
      } else {
          // If the credentials are incorrect or the user does not exist, send an error response
          res.status(401).json({ success: false, message: "Invalid credentials" });
      }
  } catch (error) {
      res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/employeecount', async (req, res) => {
  try {
    const count = await employeeModel.countDocuments({});
    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/newemployeecount', async (req, res) => {
  try {
    // Get the current month and year
    const currentDate = new Date();
    const currentMonth = format(currentDate, 'MM');
    const currentYear = format(currentDate, 'yyyy');

    // Count employees whose HireDate matches the current month and year
    const count = await employeeModel.countDocuments({
      $and: [
        {
          $expr: {
            $eq: [
              { $substr: ['$HireDate', 0, 2] }, // Extract the month part
              currentMonth
            ]
          }
        },
        {
          $expr: {
            $eq: [
              { $substr: ['$HireDate', 6, 4] }, // Extract the year part
              currentYear
            ]
          }
        }
      ]
    });

    res.json({ count });
  } catch (err) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/employeeleavescount', async (req, res) => {
  try {
    const count = await employeeleavesModel.countDocuments({});
    res.json({ count });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.get('/employee/account/:id', async (req, res) => {
  try {
    const employee = await employeeModel.findOne({ EmployeeID: req.params.id });

    if (employee) {
      const employeeName = employee.Name; // Assuming 'Name' is the field you want to retrieve
      res.json({ success: true, Name: employeeName });
    } else {
      res.json({ success: false, message: 'Employee not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'An error occurred while retrieving employee data' });
  }
});

app.get("/performance", async (req, res) => {
  try {
    const employeesPerformance = await performanceModel.find();
    res.json(employeesPerformance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

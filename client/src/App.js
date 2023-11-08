import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { ToastContainer } from "react-toastify";
import { useStateContext } from "./contexts/ContextProvider";
import EditLeavePopup from "./components/LeaveComponents/EditLeavePopup";
import EmpSetSalary from "./pages/PagesPayroll/EmpSetSalary";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
import {
  Dashboard,
  Calendar,
  Employees,
  ManageLeave,
  Stacked,
  Pyramid,
  Line,
  Kanban,
  Area,
  Bar,
  Pie,
  Financial,
  ColorPicker,
  ColorMapping,
  Editor,
  SetSalary,
  Payslip,
  CreateEmployee,
  Timesheet,
  JobApplication,
  Performance
} from "./pages";

import EditEmployee from "./pages/PagesEmployees/EditEmployee";

import "./App.css";

const Login = () => {
  const {
    login,
    isLoggedIn,
    activeMenu,
    themeSettings,
    setThemeSettings,
    currentColor,
    currentMode
  } = useStateContext();

  const handleLogin = ()=> { login(); };

  const [username, setUsername] = useState("");
  const [userNameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const isMobile = window.innerWidth <= 768 && window.innerHeight <= 1024;

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);

    if (!value){
      setUsernameError("Username is required.");
    } else {
      setUsernameError("");
    }
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);

    if (!value) {
      setPasswordError("Password is required.");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      toast.error("Please fill in all the required fields");
      if (!username) setUsernameError("Username is required");
      if (!password) setPasswordError("Password is required");
      return;
    }

    const fetchAccount = async () => {
      try {
          const response = await axios.post("http://localhost:3001/login", {
            username: username,
            password: password,
          });

          if (response.data.success) {
            toast.success("Login successful");
            handleLogin();
          } else {
            // Login failed, handle the failure case here
            toast.error("Login failed. Please check your credentials");
          }
      } catch (error) {
        console.error("Error fetching user data: ", error);
        toast.error("An error occurred while logging in");
      }
    };

    // Call the fetchAccount function to perform the login
    fetchAccount();
  };

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
      {isLoggedIn ? (
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                className="text-3xl p-3 hover: drop-shadow-xl hover: bg-light-gray text-white"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: "50%" }}
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {activeMenu
            ? <div className="w-60 fixed sidebar dark:bg-secondary-dark-bg bg-white">
                <Sidebar />
              </div>
            : <div className="w-0 dark:bg-secondary-dark-bg">
                <Sidebar />
              </div>
          }
          <div className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${activeMenu ? "md:ml-60" : "flex-1"}`} >
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
            <Navbar />
          </div>

            <div>
              {themeSettings && <ThemeSettings />}
              <ToastContainer />
              <Routes>
                {/* Dashboard */}
                <Route path="/dashboard" element={<Dashboard />} />

                {/* Pages */}
                <Route path="/employees" element={<Employees />} />
                {/* Employees SubPages */}
                <Route
                  path="/employees/edit-employee/:EmployeeID"
                  element={<EditEmployee />}
                />
                <Route
                  path="/employees/create-employee"
                  element={<CreateEmployee />}
                />
                <Route
                  path="/employees/edit-leave-employee/:EmployeeID"
                  element={<EditLeavePopup />}
                />
                {/* Pages */}
                <Route path="/manage leave" element={<ManageLeave />} />
                <Route path="/set salary" element={<SetSalary />} />
                {/* Employees Set Salary SubPages */}
                <Route
                  path="/set salary/emp-set-salary/:EmployeeID"
                  element={<EmpSetSalary />}
                />
                <Route path="/payslip" element={<Payslip />} />
                <Route path="/timesheet" element={<Timesheet />} />
                <Route path="/job application" element={<JobApplication />} />
                <Route path="/performance" element={<Performance />} />

                {/* Apps */}
                <Route path="/kanban" element={<Kanban />} />
                <Route path="/editor" element={<Editor />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/color-picker" element={<ColorPicker />} />

                {/* charts */}
                <Route path="/line" element={<Line />} />
                <Route path="/area" element={<Area />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/financial" element={<Financial />} />
                <Route path="/color-mapping" element={<ColorMapping />} />
                <Route path="/pyramid" element={<Pyramid />} />
                <Route path="/stacked" element={<Stacked />} />
              </Routes>
            </div>
          </div>
        </div>
        ) : (
          <div className="flex flex-wrap lg:flex-nowrap justify-center dark:bg-main-dark-bg">
            <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
              <TooltipComponent content="Settings" position="Top">
                <button
                  type="button"
                  className="text-3xl p-3 hover: drop-shadow-xl hover: bg-light-gray text-white"
                  onClick={() => setThemeSettings(true)}
                  style={{ background: currentColor, borderRadius: "50%" }}
                >
                  <FiSettings />
                </button>
              </TooltipComponent>
            </div> 
            {themeSettings && <ThemeSettings />}
            <div className="m-2 md:m-10 mt-10 p-2 md:p-10 bg-white sm:rounded-3xl rounded-md drop-shadow-xl">
              <form onSubmit={handleSubmit}>
                  <TextField
                      label="Username"
                      variant="outlined"
                      value={username}
                      onChange={handleUsernameChange}
                      error={!!userNameError}
                      helperText={userNameError}
                  />
                  <br />
                  <TextField className="m-5"
                      label="Password"
                      variant="outlined"
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}
                      error={!!passwordError}
                      helperText={passwordError}
                  />
                  <br />
                  <Button type="submit" variant="contained" color="primary">
                      Login
                  </Button>
              </form>
            </div>
          </div> )} 
        </BrowserRouter>
    </div>
  );
};

export default Login;

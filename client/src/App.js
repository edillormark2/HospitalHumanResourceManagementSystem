import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
} from "./pages";

import EditEmployee from "./pages/EditEmployee";
import CreateEmployee from "./pages/CreateEmployee";

import "./App.css";

import { useStateContext } from "./contexts/ContextProvider";
import EditLeavePopup from "./components/EditLeavePopup";

const App = () => {
  const {
    activeMenu,
    themeSettings,
    setThemeSettings,
    currentColor,
    currentMode,
  } = useStateContext();

  {/*side bar width updated to ml-60*/}
  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
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
          {activeMenu ? (
      <div className="w-60 fixed sidebar dark:bg-secondary-dark-bg bg-white">
     <Sidebar />
    </div>
    ) : (
  <div className="w-0 dark:bg-secondary-dark-bg">
    <Sidebar />
  </div>
    )}
    <div
    className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full
    ${activeMenu ? "md:ml-60" : "flex-1"}`}
  >
            <div
              className="fixed md:static bg-main-bg dark:bg-main-dark-bg 
                navbar w-full"
            >
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
      </BrowserRouter>
    </div>
  );
};

export default App;

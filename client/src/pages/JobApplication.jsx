import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Search,
  Inject,
  Toolbar,
  Selection,
  Sort
} from "@syncfusion/ej2-react-grids";
import { Divider } from "@mui/joy";
import Breadcrumbs from "../components/Breadcrumbs";
import { useStateContext } from "../contexts/ContextProvider";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import ActionPopup from "../components/LeaveComponents/ActionLeavePopup";
import DeleteLeavePopup from "../components/LeaveComponents/DeleteLeavePopup";
import TimesheetPopup from "../components/TimesheetPopup";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import CardTitle from "../components/CardTitle";
import dayjs from "dayjs";
import PayslipPopup from "../components/PayrollComponents/PayslipPopup";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AiOutlineSearch } from "react-icons/ai";
import { RiDeleteBin2Line } from "react-icons/ri";
import { BiSolidFileImport } from "react-icons/bi";
import CreateButton from "../components/CreateButton";

const JobApplication = ({ EmployeeID }) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const monthFormat = dayjs().format("MM/DD/YYYY");
  const yearFormat = dayjs().format("YYYY");
  const [department, setDepartment] = useState("");
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const { currentColor, currentMode } = useStateContext();
  const [openPayslipPopup, setOpenPayslipPopup] = useState(false);
  const [selectedEmployeeID, setSelectedEmployeeID] = useState(null);
  const [openTimesheetPopup, setOpenTimesheetPopup] = useState(false);

  const handleDeletePopup = EmployeeID => {
    setSelectedEmployeeID(EmployeeID);
    setOpenDeletePopup(true);
  };

  const breadcrumbLinks = [
    { to: "/dashboard", label: "Home" },
    { to: "/job application", label: "Job Application" }
  ];

  const pageSizes = [9, 20, 50];
  const [pageSize, setPageSize] = useState(9);

  const handlePageSizeChange = e => {
    setPageSize(e.value);
  };

  const template = () =>
    <div style={{ display: "flex", alignItems: "center" }}>
      <DropDownListComponent
        dataSource={pageSizes}
        index={pageSizes.indexOf(pageSize)}
        change={handlePageSizeChange}
        style={{ width: "20px", marginLeft: "20px" }} // Adjust the width as needed
      />
      <span style={{ marginLeft: "10px" }}>Entries per page</span>
    </div>;

  const employeeGridStatus = props =>
    <button
      type="button"
      style={{ background: props.StatusBg, cursor: "text" }}
      className="text-white py-1 px-2 w-20 capitalize rounded-xl text-md"
    >
      {props.Status}
    </button>;

  const handleOpenTimesheet = EmployeeID => {
    setSelectedEmployeeID(EmployeeID);
    setOpenTimesheetPopup(true);
  };

  const handleCloseTimesheetPopup = () => {
    setOpenTimesheetPopup(false);
  };
  const handleClosePopup = () => {
    setOpenPayslipPopup(false);
  };

  const handleOpenPayslip = EmployeeID => {
    setSelectedEmployeeID(EmployeeID);
    setOpenPayslipPopup(true);
  };

  const handleDepartmentChange = event => {
    const selectedDepartment = event.target.value;
    setDepartment(selectedDepartment);
  };

  return (
    <div className="m-2 sm:mx-4 md:m-4 mt-24 p-2 md:p-4 ">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div className="mb-5">
          <p className="text-md text-gray-400">Pages</p>
          <p className="text-2xl font-extrabold tracking-tight text-slate-900 mb-2 dark:text-gray-200 ">
            Manage Job Application
          </p>
          <Breadcrumbs links={breadcrumbLinks} />
        </div>
      </div>
      <div className="md:m-4 mt-15 p-2 md:p-4 bg-white sm:rounded-xl rounded-md drop-shadow-lg mb-8 md:mb-8">
        <CardTitle title="Find Employee Attendance" />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="flex md:justify-end justify-between gap-2">
            <div className="text-start">
              <p className="mb-2 text-xs md:text-sm">Date</p>
              <DesktopDatePicker
                className="md:w-52 w-18"
                value={dayjs(monthFormat)}
                slotProps={{ textField: { size: "small" } }}
              />
            </div>
            <div className="text-start ">
              <p className="mb-2 text-xs md:text-sm">Department</p>
              <FormControl>
                <Select
                  className="h-10 sm:w-52 w-18"
                  value={department}
                  onChange={handleDepartmentChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem className="w-full" value="">
                    <p className="md:w-52 text-xs md:text-md max-w-xs">
                      Select Department
                    </p>
                  </MenuItem>

                  <MenuItem className="w-full" value="Medical">
                    <p className="md:w-52  text-xs md:text-md">Medical</p>
                  </MenuItem>

                  <MenuItem className="w-full" value="Emergency">
                    <p className="text-sm  text-xs ">Emergency</p>
                  </MenuItem>

                  <MenuItem className="w-full" value="Administrative">
                    <p className="text-sm  text-xs">Administrative</p>
                  </MenuItem>

                  <MenuItem className="w-full" value="Specialized">
                    <p className="text-sm  text-xs">Specialized</p>
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="flex gap-1">
              <button
                className="mt-8 h-8 md:w-8 w-8"
                style={{
                  backgroundColor: currentColor, // Color for "Download"
                  color: "white",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "20%",
                  textDecoration: "none"
                }}
              >
                <AiOutlineSearch title="Find" />
              </button>
              <button
                className="mt-8 h-8 md:w-8 w-8"
                style={{
                  backgroundColor: "#DE3163", // Color for "Download"
                  color: "white",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "20%",
                  textDecoration: "none"
                }}
              >
                <RiDeleteBin2Line title="Reset" />
              </button>
            </div>
          </div>
        </LocalizationProvider>
      </div>

      <div className=" md:m-4 mt-15 p-2 md:p-4 bg-white sm:rounded-xl rounded-md drop-shadow-2xl ">
        <div className="md:flex justify-center m-0 gap-6  md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 mb-4 pt-9 rounded-md drop-shadow-md min-w-[23%] max-w-[100%]">
            <div className="flex items-center justify-between mb-4">
              <CardTitle title="Applied" />
              <CreateButton title="Create" />
            </div>
            <Divider />
            <div />
          </div>
          <div className=" bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 mb-4 pt-9 rounded-md drop-shadow-md min-w-[23%] max-w-[100%]">
            <div className="flex items-center justify-between mb-4">
              <CardTitle title="Interview" />
              <CreateButton title="Create" />
            </div>
            <Divider />
            <div />
          </div>
          <div className=" bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 mb-4 pt-9 rounded-md drop-shadow-md min-w-[23%] max-w-[100%]">
            <div className="flex items-center justify-between mb-4">
              <CardTitle title="Hired" />
              <CreateButton title="Create" />
            </div>
            <Divider />
            <div />
          </div>
          <div className=" bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 mb-4 pt-9 rounded-md drop-shadow-md min-w-[23%] max-w-[100%]">
            <div className="flex items-center justify-between mb-4">
              <CardTitle title="Rejected" />
              <CreateButton title="Create" />
            </div>
            <Divider />
            <div />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobApplication;

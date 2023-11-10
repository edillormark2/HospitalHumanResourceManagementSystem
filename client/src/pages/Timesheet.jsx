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
import EditEmployeeAB from "../components/EmployeesComponents/EditEmployeeAB";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const Timesheet = ({ EmployeeID }) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const monthFormat = dayjs().format("MM/DD/YYYY");
  const yearFormat = dayjs().format("YYYY");
  const [department, setDepartment] = useState("");
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [EmployeeSalary, setEmployeeData] = useState([
    {
      EmployeeID: 10001,
      name: "Daniel Mark",
      workingHours: "9:00AM - 6:00PM",
      date: "Nov 6, 2023",
      Status: "Present",
      clockIn: "9:00AM",
      clockOut: "7:00PM",
      shift: "Morning",
      late: "00:00:00",
      earlyLiving: "00:00:00",
      overtime: "01:00:00",
      StatusBg: "#2ECC71"
    },
    {
      EmployeeID: 10002,
      name: "Mickey Sano",
      date: "Nov 6, 2023",
      workingHours: "9:00AM - 6:00PM",
      Status: "Present",
      clockIn: "9:00AM",
      clockOut: "6:30PM",
      shift: "Morning",
      late: "00:30:00",
      earlyLiving: "00:00:00",
      overtime: "00:00:00",
      StatusBg: "#2ECC71",
      StatusBg: "#2ECC71"
    },
    {
      EmployeeID: 10003,
      name: "Emman Satoru",
      workingHours: "9:00AM - 6:00PM",
      date: "Nov 6, 2023",
      Status: "Present",
      clockIn: "9:00AM",
      clockOut: "6:00PM",
      shift: "Morning",
      late: "00:00:00",
      earlyLiving: "00:00:00",
      overtime: "00:00:00",
      StatusBg: "#2ECC71",
      StatusBg: "#2ECC71"
    },
    {
      EmployeeID: 10004,
      name: "Mishy Gonzaga",
      workingHours: "6:00PM - 3:00AM",
      date: "Nov 6, 2023",
      Status: "Present",
      clockIn: "6:00PM",
      clockOut: "3:00AM",
      shift: "Night",
      late: "00:00:00",
      earlyLiving: "00:00:00",
      overtime: "00:00:00",
      StatusBg: "#2ECC71"
    },
    {
      EmployeeID: 10005,
      name: "Alex Johnson",
      workingHours: "9:00AM - 6:00PM",
      date: "Nov 6, 2023",
      Status: "Absent",
      clockIn: "0:00AM",
      clockOut: "0:00PM",
      shift: "Morning",
      late: "00:00:00",
      earlyLiving: "00:00:00",
      overtime: "00:00:00",
      StatusBg: "#DE3163"
    },
    {
      EmployeeID: 10006,
      name: "Ella Smith",
      workingHours: "6:00PM - 3:00AM",
      date: "Nov 6, 2023",
      Status: "Rresent",
      clockIn: "6:00PM",
      clockOut: "3:00AM",
      shift: "Night",
      late: "00:00:00",
      earlyLiving: "00:00:00",
      overtime: "00:00:00",
      StatusBg: "#2ECC71"
    },
    {
      EmployeeID: 10007,
      name: "Sophia Lee",
      workingHours: "6:00PM - 3:00AM",
      date: "Nov 6, 2023",
      Status: "Present",
      clockIn: "6:00PM",
      clockOut: "3:00AM",
      shift: "Night",
      late: "00:00:00",
      earlyLiving: "00:00:00",
      overtime: "00:00:00",
      StatusBg: "#2ECC71"
    },
    {
      EmployeeID: 10008,
      name: "John Doe",
      workingHours: "6:00PM - 3:00AM",
      date: "Nov 6, 2023",
      Status: "Present",
      clockIn: "6:00PM",
      clockOut: "3:00AM",
      shift: "Night",
      late: "00:00:00",
      earlyLiving: "00:00:00",
      overtime: "00:00:00",
      StatusBg: "#2ECC71"
    },
    {
      EmployeeID: 10009,
      name: "Sarah Wilson",
      workingHours: "9:00AM - 6:00PM",
      date: "Nov 6, 2023",
      Status: "Absent",
      clockIn: "0:00AM",
      clockOut: "0:00PM",
      shift: "Morning",
      late: "00:00:00",
      earlyLiving: "00:00:00",
      overtime: "00:00:00",
      StatusBg: "#DE3163"
    }
  ]);
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
    { to: "/timesheet", label: "Timesheet" }
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

  // Define the grid columns directly in the component

  const columns = [
    {
      field: "name",
      headerText: "Employee",
      width: "125",
      textAlign: "Left"
    },
    {
      field: "workingHours",
      headerText: "Working Hours",
      width: "135",
      textAlign: "Left"
    },
    {
      field: "date",
      headerText: "Date",
      width: "110",
      textAlign: "Left"
    },
    {
      field: "status",
      headerText: "Status",
      width: "100",
      textAlign: "Left",
      template: employeeGridStatus
    },
    {
      field: "clockIn",
      headerText: "Clock In",
      width: "100",
      textAlign: "Center"
    },
    {
      field: "clockOut",
      headerText: "Clock Out",
      width: "110",
      textAlign: "Left"
    },
    {
      field: "shift",
      headerText: "Shift",
      width: "100",
      textAlign: "Left"
    },
    {
      field: "late",
      headerText: "Late",
      width: "100",
      textAlign: "Left"
    },
    {
      field: "earlyLiving",
      headerText: "Early Living",
      width: "120",
      textAlign: "Left"
    },
    {
      field: "overtime",
      headerText: "Overtime",
      width: "100",
      textAlign: "Left"
    },
    {
      field: "Action",
      headerText: "Action",
      width: "125",
      textAlign: "Center",
      template: props =>
        <div className="flex justify-center gap-1">
          <button
            onClick={() => {
              handleOpenTimesheet(props.EmployeeID); // Pass the EmployeeID to the handler
            }}
            style={{
              backgroundColor: "#03C9D7",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "28px", // Set a fixed width
              height: "28px", // Set a fixed height
              border: "none",
              cursor: "pointer",
              borderRadius: "30%", // To make it a circle
              textDecoration: "none"
            }}
          >
            <AiOutlineEdit
              title="Edit"
              style={{
                color: "white",
                fontSize: "18px"
              }}
            />
          </button>
          <button
            onClick={() => {
              handleDeletePopup(props.EmployeeID); // Pass the EmployeeID to the handler
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "28px", // Set a fixed width
              height: "28px", // Set a fixed height
              border: "none",
              cursor: "pointer",
              borderRadius: "30%", // To make it a circle
              textDecoration: "none",
              backgroundColor: "#DE3163"
            }}
          >
            <AiOutlineDelete
              title="Delete"
              style={{
                color: "white",
                fontSize: "18px"
              }}
            />
          </button>
        </div>
    }
  ];

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
            Manage Timesheet
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
                <BiSolidFileImport title="Import" />
              </button>
            </div>
          </div>
        </LocalizationProvider>
      </div>

      <div className=" md:m-4 mt-15 p-2 md:p-4 bg-white sm:rounded-xl rounded-md drop-shadow-2xl ">
        <DeleteLeavePopup
          openDeletePopup={openDeletePopup}
          setOpenDeletePopup={setOpenDeletePopup}
          EmployeeID={selectedEmployeeID}
        />
        <TimesheetPopup
          openPopup={openTimesheetPopup}
          setOpenPopup={handleCloseTimesheetPopup}
          EmployeeID={selectedEmployeeID} // Pass the EmployeeID to the popup
        />
        <GridComponent
          dataSource={EmployeeSalary} // Use the fetched employee data
          allowPaging={true}
          pageSettings={{ pageSize: pageSize }}
          allowSorting={true}
          toolbar={[
            "Search",
            {
              text: "",
              template: template
            }
          ]}
          width="auto"
        >
          <ColumnsDirective>
            {columns.map((item, index) =>
              <ColumnDirective key={index} {...item} />
            )}
          </ColumnsDirective>
          <Inject services={[Page, Search, Toolbar, Selection, Sort]} />
        </GridComponent>
      </div>
    </div>
  );
};

export default Timesheet;

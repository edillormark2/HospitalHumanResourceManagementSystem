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
import Breadcrumbs from "../../components/Breadcrumbs";
import { useStateContext } from "../../contexts/ContextProvider";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import DeleteLeavePopup from "../../components/LeaveComponents/DeleteLeavePopup";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AiOutlineSearch, AiOutlineEye } from "react-icons/ai";
import { RiDeleteBin2Line } from "react-icons/ri";
import { GoPersonAdd } from "react-icons/go";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import ProgressBar from "../../components/TrainingComponents/ProgressBar";
import EditTrainingPopup from "../../components/TrainingComponents/EditTrainingPopup";
import CreateTrainingPopup from "../../components/TrainingComponents/CreateTrainingPopup";

const TrainingList = ({ EmployeeID }) => {
  const currentDate = new Date();
  const monthFormat = dayjs().format("MM/DD/YYYY");
  const [department, setDepartment] = useState("");
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [EmployeeTraining, setEmployeeTraining] = useState([
    {
      EmployeeID: 10001,
      name: "Daniel Mark",
      department: "Medical",
      trainingType: "Job Training",
      Status: "In Progress",
      trainer: "Doc. Wilson",
      trainingDuration: "Sep 20, 2023 to Nov 20, 2023",
      materials: "Anatomy & Physiology, Medical-Surgical Nursing",
      progress: "70%",
      StatusBg: "#2ECC71"
    },
    {
      EmployeeID: 10002,
      name: "Mickey Sano",
      department: "Medical",
      trainingType: "Job Training",
      Status: "In Progress",
      trainer: "Doc. Wilson",
      trainingDuration: "Sep 20, 2023 to Nov 20, 2023",
      materials: "Clinical Guidelines and Protocols",
      progress: "90%",
      StatusBg: "#2ECC71"
    },
    {
      EmployeeID: 10003,
      name: "Emman Satoru",
      department: "Medical",
      trainingType: "Job Training",
      Status: "In Progress",
      trainer: "Doc. Wilson",
      trainingDuration: "Sep 20, 2023 to Nov 20, 2023",
      materials: "Clinical Guidelines and Protocols",
      progress: "15%",
      StatusBg: "#2ECC71"
    },
    {
      EmployeeID: 10004,
      name: "Mishy Gonzaga",
      department: "Medical",
      trainingType: "Job Training",
      Status: "In Progress",
      trainer: "Doc. Wilson",
      trainingDuration: "Sep 20, 2023 to Nov 20, 2023",
      materials: "Clinical Guidelines and Protocols",
      progress: "50%",
      StatusBg: "#2ECC71"
    },
    {
      EmployeeID: 10005,
      name: "Alex Johnson",
      department: "Medical",
      trainingType: "Job Training",
      Status: "Not Started",
      trainer: "Doc. Wilson",
      trainingDuration: "Sep 20, 2023 to Nov 20, 2023",
      materials: "Clinical Guidelines and Protocols",
      progress: "0%",
      StatusBg: "#DE3163"
    }
  ]);
  const { currentColor, currentMode } = useStateContext();
  const [selectedEmployeeID, setSelectedEmployeeID] = useState(null);
  const [openEditTrainingPopup, setOpenEditTrainingPopup] = useState(false);
  const [openCreateTrainingPopup, setOpenCreateTrainingPopup] = useState(false);

  const handleDeletePopup = EmployeeID => {
    setSelectedEmployeeID(EmployeeID);
    setOpenDeletePopup(true);
  };

  const breadcrumbLinks = [
    { to: "/dashboard", label: "Home" },
    { to: "/training list", label: "Training List" }
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

  const handleOpenEditTraining = EmployeeID => {
    setSelectedEmployeeID(EmployeeID);
    setOpenEditTrainingPopup(true);
  };

  const handleCloseEditTrainingPopup = () => {
    setOpenEditTrainingPopup(false);
  };

  const handleOpenCreateTrainingPopup = EmployeeID => {
    setSelectedEmployeeID(EmployeeID);
    setOpenCreateTrainingPopup(true);
  };
  const handleCloseCreateTrainingPopup = () => {
    setOpenCreateTrainingPopup(false);
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
      field: "department",
      headerText: "Department",
      width: "120",
      textAlign: "Left"
    },
    {
      field: "trainingType",
      headerText: "Training Type",
      width: "130",
      textAlign: "Left"
    },
    {
      field: "trainer",
      headerText: "Trainer",
      width: "100",
      textAlign: "Center"
    },
    {
      field: "trainingDuration",
      headerText: "Training Duration",
      width: "175",
      textAlign: "Center"
    },
    {
      field: "materials",
      headerText: "Learning Materials",
      width: "165",
      textAlign: "Center"
    },
    {
      field: "progress",
      headerText: "Training Progress",
      width: "175",
      textAlign: "Center",
      template: props =>
        <ProgressBar
          progress={props.progress}
          controllable={false}
          background="#E5E8E8"
        />
    },
    {
      field: "progress",
      headerText: "Status",
      width: "120",
      textAlign: "Center",
      template: employeeGridStatus
    },
    {
      field: "Action",
      headerText: "Action",
      width: "125",
      textAlign: "Center",
      template: props =>
        <div className="flex justify-center gap-1">
          <button
            style={{
              backgroundColor: "#F39C12",
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
            <AiOutlineEye
              title="View"
              style={{
                color: "white",
                fontSize: "18px"
              }}
            />
          </button>
          <button
            onClick={() => {
              handleOpenEditTraining(props.EmployeeID); // Pass the EmployeeID to the handler
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
            Manage Training
          </p>
          <Breadcrumbs links={breadcrumbLinks} />
        </div>
      </div>
      <div className="md:m-4 mt-15 p-2 md:p-4 bg-white sm:rounded-xl rounded-md drop-shadow-lg mb-8 md:mb-8">
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
                  className="h-10 sm:w-56 w-18"
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
                onClick={() => {
                  handleOpenCreateTrainingPopup(); // Pass the EmployeeID to the handler
                }}
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
                <GoPersonAdd title="Create" />
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
        <EditTrainingPopup
          openPopup={openEditTrainingPopup}
          setOpenPopup={handleCloseEditTrainingPopup}
          EmployeeID={selectedEmployeeID} // Pass the EmployeeID to the popup
        />
        <CreateTrainingPopup
          openPopup={openCreateTrainingPopup}
          setOpenPopup={handleCloseCreateTrainingPopup}
          EmployeeID={selectedEmployeeID} // Pass the EmployeeID to the popup
        />
        <GridComponent
          dataSource={EmployeeTraining} // Use the fetched employee data
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

export default TrainingList;

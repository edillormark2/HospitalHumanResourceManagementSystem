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
import DeleteLeavePopup from "../components/LeaveComponents/DeleteLeavePopup";
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
import ProgressBar from "../components/TrainingComponents/ProgressBar";
import EditTrainingPopup from "../components/TrainingComponents/EditTrainingPopup";
import CreateTrainingPopup from "../components/TrainingComponents/CreateTrainingPopup";
import { Stacked, Pie, Button, LineChart, SparkLine } from "../components";
import { FaCheck } from "react-icons/fa";
import { MdOutlinePending, MdNotInterested } from "react-icons/md";
import { RiOpenArmLine } from "react-icons/ri";
import { IoIosList, IoMdCheckmark } from "react-icons/io";
import CardTitle from "../components/CardTitle";
import ActionLeavePopup from "../components/LeaveComponents/ActionLeavePopup";
import ViewClaims from "../components/ClaimsComponent/ViewClaims";

const ManageList = ({ EmployeeID }) => {
  const currentDate = new Date();
  const monthFormat = dayjs().format("MM/DD/YYYY");
  const [department, setDepartment] = useState("");
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const earningData = [
    {
      icon: <IoMdCheckmark />,
      amount: 10,
      title: "Approved Claims",
      iconColor: "rgb(255, 244, 229)",
      iconBg: "#2ECC71",
      pcColor: "red-600"
    },
    {
      icon: <MdNotInterested />,
      amount: 1,
      title: " Rejected Claims",
      iconColor: "rgb(255, 244, 229)",
      iconBg: "#DE3163",
      pcColor: "green-600"
    },
    {
      icon: <MdOutlinePending />,
      amount: 13,
      title: " Pending Claims",
      iconColor: "rgb(255, 244, 229)",
      iconBg: "rgb(254, 201, 15)",
      pcColor: "green-600"
    },
    {
      icon: <IoIosList />,
      amount: 23,
      title: "Total Claims",
      iconColor: "rgb(255, 244, 229)",
      iconBg: "#03C9D7",
      pcColor: "red-600"
    }
  ];

  const ecomPieChartData = [
    { x: "Approved", y: 10, text: "10" },
    { x: "Reject", y: 3, text: "1" },
    { x: "Pending", y: 13, text: "13" },
    { x: "Total", y: 23, text: "23" }
  ];

  const [EmployeeTraining, setEmployeeTraining] = useState([
    {
      EmployeeID: 10001,
      claimID: "CLM001",
      name: "Daniel Mark",
      department: "Medical",
      claimDate: "Nov 10, 2023",
      expenseType: "Travel",
      description: "Conference",
      amount: "₱ 100,000",
      Status: "Approved",
      StatusBg: "#2ECC71"
    },
    {
      EmployeeID: 10002,
      claimID: "CLM002",
      name: "Mickey Sano",
      department: "Medical",
      claimDate: "Nov 20, 2023",
      expenseType: "Training",
      description: "Certification Course",
      amount: "₱ 68,000",
      Status: "Pending",
      StatusBg: "#F39C12"
    },
    {
      EmployeeID: 10003,
      claimID: "CLM003",
      name: "Emman Satoru",
      department: "Medical",
      claimDate: "Oct 12, 2023",
      expenseType: "Supplies",
      description: "Emergency Kits",
      amount: "₱ 26,000",
      Status: "Approved",
      StatusBg: "#2ECC71"
    },
    {
      EmployeeID: 10004,
      claimID: "CLM004",
      name: "Mishy Gonzaga",
      department: "Medical",
      claimDate: "Nov 10, 2023",
      expenseType: "Training",
      description: "Software Workshop",
      amount: "₱ 19,000",
      Status: "Approved",
      StatusBg: "#2ECC71"
    },
    {
      EmployeeID: 10005,
      claimID: "CLM005",
      name: "Alex Johnson",
      department: "Medical",
      claimDate: "Feb 03, 2023",
      expenseType: "Equipment",
      description: "MRI Machine",
      amount: "₱ 31,000",
      Status: "Rejected",
      StatusBg: "#DE3163"
    }
  ]);
  const { currentColor, currentMode } = useStateContext();
  const [selectedEmployeeID, setSelectedEmployeeID] = useState(null);
  const [openEditTrainingPopup, setOpenEditTrainingPopup] = useState(false);
  const [openCreateTrainingPopup, setOpenCreateTrainingPopup] = useState(false);
  const [openViewPopup, setOpenViewPopup] = useState(false);

  const handleDeletePopup = EmployeeID => {
    setSelectedEmployeeID(EmployeeID);
    setOpenDeletePopup(true);
  };

  const breadcrumbLinks = [
    { to: "/dashboard", label: "Home" },
    { to: "/manage claims", label: "Manage Claims" }
  ];

  const pageSizes = [9, 20, 50];
  const [pageSize, setPageSize] = useState(9);

  const handlePageSizeChange = e => {
    setPageSize(e.value);
  };

  const handleOpenView = EmployeeID => {
    setSelectedEmployeeID(EmployeeID); // Set the selected employee ID
    setOpenViewPopup(true);
  };
  const handleClosePopup = () => {
    setOpenViewPopup(false);
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
      field: "claimID",
      headerText: "Claim ID",
      width: "100",
      textAlign: "left"
    },
    {
      field: "name",
      headerText: "Employee",
      width: "125",
      textAlign: "Center"
    },
    {
      field: "department",
      headerText: "Department",
      width: "120",
      textAlign: "Left"
    },
    {
      field: "claimDate",
      headerText: "Claim Date",
      width: "120",
      textAlign: "Left"
    },
    {
      field: "expenseType",
      headerText: "Expense Type",
      width: "120",
      textAlign: "Center"
    },
    {
      field: "description",
      headerText: "Description",
      width: "175",
      textAlign: "Center"
    },
    {
      field: "amount",
      headerText: "Amount",
      width: "165",
      textAlign: "Center"
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
            onClick={() => {
              handleOpenView(props.EmployeeID); // Pass the EmployeeID to the handler
            }}
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
      <div className="mb-5 flex justify-between items-start">
        <div>
          <p className="text-md text-gray-400">Pages</p>
          <p className="text-2xl font-extrabold tracking-tight text-slate-900 mb-2 dark:text-gray-200">
            Manage Claims & Reimbursement
          </p>
          <Breadcrumbs links={breadcrumbLinks} className="flex" />
        </div>
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
          <GoPersonAdd title="Create" />
        </button>
      </div>

      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
        <div className="flex m-1 flex-wrap justify-center gap-2 items-center drop-shadow-md">
          {earningData.map(item =>
            <div
              key={item.title}
              className="bg-white h-56 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-40  p-4 pt-9 rounded-2xl "
            >
              <button
                type="button"
                style={{
                  color: item.iconColor,
                  backgroundColor: item.iconBg
                }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">
                  {item.amount}
                </span>
              </p>
              <p className="text-sm text-gray-400  mt-1">
                {item.title}
              </p>
            </div>
          )}
        </div>
        <div className="bg-white h-56 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-96  m-3 p-4 drop-shadow-md rounded-2xl">
          <CardTitle title="Claims By Status" />

          <div className="flex">
            <div className="w-96">
              <Pie
                id="pie-chart"
                data={ecomPieChartData}
                legendVisiblity={true}
                height="150px"
                style={{ width: "20px" }}
              />
            </div>
          </div>
        </div>
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
        <ViewClaims
          openPopup={openViewPopup}
          setOpenPopup={handleClosePopup}
          EmployeeID={selectedEmployeeID} // Pass the selectedEmployeeID to the popup
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

export default ManageList;

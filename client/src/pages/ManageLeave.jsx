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
  Sort,
} from "@syncfusion/ej2-react-grids";
import Popup from "../components/CreateLeavePopup";
import Breadcrumbs from "../components/Breadcrumbs";
import { FiPlus } from "react-icons/fi";
import { useStateContext } from "../contexts/ContextProvider";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsPlay } from "react-icons/bs";
import ActionPopup from "../components/ActionLeavePopup";
import DeleteLeavePopup from "../components/DeleteLeavePopup";
import EditLeavePopup from "../components/EditLeavePopup";

const ManageLeave = ({ EmployeeID }) => {
  const { currentColor, currentMode } = useStateContext();
  const [openPopup, setOpenPopup] = useState(false);
  const [employeesLeaveData, setEmployeeData] = useState([]); // State to store employee data
  const [openViewPopup, setOpenViewPopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [selectedEmployeeID, setSelectedEmployeeID] = useState(null);
  const [openEditPopup, setOpenEditPopup] = useState(false);

  const handleOpenView = (EmployeeID) => {
    setSelectedEmployeeID(EmployeeID); // Set the selected employee ID
    setOpenViewPopup(true);
  };

  const handleOpenEdit = (EmployeeID) => {
    setSelectedEmployeeID(EmployeeID);
    setOpenEditPopup(true);
  };

  const handleDeletePopup = (EmployeeID) => {
    setSelectedEmployeeID(EmployeeID);
    setOpenDeletePopup(true);
  };

  const handleOpenAdd = () => {
    setOpenPopup(true);
  };

  const breadcrumbLinks = [
    { to: "/dashboard", label: "Home" },
    { to: "/manage leave", label: "Manage Leave" },
  ];

  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/employeeLeaves");
      setEmployeeData(response.data);
    } catch (error) {
      console.error("Error fetching employee data: ", error);
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const pageSizes = [9, 20, 50];
  const [pageSize, setPageSize] = useState(9);

  const handlePageSizeChange = (e) => {
    setPageSize(e.value);
  };

  const handleLeaveCreated = () => {
    // Callback function to refresh leave data after creating a leave
    fetchEmployeeData();
  };

  const template = () => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <DropDownListComponent
        dataSource={pageSizes}
        index={pageSizes.indexOf(pageSize)}
        change={handlePageSizeChange}
        style={{ width: "20px", marginLeft: "20px" }} // Adjust the width as needed
      />
      <span style={{ marginLeft: "10px" }}>Entries per page</span>
    </div>
  );

  const employeeGridStatus = (props) => (
    <button
      type="button"
      style={{ background: props.StatusBg, cursor: "text" }}
      className="text-white py-1 px-2 w-20 capitalize rounded-2xl text-md"
    >
      {props.Status}
    </button>
  );

  const handleCloseEditPopup = () => {
    setOpenEditPopup(false);
  };
  const handleClosePopup = () => {
    setOpenViewPopup(false);
  };

  // Define the grid columns directly in the component
  const columns = [
    {
      field: "Name",
      headerText: "Name",
      width: "140",
      textAlign: "Left",
    },
    {
      field: "LeaveType",
      headerText: "Leave Type",
      width: "140",
      textAlign: "Center",
    },
    {
      field: "AppliedOn",
      headerText: "Applied On",
      width: "120",
      textAlign: "Center",
    },
    {
      field: "StartDate",
      headerText: "Start Date",
      width: "120",
      textAlign: "Center",
    },
    {
      field: "EndDate",
      headerText: "End Date",
      width: "135",
      format: "yMd",
      textAlign: "Center",
    },
    {
      field: "TotalDays",
      headerText: "Total Days",
      width: "115",
      textAlign: "Center",
    },
    {
      field: "LeaveReason",
      headerText: "Leave Reason",
      width: "170",
      textAlign: "Center",
    },
    {
      field: "Status",
      headerText: "Status",
      width: "123",
      textAlign: "Center",
      template: employeeGridStatus,
    },
    {
      field: "Action",
      headerText: "Action",
      width: "130",
      textAlign: "Center",
      template: (props) => (
        <div className="flex justify-center gap-1">
          <button
            onClick={() => {
              handleOpenView(props.EmployeeID); // Pass the EmployeeID to the handler
            }}
            style={{
              backgroundColor: "#2ECC71",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "28px", // Set a fixed width
              height: "28px", // Set a fixed height
              border: "none",
              cursor: "pointer",
              borderRadius: "30%", // To make it a circle
              textDecoration: "none",
            }}
          >
            <BsPlay
              title="View"
              style={{
                color: "white",
                fontSize: "18px", // You can adjust the size as needed
              }}
            />
          </button>
          <button
            onClick={() => {
              handleOpenEdit(props.EmployeeID); // Pass the EmployeeID to the handler
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
              textDecoration: "none",
            }}
          >
            <AiOutlineEdit
              title="Edit"
              style={{
                color: "white",
                fontSize: "18px",
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
              backgroundColor: "#DE3163",
            }}
          >
            <AiOutlineDelete
              title="Delete"
              style={{
                color: "white",
                fontSize: "18px",
              }}
            />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="m-2 sm:mx-4 md:m-6 mt-24 p-2 md:p-6 bg-white sm:rounded-3xl rounded-md drop-shadow-2xl">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="mb-5">
          <p className="text-lg text-gray-400">Pages</p>
          <p className="text-2xl font-extrabold tracking-tight text-slate-900 mb-2">
            Manage Leave
          </p>
          <Breadcrumbs links={breadcrumbLinks} />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            className={`text-lg p-3 hover:drop-shadow-lg`}
            style={{
              color: "white",
              backgroundColor: currentColor,
              borderRadius: "10px",
              padding: "8px 16px",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              transition: "box-shadow 0.3s", // Added transition for smooth hover effect
              // Apply drop shadow on hover
              ":hover": {
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
              },
            }}
            title="Create"
            onClick={handleOpenAdd}
          >
            <FiPlus style={{ color: "white" }} />
          </button>
          <Popup
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
            onLeaveCreated={handleLeaveCreated}
          ></Popup>
        </div>
      </div>
      <ActionPopup
        openPopup={openViewPopup}
        setOpenPopup={handleClosePopup}
        EmployeeID={selectedEmployeeID} // Pass the selectedEmployeeID to the popup
        onLeaveCreated={handleLeaveCreated}
      ></ActionPopup>
      <EditLeavePopup
        openPopup={openEditPopup}
        setOpenPopup={handleCloseEditPopup}
        EmployeeID={selectedEmployeeID} // Pass the EmployeeID to the popup
        onLeaveCreated={handleLeaveCreated}
      ></EditLeavePopup>
      <DeleteLeavePopup
        openDeletePopup={openDeletePopup}
        setOpenDeletePopup={setOpenDeletePopup}
        EmployeeID={selectedEmployeeID}
        onLeaveCreated={handleLeaveCreated}
      ></DeleteLeavePopup>
      <GridComponent
        dataSource={employeesLeaveData}
        allowPaging={true}
        pageSettings={{ pageSize: pageSize }}
        allowSorting={true}
        toolbar={[
          "Search",
          {
            text: "",
            template: template,
          },
        ]}
        width="auto"
      >
        <ColumnsDirective>
          {columns.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Search, Toolbar, Selection, Sort]} />
      </GridComponent>
    </div>
  );
};

export default ManageLeave;

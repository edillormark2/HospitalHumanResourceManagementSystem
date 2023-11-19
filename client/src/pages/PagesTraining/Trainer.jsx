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
import Popup from "../../components/LeaveComponents/CreateLeavePopup";
import Breadcrumbs from "../../components/Breadcrumbs";
import { FiPlus } from "react-icons/fi";
import { useStateContext } from "../../contexts/ContextProvider";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import ActionPopup from "../../components/LeaveComponents/ActionLeavePopup";
import DeleteLeavePopup from "../../components/LeaveComponents/DeleteLeavePopup";
import EditLeavePopup from "../../components/LeaveComponents/EditLeavePopup";
import AddTrainerPopup from "../../components/TrainingComponents/AddTrainerPopup";

const Trainer = ({ EmployeeID }) => {
  const { currentColor, currentMode } = useStateContext();
  const [openPopup, setOpenPopup] = useState(false);
  const [employeesLeaveData, setEmployeeData] = useState([]); // State to store employee data
  const [openViewPopup, setOpenViewPopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [selectedEmployeeID, setSelectedEmployeeID] = useState(null);
  const [openEditPopup, setOpenEditPopup] = useState(false);

  const [trainer, setTrainer] = useState([
    {
      EmployeeID: 11001,
      name: "Dr. Samantha Reyes",
      department: "Medical",
      contact: "09123456789",
      email: "samantha01@gmail.com",
      expertise: "Anesthesiology"
    },
    {
      EmployeeID: 11002,
      name: "Professor Alex Johnson",
      department: "Administrative",
      contact: "09489412366",
      email: "alex@gmail.com",
      expertise: "Finance"
    },
    {
      EmployeeID: 11003,
      name: "Sarah Miller, RN",
      department: "Emergency",
      contact: "0968523175",
      email: "miller00@gmail.com",
      expertise: "Nursing"
    },
    {
      EmployeeID: 11004,
      name: "Dr. Emily Chen",
      department: "Medical",
      contact: "09638410919",
      email: "chenchen@gmail.com",
      expertise: "Dermatology"
    },
    {
      EmployeeID: 11005,
      name: "Erwin Smith",
      department: "Emergency",
      contact: "09109192863",
      email: "erwinss@gmail.com",
      expertise: "Medical Technology"
    }
  ]);
  const handleOpenView = EmployeeID => {
    setSelectedEmployeeID(EmployeeID); // Set the selected employee ID
    setOpenViewPopup(true);
  };

  const handleOpenEdit = EmployeeID => {
    setSelectedEmployeeID(EmployeeID);
    setOpenEditPopup(true);
  };

  const handleDeletePopup = EmployeeID => {
    setSelectedEmployeeID(EmployeeID);
    setOpenDeletePopup(true);
  };

  const handleOpenAdd = () => {
    setOpenPopup(true);
  };

  const breadcrumbLinks = [
    { to: "/dashboard", label: "Home" },
    { to: "/trainer", label: "Trainer" }
  ];

  const handleCloseEditPopup = () => {
    setOpenEditPopup(false);
  };
  const handleClosePopup = () => {
    setOpenViewPopup(false);
  };

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

  // Define the grid columns directly in the component
  const columns = [
    {
      field: "name",
      headerText: "Name",
      width: "140",
      textAlign: "Center"
    },
    {
      field: "department",
      headerText: "Department",
      width: "140",
      textAlign: "Center"
    },
    {
      field: "contact",
      headerText: "Contact",
      width: "140",
      textAlign: "Center"
    },
    {
      field: "email",
      headerText: "Email",
      width: "140",
      textAlign: "Center"
    },
    {
      field: "Action",
      headerText: "Action",
      width: "130",
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
                fontSize: "18px" // You can adjust the size as needed
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

  return (
    <div className="m-2 sm:mx-4 md:m-6 mt-24 p-2 md:p-6 bg-white sm:rounded-3xl rounded-md drop-shadow-2xl">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div className="mb-5">
          <p className="text-lg text-gray-400">Pages</p>
          <p className="text-2xl font-extrabold tracking-tight text-slate-900 mb-2">
            Manage Trainer
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
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)"
              }
            }}
            title="Create"
            onClick={handleOpenAdd}
          >
            <FiPlus style={{ color: "white" }} />
          </button>
          <AddTrainerPopup openPopup={openPopup} setOpenPopup={setOpenPopup} />
        </div>
      </div>
      <ActionPopup
        openPopup={openViewPopup}
        setOpenPopup={handleClosePopup}
        EmployeeID={selectedEmployeeID} // Pass the selectedEmployeeID to the popup
      />
      <EditLeavePopup
        openPopup={openEditPopup}
        setOpenPopup={handleCloseEditPopup}
        EmployeeID={selectedEmployeeID} // Pass the EmployeeID to the popup
      />
      <DeleteLeavePopup
        openDeletePopup={openDeletePopup}
        setOpenDeletePopup={setOpenDeletePopup}
        EmployeeID={selectedEmployeeID}
      />
      <GridComponent
        dataSource={trainer}
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
  );
};

export default Trainer;

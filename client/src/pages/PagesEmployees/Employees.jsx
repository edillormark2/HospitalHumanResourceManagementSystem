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
  Edit,
  Selection,
  Sort,
  PageSettingsModel
} from "@syncfusion/ej2-react-grids";
import Breadcrumbs from "../../components/Breadcrumbs";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { useStateContext } from "../../contexts/ContextProvider";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import EditEmployeeAB from "../../components/EmployeesComponents/EditEmployeeAB";
import { AiOutlineDelete } from "react-icons/ai";
import DeletePopup from "../../components/EmployeesComponents/DeletePopup";

const Employees = ({ EmployeeID }) => {
  const { currentColor, currentMode } = useStateContext();
  const [openPopup, setOpenPopup] = useState(false);
  const [employeeData, setEmployeeData] = useState([]); // State to store employee data
  const [selectedEmployeeID, setSelectedEmployeeID] = useState(null);

  const breadcrumbLinks = [
    { to: "/dashboard", label: "Home" },
    { to: "/employees", label: "Employee" }
  ];

  const handleEditClick = id => {
    console.log("Edit clicked for EmployeeID:", id);
  };

  const handleDeletePopup = EmployeeID => {
    setSelectedEmployeeID(EmployeeID);
    setOpenPopup(true);
  };

  const employeesGrid = [
    {
      field: "EmployeeID",
      headerText: "Employee ID",
      width: "125",
      textAlign: "Center"
    },
    {
      field: "Name",
      headerText: "Employee",
      width: "140",
      textAlign: "Center"
    },
    {
      field: "Department",
      headerText: "Department",
      width: "140",
      textAlign: "Center"
    },
    {
      field: "Designation",
      headerText: "Designation",
      width: "120",
      textAlign: "Center"
    },

    {
      field: "HireDate",
      headerText: "Hire Date",
      width: "135",
      format: "yMd",
      textAlign: "Center"
    },

    {
      field: "Action",
      headerText: "Action",
      width: "125",
      textAlign: "Center",
      template: props =>
        <div className="flex justify-center">
          <EditEmployeeAB
            EmployeeID={props.EmployeeID}
            onEditClick={handleEditClick}
          />
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

  const fetchEmployeeData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/employees"); // Replace with your API endpoint
      setEmployeeData(response.data); // Update the employeeData state with the fetched data
    } catch (error) {
      console.error("Error fetching employee data: ", error);
    }
  };

  useEffect(() => {
    fetchEmployeeData(); // Fetch employee data when the component mounts
  }, []);

  const handleLeaveCreated = () => {
    // Callback function to refresh leave data after creating a leave
    fetchEmployeeData();
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
  return (
    <div className="m-2 sm:mx-4 md:m-6 mt-24 p-2 md:p-6 bg-white sm:rounded-3xl rounded-md drop-shadow-2xl">
      {/* Add 'z-index: 1' to ensure the content appears above the sidebar */}
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
            Manage Employee
          </p>
          <Breadcrumbs links={breadcrumbLinks} />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link
            to={`/employees/create-employee`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "5px",
              marginRight: "10px",
              backgroundColor: currentColor,
              border: "none",
              cursor: "pointer",
              borderRadius: "8px",
              textDecoration: "none" // Remove underline for Link
            }}
            className={`text-sm p-3 hover:drop-shadow-lg `}
          >
            <button
              style={{
                borderRadius: "8px",
                padding: "6px 16px",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                color: "white"
              }}
            >
              <FiPlus style={{ marginRight: "5px", color: "white" }} /> Add
              Employee
            </button>
          </Link>
        </div>
      </div>
      <DeletePopup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        EmployeeID={selectedEmployeeID}
        onLeaveCreated={handleLeaveCreated}
      />

      <GridComponent
        dataSource={employeeData}
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
          {employeesGrid.map((item, index) =>
            <ColumnDirective key={index} {...item} />
          )}
        </ColumnsDirective>
        <Inject services={[Page, Search, Toolbar, Selection, Sort]} />
      </GridComponent>
    </div>
  );
};

export default Employees;

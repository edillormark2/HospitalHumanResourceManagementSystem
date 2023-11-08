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
import { AiOutlineEye } from "react-icons/ai";
import ActionPopup from "../../components/LeaveComponents/ActionLeavePopup";
import DeleteLeavePopup from "../../components/LeaveComponents/DeleteLeavePopup";
import EditLeavePopup from "../../components/LeaveComponents/EditLeavePopup";
import ViewEmpSalary from "../../components/PayrollComponents/ViewEmpSalary";
import { EmployeeSalary } from "../../data/dummy";

const SetSalary = ({ EmployeeID }) => {
  const [EmployeeSalary, setEmployeeData] = useState([
    {
      EmployeeID: 10001,
      name: "Daniel Mark",
      payrollType: "Monthly",
      salary: "31,000",
      netSalary: "29,000",
      Action: "View"
    },
    {
      EmployeeID: 10002,
      name: "Mickey Sano",
      payrollType: "Monthly",
      salary: "38,000",
      netSalary: "35,000",
      Action: "View"
    },
    {
      EmployeeID: 10003,
      name: "Emman Satoru",
      payrollType: "Hourly",
      salary: "150",
      netSalary: "33,000"
    },
    {
      EmployeeID: 10004,
      name: "Mishy Gonzaga",
      payrollType: "Monthly",
      salary: "31,000",
      netSalary: "29,000"
    },
    {
      EmployeeID: 10005,
      name: "Alex Johnson",
      payrollType: "Hourly",
      salary: "200",
      netSalary: "35,000"
    },
    {
      EmployeeID: 10006,
      name: "Ella Smith",
      payrollType: "Monthly",
      salary: "40,000",
      netSalary: "37,000"
    },
    {
      EmployeeID: 10007,
      name: "Sophia Lee",
      payrollType: "Monthly",
      salary: "32,000",
      netSalary: "29,500"
    },
    {
      EmployeeID: 10008,
      name: "John Doe",
      payrollType: "Hourly",
      salary: "180",
      netSalary: "29,000"
    },
    {
      EmployeeID: 10009,
      name: "Sarah Wilson",
      payrollType: "Hourly",
      salary: "220",
      netSalary: "38,000"
    }
  ]);
  const { currentColor, currentMode } = useStateContext();
  const [openPopup, setOpenPopup] = useState(false);
  const [openViewPopup, setOpenViewPopup] = useState(false);
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [selectedEmployeeID, setSelectedEmployeeID] = useState(null);
  const [openEditPopup, setOpenEditPopup] = useState(false);

  const handleEditClick = id => {
    console.log("Edit clicked for EmployeeID:", id);
  };

  const breadcrumbLinks = [
    { to: "/dashboard", label: "Home" },
    { to: "/set salary", label: "Set Salary" }
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
      className="text-white py-1 px-2 w-20 capitalize rounded-2xl text-md"
    >
      {props.Status}
    </button>;

  const handleCloseEditPopup = () => {
    setOpenEditPopup(false);
  };
  const handleClosePopup = () => {
    setOpenViewPopup(false);
  };

  // Define the grid columns directly in the component
  const columns = [
    {
      field: "EmployeeID",
      headerText: "Employee ID",
      width: "120",
      textAlign: "Left"
    },
    {
      field: "name",
      headerText: "Name",
      width: "140",
      textAlign: "Left"
    },
    {
      field: "payrollType",
      headerText: "Payroll Type",
      width: "120",
      textAlign: "Center"
    },
    {
      field: "salary",
      headerText: "Salary",
      width: "120",
      textAlign: "Center"
    },
    {
      field: "netSalary",
      headerText: "Net Salary",
      width: "120",
      textAlign: "Center"
    },
    {
      field: "Action",
      headerText: "Action",
      width: "130",
      textAlign: "Center",
      template: props =>
        <div className="flex justify-center gap-1">
          <ViewEmpSalary
            EmployeeID={props.EmployeeID}
            onEditClick={handleEditClick}
          />
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
          <p className="text-md text-gray-400">Pages</p>
          <p className="text-2xl font-extrabold tracking-tight text-slate-900 mb-2">
            Set Salary
          </p>
          <Breadcrumbs links={breadcrumbLinks} />
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
  );
};

export default SetSalary;

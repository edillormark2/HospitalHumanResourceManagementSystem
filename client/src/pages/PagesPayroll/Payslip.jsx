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
import ActionPopup from "../../components/LeaveComponents/ActionLeavePopup";
import DeleteLeavePopup from "../../components/LeaveComponents/DeleteLeavePopup";
import EditLeavePopup from "../../components/LeaveComponents/EditLeavePopup";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import CardTitle from "../../components/CardTitle";
import dayjs from "dayjs";
import PayslipPopup from "../../components/PayrollComponents/PayslipPopup";

const Payslip = ({ EmployeeID }) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const monthFormat = dayjs().format("MM");
  const yearFormat = dayjs().format("YYYY");

  const [EmployeeSalary, setEmployeeData] = useState([
    {
      EmployeeID: 10001,
      name: "Daniel Mark",
      payrollType: "Monthly",
      salary: "31,000",
      netSalary: "29,000",
      Action: "View",
      Status: "Paid",
      StatusBg: "#2ECC71"
    },
    {
      EmployeeID: 10002,
      name: "Mickey Sano",
      payrollType: "Monthly",
      salary: "38,000",
      netSalary: "35,000",
      Action: "View",
      Status: "Paid",
      StatusBg: "#2ECC71"
    },
    {
      EmployeeID: 10003,
      name: "Emman Satoru",
      payrollType: "Hourly",
      salary: "150",
      netSalary: "33,000",
      Status: "Paid",
      StatusBg: "#2ECC71"
    },
    {
      EmployeeID: 10004,
      name: "Mishy Gonzaga",
      payrollType: "Monthly",
      salary: "31,000",
      netSalary: "29,000",
      Status: "Paid",
      StatusBg: "#2ECC71"
    },
    {
      EmployeeID: 10005,
      name: "Alex Johnson",
      payrollType: "Hourly",
      salary: "200",
      netSalary: "35,000",
      Status: "UnPaid",
      StatusBg: "#DE3163"
    },
    {
      EmployeeID: 10006,
      name: "Ella Smith",
      payrollType: "Monthly",
      salary: "40,000",
      netSalary: "37,000",
      Status: "UnPaid",
      StatusBg: "#DE3163"
    },
    {
      EmployeeID: 10007,
      name: "Sophia Lee",
      payrollType: "Monthly",
      salary: "32,000",
      netSalary: "29,500",
      Status: "UnPaid",
      StatusBg: "#DE3163"
    },
    {
      EmployeeID: 10008,
      name: "John Doe",
      payrollType: "Hourly",
      salary: "180",
      netSalary: "29,000",
      Status: "UnPaid",
      StatusBg: "#DE3163"
    },
    {
      EmployeeID: 10009,
      name: "Sarah Wilson",
      payrollType: "Hourly",
      salary: "220",
      netSalary: "38,000",
      Status: "UnPaid",
      StatusBg: "#DE3163"
    }
  ]);
  const { currentColor, currentMode } = useStateContext();
  const [openPayslipPopup, setOpenPayslipPopup] = useState(false);
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
      className="text-white py-1 px-2 w-20 capitalize rounded-xl text-md"
    >
      {props.Status}
    </button>;

  const handleCloseEditPopup = () => {
    setOpenEditPopup(false);
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
      field: "EmployeeID",
      headerText: "Employee ID",
      width: "120",
      textAlign: "Left"
    },
    {
      field: "name",
      headerText: "Name",
      width: "130",
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
      field: "status",
      headerText: "Status",
      width: "100",
      textAlign: "Center",
      template: employeeGridStatus
    },
    {
      field: "Action",
      headerText: "Action",
      width: "265",
      textAlign: "Center",
      template: (props) => (
        <div className="flex justify-start gap-2">
          {props.Status === "Paid" ? (
            <>
              <button
               onClick={() => {
                  handleOpenPayslip(props.EmployeeID); // Pass the EmployeeID to the handler
                }}
                style={{
                  backgroundColor: "#F39C12", // Color for "Payslip"
                  color: "white",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "50px",
                  height: "28px",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "6%",
                  textDecoration: "none",
                }}
              >
                <span className="m-2">Payslip</span>
              </button>
              <button
                style={{
                  backgroundColor: "#DE3163", // Color for "Delete"
                  color: "white",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "45px",
                  height: "28px",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "6%",
                  textDecoration: "none",
                }}
              >
                <span className="m-2">Delete</span>
              </button>
            </>
          ) : (
            <>
             <button
                onClick={() => {
                  handleOpenPayslip(props.EmployeeID); // Pass the EmployeeID to the handler
                }}
                style={{
                  backgroundColor: "#F39C12", // Color for "Payslip"
                  color: "white",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "50px",
                  height: "28px",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "6%",
                  textDecoration: "none",
                }}
              >
                <span className="m-2">Payslip</span>
              </button>
              <button
                style={{
                  backgroundColor: "#2ECC71", 
                  color: "white",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "85px",
                  height: "28px",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "6%",
                  textDecoration: "none",
                }}
              >
                <span className="m-2">Click to Paid</span>
              </button>
              <button
                style={{
                  backgroundColor: "#03C9D7", // Color for "Edit"
                  color: "white",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "35px",
                  height: "28px",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "6%",
                  textDecoration: "none",
                }}
                onClick={() => handleEditClick(props.EmployeeID)}
              >
                <span className="m-2">Edit</span>
              </button>
              <button
                style={{
                  backgroundColor: "#DE3163", // Color for "Delete"
                  color: "white",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "45px",
                  height: "28px",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "6%",
                  textDecoration: "none",
                }}
              >
                <span className="m-2">Delete</span>
              </button>
            </>
          )}
        </div>
      ),
    },
  ];


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
            Payslip
          </p>
          <Breadcrumbs links={breadcrumbLinks} />
        </div>
      </div>
     <div className="md:m-4 mt-15 p-2 md:p-4 bg-white sm:rounded-xl rounded-md drop-shadow-lg mb-8 md:mb-8">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="flex justify-end gap-2">
       <div className="text-start">
        <p className="mb-2 text-xs md:text-sm">Select Month</p>
        <DesktopDatePicker views={['month']} value={dayjs(monthFormat)} slotProps={{ textField: { size: 'small' } }} />
      </div>
      <div className="text-start">
        <p  className="mb-2 text-xs md:text-sm">Select Year</p>
        <DesktopDatePicker views={['year']} value={dayjs(yearFormat)} slotProps={{ textField: { size: 'small' } }} />
      </div>
      <div>
      <button
        type="button"
        style={{
          backgroundColor: currentColor,
          color: "white",
          borderRadius: "10px",
        }}
        className={`sm:text-sm md:h-10 w-32 text-xs p-1 hover:drop-shadow-xl w-22 h-10 mt-7`}
      >
        Generate Payslip
      </button>
      </div>
    </div>
  </LocalizationProvider>
</div>

      <div className=" md:m-4 mt-15 p-2 md:p-4 bg-white sm:rounded-xl rounded-md drop-shadow-2xl ">
      <CardTitle title="Find Employee Payslip" />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="flex justify-end gap-2 mb-8">
       <div className="text-start">
        <DesktopDatePicker views={['month']} value={dayjs(monthFormat)} slotProps={{ textField: { size: 'small' } }} />
      </div>
      <div className="text-start">
        <DesktopDatePicker views={['year']} value={dayjs(yearFormat)} slotProps={{ textField: { size: 'small' } }} />
      </div>
      <div className="flex">
      <button
        type="button"
        style={{
          backgroundColor: currentColor,
          color: "white",
          borderRadius: "10px",
        }}
        className={`sm:text-sm md:p-2 md:h-10 w-16  text-xs p-2 hover:drop-shadow-xl mr-2 w-18 h-10`}
      >
        Export
      </button>
      <button
        type="button"
        style={{
          backgroundColor: currentColor,
          color: "white",
          borderRadius: "10px",
        }}
        className={`sm:text-sm md:h-10 w-28 text-xs p-1 hover:drop-shadow-xl w-22 h-10 `}
      >
        Bulk Payment
      </button>
      </div>
    </div>
  </LocalizationProvider>
      <PayslipPopup
        openPopup={openPayslipPopup}
        setOpenPopup={handleClosePopup}
        EmployeeID={selectedEmployeeID} // Pass the selectedEmployeeID to the popup
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

export default Payslip;

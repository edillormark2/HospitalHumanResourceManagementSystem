import React, { useState, useEffect } from "react";
import SubPageHeader from "../../components/SubPageHeader";
import { useParams } from "react-router-dom";
import { Divider } from "@mui/joy";
import CardTitle from "../../components/CardTitle";
import { useStateContext } from "../../contexts/ContextProvider";
import Breadcrumbs from "../../components/Breadcrumbs";
import axios from "axios"; // Import Axios
import CreateButton from "../../components/CreateButton";
import SalaryPopup from "../../components/PayrollComponents/SalaryPopup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective
} from "@syncfusion/ej2-react-grids";
import EditEmployeeAB from "../../components/EmployeesComponents/EditEmployeeAB";
import { AiOutlineDelete } from "react-icons/ai";
import DeletePopup from "../../components/EmployeesComponents/DeletePopup";

const isMobile = window.innerWidth <= 768 && window.innerHeight <= 1024;

const EmpSetSalary = () => {
  const { currentColor } = useStateContext();
  const { EmployeeID } = useParams();
  const [openPopup, setOpenPopup] = useState(false);
  const [employeeData, setEmployeeData] = useState([]); // State to store employee data

  const breadcrumbLinks = [
    { to: "/dashboard", label: "Home" },
    { to: "/set salary", label: "Set Salary" },
    { to: "/emp-set-salary", label: "Employee Set Salary" }
  ];
  const employeesSalaryData = [
    {
      payslipType: "Monthly Payslip",
      salary: "31,000"
    }
  ];

  const employeesSalaryGrid = [
    {
      field: "payslipType",
      headerText: "Payslip Type",
      width: "125",
      textAlign: "Center"
    },
    {
      field: "salary",
      headerText: "Salary",
      width: "140",
      textAlign: "Center"
    }
  ];
  const employeesAllowanceData = [
    {
      Name: "Daniel Mark",
      allowanceOption: "Non Taxable",
      title: "Food",
      type: "Fixed",
      amount: "500"
    },
    {
      Name: "Daniel Mark",
      allowanceOption: "Non Taxable",
      title: "Transportation",
      type: "Fixed",
      amount: "300"
    }
  ];
  const employeesAllowanceGrid = [
    {
      field: "Name",
      headerText: "Name",
      width: "115",
      textAlign: "Center"
    },
    {
      field: "allowanceOption",
      headerText: "Allowance Option",
      width: "140",
      textAlign: "Center"
    },
    {
      field: "title",
      headerText: "Title",
      width: "125",
      textAlign: "Center"
    },
    {
      field: "type",
      headerText: "Type",
      width: "95",
      textAlign: "Center"
    },
    {
      field: "amount",
      headerText: "Amount",
      width: "95",
      textAlign: "Center"
    },
    {
      field: "Action",
      headerText: "Action",
      width: "125",
      textAlign: "Center",
      template: props =>
        <div className="flex justify-center">
          <EditEmployeeAB EmployeeID={props.EmployeeID} />
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

  const employeesDeductionData = [
    {
      Name: "Daniel Mark",
      deductionOption: "PhilHealth",
      type: "Percentage",
      amount: "2%(200)"
    },
    {
      Name: "Daniel Mark",
      deductionOption: "SSS",
      type: "Fixed",
      amount: "250"
    }
  ];

  const employeesDeductionGrid = [
    {
      field: "Name",
      headerText: "Name",
      width: "115",
      textAlign: "Center"
    },
    {
      field: "deductionOption",
      headerText: "Deduction Option",
      width: "140",
      textAlign: "Center"
    },
    {
      field: "type",
      headerText: "Type",
      width: "110",
      textAlign: "Center"
    },
    {
      field: "amount",
      headerText: "Amount",
      width: "100",
      textAlign: "Center"
    },
    {
      field: "Action",
      headerText: "Action",
      width: "125",
      textAlign: "Center",
      template: props =>
        <div className="flex justify-center">
          <EditEmployeeAB EmployeeID={props.EmployeeID} />
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

  const employeesOvertimeData = [
    {
      Name: "Daniel Mark",
      overtimeTitle: "Holiday",
      numberDays: "3",
      hours: "8",
      rate: "1,800"
    },
    {
      Name: "Daniel Mark",
      overtimeTitle: "Regular",
      numberDays: "1",
      hours: "8",
      rate: "600"
    }
  ];

  const employeesOvertimeGrid = [
    {
      field: "Name",
      headerText: "Name",
      width: "115",
      textAlign: "Center"
    },
    {
      field: "overtimeTitle",
      headerText: "Overtime Title",
      width: "130",
      textAlign: "Center"
    },
    {
      field: "numberDays",
      headerText: "No. of Days",
      width: "100",
      textAlign: "Center"
    },
    {
      field: "hours",
      headerText: "Hours",
      width: "80",
      textAlign: "Center"
    },
    {
      field: "rate",
      headerText: "Rate",
      width: "80",
      textAlign: "Center"
    },
    {
      field: "Action",
      headerText: "Action",
      width: "115",
      textAlign: "Center",
      template: props =>
        <div className="flex justify-center">
          <EditEmployeeAB EmployeeID={props.EmployeeID} />
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

  {
    /*useEffect(
    () => {
      // Fetch employee data based on EmployeeID
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/employees/${EmployeeID}`
          );
          const userData = response.data;
          if (userData) {
            setEmployeeData([userData]);
          }
        } catch (error) {
          toast.error("Error fetching employee data", error, {
            className: isMobile ? "mobile-toast" : "desktop-toast"
          });
        }
      };

      fetchData();
    },
    [EmployeeID]
  );*/
  }

  const handleLeaveCreated = () => {
    // Handle leave creation
  };

  const handleUpdateEmployee = async () => {
    // Update employee
  };

  const handleOpenAdd = () => {
    setOpenPopup(true);
  };
  return (
    <div className="m-2 flex flex-wrap lg:flex-nowrap justify-center ">
      <div className=" md:m-2 mt-24 p-2 md:p-10 sm:rounded-3xl rounded-md min-w-[100%] max-w-[100%] ">
        <SubPageHeader title="Employee Set Salary" />
        <Breadcrumbs links={breadcrumbLinks} />
        <div className="md:flex justify-center m-3 gap-6 ">
          <div className=" bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 mb-4 pt-9 rounded-md drop-shadow-md min-w-[50%] max-w-[100%]">
            <div className="flex items-center justify-between mb-4">
              <CardTitle title="Employee Salary" />
              <CreateButton onClick={handleOpenAdd} title="Create" />
            </div>
            <Divider />
            <div>
              <GridComponent dataSource={employeesSalaryData}>
                <ColumnsDirective>
                  {employeesSalaryGrid.map((item, index) =>
                    <ColumnDirective key={index} {...item} />
                  )}
                </ColumnsDirective>
              </GridComponent>
            </div>
          </div>
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 mb-4 pt-9 rounded-md drop-shadow-md min-w-[50%] max-w-[100%]">
            <div className="flex items-center justify-between mb-4">
              <CardTitle title="Allowance" />
              <CreateButton onClick={handleOpenAdd} title="Create" />
            </div>
            <Divider />
            <div>
              <GridComponent dataSource={employeesAllowanceData}>
                <ColumnsDirective>
                  {employeesAllowanceGrid.map((item, index) =>
                    <ColumnDirective key={index} {...item} />
                  )}
                </ColumnsDirective>
              </GridComponent>
            </div>
          </div>
        </div>
        <div className="md:flex justify-center m-3 gap-6 ">
          <div className=" bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 mb-4 pt-9 rounded-md drop-shadow-md min-w-[50%] max-w-[100%]">
            <div className="flex items-center justify-between mb-4">
              <CardTitle title="Saturation Deduction" />
              <CreateButton onClick={handleOpenAdd} title="Create" />
            </div>
            <Divider />
            <div>
              <GridComponent
                dataSource={employeesDeductionData}
                className="md:w-full"
              >
                <ColumnsDirective>
                  {employeesDeductionGrid.map((item, index) =>
                    <ColumnDirective key={index} {...item} />
                  )}
                </ColumnsDirective>
              </GridComponent>
            </div>
          </div>
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 mb-4 pt-9 rounded-md drop-shadow-md min-w-[50%] max-w-[100%]">
            <div className="flex items-center justify-between mb-4">
              <CardTitle title="Overtime" />
              <CreateButton onClick={handleOpenAdd} title="Create" />
            </div>
            <Divider />
            <div>
              <GridComponent
                dataSource={employeesOvertimeData}
                className="md:w-full"
              >
                <ColumnsDirective>
                  {employeesOvertimeGrid.map((item, index) =>
                    <ColumnDirective key={index} {...item} />
                  )}
                </ColumnsDirective>
              </GridComponent>
            </div>
          </div>
        </div>
        <SalaryPopup
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          onLeaveCreated={handleLeaveCreated}
        />
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            style={{
              backgroundColor: currentColor,
              color: "white",
              borderRadius: "10px",
              width: "150px"
            }}
            className={`text-md p-3 hover:drop-shadow-xl`}
            onClick={handleUpdateEmployee}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmpSetSalary;

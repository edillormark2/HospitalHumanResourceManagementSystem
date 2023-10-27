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

  const employeesSalaryGrid = [
    {
      field: "Name",
      headerText: "Name",
      width: "125",
      textAlign: "Center"
    },
    {
      field: "EmployeeID",
      headerText: "Employee Id",
      width: "140",
      textAlign: "Center"
    }
  ];

  useEffect(
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
  );

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
      <div className=" md:m-6 mt-24 p-2 md:p-10 sm:rounded-3xl rounded-md min-w-[100%] max-w-[100%] ">
        <SubPageHeader title="Employee Set Salary" />
        <Breadcrumbs links={breadcrumbLinks} />
        <div className="flex m-3 flex-wrap justify-center gap-6 items-center drop-shadow-md">
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-md min-w-[45%] max-w-[88%]">
            <div className="flex items-center justify-between mb-4">
              <CardTitle title="Employee Salary" />
              <CreateButton onClick={handleOpenAdd} title="Create" />
            </div>
            <Divider />
            <div>
              <GridComponent dataSource={employeeData}>
                <ColumnsDirective>
                  {employeesSalaryGrid.map((item, index) =>
                    <ColumnDirective key={index} {...item} />
                  )}
                </ColumnsDirective>
              </GridComponent>
            </div>
          </div>
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-md min-w-[45%] max-w-[88%]">
            <div className="flex items-center justify-between mb-4">
              <CardTitle title="Allowance" />
              <CreateButton onClick={handleOpenAdd} title="Create" />
            </div>
            <Divider />
            <div>
              <GridComponent dataSource={employeeData}>
                <ColumnsDirective>
                  {employeesSalaryGrid.map((item, index) =>
                    <ColumnDirective key={index} {...item} />
                  )}
                </ColumnsDirective>
              </GridComponent>
            </div>
          </div>
        </div>
        <div className="flex m-3 flex-wrap justify-center gap-6 items-center drop-shadow-md">
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-md min-w-[45%] max-w-[88%]">
            <div className="flex items-center justify-between mb-4">
              <CardTitle title="Saturation Deduction" />
              <CreateButton onClick={handleOpenAdd} title="Create" />
            </div>
            <Divider />
            <div>
              <GridComponent dataSource={employeeData} className="md:w-full">
                <ColumnsDirective>
                  {employeesSalaryGrid.map((item, index) =>
                    <ColumnDirective key={index} {...item} />
                  )}
                </ColumnsDirective>
              </GridComponent>
            </div>
          </div>
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-md min-w-[45%] max-w-[88%]">
            <div className="flex items-center justify-between mb-4">
              <CardTitle title="Overtime" />
              <CreateButton onClick={handleOpenAdd} title="Create" />
            </div>
            <Divider />
            <div>
              <GridComponent dataSource={employeeData} className="md:w-full">
                <ColumnsDirective>
                  {employeesSalaryGrid.map((item, index) =>
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

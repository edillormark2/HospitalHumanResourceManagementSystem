import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ModalClose from "@mui/joy/ModalClose";
import CardTitle from "../CardTitle";
import Divider from "@mui/material/Divider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaDownload } from "react-icons/fa";
import { BsFillSendFill } from "react-icons/bs";
import { useStateContext } from "../../contexts/ContextProvider";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective
} from "@syncfusion/ej2-react-grids";

const PayslipPopup = props => {
  const isMobile = window.innerWidth <= 768 && window.innerHeight <= 1024;
  const { openPopup, setOpenPopup, EmployeeID } = props;
  const { currentColor } = useStateContext();

  const dynamicPopupStyle = {
    position: "absolute",
    top: isMobile ? "50%" : "45%",
    left: "50%",
    width: "min(90%, 750px)", // Adjust the maximum width as needed
    maxHeight: "88vh", // Set a maximum height
    transform: "translate(-50%, -50%)",
    overflowY: "auto", // Add overflow-y to make the modal scrollable
    p: 4
  };

  const earningColumns = [
    {
      field: "earning",
      headerText: "Earning",
      width: "145",
      textAlign: "Left"
    },
    {
      field: "title",
      headerText: "Title",
      width: "150",
      textAlign: "Left"
    },
    {
      field: "type",
      headerText: "Type",
      width: "120",
      textAlign: "Left"
    },
    {
      field: "amount",
      headerText: "Amount",
      width: "120",
      textAlign: "Right"
    }
  ];
  const EmployeeEarning = [
    {
      earning: "Basic Salary",
      title: "-",
      type: "Fixed",
      amount: "31,000"
    },
    {
      earning: "Allowance",
      title: "Food",
      type: "Fixed",
      amount: "500"
    },
    {
      earning: "Allowance",
      title: "Transportation",
      type: "Fixed",
      amount: "300"
    },
    {
      earning: "Overtime",
      title: "Holiday",
      type: "-",
      amount: "1,800"
    },
    {
      earning: "Overtime",
      title: "Regular",
      type: "-",
      amount: "600"
    }
  ];
  const employeeDeduction = [
    {
      deduction: "Saturation Deduction",
      title: "PhilHealth",
      type: "Percentage",
      amount: "2%(620)"
    },
    {
      deduction: "Saturation Deduction",
      title: "SSS",
      type: "Fixed",
      amount: "800"
    }
  ];

  const employeeDeductionGrid = [
    {
      field: "deduction",
      headerText: "Deduction",
      width: "145",
      textAlign: "Left"
    },
    {
      field: "title",
      headerText: "Title",
      width: "150",
      textAlign: "Left"
    },
    {
      field: "type",
      headerText: "Type",
      width: "120",
      textAlign: "Left"
    },
    {
      field: "amount",
      headerText: "Amount",
      width: "120",
      textAlign: "Right"
    }
  ];

  return (
    <div>
      <Modal open={openPopup}>
        <Box
          sx={dynamicPopupStyle}
          style={
            isMobile || window.innerWidth <= window.innerHeight * 2
              ? dynamicPopupStyle
              : null
          }
          className="m-2 md:m-10 mt-10 p-4 md:p-10 bg-white rounded-md"
        >
          <ModalClose variant="outlined" onClick={() => setOpenPopup(false)} />
          <CardTitle title="Employee Payslip" />
          <Divider />
          <div className="flex justify-between m-2 mt-15">
            <div>
              <p className="text-3xl text-bold">HHRMS</p>
            </div>
            <div>
              <button
                className="m-2"
                style={{
                  backgroundColor: currentColor,
                  color: "white",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "30px",
                  height: "28px",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "20%",
                  textDecoration: "none"
                }}
              >
                <FaDownload />
              </button>
              <button
                style={{
                  backgroundColor: "#F39C12", // Color for "Send"
                  color: "white",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "30px",
                  height: "28px",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "20%",
                  textDecoration: "none"
                }}
              >
                <BsFillSendFill />
              </button>
            </div>
          </div>
          <Divider />
          <div className="flex justify-between mt-4 mb-4">
            <div className="text-xs ">
              <p>Name: Daniel Mark</p>
              <p>Position: Anesthesiology, Medical</p>
              <p>Salary Date: Oct 31, 2023</p>
            </div>
            <div className="text-xs text-right">
              <p>Rizal, Philippines</p>
              <p>ACDVS-350942</p>
              <p>Salary Slip: 2023-10</p>
            </div>
          </div>
          <Divider />
          <div className="mt-4 mb-4">
            <GridComponent
              dataSource={EmployeeEarning} // Use the fetched employee data
              width="100%"
            >
              <ColumnsDirective>
                {earningColumns.map((item, index) =>
                  <ColumnDirective key={index} {...item} />
                )}
              </ColumnsDirective>
            </GridComponent>
          </div>

          <div>
            <div className="mb-4">
              <GridComponent dataSource={employeeDeduction}>
                <ColumnsDirective>
                  {employeeDeductionGrid.map((item, index) =>
                    <ColumnDirective key={index} {...item} />
                  )}
                </ColumnsDirective>
              </GridComponent>
            </div>
          </div>
          <Divider />

          <div className="flex justify-end mt-4 mb-4">
            <div className="text-xs text-right">
              <p>Total Earning</p>
              <p>34,200</p>
              <p>Total Deduction</p>
              <p>1,420</p>
              <p>Net Salary</p>
              <p>32,780</p>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default PayslipPopup;

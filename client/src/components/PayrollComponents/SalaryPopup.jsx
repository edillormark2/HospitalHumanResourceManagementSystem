import React, { useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ModalClose from "@mui/joy/ModalClose";
import CardTitle from "../CardTitle";
import { Divider } from "@mui/joy";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "react-toastify/dist/ReactToastify.css";

const salaryOptions = {
  Hourly: ["1000", "800", "500", "300"],
  Monthly: ["35,000", "28,000", "20,000"]
};

const SalaryPopup = props => {
  const { currentColor } = useStateContext();
  const { openPopup, setOpenPopup } = props;
  const [payslipType, setPayslipType] = useState("");
  const [salary, setSalary] = useState("");
  const isMobile = window.innerWidth <= 768 && window.innerHeight <= 1024;

  const handlePayslipChange = event => {
    const selectedPayslip = event.target.value;
    setPayslipType(selectedPayslip);
    setSalary(""); // Reset designation when department changes
  };



  const handleSalaryChange = event => {
    setSalary(event.target.value);
  };
  const handleSubmit = () => {};

  const dynamicPopupStyle = {
    position: "absolute",
    top: isMobile ? "28%" : "20%",
    left: "50%",
    width: "min(80%, 400px)", // Adjust the maximum width as needed (400px in this example)
    height: "min(48%, 400px)", // Adjust the maximum height as needed (300px in this example)
    transform: "translate(-50%, -50%)",
    overflowY: "auto",
    p: 4
  };

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
          <CardTitle title="Employee Salary" />
          <Divider />
          <div className="flex  md:items-center gap-5">
            <div className="mt-2 mt-5 w-full">
              <p className="mb-1 text-sm">Payslip Type*</p>
              <FormControl
                sx={{ width: "100%" }}
                style={{ display: "flex", justifyContent: "start" }}
              >
                <Select
                  value={payslipType}
                  onChange={handlePayslipChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  sx={{ width: "100%" }}
                  style={{ width: "100%" }}
                >
                  <MenuItem value="">
                    <p className="text-gray-400 text-sm">Select Payslip Type</p>
                  </MenuItem>

                  <MenuItem value="Hourly">
                    <p>Hourly Payslip</p>
                  </MenuItem>

                  <MenuItem value="Monthly">
                    <p>Monthly Payslip</p>
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="flex flex-col mt-5 md:flex-row md:items-center gap-5">
            <div className="mt-2 md:mt-0 w-full">
              <p className="mb-1 text-sm">Salary</p>
              <FormControl
                sx={{ width: "100%" }}
                style={{ display: "flex", justifyContent: "start" }}
              >
                <Select
                  className="w-full"
                  value={salary}
                  onChange={handleSalaryChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="" style={{ width: "100%" }}>
                    <p>Select Salary</p>
                  </MenuItem>
                  {salaryOptions[payslipType] &&
                    salaryOptions[payslipType].map((option, index) =>
                      <MenuItem
                        key={index}
                        value={option}
                        style={{ width: "100%" }}
                      >
                        {option}
                      </MenuItem>
                    )}
                </Select>
              </FormControl>
            </div>
          </div>

          <div class="mt-10 flex justify-end items-center gap-3">
            <button
              type="button"
              style={{
                color: "black",
                borderRadius: "10px",
                width: "80px"
              }}
              className={`text-sm p-3  bg-gray-300`}
              onClick={() => setOpenPopup(false)}
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              style={{
                backgroundColor: currentColor,
                color: "white",
                borderRadius: "10px",
                width: "80px"
              }}
              className={`text-sm p-3`}
            >
              Create
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default SalaryPopup;

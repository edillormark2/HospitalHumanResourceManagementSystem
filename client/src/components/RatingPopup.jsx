import React, { useState, useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ModalClose from "@mui/joy/ModalClose";
import CardTitle from "./CardTitle";
import { Divider } from "@mui/joy";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import Textarea from "@mui/joy/Textarea";
import dayjs from "dayjs";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Autocomplete from "@mui/material/Autocomplete";
import StarRating from "./StarRating";

const RatingPopup = props => {
  const { currentColor } = useStateContext();
  const { openPopup, setOpenPopup } = props;
  const currentDate = dayjs();

  const [empid, setID] = useState("");
  const [emname, setName] = useState("");
  const [LeaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalDays, setTotalDays] = useState("");
  const [leaveReason, setLeaveReson] = useState("");
  const [statusLeave, setStatusLeave] = useState("Pending");
  const [remarks, setRemarks] = useState("");
  const [employeeData, setEmployeeData] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedEmployeeID, setSelectedEmployeeID] = useState("");
  const [selectedEmployeeName, setSelectedEmployeeName] = useState("");

  const isMobile = window.innerWidth <= 768 && window.innerHeight <= 1024;

  const handleLeaveChange = event => {
    const selectedLeaveType = event.target.value;
    setLeaveType(selectedLeaveType);
  };

  const handleLeaveReasonChange = event => {
    const value = event.target.value;
    setLeaveReson(value);
  };

  const handleRemarksChange = event => {
    const value = event.target.value;
    setRemarks(value);
  };

  const handleStartDateChange = date => {
    setStartDate(date);
  };

  const handleEndDateChange = date => {
    setEndDate(date);
  };

  useEffect(() => {
    axios.get("http://localhost:3001/employees").then(response => {
      setEmployeeData(response.data);
    });
  }, []);

  const dynamicPopupStyle = {
    position: "absolute",
    top: isMobile ? "48%" : "43%",
    left: "50%",
    width: "min(80%, 600px)", // Adjust the maximum width as needed (600px in this example)
    height: isMobile ? "90vh" : "min(82%, 90vh)", // Adjust the maximum height as needed (1500px in this example)
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
          className="m-2 md:m-10 mt-10 p-4 md:p-10 bg-white rounded-md  "
        >
          <ModalClose variant="outlined" onClick={() => setOpenPopup(false)} />
          <CardTitle title="Add Employee Evaluation" />
          <Divider />
          <div className="flex flex-col mt-5 md:flex-row md:items-center gap-5">
            <div className="mt-5 md:mt-0 md:w-1/2 mb-5">
              <p className="mb-1 text-sm">Employee</p>

              <Autocomplete
                options={employeeData}
                getOptionLabel={option =>
                  option ? `(${option.EmployeeID}) ${option.Name}` : ""}
                value={selectedEmployee}
                onChange={(event, newValue) => {
                  setSelectedEmployee(newValue);
                  if (newValue) {
                    setSelectedEmployeeID(newValue.EmployeeID);
                    setSelectedEmployeeName(newValue.Name);
                  } else {
                    setSelectedEmployeeID("");
                    setSelectedEmployeeName("");
                  }
                }}
                renderInput={params =>
                  <TextField
                    {...params}
                    variant="outlined"
                    fullWidth
                    placeholder="Select Employee"
                  />}
              />
            </div>
            <div className="mt-5 md:mt-0 md:w-1/2 mb-5">
              <p className="mb-1 text-sm">Select Month</p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  views={["month", "year"]}
                  value={currentDate}
                />
              </LocalizationProvider>
            </div>
          </div>
          <p className="text-md mb-2">Organizational Competencies</p>
          <Divider />
          <div className="mt-2 mb-3">
            <div className="flex justify-between ">
              <p className="text-md text-slate-500 ">Leadership</p>
              <StarRating />
            </div>
            <div className="flex justify-between mt-2 mb-5">
              <p className="text-md text-slate-500 ">Project Management</p>
              <StarRating />
            </div>

            <p className="text-md mb-2">Technical Competencies</p>
            <Divider />
            <div className="flex justify-between mt-2 mb-5">
              <p className="text-md text-slate-500 ">Allocating Resources</p>
              <StarRating />
            </div>

            <p className="text-md mb-2">Behavioural Competencies</p>
            <Divider />
            <div className="flex justify-between mt-2">
              <p className="text-md text-slate-500 ">Oral Communication</p>
              <StarRating />
            </div>
            <div className="flex justify-between mt-2">
              <p className="text-md text-slate-500 ">Business Process</p>
              <StarRating />
            </div>
          </div>
          <Divider />
          <div className="mt-8">
            <p className="mb-1 text-md">Feedback</p>
            <Textarea
              className="w-full p-2 border rounded"
              value={remarks}
              onChange={handleRemarksChange}
              minRows={isMobile ? 2 : 3}
            />
          </div>
          <div class="mt-6 flex justify-end items-center gap-3">
            <button
              type="button"
              style={{
                color: "black",
                borderRadius: "10px",
                width: "100px"
              }}
              className={`text-md p-3  bg-gray-300`}
              onClick={() => setOpenPopup(false)}
            >
              Close
            </button>
            <button
              type="button"
              style={{
                backgroundColor: currentColor,
                color: "white",
                borderRadius: "10px",
                width: "100px"
              }}
              className={`text-md p-3`}
            >
              Create
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default RatingPopup;

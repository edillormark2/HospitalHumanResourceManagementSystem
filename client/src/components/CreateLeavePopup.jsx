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

const CreateLeavePopup = (props) => {
  const { currentColor } = useStateContext();
  const { openPopup, setOpenPopup } = props;

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

  const handleLeaveChange = (event) => {
    const selectedLeaveType = event.target.value;
    setLeaveType(selectedLeaveType);
  };

  const handleLeaveReasonChange = (event) => {
    const value = event.target.value;
    setLeaveReson(value);
  };

  const handleRemarksChange = (event) => {
    const value = event.target.value;
    setRemarks(value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const dateFormat0 = dayjs(startDate).startOf("day").format("MM/DD/YYYY");
    const dateFormat1 = dayjs(endDate).startOf("day").format("MM/DD/YYYY");
    const currentDate = dayjs().format("MM/DD/YYYY");

    // Calculate the difference between start and end dates
    const start = dayjs(dateFormat0);
    const end = dayjs(dateFormat1);
    const daysDifference = end.diff(start, "days") + 1;

    // Set the TotalDays state
    setTotalDays(daysDifference);

    axios
      .post("http://localhost:3001/createEmployeeLeave", {
        EmployeeID: selectedEmployeeID,
        Name: selectedEmployeeName,
        LeaveType: LeaveType,
        AppliedOn: currentDate,
        StartDate: dateFormat0,
        EndDate: dateFormat1,
        TotalDays: daysDifference, // Set the TotalDays here
        LeaveReason: leaveReason,
        Status: statusLeave,
        StatusBg: "#F39C12", //Orange
        Remarks: remarks,
      })
      .then((result) => {
        toast.success("Employee leave created successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        props.onLeaveCreated();
        setOpenPopup(false);
      })
      .catch((err) => {
        toast.error("Error creating employee leave" + err.message);
        // Handle error and show an error message
      });
  };

  useEffect(() => {
    axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeData(response.data);
    });
  }, []);

  return (
    <div>
      <Modal open={openPopup}>
        <Box
          sx={{
            position: "absolute",
            top: isMobile ? "49%" : "40%",
            left: "50%",
            width: isMobile ? "90%" : "40%",
            height: isMobile ? "92%" : "70%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: (theme) => theme.shadows[5],
            p: 4,
          }}
          className="m-2 md:m-10 mt-10 p-4 md:p-10 bg-white rounded-md drop-shadow-xl "
        >
          <ModalClose variant="outlined" onClick={() => setOpenPopup(false)} />
          <CardTitle title="Create New Leave" />
          <Divider />
          <div className="flex flex-col mt-5 md:flex-row md:items-center gap-5">
            <div className="mt-5 md:mt-0 md:w-1/2">
              <p className="mb-1 text-sm">Employee</p>

              <Autocomplete
                options={employeeData}
                getOptionLabel={(option) =>
                  option ? `(${option.EmployeeID}) ${option.Name}` : ""
                }
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
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    fullWidth
                    placeholder="Select Employee"
                  />
                )}
              />
            </div>
            <div className="mt-2 md:mt-0 md:w-1/2">
              <p className="mb-1 text-sm">Leave Type</p>
              <FormControl className="w-full flex justify-start">
                <Select
                  value={LeaveType}
                  onChange={handleLeaveChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem className="w-full" value="">
                    <p className="text-gray-400 text-sm">Select Leave Type</p>
                  </MenuItem>

                  <MenuItem className="w-full" value="Sick Leave">
                    <p>Sick Leave</p>
                  </MenuItem>

                  <MenuItem className="w-full" value="Casual Leave">
                    <p>Casual Leave</p>
                  </MenuItem>

                  <MenuItem className="w-full" value="Vacation Leave">
                    <p>Vacation Leave</p>
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="flex flex-col mt-5 md:flex-row md:items-center gap-5">
            <div className="mt-2 md:mt-0 md:w-1/2">
              <p className="mb-1 text-sm">Start Date</p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  className="w-full"
                  onChange={handleStartDateChange}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" /> // Adjust the width
                  )}
                />
              </LocalizationProvider>
            </div>
            <div className="mt-5 md:mt-0 md:w-1/2">
              <p className="mb-1 text-sm">End Date</p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  className="w-full"
                  onChange={handleEndDateChange}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" /> // Adjust the width
                  )}
                />
              </LocalizationProvider>
            </div>
          </div>{" "}
          <div className="mt-5">
            <p className="mb-1 text-sm">Leave Reason</p>
            <Textarea
              className="w-full p-2 border rounded"
              value={leaveReason}
              onChange={handleLeaveReasonChange}
              minRows={isMobile ? 2 : 3} // Adjust the number of rows as needed
            />
          </div>
          <div className="mt-5">
            <p className="mb-1 text-sm">Remark</p>
            <Textarea
              className="w-full p-2 border rounded"
              value={remarks}
              onChange={handleRemarksChange}
              minRows={isMobile ? 2 : 3} // Adjust the number of rows as needed
            />
          </div>
          <div class="mt-6 flex justify-end items-center gap-3">
            <button
              type="button"
              style={{
                color: "black",
                borderRadius: "10px",
                width: "100px",
              }}
              className={`text-md p-3 hover:drop-shadow-xl drop-shadow-xl bg-gray-300`}
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
                width: "100px",
              }}
              className={`text-md p-3 hover:drop-shadow-xl drop-shadow-xl`}
            >
              Create
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateLeavePopup;

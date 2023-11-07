import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const TimesheetPopup = props => {
  const { openPopup, setOpenPopup, EmployeeID } = props;
  const { currentColor } = useStateContext();
  const isMobile = window.innerWidth <= 768 && window.innerHeight <= 1024;
  const monthFormat = dayjs().format("MM/DD/YYYY");

  const handleShiftChange = event => {
    setShiftType(event.target.value);
  };

  const [empid, setID] = useState("");
  const [emname, setName] = useState("Daniel Mark");
  const [shiftType, setShiftType] = useState("Morning");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [leaveReason, setLeaveReason] = useState("");
  const [remarks, setRemarks] = useState("");
  const handleStartDateChange = date => {
    setStartDate(date);
  };
  const handleEndDateChange = date => {
    setEndDate(date);
  };

  const dynamicPopupStyle = {
    position: "absolute",
    top: isMobile ? "48%" : "32%",
    left: "50%",
    width: "min(80%, 600px)", // Adjust the maximum width as needed (600px in this example)
    height: isMobile ? "90vh" : "min(60%, 90vh)", // Adjust the maximum height as needed (1500px in this example)
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
          <CardTitle title="Edit Timesheet" />
          <Divider />
          <div className="mt-2 md:mt-3 md:w-full">
            <p className="mb-1 text-sm">Employee</p>
            <form noValidate autoComplete="off">
              <FormControl className="w-full ">
                <OutlinedInput
                  value={`(${EmployeeID}) ${emname}`}
                  readOnly={true}
                  inputProps={{ readOnly: true }}
                  className="text-gray-400"
                />
              </FormControl>
            </form>
          </div>
          <div className="flex flex-col mt-5 md:flex-row md:items-center gap-5">
            <div className="mt-2 md:mt-0 md:w-1/2">
              <p className="mb-1 text-sm">Date</p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  className="w-full flex justify-start"
                  value={dayjs(monthFormat)}
                />
              </LocalizationProvider>
            </div>
            <div className="mt-2 md:mt-0 md:w-1/2">
              <p className="mb-1 text-sm ">Shift</p>
              <FormControl className="w-full flex justify-start">
                <Select
                  defaultValue={shiftType}
                  onChange={handleShiftChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem className="w-full" value="">
                    <p className="text-gray-400 text-sm">Select Shift</p>
                  </MenuItem>
                  <MenuItem className="w-full" value="Morning">
                    <p>Morning</p>
                  </MenuItem>

                  <MenuItem className="w-full" value="Night">
                    <p>Night</p>
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="flex flex-col mt-5 md:flex-row md:items-center gap-5">
            <div className="mt-2 md:mt-0 md:w-1/2">
              <p className="mb-1 text-sm">Clock In</p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  className="w-full"
                  defaultValue={dayjs("2022-04-17T9:00")}
                />
              </LocalizationProvider>
            </div>
            <div className="mt-5 md:mt-0 md:w-1/2">
              <p className="mb-1 text-sm">Clock Out</p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker
                  className="w-full"
                  defaultValue={dayjs("2022-04-17T18:00")}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div class="mt-12 flex justify-end items-center gap-3">
            <button
              type="button"
              style={{
                color: "black",
                borderRadius: "10px",
                width: "100px"
              }}
              className={`text-md p-3 bg-gray-300`}
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
              className={`text-md p-3 `}
            >
              Update
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default TimesheetPopup;

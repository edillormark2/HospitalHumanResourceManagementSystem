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

const EditLeavePopup = (props) => {
  const { openPopup, setOpenPopup, EmployeeID } = props;
  const { currentColor } = useStateContext();
  const isMobile = window.innerWidth <= 768 && window.innerHeight <= 1024;
  const handleLeaveChange = (event) => {
    const selectedLeaveType = event.target.value;
    setLeaveType(selectedLeaveType);
  };

  const leaveTypes = [
    { label: "Sick Leave" },
    { label: "Casual Leave" },
    { label: "Vacation Leave" },
  ];

  const [empid, setID] = useState("");
  const [emname, setName] = useState("");
  const [LeaveType, setLeaveType] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [leaveReason, setLeaveReason] = useState("");
  const [remarks, setRemarks] = useState("");
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };
  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ensure that EmployeeID is valid before making the request
        if (!EmployeeID) {
          return;
        }

        const response = await axios.get(
          `http://localhost:3001/employeeLeaves/${EmployeeID}`
        );
        const userData = response.data;

        if (userData && userData.length > 0) {
          // Assuming you want the first item from the response
          const userDataItem = userData[0];
          setName(userDataItem.Name);
          setLeaveType(userDataItem.LeaveType);
          setStartDate(userDataItem.StartDate);
          setEndDate(userDataItem.EndDate);
          setLeaveReason(userDataItem.LeaveReason);
          setRemarks(userDataItem.Remarks);
        } else {
          // Handle the case where no data is found for the given EmployeeID
          toast.error("No employee leave records found for this ID.", {
            className: isMobile ? "mobile-toast" : "desktop-toast",
          });
        }
      } catch (error) {
        toast.error("Error fetching employee data: " + error.message, {
          className: isMobile ? "mobile-toast" : "desktop-toast",
        });
      }
    };

    fetchData(); // Always fetch data when the component mounts

    // You can also pass EmployeeID as a dependency if it changes over time
  }, [EmployeeID]);

  const handleUpdateEmployeeLeave = async () => {
    if (EmployeeID) {
      // Rest of your update code
      try {
        // Create a payload with the updated employee data
        const updatedEmployeeData = {
          LeaveType: LeaveType,
          StartDate: startDate,
          EndDate: endDate,
          LeaveReason: leaveReason,
          Remarks: remarks,
        };

        // Send a PUT request to update the employee data
        await axios.put(
          `http://localhost:3001/updateEmployeesLeave/${EmployeeID}`,
          updatedEmployeeData
        );

        toast.success("Employee data updated successfully", {
          className: isMobile ? "mobile-toast" : "desktop-toast",
        });
        props.onLeaveCreated();
        setOpenPopup(false);
      } catch (error) {
        toast.error("Error updating employee data: " + error.message,  {
          className: isMobile ? "mobile-toast" : "desktop-toast",
        });
      }
    }
  };
  
  const mobilePopupHeight = "92vh";
  const dynamicPopupStyle = {
    position: "absolute",
    top: isMobile ? "49%" : "40%",
    left: "50%",
    width: isMobile ? "90%" : "40%",
    height: isMobile ? mobilePopupHeight : "70%",
    transform: "translate(-50%, -50%)",
    overflowY: "auto",
    p: 4,
  };

  return (
    <div>
      <Modal open={openPopup}>
      <Box
          sx={dynamicPopupStyle}
          style={isMobile || (window.innerWidth <= window.innerHeight * 2) ? dynamicPopupStyle : null}
          className="m-2 md:m-10 mt-10 p-4 md:p-10 bg-white rounded-md  "
        >
          <ModalClose variant="outlined" onClick={() => setOpenPopup(false)} />
          <CardTitle title="Edit Leave" />
          <Divider />
          <div className="flex flex-col mt-5 md:flex-row md:items-center gap-5">
            <div className="mt-5 md:mt-0 md:w-1/2">
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
            <div className="mt-2 md:mt-0 md:w-1/2">
              <p className="mb-1 text-sm ">Leave Type</p>
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
                  value={dayjs(startDate)}
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
                  value={dayjs(endDate)}
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
              onChange={(e) => setLeaveReason(e.target.value)}
              minRows={isMobile ? 2 : 3} // Adjust the number of rows as needed
            />
          </div>
          <div className="mt-5">
            <p className="mb-1 text-sm">Remark</p>
            <Textarea
              className="w-full p-2 border rounded"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
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
                width: "100px",
              }}
              className={`text-md p-3 `}
              onClick={handleUpdateEmployeeLeave}
            >
              Update
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default EditLeavePopup;

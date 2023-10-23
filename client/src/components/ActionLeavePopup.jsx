import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ModalClose from "@mui/joy/ModalClose";
import CardTitle from "./CardTitle";
import { Divider } from "@mui/joy";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ActionLeavePopup = (props) => {
  const isMobile = window.innerWidth <= 768 && window.innerHeight <= 1024;
  const { openPopup, setOpenPopup, EmployeeID } = props;

  const [leaveData, setLeaveData] = useState({
    emname: "",
    LeaveType: "",
    appliedOn: "",
    startDate: "",
    endDate: "",
    leaveReason: "",
    status: "",
  });

  useEffect(() => {
    let isMounted = true; // Add this to prevent state updates after component unmounts

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/employeeLeaves/${EmployeeID}`
        );
        const leaveData = response.data;
        if (isMounted) {
          if (leaveData && leaveData.length > 0) {
            const firstLeaveRecord = leaveData[0];
            setLeaveData(firstLeaveRecord);
          }
        }
      } catch (error) {
        console.error("Error fetching employee leave data: ", error);
        toast.error("Error fetching employee leave data");
      }
    };

    // Fetch data initially
    if (EmployeeID) {
      fetchData();
    }

    // Set up a timer to periodically refresh the data (e.g., every 5 seconds)
    const interval = setInterval(() => {
      if (EmployeeID) {
        fetchData();
      }
    }, 1000); // Adjust the interval as needed (in milliseconds)

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [EmployeeID]);

  const handleApprove = async () => {
    if (!leaveData.EmployeeID) {
      toast.error("Invalid EmployeeLeaveID");
      return;
    }

    try {
      await axios.put(
        `http://localhost:3001/updateEmployeeLeaveStatus/${leaveData.EmployeeID}`,
        {
          Status: "Approved",
          StatusBg: "#2ECC71",
        }
      );
      setLeaveData({ ...leaveData, status: "Approved", statusBg: "#2ECC71" });
      toast.success("Employee leave approved");
      props.onLeaveCreated();
      setOpenPopup(false);
    } catch (error) {
      toast.error("Error approving employee leave", error);
    }
  };

  const handleReject = async () => {
    if (!leaveData.EmployeeID) {
      toast.error("Invalid EmployeeLeaveID");
      return;
    }

    try {
      await axios.put(
        `http://localhost:3001/updateEmployeeLeaveStatus/${leaveData.EmployeeID}`,
        {
          Status: "Rejected",
          StatusBg: "#DE3163",
        }
      );
      setLeaveData({ ...leaveData, status: "Rejected", statusBg: "#DE3163" });
      toast.success("Employee leave rejected ");
      props.onLeaveCreated();
      setOpenPopup(false);
    } catch (error) {
      toast.error("Error rejecting employee leave", error);
    }
  };

  const {
    Name,
    LeaveType,
    AppliedOn,
    StartDate,
    EndDate,
    LeaveReason,
    Status,
  } = leaveData;

  return (
    <div>
      <Modal open={openPopup}>
        <Box
          sx={{
            position: "absolute",
            top: isMobile ? "42%" : "40%",
            left: "50%",
            width: isMobile ? "90%" : "40%",
            height: isMobile ? "70%" : "60%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: (theme) => theme.shadows[5],
            p: 4,
          }}
          className="m-2 md:m-10 mt-10 p-4 md:p-10 bg-white rounded-md drop-shadow-xl "
        >
          <ModalClose variant="outlined" onClick={() => setOpenPopup(false)} />
          <CardTitle title="Leave Action" />
          <Divider />

          <div className="flex justify-between w-full mt-5 mb-3">
            <div className="flex flex-col">
              <p className="flex justify-star font-semibold text-sm">
                Employee
              </p>
            </div>
            <div className="flex flex-col">
              <p className="flex justify-center text-sm">{Name}</p>
            </div>
          </div>
          <Divider />
          <div className="flex justify-between w-full mt-5 mb-3">
            <div className="flex flex-col">
              <p className="flex justify-star font-semibold text-sm">
                Leave Type
              </p>
            </div>
            <div className="flex flex-col">
              <p className="flex justify-end text-sm">{LeaveType}</p>
            </div>
          </div>
          <Divider />
          <div className="flex justify-between w-full mt-5 mb-3">
            <div className="flex flex-col">
              <p className="flex justify-star font-semibold text-sm">
                Applied On
              </p>
            </div>
            <div className="flex flex-col">
              <p className="flex justify-end text-sm">{AppliedOn}</p>
            </div>
          </div>
          <Divider />
          <div className="flex justify-between w-full mt-5 mb-3">
            <div className="flex flex-col">
              <p className="flex justify-star font-semibold text-sm">
                Start Date
              </p>
            </div>
            <div className="flex flex-col">
              <p className="flex justify-end text-sm">{StartDate}</p>
            </div>
          </div>
          <Divider />
          <div className="flex justify-between w-full mt-5 mb-3">
            <div className="flex flex-col">
              <p className="flex justify-star font-semibold text-sm">
                End Date
              </p>
            </div>
            <div className="flex flex-col">
              <p className="flex justify-end text-sm">{EndDate}</p>
            </div>
          </div>
          <Divider />
          <div className="flex justify-between w-full mt-5 mb-3">
            <div className="flex flex-col">
              <p className="flex justify-star font-semibold text-sm">
                Leave Reason
              </p>
            </div>
            <div className="flex flex-col">
              <p className="flex justify-end text-sm">{LeaveReason}</p>
            </div>
          </div>
          <Divider />
          <div className="flex justify-between w-full mt-5 mb-3">
            <div className="flex flex-col">
              <p className="flex justify-star font-semibold text-sm">Status</p>
            </div>
            <div className="flex flex-col">
              <p className="flex justify-end text-sm">{Status}</p>
            </div>
          </div>
          <Divider />

          <div class="mt-6 flex justify-end items-center gap-3">
            <button
              type="button"
              style={{
                color: "white",
                backgroundColor: "#2ECC71",
                borderRadius: "10px",
                width: "100px",
              }}
              className={`text-md p-3 hover:drop-shadow-xl drop-shadow-xl `}
              onClick={handleApprove}
            >
              Approved
            </button>
            <button
              type="button"
              style={{
                backgroundColor: "#DE3163",
                color: "white",
                borderRadius: "10px",
                width: "100px",
              }}
              className={`text-md p-3 hover:drop-shadow-xl drop-shadow-xl`}
              onClick={handleReject}
            >
              Reject
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ActionLeavePopup;

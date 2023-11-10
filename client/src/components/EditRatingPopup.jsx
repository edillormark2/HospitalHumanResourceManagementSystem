import React, { useState, useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ModalClose from "@mui/joy/ModalClose";
import CardTitle from "./CardTitle";
import { Divider } from "@mui/joy";
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

const EditRatingPopup = props => {
  const { currentColor } = useStateContext();
  const { openPopup, setOpenPopup, EmployeeID } = props;
  const dateFormat = dayjs().format("MM/YYYY");

  const [employeeData, setEmployeeData] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");

  const [employeeID, setEmployeeID] = useState("");
  const [name, setName] = useState("");
  const [dep, setDep] = useState("");
  const [position, setPosition] = useState("");
  const [rating, setRating] = useState("");
  const [feedback, setFeedback] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const [nameError, setNameError] = useState("");
  const [depError, setDepError] = useState("");
  const [positionError, setPositionError] = useState("");
  const [createdAtError, setCreatedAtError] = useState("");
  const [feedbackError, setFeedbackError] = useState("");
  const [ratingError, setRatingError] = useState("");

  const [OCLR, setOCLR] = useState("");
  const [OCPMR, setOCPMR] = useState("");
  const [TCARR, setTCARR] = useState("");
  const [BCOCR, setBCOCR] = useState("");
  const [BCBPR, setBCBPR] = useState("");

  const isMobile = window.innerWidth <= 768 && window.innerHeight <= 1024;

  const handleFeedbackChange = event => {
    const value = event.target.value;
    setFeedback(value);
  };

  useEffect(
    () => {
      const fetchData = async () => {
        try {
          // Ensure that EmployeeID is valid before making the request
          if (!EmployeeID) {
            return;
          }

          const response = await axios.get(
            `http://localhost:3001/editPerformance/${EmployeeID}`
          );
          const userData = response.data;

          if (userData && userData.length > 0) {
            // Assuming you want the first item from the response
            const userDataItem = userData[0];
            setEmployeeID(userDataItem.EmployeeID);
            setName(userDataItem.Name);
            setDep(userDataItem.Department);
            setPosition(userDataItem.Position);
            setFeedback(userDataItem.Feedback);
            setOCLR(userDataItem.OCLR);
            setOCPMR(userDataItem.OCPMR);
            setTCARR(userDataItem.TCARR);
            setBCOCR(userDataItem.BCOCR);
            setBCBPR(userDataItem.BCBPR);
          } else {
            // Handle the case where no data is found for the given EmployeeID
            toast.error("No employee leave records found for this ID.", {
              className: isMobile ? "mobile-toast" : "desktop-toast"
            });
          }
        } catch (error) {
          toast.error("Error fetching employee data: " + error.message, {
            className: isMobile ? "mobile-toast" : "desktop-toast"
          });
        }
      };

      fetchData(); // Always fetch data when the component mounts

      // You can also pass EmployeeID as a dependency if it changes over time
    },
    [EmployeeID]
  );

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

  const calculateAverageRating = (OCLR, OCPMR, TCARR, BCOCR, BCBPR) => {
    const totalRating = OCLR + OCPMR + TCARR + BCOCR + BCBPR;
    const averageRating = totalRating / 5;
    return averageRating;
  };

  const clearModalInfo = () => {
    setSelectedEmployee("");
    setEmployeeID("");
    setName("");
    setDep("");
    setPosition("");
    setFeedback("");
    setCreatedAt("");
    setOCLR("");
    setOCPMR("");
    setTCARR("");
    setBCOCR("");
    setBCBPR("");
    setRating("");
  };

  const handleUpdatePerformance = async event => {
    event.preventDefault();
    if (EmployeeID) {
      if (
        !employeeID ||
        !name ||
        !dep ||
        !position ||
        !feedback ||
        !OCLR ||
        !OCPMR ||
        !TCARR ||
        !BCOCR ||
        !BCBPR
      ) {
        toast.error("Please fill in all the required fields");
        return;
      }

      const finalcreatedAt = createdAt
      ? dayjs(createdAt).format("MM/YYYY")
      : dayjs().format("MM/YYYY");
      try {
        // Create a payload with the updated employee data
        const updatedPerformance = {
          Feedback: feedback,
          CreatedAt: finalcreatedAt,
          Rating: calculateAverageRating(OCLR, OCPMR, TCARR, BCOCR, BCBPR),
          OCLR: OCLR,
          OCPMR: OCPMR,
          TCARR: TCARR,
          BCOCR: BCOCR,
          BCBPR: BCBPR
        };

        // Send a PUT request to update the employee data
        await axios.put(
          `http://localhost:3001/updatePerformance/${EmployeeID}`,
          updatedPerformance
        );
          
        toast.success("Employee performance updated successfully", {
          className: isMobile ? "mobile-toast" : "desktop-toast"
        });
        clearModalInfo();
        props.onEvalCreated();
        setOpenPopup(false);
      } catch (error) {
        toast.error("Error updating employee performance: " + error.message, {
          className: isMobile ? "mobile-toast" : "desktop-toast"
        });
        clearModalInfo();
        props.onEvalCreated();
        setOpenPopup(false);
      }
    }
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
          <ModalClose
            variant="outlined"
            onClick={() => {
              clearModalInfo();
              setOpenPopup(false);
            }}
          />
          <CardTitle title="Edit Employee Evaluation" />
          <Divider />
          <div className="flex flex-col mt-5 md:flex-row md:items-center gap-5">
            <div className="mt-5 md:mt-0 md:w-1/2 mb-5">
              <p className="mb-1 text-sm">Employee</p>
                <p>{name} ({employeeID})</p>
            </div>
            <div className="mt-5 md:mt-0 md:w-1/2 mb-5">
              <p className="mb-1 text-sm">Select Month & Year</p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  views={["month", "year"]}
                  onChange={date => setCreatedAt(date)}
                />
              </LocalizationProvider>
            </div>
          </div>
          <Divider />
          <div className="flex flex-col mt-5 md:flex-row md:items-center gap-5">
            <div className="mt-5 md:mt-0 md:w-1/2 mb-5">
              <p className="mb-1 text-sm">Department</p>
                <p>{dep}</p>
            </div>
            <div className="mt-5 md:mt-0 md:w-1/2 mb-5">
              <p className="mb-1 text-sm">Position</p>
                <p>{position}</p>
            </div>
          </div>
          <Divider />
          <p className="text-md mb-2">Organizational Competencies</p>
          <div className="mt-2 mb-3">
            <div className="flex justify-between ">
              <p className="text-md text-slate-500 ">Leadership</p>
              <StarRating
                initialValue={OCLR}
                onStarRatingChange={value => {
                  setOCLR(value);
                }}
              />
            </div>
            <div className="flex justify-between mt-2 mb-5">
              <p className="text-md text-slate-500 ">Project Management</p>
              <StarRating
                initialValue={OCPMR}
                onStarRatingChange={value => {
                  setOCPMR(value);
                }}
              />
            </div>

            <p className="text-md mb-2">Technical Competencies</p>
            <Divider />
            <div className="flex justify-between mt-2 mb-5">
              <p className="text-md text-slate-500 ">Allocating Resources</p>
              <StarRating
                initialValue={TCARR}
                onStarRatingChange={value => {
                  setTCARR(value);
                }}
              />
            </div>

            <p className="text-md mb-2">Behavioural Competencies</p>
            <Divider />
            <div className="flex justify-between mt-2">
              <p className="text-md text-slate-500 ">Oral Communication</p>
              <StarRating
                initialValue={BCOCR}
                onStarRatingChange={value => {
                  setBCOCR(value);
                }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <p className="text-md text-slate-500 ">Business Process</p>
              <StarRating
                initialValue={BCBPR}
                onStarRatingChange={value => {
                  setBCBPR(value);
                }}
              />
            </div>
          </div>
          <Divider />
          <div className="mt-8">
            <p className="mb-1 text-md">Feedback</p>
            <Textarea
              className="w-full p-2 border rounded"
              value={feedback}
              onChange={handleFeedbackChange}
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
              onClick={() => {
                clearModalInfo();
                setOpenPopup(false);
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleUpdatePerformance}
              style={{
                backgroundColor: currentColor,
                color: "white",
                borderRadius: "10px",
                width: "100px"
              }}
              className={`text-md p-3`}
            >
              Update
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default EditRatingPopup;

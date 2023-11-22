import React, { useState, useEffect } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ModalClose from "@mui/joy/ModalClose";
import CardTitle from "../CardTitle";
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
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";

const EditRatingPopup = props => {
  const { currentColor, getEndPoint } = useStateContext();
  const { openPopup, setOpenPopup, EmployeeID } = props;

  const [employeeData, setEmployeeData] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");

  const [employeeID, setEmployeeID] = useState("");
  const [name, setName] = useState("");
  const [dep, setDep] = useState("");
  const [position, setPosition] = useState("");
  const [rating, setRating] = useState("");
  const [feedback, setFeedback] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const [OCLR, setOCLR] = useState("");
  const [OCPMR, setOCPMR] = useState("");
  const [TCARR, setTCARR] = useState("");
  const [BCOCR, setBCOCR] = useState("");
  const [BCBPR, setBCBPR] = useState("");
  const endPoint = getEndPoint();
  const isMobile = window.innerWidth <= 768 && window.innerHeight <= 1024;

  const handleFeedbackChange = event => {
    const value = event.target.value;
    setFeedback(value);
  };

  const handleCteatedAtChange = date => {
    setCreatedAt(date);
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
            `${endPoint}/editPerformance/${EmployeeID}`
          );
          const userData = response.data;

          if (userData && userData.length > 0) {
            // Assuming you want the first item from the response
            const userDataItem = userData[0];
            setEmployeeID(userDataItem.EmployeeID);
            setName(userDataItem.Name);
            setDep(userDataItem.Department);
            setCreatedAt(userDataItem.CreatedAt);
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

      fetchData(); // Always fetch data when the component mounts or when EmployeeID changes
    },
    [EmployeeID]
  );

  const dynamicPopupStyle = {
    position: "absolute",
    top: isMobile ? "48%" : "43%",
    left: "50%",
    width: "min(80%, 600px)", // Adjust the maximum width as needed (600px in this example)
    height: isMobile ? "90vh" : "min(88%, 90vh)", // Adjust the maximum height as needed (1500px in this example)
    transform: "translate(-50%, -50%)",
    overflowY: "auto",
    p: 4
  };

  const calculateAverageRating = (OCLR, OCPMR, TCARR, BCOCR, BCBPR) => {
    // Calculate total rating and average rating without parsing
    const totalRating =
      parseFloat(OCLR) +
      parseFloat(OCPMR) +
      parseFloat(TCARR) +
      parseFloat(BCOCR) +
      parseFloat(BCBPR);
    const averageRating = totalRating / 5;
    return averageRating;
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

      const finalcreatedAt = dayjs(createdAt)
        .startOf("day")
        .format("MM/DD/YYYY");
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
          `${endPoint}/updatePerformance/${EmployeeID}`,
          updatedPerformance
        );

        toast.success("Employee performance updated successfully", {
          className: isMobile ? "mobile-toast" : "desktop-toast"
        });
        props.onEvalCreated();
        setOpenPopup(false);
      } catch (error) {
        toast.error("Error updating employee performance: " + error.message, {
          className: isMobile ? "mobile-toast" : "desktop-toast"
        });
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
              setOpenPopup(false);
            }}
          />
          <CardTitle title="Edit Employee Evaluation" />
          <Divider />
          <div className="flex flex-col mt-5 md:flex-row md:items-center gap-5">
            <div className="mt-5 md:mt-0 md:w-1/2 mb-5">
              <p className="mb-1 text-sm">Employee</p>
              <FormControl className="w-full ">
                <OutlinedInput
                  value={`(${EmployeeID}) ${name}`}
                  readOnly={true}
                  inputProps={{ readOnly: true }}
                  className="text-gray-400"
                />
              </FormControl>
            </div>
            <div className="mt-5 md:mt-0 md:w-1/2 mb-5">
              <p className="mb-1 text-sm">Select Date</p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  className="w-full"
                  value={dayjs(createdAt)}
                  onChange={handleCteatedAtChange}
                  renderInput={params =>
                    <TextField {...params} variant="outlined" /> // Adjust the width
                  }
                />
              </LocalizationProvider>
            </div>
          </div>
          <Divider />
          <div className="flex flex-col mt-5 md:flex-row md:items-center gap-5">
            <div className="mt-5 md:mt-0 md:w-1/2 mb-5">
              <p className="mb-1 text-sm">Department</p>
              <p>
                {dep}
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:w-1/2 mb-5">
              <p className="mb-1 text-sm">Position</p>
              <p>
                {position}
              </p>
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
          <div className="mt-6 flex justify-end items-center gap-3">
            <button
              type="button"
              style={{
                color: "black",
                borderRadius: "10px",
                width: "100px"
              }}
              className={`text-md p-3  bg-gray-300`}
              onClick={() => {
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

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

  const calculateAverageRating = (OCLR, OCPMR, TCARR, BCOCR, BCBPR) => {
    const totalRating = OCLR + OCPMR + TCARR + BCOCR + BCBPR;
    const averageRating = totalRating / 5;
    return averageRating;
  };

  const clearModalInfo = () =>{
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

  const handleSubmit = event => {
    event.preventDefault();

    //setRating(calculateAverageRating(OCLR, OCPMR, TCARR, BCOCR, BCBPR));
    
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

    axios
      .post("http://localhost:3001/createPerformance", {
        EmployeeID: employeeID,
        Name: name,
        Department: dep,
        Position: position,
        Feedback: feedback,
        CreatedAt: finalcreatedAt,
        Rating: calculateAverageRating(OCLR, OCPMR, TCARR, BCOCR, BCBPR),
        OCLR: OCLR,
        OCPMR: OCPMR,
        TCARR: TCARR,
        BCOCR: BCOCR,
        BCBPR: BCBPR
      })
      .then(result => {
        toast.success("Employee created successfully:", {
          className: isMobile ? "mobile-toast" : "desktop-toast"
        });

        // Clear input fields after successful submission
        clearModalInfo();
      })
      .catch(err => {
        toast.error("Error creating employee" + err.message, {
          className: isMobile ? "mobile-toast" : "desktop-toast"
        });
        // Handle error and show an error message
      });

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
          <ModalClose variant="outlined" onClick={() => {
            clearModalInfo();
            setOpenPopup(false)}} />
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
                    setEmployeeID(newValue.EmployeeID);
                    setName(newValue.Name);
                    setDep(newValue.Department);
                    setPosition(newValue.Designation);
                  } else {
                    setEmployeeID("");
                    setName("")
                    setDep("");
                    setPosition("");
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
                  value={dayjs(dateFormat)}
                  onChange={date => setCreatedAt(date)}
                />
              </LocalizationProvider>
            </div>
          </div>
          <p className="text-md mb-2">Organizational Competencies</p>
          <Divider />
          <div className="mt-2 mb-3">
            <div className="flex justify-between ">
              <p className="text-md text-slate-500 ">Leadership</p>
              <StarRating onStarRatingChange={(value) => {
                setOCLR(value);}} />
            </div>
            <div className="flex justify-between mt-2 mb-5">
              <p className="text-md text-slate-500 ">Project Management</p>
              <StarRating onStarRatingChange={(value) => {
                setOCPMR(value);}} />
            </div>

            <p className="text-md mb-2">Technical Competencies</p>
            <Divider />
            <div className="flex justify-between mt-2 mb-5">
              <p className="text-md text-slate-500 ">Allocating Resources</p>
              <StarRating onStarRatingChange={(value) => {
                setTCARR(value);}} />
            </div>

            <p className="text-md mb-2">Behavioural Competencies</p>
            <Divider />
            <div className="flex justify-between mt-2">
              <p className="text-md text-slate-500 ">Oral Communication</p>
              <StarRating onStarRatingChange={(value) => {
                setBCOCR(value);}} />
            </div>
            <div className="flex justify-between mt-2">
              <p className="text-md text-slate-500 ">Business Process</p>
              <StarRating onStarRatingChange={(value) => {
                setBCBPR(value);}} />
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
                setOpenPopup(false)}}
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

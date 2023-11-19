import React, { useState, useEffect } from "react";
import axios from "axios";
import { useStateContext } from "../../contexts/ContextProvider";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ModalClose from "@mui/joy/ModalClose";
import CardTitle from "../CardTitle";
import { Divider } from "@mui/joy";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextField from "@mui/material/TextField";
import Textarea from "@mui/joy/Textarea";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Autocomplete from "@mui/material/Autocomplete";

const CreateTrainingPopup = props => {
  const { openPopup, setOpenPopup, EmployeeID } = props;
  const { currentColor } = useStateContext();
  const isMobile = window.innerWidth <= 768 && window.innerHeight <= 1024;

  const handleTrainerChange = event => {
    const selectedTrainer = event.target.value;
    setTrainer(selectedTrainer);
  };
  const handleTrainingChange = event => {
    const selectedTrainingType = event.target.value;
    setTrainingType(selectedTrainingType);
  };

  const learningOptions = {
    Medical: [
      "Anatomy & Physiology, Medical-Surgical Nursing",
      "The New England Journal of Medicine, JAMA Network",
      "Virtual Surgery Simulators, Patient Case Simulations"
    ],
    Emergency: [
      "Emergency Medicine Protocols Handbook",
      " Simulated Emergency Situations",
      "Advanced Trauma Life Support (ATLS), Pediatric Advanced Life Support (PALS)"
    ],
    Administrative: [
      "HR Policies and Procedure Manuals",
      "Accounting Principles, Budgeting Tools",
      "Software Guides, Database Management Courses"
    ],
    Specialized: [
      "Current Medical Research Journals",
      "Specialized Equipment Manuals and Guides",
      "Specialized Equipment Manuals and Guides"
    ]
  };

  const [empid, setID] = useState("");
  const [emname, setName] = useState("Daniel Mark");
  const [trainer, setTrainer] = useState("");
  const [trainingType, setTrainingType] = useState("");
  const [department, setDepartment] = useState("");
  const [learning, setLearning] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const dateFormat = dayjs().format("MM/DD/YYYY"); //format only
  const [description, setDescription] = useState("");
  const [employeeData, setEmployeeData] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedEmployeeID, setSelectedEmployeeID] = useState("");
  const [selectedEmployeeName, setSelectedEmployeeName] = useState("");

  const handleStartDateChange = date => {
    setStartDate(date);
  };
  const handleEndDateChange = date => {
    setEndDate(date);
  };

  const handleDepartmentChange = event => {
    const selectedDepartment = event.target.value;
    setDepartment(selectedDepartment);
    setLearning("");
  };
  const handlelearningChange = event => {
    setLearning(event.target.value);
  };
  const dynamicPopupStyle = {
    position: "absolute",
    top: isMobile ? "48%" : "40%",
    left: "50%",
    width: "min(80%, 600px)", // Adjust the maximum width as needed (600px in this example)
    height: isMobile ? "90vh" : "min(78%, 90vh)", // Adjust the maximum height as needed (1500px in this example)
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
          <CardTitle title="Create Employee Training" />
          <Divider />
          <div className="flex flex-col mt-5 md:flex-row md:items-center gap-5">
            <div className="mt-5 md:mt-0 md:w-1/2">
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
            <div className="mt-2 md:mt-0 md:w-1/2">
              <p className="mb-1 text-sm">Select Department</p>
              <FormControl className="w-full flex justify-start">
                <Select
                  value={department}
                  onChange={handleDepartmentChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem className="w-full max-w-xl" value="">
                    <p className="text-gray-400 text-sm">Select Department</p>
                  </MenuItem>

                  <MenuItem className="w-full  max-w-xl" value="Medical">
                    <p>Medical</p>
                  </MenuItem>

                  <MenuItem className="w-full  max-w-xl" value="Emergency">
                    <p>Emergency</p>
                  </MenuItem>

                  <MenuItem className="w-full  max-w-xl" value="Administrative">
                    <p>Administrative</p>
                  </MenuItem>

                  <MenuItem className="w-full  max-w-xl" value="Specialized">
                    <p>Specialized</p>
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="flex flex-col mt-5 md:flex-row md:items-center gap-5">
            <div className="mt-5 md:mt-0 md:w-1/2">
              <p className="mb-1 text-sm">Trainer</p>
              <form noValidate autoComplete="off">
                <FormControl className="w-full ">
                  <Select
                    value={trainer}
                    onChange={handleTrainerChange}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem className="w-full" value="">
                      <p className="text-gray-400 text-sm">Select Trainer</p>
                    </MenuItem>
                    <MenuItem className="w-full" value="Dr. Samantha Reyes">
                      <p>Dr. Samantha Reyes</p>
                    </MenuItem>

                    <MenuItem className="w-full" value="Professor Alex Johnson">
                      <p>Professor Alex Johnson</p>
                    </MenuItem>

                    <MenuItem className="w-full" value="Sarah Miller, RN">
                      <p>Sarah Miller, RN</p>
                    </MenuItem>
                    <MenuItem className="w-full" value="Dr. Emily Chen">
                      <p>Dr. Emily Chen</p>
                    </MenuItem>
                  </Select>
                </FormControl>
              </form>
            </div>
            <div className="mt-2 md:mt-0 md:w-1/2">
              <p className="mb-1 text-sm ">Training Type</p>
              <FormControl className="w-full flex justify-start">
                <Select
                  value={trainingType}
                  onChange={handleTrainingChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem className="w-full" value="">
                    <p className="text-gray-400 text-sm">
                      Select Training Type
                    </p>
                  </MenuItem>
                  <MenuItem className="w-full" value="Job Training">
                    <p>Job Training</p>
                  </MenuItem>

                  <MenuItem className="w-full" value="Management Training">
                    <p>Management Training</p>
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="flex flex-col mt-5 md:flex-row md:items-center gap-5">
            <div className="mt-2 md:mt-0 w-full">
              <p className="mb-1 text-sm ">Select Learning Materials</p>
              <Select
                className="w-full"
                value={learning}
                onChange={handlelearningChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="" style={{ width: "100%" }}>
                  <p className="text-gray-400 text-sm">
                    Select Learning Materials
                  </p>
                </MenuItem>
                {learningOptions[department] &&
                  learningOptions[department].map((option, index) =>
                    <MenuItem
                      key={index}
                      value={option}
                      style={{ width: "100%" }}
                    >
                      {option}
                    </MenuItem>
                  )}
              </Select>
            </div>
          </div>
          <div className="flex flex-col mt-5 md:flex-row md:items-center gap-5">
            <div className="mt-2 md:mt-0 md:w-1/2">
              <p className="mb-1 text-sm">Start Date</p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="w-full"
                  value={dayjs(dateFormat)}
                  onChange={handleStartDateChange}
                  renderInput={params =>
                    <TextField {...params} variant="outlined" /> // Adjust the width
                  }
                />
              </LocalizationProvider>
            </div>
            <div className="mt-5 md:mt-0 md:w-1/2">
              <p className="mb-1 text-sm">End Date</p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="w-full"
                  value={dayjs(dateFormat)}
                  onChange={handleEndDateChange}
                  renderInput={params =>
                    <TextField {...params} variant="outlined" /> // Adjust the width
                  }
                />
              </LocalizationProvider>
            </div>
          </div>{" "}
          <div className="mt-5">
            <p className="mb-1 text-sm">Description</p>
            <Textarea
              className="w-full p-2 border rounded"
              value={description}
              onChange={e => setDescription(e.target.value)}
              minRows={isMobile ? 2 : 3} // Adjust the number of rows as needed
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

export default CreateTrainingPopup;

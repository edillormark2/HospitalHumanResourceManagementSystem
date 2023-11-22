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
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const EditRatingPopup = props => {
  const { currentColor, getEndPoint } = useStateContext();
  const { openPopup, setOpenPopup, EmployeeID } = props;

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

  const onlyRead = true;
  const endPoint = getEndPoint();
  const isMobile = window.innerWidth <= 768 && window.innerHeight <= 1024;

  const handleFeedbackChange = event => {
    const value = event.target.value;
    setFeedback(value);
  };

  useEffect(
    () => {
      let isMounted = true; // Add this to prevent state updates after component unmounts
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
            setPosition(userDataItem.Position);
            setFeedback(userDataItem.Feedback);
            setCreatedAt(userDataItem.CreatedAt);
            setRating(userDataItem.Rating);
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

      // Fetch data initially
      if (EmployeeID) {
        fetchData();
      }

      // Set up a timer to periodically refresh the data (e.g., every 1 seconds)
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

  const employeeStarRatingStatus = starValue => {
    const Rating = parseFloat(starValue); // Convert the rating to a float
    const stars = [];

    // Calculate the filled stars
    const filledStars = Math.floor(Rating);

    // Calculate the half star
    const hasHalfStar = Rating % 1 !== 0;

    // Create filled stars
    for (let i = 0; i < filledStars; i++) {
      stars.push(
        <FaStar
          key={i}
          color="#FFBA5A"
          style={{ display: "inline", fontSize: "20px" }}
        />
      );
    }

    // Create the half star (if applicable)
    if (hasHalfStar) {
      stars.push(
        <FaStarHalfAlt
          key={filledStars}
          color="#FFBA5A"
          style={{ display: "inline", fontSize: "20px" }}
        />
      );
    }

    // Create unfilled stars to complete the total of 5 stars
    const remainingStars = 5 - Math.ceil(Rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <FaStar
          key={filledStars + (hasHalfStar ? 1 : 0) + i}
          color="#808B96 "
          style={{ display: "inline", fontSize: "20px" }}
        />
      );
    }

    return (
      <div>
        {stars} ({Rating})
      </div>
    );
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
          <CardTitle title="View Employee Evaluation" />
          <Divider />

          <div className="flex flex-col mt-5 md:flex-row md:items-start md:justify-between gap-5">
            <div className="w-full md:w-1/3 mb-5">
              <p className="mb-1 text-sm">Employee</p>
              <p>
                {name} ({employeeID})
              </p>
            </div>

            <div className="w-full md:w-1/3 mb-5">
              <p className="mb-1 text-sm">Rating Average</p>
              <p>
                {employeeStarRatingStatus(rating)}
              </p>
            </div>

            <div className="w-full md:w-1/3 mb-5">
              <p className="mb-1 text-sm">Date Created</p>
              <p>
                {createdAt}
              </p>
            </div>
          </div>

          <Divider />

          <div className="flex flex-col mt-3 md:flex-row md:items-center gap-5">
            <div className="mt-5 md:mt-0 md:w-1/2 mb-5">
              <p className="mb-1 text-sm">Department</p>
              <p>
                {dep}
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:w-1/2 mb-3">
              <p className="mb-1 text-sm">Position</p>
              <p>
                {position}
              </p>
            </div>
          </div>
          <Divider />
          <p className="text-md mb-1 mt-5">Organizational Competencies</p>
          <div className="mt-1 mb-3">
            <div className="flex justify-between ">
              <p className="text-md text-slate-500 ">Leadership</p>
              <p>
                {employeeStarRatingStatus(OCLR)}
              </p>
            </div>
            <div className="flex justify-between mb-5">
              <p className="text-md text-slate-500 ">Project Management</p>
              <p>
                {employeeStarRatingStatus(OCPMR)}
              </p>
            </div>
            <Divider />
            <p className="text-md mt-5">Technical Competencies</p>

            <div className="flex justify-between mt-1 mb-5">
              <p className="text-md text-slate-500 ">Allocating Resources</p>
              <p>
                {employeeStarRatingStatus(TCARR)}
              </p>
            </div>
            <Divider />
            <p className="text-md mt-5">Behavioural Competencies</p>

            <div className="flex justify-between mt-1">
              <p className="text-md text-slate-500 ">Oral Communication</p>
              {employeeStarRatingStatus(BCOCR)}
            </div>
            <div className="flex justify-between mt-1">
              <p className="text-md text-slate-500 ">Business Process</p>
              {employeeStarRatingStatus(BCBPR)}
            </div>
          </div>
          <Divider />
          <div className="mt-8">
            <p className="mb-1 text-md">Feedback</p>
            <Textarea
              className="w-full p-2 border rounded"
              readOnly={true}
              value={feedback}
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
                setOpenPopup(false);
              }}
            >
              Close
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default EditRatingPopup;

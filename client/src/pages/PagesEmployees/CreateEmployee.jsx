import React, { useState } from "react";
import SubPageHeader from "../../components/SubPageHeader";
import { employeesData } from "../../data/dummy";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Divider } from "@mui/joy";
import CardTitle from "../../components/CardTitle";
import Textarea from "@mui/joy/Textarea";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useStateContext } from "../../contexts/ContextProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button } from "@material-ui/core";
import { HiOutlineUpload } from "react-icons/hi";
import Breadcrumbs from "../../components/Breadcrumbs";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const designationOptions = {
  Medical: ["Surgery", "Pediatrics", "Anesthesiology", "Pathology"],
  Emergency: ["Nurse", "Med Tech", "Emergency Physician"],
  Administrative: ["Finance", "IT", "Compliance", "Quality"],
  Specialized: ["Dermatology"]
};

const CreateEmployee = () => {
  const { currentColor, getEndPoint } = useStateContext();

  const breadcrumbLinks = [
    { to: "/dashboard", label: "Home" },
    { to: "/employees", label: "Employee" },
    { to: "/create-employee", label: "Create Employee" }
  ];

  const [empid, setID] = useState("");
  const [emname, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [birthDay, setBirthDay] = useState(null);
  const [birthDayError, setBirthDayError] = useState("");
  const [hireDate, sethireDate] = useState("");
  const [department, setDepartment] = useState("");
  const [departmentError, setDepartmentError] = useState("");
  const [designation, setDesignation] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const dateFormat = dayjs().format("MM/DD/YYYY");
  const [genderError, setGenderError] = useState("");
  const [designationError, setDesignationError] = useState("");
  const isMobile = window.innerWidth <= 768 && window.innerHeight <= 1024;
  const endPoint = getEndPoint();
  const handleDepartmentChange = event => {
    const selectedDepartment = event.target.value;
    setDepartment(selectedDepartment);
    setDesignation(""); // Reset designation when department changes

    // Validation logic for the department field
    if (!selectedDepartment) {
      setDepartmentError("Department is required.");
    } else {
      setDepartmentError("");
    }
  };

  const handleDesignationChange = event => {
    setDesignation(event.target.value);

    // Validation logic for the Designation field
    if (!event.target.value) {
      setDesignationError("Designation is required.");
    } else {
      setDesignationError("");
    }
  };

  const radioStyle = {
    color: currentColor // Use the provided color or default to 'primary'
  };

  const handleNameChange = event => {
    const value = event.target.value;
    setName(value);

    if (!value) {
      setNameError("Name is required.");
    } else {
      setNameError("");
    }
  };
  const handlePhoneChange = event => {
    const value = event.target.value;

    // Use a regular expression to filter out non-numeric characters
    const numericValue = value.replace(/\D/g, "");

    // Update the phone state with the filtered numeric value
    setPhone(numericValue);

    if (numericValue === "") {
      setPhoneError("Phone is required");
    }
    if (!numericValue) {
      setPhoneError("Phone must be a number");
    } else {
      setPhoneError("");
    }
  };

  const handleAddressChange = event => {
    const value = event.target.value;
    setAddress(value);

    if (!value) {
      setAddressError("Address is required.");
    } else {
      setAddressError("");
    }
  };

  const handleBirthDayChange = date => {
    setBirthDay(date);

    if (!date) {
      setBirthDayError("Date of Birth is required");
    } else {
      setBirthDayError("");
    }
  };

  const handleGenderChange = event => {
    const value = event.target.value;
    setSelectedGender(value);

    // Clear the gender error when a gender is selected
    setGenderError("");
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (
      !emname ||
      !phone ||
      !address ||
      !birthDay ||
      !selectedGender ||
      !department ||
      !designation
    ) {
      toast.error("Please fill in all the required fields");
      if (!emname) setNameError("Name is required");
      if (!phone) setPhoneError("Phone is required");
      if (!address) setAddressError("Address is required");
      if (!birthDay) setBirthDayError("Date of Birth is required");
      if (!department) setDepartmentError("Department is required");
      if (!selectedGender) setGenderError("Gender is required");
      if (!designation) setDesignationError("Designation is required");
      return;
    }

    // Rest of your submit logic
    const finalHireDate = hireDate
      ? dayjs(hireDate).format("MM/DD/YYYY")
      : dayjs().format("MM/DD/YYYY");
    const formattedBirthday = dayjs(birthDay).format("MM/DD/YYYY");
    axios
      .post(`${endPoint}/createEmployee`, {
        EmployeeID: empid,
        Name: emname,
        Phone: phone,
        BirthDay: formattedBirthday,
        Address: address,
        Department: department,
        Designation: designation,
        Gender: selectedGender,
        HireDate: finalHireDate
      })
      .then(result => {
        toast.success("Employee created successfully:", {
          className: isMobile ? "mobile-toast" : "desktop-toast"
        });

        // Clear input fields after successful submission
        setBirthDay(dayjs().format("MM/DD/YYYY"));
        setID("");
        setName("");
        setPhone("");
        setAddress("");
        sethireDate("");
        setDepartment("");
        setDesignation("");
        setSelectedGender("");
      })
      .catch(err => {
        toast.error("Error creating employee" + err.message, {
          className: isMobile ? "mobile-toast" : "desktop-toast"
        });
        // Handle error and show an error message
      });
  };

  return (
    <div className="m-4 md:m-6 mt-24 p-2 md:p-10 sm:rounded-3xl rounded-md ">
      <SubPageHeader title="Create Employee" />
      <Breadcrumbs links={breadcrumbLinks} />
      <div className="m-2 md:m-10 mt-10 p-2 md:p-10 bg-white sm:rounded-3xl rounded-md drop-shadow-xl">
        <CardTitle title="Personal Details" />
        <Divider />
        <div className="flex flex-col mt-5 md:flex-row md:items-center gap-5">
          <div className="mt-5 md:mt-0 md:w-1/2">
            <p className="mb-1 text-sm">
              Name<span className="text-red-500">*</span>
            </p>
            <form name="name" type="text" noValidate autoComplete="off">
              <FormControl className="w-full">
                <OutlinedInput value={emname} onChange={handleNameChange} />
              </FormControl>
            </form>
            <div id="createHelp" className="text-red-500 text-sm">
              {nameError}
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:w-1/2">
            <p className="mb-1 text-sm">
              Phone<span className="text-red-500">*</span>
            </p>
            <form name="phone" noValidate autoComplete="off">
              <FormControl className="w-full">
                <OutlinedInput value={phone} onChange={handlePhoneChange} />
              </FormControl>
            </form>
            <div id="createHelp" className="text-red-500 text-sm">
              {phoneError}
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-5 md:flex-row md:items-center gap-5">
          <div className="mt-5 md:mt-0 md:w-1/2">
            <p className="mb-1 text-sm">
              Date of Birth<span className="text-red-500">*</span>
            </p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                className="w-full"
                onChange={handleBirthDayChange} // Handle date change
                renderInput={params =>
                  <TextField {...params} variant="outlined" /> // Adjust the width
                }
              />
            </LocalizationProvider>
            <div id="createHelp" className="text-red-500 text-sm">
              {birthDayError}
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:w-1/2">
            <p className="mb-1 text-sm">
              Gender<span className="text-red-500">*</span>
            </p>
            <RadioGroup
              aria-label="gender"
              name="gender"
              value={selectedGender}
              onChange={handleGenderChange}
              row // Arrange the radio buttons in a row
              error={!!genderError}
            >
              <FormControlLabel
                value="male"
                control={<Radio style={radioStyle} />}
                label="Male"
              />
              <FormControlLabel
                value="female"
                control={<Radio style={radioStyle} />}
                label="Female"
              />
            </RadioGroup>
            <div id="createHelp" className="text-red-500 text-sm">
              {genderError}
            </div>
          </div>
        </div>
        <div className="mt-5">
          <p className="mb-1 text-sm">
            Address<span className="text-red-500">*</span>
          </p>
          <Textarea
            className="w-full p-2 border rounded"
            value={address}
            onChange={handleAddressChange}
            minRows={3} // Adjust the number of rows as needed
          />
          <div id="createHelp" className="text-red-500 text-sm">
            {addressError}
          </div>
        </div>
      </div>
      <div>
        <div className="md:m-10 mt-10 p-2 md:p-10 bg-white sm:rounded-3xl rounded-md drop-shadow-xl">
          <CardTitle title="Company Details" />
          <Divider />
          <div className="flex flex-col mt-5 md:flex-row md:items-center gap-5">
            <div className="mt-5 md:mt-0 md:w-1/2">
              <p className="mb-1 text-sm">Employee ID</p>
              <form noValidate autoComplete="off">
                <FormControl className="w-full">
                  <OutlinedInput
                    value={empid}
                    onChange={event => setID(event.target.value)}
                  />
                </FormControl>
              </form>
            </div>

            <div className="mt-5 md:mt-0 md:w-1/2">
              <p className="mb-1 text-sm">Select Department</p>
              <FormControl className="w-full flex justify-start">
                <Select
                  value={department}
                  onChange={handleDepartmentChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem className="w-full max-w-xl" value="">
                    <p className="ml-2 justify-start ">Select Department</p>
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
              <div id="createHelp" className="text-red-500 text-sm">
                {departmentError}
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-5 md:flex-row md:items-center gap-5">
            <div className="mt-5 md:mt-0 md:w-1/2">
              <p className="mb-1 text-sm">Select Designation</p>
              <Select
                className="w-full"
                value={designation}
                onChange={handleDesignationChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="" style={{ width: "100%" }}>
                  <p>Select Designation</p>
                </MenuItem>
                {designationOptions[department] &&
                  designationOptions[department].map((option, index) =>
                    <MenuItem
                      key={index}
                      value={option}
                      style={{ width: "100%" }}
                    >
                      {option}
                    </MenuItem>
                  )}
              </Select>
              <div id="createHelp" className="text-red-500 text-sm">
                {designationError}
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:w-1/2">
              <p className="mb-1 text-sm">Company Date Of Joining</p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  className="w-full"
                  value={dayjs(dateFormat)}
                  onChange={date => sethireDate(date)} // Handle date change
                  renderInput={params =>
                    <TextField {...params} variant="outlined" /> // Adjust the width
                  }
                />
              </LocalizationProvider>
            </div>
          </div>
        </div>

        <div className="m-2 md:m-10 mt-10 p-2 md:p-10 bg-white sm:rounded-3xl rounded-md drop-shadow-xl ">
          <CardTitle title="Document" />
          <Divider />
          <div className="md:items-center gap-5 mt-5 ">
            <div className="mt-5 md:mt-0 md:w-full flex justify-between mb-5">
              <p className="mb-1 text-sm">
                Resume<span className="text-red-500">*</span>
              </p>
              <label htmlFor="upload-photo">
                <input
                  style={{ display: "none" }}
                  id="upload-photo"
                  name="upload-photo"
                  type="file"
                />
                <Button
                  style={{
                    color: "white",
                    backgroundColor: currentColor,
                    borderRadius: "10px",
                    padding: "5px 10px",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center"
                  }}
                  component="span"
                >
                  <HiOutlineUpload
                    style={{ marginRight: "5px", color: "white" }}
                  />{" "}
                  Choose file
                </Button>
              </label>
            </div>
            <div className="mt-10 md:mt-0 md:w-full flex justify-between mb-5  ">
              <p className="mb-1 text-sm">
                Certification<span className="text-red-500">*</span>
              </p>
              <label htmlFor="upload-photo">
                <input
                  style={{ display: "none" }}
                  id="upload-photo"
                  name="upload-photo"
                  type="file"
                />
                <Button
                  style={{
                    color: "white",
                    backgroundColor: currentColor,
                    borderRadius: "10px",
                    padding: "5px 10px",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center"
                  }}
                  component="span"
                >
                  <HiOutlineUpload
                    style={{ marginRight: "5px", color: "white" }}
                  />{" "}
                  Choose file
                </Button>
              </label>
            </div>
            <div className="mt-5 md:mt-0 md:w-full flex justify-between ">
              <p className="mb-1 text-sm ">Photo</p>
              <label htmlFor="upload-photo">
                <input
                  style={{ display: "none" }}
                  id="upload-photo"
                  name="upload-photo"
                  type="file"
                />
                <Button
                  style={{
                    color: "white",
                    backgroundColor: currentColor,
                    borderRadius: "10px",
                    padding: "5px 10px",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center"
                  }}
                  component="span"
                >
                  <HiOutlineUpload
                    style={{ marginRight: "5px", color: "white" }}
                  />{" "}
                  Choose file
                </Button>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <button
          type="button"
          onClick={handleSubmit}
          style={{
            backgroundColor: currentColor,
            color: "white",
            borderRadius: "10px",
            width: "150px"
          }}
          className={`text-md p-3 hover:bg-blue-500 hover:drop-shadow-2xl`}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateEmployee;

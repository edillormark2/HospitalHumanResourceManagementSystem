import React, { useState, useEffect } from "react";
import SubPageHeader from "../components/SubPageHeader";
import { employeesData } from "../data/dummy";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Divider } from "@mui/joy";
import CardTitle from "../components/CardTitle";
import Textarea from "@mui/joy/Textarea";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useStateContext } from "../contexts/ContextProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Button } from "@material-ui/core";
import { HiOutlineUpload } from "react-icons/hi";
import Breadcrumbs from "../components/Breadcrumbs";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const designationOptions = {
  Medical: ["Surgery", "Pediatrics", "Anesthesiology", "Pathology"],
  Emergency: ["Nurse", "Med Tech", "Emergency Physician"],
  Administrative: ["Finance", "IT", "Compliance", "Quality"],
  Specialized: ["Dermatology"],
};
const isMobile = window.innerWidth <= 768 && window.innerHeight <= 1024;
const EditEmployee = () => {
  const { currentColor } = useStateContext();
  const { EmployeeID } = useParams();

  const breadcrumbLinks = [
    { to: "/dashboard", label: "Home" },
    { to: "/employees", label: "Employee" },
    { to: "/edit-employee", label: "Edit Employee" },
  ];

  const [empid, setID] = useState("");
  const [emname, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [hireDate, setHireDate] = useState("");
  const finalHireDate = hireDate
    ? dayjs(hireDate).format("MM/DD/YYYY")
    : dayjs().format("MM/DD/YYYY");
  const formattedBirthday = dayjs(birthDay).format("MM/DD/YYYY");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/employees/${EmployeeID}`
        );
        const userData = response.data;
        if (userData) {
          setID(userData.EmployeeID);
          setName(userData.Name);
          setPhone(userData.Phone);
          setBirthDay(userData.BirthDay);
          setGender(userData.Gender);
          setAddress(userData.Address);
          setDepartment(userData.Department);
          setDesignation(userData.Designation);
          setHireDate(userData.HireDate);
        }
      } catch (error) {
        toast.error("Error fetching employee data", error, {
          className: isMobile ? "mobile-toast" : "desktop-toast",
        });
      }
    };

    fetchData();
  }, [EmployeeID]);

  const handleDepartmentChange = (event) => {
    const selectedDepartment = event.target.value;
    setDepartment(selectedDepartment);
    setDesignation(""); // Reset designation when department changes
  };

  const handleDesignationChange = (event) => {
    setDesignation(event.target.value);
  };

  const radioStyle = {
    color: currentColor, // Use the provided color or default to 'primary'
  };

  const handleUpdateEmployee = async () => {
    try {
      // Create a payload with the updated employee data
      const updatedEmployeeData = {
        EmployeeID: empid,
        Name: emname,
        Phone: phone,
        BirthDay: formattedBirthday,
        Gender: gender,
        Address: address,
        Department: department,
        Designation: designation,
        HireDate: finalHireDate,
      };

      // Send a PUT request to update the employee data
      await axios.put(
        `http://localhost:3001/employees/${EmployeeID}`,
        updatedEmployeeData
      );

      toast.success("Employee data updated successfully",{
        className: isMobile ? "mobile-toast" : "desktop-toast",
      });
    } catch (error) {
      toast.error("Error updating employee data", error,{
        className: isMobile ? "mobile-toast" : "desktop-toast",
      });
    }
  };

  return (
    <div className="m-4 md:m-6 mt-24 p-2 md:p-10 sm:rounded-3xl rounded-md ">
      <SubPageHeader title="Edit Employee" />
      <Breadcrumbs links={breadcrumbLinks} />
      <div className="m-2 md:m-10 mt-10 p-2 md:p-10 bg-white sm:rounded-3xl rounded-md drop-shadow-xl">
        <CardTitle title="Personal Details" />
        <Divider />
        <div className="flex flex-col mt-5 md:flex-row md:items-center gap-5">
          <div className="mt-5 md:mt-0 md:w-1/2">
            <p className="mb-1 text-sm">
              Name<span className="text-red-500">*</span>
            </p>
            <form noValidate autoComplete="off">
              <FormControl className="w-full">
                <OutlinedInput
                  value={emname}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormControl>
            </form>
          </div>
          <div className="mt-5 md:mt-0 md:w-1/2">
            <p className="mb-1 text-sm">
              Phone<span className="text-red-500">*</span>
            </p>
            <form noValidate autoComplete="off">
              <FormControl className="w-full">
                <OutlinedInput
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </FormControl>
            </form>
          </div>
        </div>
        <div className="flex flex-col mt-5 md:flex-row md:items-center gap-5">
          <div className="mt-5 md:mt-0 md:w-1/2">
            <p className="mb-1 text-sm">
              Date of Birth<span className="text-red-500">*</span>
            </p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                className="w-full"
                value={dayjs(birthDay)}
                onChange={(date) => setBirthDay(date)} // Handle date change
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" /> // Adjust the width
                )}
              />
            </LocalizationProvider>
          </div>
          <div className="mt-5 md:mt-0 md:w-1/2">
            <p className="mb-1 text-sm">
              Gender<span className="text-red-500">*</span>
            </p>
            <RadioGroup
              aria-label="gender"
              name="gender"
              value={gender}
              onChange={(event) => setGender(event.target.value)}
              row // Arrange the radio buttons in a row
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
          </div>
        </div>
        <div className="mt-5">
          <p className="mb-1 text-sm">
            Address<span className="text-red-500">*</span>
          </p>
          <Textarea
            className="w-full p-2 border rounded"
            defaultValue={address}
            minRows={3} // Adjust the number of rows as needed
            onChange={(e) => setAddress(e.target.value)}
          />
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
                    onChange={(e) => setID(e.target.value)}
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
                  <MenuItem className="w-full" value="">
                    <p>Select Department</p>
                  </MenuItem>

                  <MenuItem className="w-full" value="Medical">
                    <p>Medical</p>
                  </MenuItem>

                  <MenuItem className="w-full" value="Emergency">
                    <p>Emergency</p>
                  </MenuItem>

                  <MenuItem className="w-full" value="Administrative">
                    <p>Administrative</p>
                  </MenuItem>

                  <MenuItem className="w-full" value="Specialized">
                    <p>Specialized</p>
                  </MenuItem>
                </Select>
              </FormControl>
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
                  designationOptions[department].map((option, index) => (
                    <MenuItem
                      key={index}
                      value={option}
                      style={{ width: "100%" }}
                    >
                      {option}
                    </MenuItem>
                  ))}
              </Select>
            </div>
            <div className="mt-5 md:mt-0 md:w-1/2">
              <p className="mb-1 text-sm">Company Date Of Joining</p>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  className="w-full"
                  value={dayjs(hireDate)}
                  onChange={(date) => setHireDate(date)} // Handle date change
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" /> // Adjust the width
                  )}
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
                    alignItems: "center",
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
                    alignItems: "center",
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
                    alignItems: "center",
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
          style={{
            backgroundColor: currentColor,
            color: "white",
            borderRadius: "10px",
            width: "150px",
          }}
          className={`text-md p-3 hover:drop-shadow-xl`}
          onClick={handleUpdateEmployee}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default EditEmployee;

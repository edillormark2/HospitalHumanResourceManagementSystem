import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Search,
  Inject,
  Toolbar,
  Selection,
  Sort
} from "@syncfusion/ej2-react-grids";
import Breadcrumbs from "../components/Breadcrumbs";
import { useStateContext } from "../contexts/ContextProvider";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import DeleteAllPerformancePopup from "../components/DeleteAllPerformancePopup";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import CardTitle from "../components/CardTitle";
import dayjs from "dayjs";
import RatingPopup from "../components/RatingPopup";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AiOutlineSearch, AiOutlineEye } from "react-icons/ai";
import { RiDeleteBin2Line } from "react-icons/ri";
import { GoPersonAdd } from "react-icons/go";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const Performance = ({ EmployeeID }) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const monthFormat = dayjs().format("MM/DD/YYYY");
  const yearFormat = dayjs().format("YYYY");
  const [department, setDepartment] = useState("");
  const [openDeletePopup, setOpenDeletePopup] = useState(false);
  const [openDeleteAllPerformancePopup, setOpenDeleteAllPerformancePopup] = useState(false);
  const { currentColor, currentMode } = useStateContext();
  const [selectedEmployeeID, setSelectedEmployeeID] = useState(null);
  const [openAddPerformancePopup, setOpenAddPerformancePopup] = useState(false);
  const [openRatingPopup, setOpenRatingPopup] = useState(false);
  const [employeePerformanceData, setEmployeePerformanceData] = useState([]);

  const handleDeletePopup = EmployeeID => {
    setSelectedEmployeeID(EmployeeID);
    setOpenDeletePopup(true);
  };

  const handleDeleteAllPerformancePopup = () => {
    setOpenDeleteAllPerformancePopup(true);
  };

  const breadcrumbLinks = [
    { to: "/dashboard", label: "Home" },
    { to: "/performance", label: "Performance" }
  ];

  const pageSizes = [9, 20, 50];
  const [pageSize, setPageSize] = useState(9);

  const handlePageSizeChange = e => {
    setPageSize(e.value);
  };

  const template = () =>
    <div style={{ display: "flex", alignItems: "center" }}>
      <DropDownListComponent
        dataSource={pageSizes}
        index={pageSizes.indexOf(pageSize)}
        change={handlePageSizeChange}
        style={{ width: "20px", marginLeft: "20px" }} // Adjust the width as needed
      />
      <span style={{ marginLeft: "10px" }}>Entries per page</span>
    </div>;
  const employeeStarRatingStatus = props => {
    const Rating = parseFloat(props.Rating); // Convert the rating to a float
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

  const handleOpenAddPerformance = EmployeeID => {
    setSelectedEmployeeID(EmployeeID);
    setOpenAddPerformancePopup(true);
  };

  const handleCloseAddPerformancePopup = () => {
    setOpenAddPerformancePopup(false);
  };

  // Define the grid columns directly in the component

  const columns = [
    {
      field: "EmployeeID",
      headerText: "Employee ID",
      width: "80",
      textAlign: "Left"
    },
    {
      field: "Name",
      headerText: "Employee",
      width: "125",
      textAlign: "Left"
    },
    {
      field: "Department",
      headerText: "Department",
      width: "125",
      textAlign: "Left"
    },
    {
      field: "Position",
      headerText: "Posistion",
      width: "125",
      textAlign: "Left"
    },
    {
      field: "Rating",
      headerText: "Rating",
      width: "130",
      textAlign: "Left",
      template: employeeStarRatingStatus
    },
    {
      field: "Feedback",
      headerText: "Feedback",
      width: "110",
      textAlign: "Center"
    },
    {
      field: "CreatedAt",
      headerText: "Created At",
      width: "100",
      textAlign: "Left"
    },

    {
      field: "Action",
      headerText: "Action",
      width: "125",
      textAlign: "Center",
      template: props =>
        <div className="flex justify-center gap-1">
          <button
            style={{
              backgroundColor: "#F39C12",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "28px", // Set a fixed width
              height: "28px", // Set a fixed height
              border: "none",
              cursor: "pointer",
              borderRadius: "30%", // To make it a circle
              textDecoration: "none"
            }}
          >
            <AiOutlineEye
              title="View"
              style={{
                color: "white",
                fontSize: "18px"
              }}
            />
          </button>
          <button
            style={{
              backgroundColor: "#03C9D7",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "28px", // Set a fixed width
              height: "28px", // Set a fixed height
              border: "none",
              cursor: "pointer",
              borderRadius: "30%", // To make it a circle
              textDecoration: "none"
            }}
          >
            <AiOutlineEdit
              title="Edit"
              style={{
                color: "white",
                fontSize: "18px"
              }}
            />
          </button>
          <button
            onClick={() => {
              handleDeletePopup(props.EmployeeID); // Pass the EmployeeID to the handler
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "28px", // Set a fixed width
              height: "28px", // Set a fixed height
              border: "none",
              cursor: "pointer",
              borderRadius: "30%", // To make it a circle
              textDecoration: "none",
              backgroundColor: "#DE3163"
            }}
          >
            <AiOutlineDelete
              title="Delete"
              style={{
                color: "white",
                fontSize: "18px"
              }}
            />
          </button>
        </div>
    }
  ];

  const handleDepartmentChange = event => {
    const selectedDepartment = event.target.value;
    setDepartment(selectedDepartment);
  };
  const handleOpenRating = EmployeeID => {
    setSelectedEmployeeID(EmployeeID);
    setOpenRatingPopup(true);
  };

  const handleEvalCreated = () => {
    // Callback function to refresh performance data after creating a evaluation
    fetchEmployeePerformanceData();
  };

  const fetchEmployeePerformanceData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/performance");
      setEmployeePerformanceData(response.data);
    } catch (error) {
      console.error("Error fetching employee data: ", error);
    }
  };

  useEffect(() => {
    fetchEmployeePerformanceData();
  }, []);

  useEffect(() => {
    const fetchEmployeePerformanceData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/performance"); // Replace with your API endpoint
        setEmployeePerformanceData(response.data); // Update the employeeData state with the fetched data
      } catch (error) {
        console.error("Error fetching employee data: ", error);
      }
    };

    fetchEmployeePerformanceData(); // Fetch employee data when the component mounts
  }, []);

  return (
    <div className="m-2 sm:mx-4 md:m-4 mt-24 p-2 md:p-4 ">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div className="mb-5">
          <p className="text-md text-gray-400">Pages</p>
          <p className="text-2xl font-extrabold tracking-tight text-slate-900 mb-2 dark:text-gray-200 ">
            Employee Performance Evaluation
          </p>
          <Breadcrumbs links={breadcrumbLinks} />
        </div>
      </div>
      <div className="md:m-4 mt-15 p-2 md:p-4 bg-white sm:rounded-xl rounded-md drop-shadow-lg mb-8 md:mb-8">
        <CardTitle title="Find Employee Performance" />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="flex md:justify-end justify-between gap-2">
            <div className="text-start">
              <p className="mb-2 text-xs md:text-sm">Date</p>
              <DesktopDatePicker
                className="md:w-52 w-18"
                value={dayjs(monthFormat)}
                slotProps={{ textField: { size: "small" } }}
              />
            </div>
            <div className="text-start ">
              <p className="mb-2 text-xs md:text-sm">Department</p>
              <FormControl>
                <Select
                  className="h-10 sm:w-52 w-18"
                  value={department}
                  onChange={handleDepartmentChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem className="w-full" value="">
                    <p className="md:w-52 text-xs md:text-md max-w-xs">
                      {" "}Select Department
                    </p>
                  </MenuItem>

                  <MenuItem className="w-full" value="Medical">
                    <p className="md:w-52 text-xs ">Medical</p>
                  </MenuItem>

                  <MenuItem className="w-full" value="Emergency">
                    <p className="text-sm  text-xs ">Emergency</p>
                  </MenuItem>

                  <MenuItem className="w-full" value="Administrative">
                    <p className="text-sm  text-xs">Administrative</p>
                  </MenuItem>

                  <MenuItem className="w-full" value="Specialized">
                    <p className="text-sm  text-xs">Specialized</p>
                  </MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="flex gap-1">
              <button
                className="mt-8 h-8 md:w-8 w-8"
                onClick={() => {
                  handleDeleteAllPerformancePopup();
                }}
                style={{
                  backgroundColor: "#DE3163", // Color for "Download"
                  color: "white",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "20%",
                  textDecoration: "none"
                }}
              >
                <RiDeleteBin2Line title="Reset" />
              </button>
              <button
                className="mt-8 h-8 md:w-8 w-8"
                onClick={() => {
                  handleOpenAddPerformance(EmployeeID); // Pass the EmployeeID to the handler
                }}
                style={{
                  backgroundColor: currentColor, // Color for "Download"
                  color: "white",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "20%",
                  textDecoration: "none"
                }}
              >
                <GoPersonAdd title="Add" />
              </button>
            </div>
          </div>
        </LocalizationProvider>
      </div>

      <div className=" md:m-4 mt-15 p-2 md:p-4 bg-white sm:rounded-xl rounded-md drop-shadow-2xl ">
        <DeleteAllPerformancePopup
          openPopup={openDeleteAllPerformancePopup}
          setOpenPopup={setOpenDeleteAllPerformancePopup}
          onEvalCreated={handleEvalCreated}
        />
        <RatingPopup
          openPopup={openAddPerformancePopup}
          setOpenPopup={handleCloseAddPerformancePopup}
          EmployeeID={selectedEmployeeID} // Pass the EmployeeID to the popup
          onEvalCreated={handleEvalCreated}
        />
        <GridComponent
          dataSource={employeePerformanceData} // Use the fetched employee data
          allowPaging={true}
          pageSettings={{ pageSize: pageSize }}
          allowSorting={true}
          toolbar={[
            "Search",
            {
              text: "",
              template: template
            }
          ]}
          width="auto"
        >
          <ColumnsDirective>
            {columns.map((item, index) =>
              <ColumnDirective key={index} {...item} />
            )}
          </ColumnsDirective>
          <Inject services={[Page, Search, Toolbar, Selection, Sort]} />
        </GridComponent>
      </div>
    </div>
  );
};

export default Performance;

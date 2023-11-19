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
import Breadcrumbs from "../../components/Breadcrumbs";
import { useStateContext } from "../../contexts/ContextProvider";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import DeleteLeavePopup from "../../components/LeaveComponents/DeleteLeavePopup";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AiOutlineSearch, AiOutlineEye } from "react-icons/ai";
import { RiDeleteBin2Line } from "react-icons/ri";
import { TbBookUpload } from "react-icons/tb";
import { GoPersonAdd } from "react-icons/go";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import ProgressBar from "../../components/TrainingComponents/ProgressBar";
import EditTrainingPopup from "../../components/TrainingComponents/EditTrainingPopup";
import CreateTrainingPopup from "../../components/TrainingComponents/CreateTrainingPopup";
import CardTitle from "../../components/CardTitle";
import PostMaterials from "../../components/TrainingComponents/PostMaterials";
import avatar3 from "../../data/avatar3.jpg";
import avatar4 from "../../data/avatar4.jpg";

const designationOptions = {
  Medical: ["Surgery", "Pediatrics", "Anesthesiology", "Pathology"],
  Emergency: ["Nurse", "Med Tech", "Emergency Physician"],
  Administrative: ["Finance", "IT", "Compliance", "Quality"],
  Specialized: ["Dermatology"]
};

const Learning = ({ EmployeeID }) => {
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const { currentColor } = useStateContext();

  const [posts, setPosts] = useState([
    {
      src: avatar3,
      name: "Christa Riess",
      date: "November 10, 2023",
      title: "Anatomy & Physiology, Medical-Surgical Nursing",
      description:
        "Explore the intricate world of Anatomy & Physiology intertwined with the complexities of Medical-Surgical Nursing. Delve into the fundamental understanding of the human body's structure and function, coupled with the specialized care and interventions required in medical-surgical settings.",
      link: "https://www.youtube.com/watch?v=XiTmqC_JyzU",
      pdfLink: "https://example.com/sample.pdf"
    },
    {
      src: avatar4,
      name: "Zecharia Arlert",
      date: "November 20, 2023",
      title: "Emergency Medicine Protocols Handbook",
      description:
        "This handbook is a student-driven initiative developed in order to help you succeed on your emergency medicine rotation. It provides concise approaches to key patient presentations you will encounter in the emergency department. This guide has been peer-reviewed by staff physicians to ensure evidence is up-todate and accurate.",
      link:
        "https://www.emra.org/students/advising-resources/effective-consultation-in-emergency-medicine",
      pdfLink:
        "https://emottawablog.com/wp-content/uploads/2018/03/EM-Handbook-2nd-Edition-2020.pdf"
    }
  ]);

  const breadcrumbLinks = [
    { to: "/dashboard", label: "Home" },
    { to: "/learning materials", label: "Learning Materials" }
  ];

  const handleDepartmentChange = event => {
    const selectedDepartment = event.target.value;
    setDepartment(selectedDepartment);
    setDesignation(""); // Reset designation when department changes
  };

  const handleDesignationChange = event => {
    setDesignation(event.target.value);
  };

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
            Manage Learning Resources
          </p>
          <Breadcrumbs links={breadcrumbLinks} />
        </div>
      </div>
      <div className="md:m-4 mt-15 p-2 md:p-4 bg-white sm:rounded-xl rounded-md drop-shadow-lg mb-8 md:mb-8">
        <CardTitle title="Find Learning Materials by Category" />
        <div className="flex flex-col md:flex-row md:justify-end justify-between gap-2">
          <div className="text-start">
            <p className="mb-2 text-xs md:text-sm">Department</p>

            <Select
              className="h-10 sm:w-52 w-[100%]"
              value={department}
              onChange={handleDepartmentChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <p className="md:w-full text-xs md:text-md max-w-xs">
                  Select Department
                </p>
              </MenuItem>

              <MenuItem className="text-sm  text-md" value="Medical">
                <p>Medical</p>
              </MenuItem>

              <MenuItem className="text-sm  text-md" value="Emergency">
                <p>Emergency</p>
              </MenuItem>

              <MenuItem className="text-sm  text-md" value="Administrative">
                <p>Administrative</p>
              </MenuItem>

              <MenuItem className="text-sm  text-md" value="Specialized">
                <p>Specialized</p>
              </MenuItem>
            </Select>
          </div>
          <div className="text-start ">
            <p className="mb-2 text-xs md:text-sm">Specialized Skill</p>
            <Select
              className="h-10 sm:w-52 w-[100%]"
              value={designation}
              onChange={handleDesignationChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <p className="md:w-52 text-xs md:text-md max-w-xs">
                  Select Designation
                </p>
              </MenuItem>
              {designationOptions[department] &&
                designationOptions[department].map((option, index) =>
                  <MenuItem
                    key={index}
                    value={option}
                    className="text-sm  text-xs "
                  >
                    {option}
                  </MenuItem>
                )}
            </Select>
          </div>
          <div className="flex gap-1">
            <button
              className="mt-8 h-8 md:w-8 w-8"
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
              <AiOutlineSearch title="Find" />
            </button>

            <button
              className="mt-8 h-8 md:w-8 w-8"
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
              <TbBookUpload title="Upload Materials" />
            </button>
          </div>
        </div>
      </div>
      <div>
        {posts.map((post, index) =>
          <PostMaterials key={index} postData={post} />
        )}
      </div>
    </div>
  );
};

export default Learning;

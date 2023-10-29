import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye } from "react-icons/ai";
const EditEmployeeAB = ({ EmployeeID }) => {
  return (
    <div className="text-base">
      <Link
        to={`/set salary/emp-set-salary/${EmployeeID}`} // Modify the link to include the EmployeeID
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
            fontSize: "18px" // You can adjust the size as needed
          }}
        />
      </Link>
    </div>
  );
};

export default EditEmployeeAB;

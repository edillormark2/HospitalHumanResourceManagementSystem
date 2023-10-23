import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";

const EditEmployeeAB = ({ EmployeeID }) => {
  return (
    <div className="text-base">
      <Link
        to={`/employees/edit-employee/${EmployeeID}`} // Modify the link to include the EmployeeID
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "5px",
          marginRight: "10px",
          backgroundColor: "#03C9D7",
          border: "none",
          cursor: "pointer",
          borderRadius: "8px",
          textDecoration: "none",
        }}
      >
        <AiOutlineEdit
          title="Edit"
          style={{
            color: "white",
          }}
        />
      </Link>
    </div>
  );
};

export default EditEmployeeAB;

import React, { useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import Popup from "../components/EditLeavePopup";

const EditLeaveAB = ({ EmployeeID }) => {
  const [openEditPopup, setOpenEditPopup] = useState(false);

  const handleOpenEdit = () => {
    setOpenEditPopup(true);
  };

  const handleClosePopup = () => {
    setOpenEditPopup(false);
  };

  return (
    <div className="text-base">
      <button
        onClick={handleOpenEdit}
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
          textDecoration: "none",
        }}
      >
        <AiOutlineEdit
          title="Edit"
          style={{
            color: "white",
            fontSize: "18px",
          }}
        />
      </button>
      {openEditPopup && (
        <Popup
          openPopup={openEditPopup}
          setOpenPopup={handleClosePopup}
          EmployeeID={EmployeeID} // Pass the EmployeeID to the popup
        />
      )}
    </div>
  );
};

export default EditLeaveAB;

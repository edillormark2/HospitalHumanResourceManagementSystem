import React from "react";
import { FiPlus } from "react-icons/fi";
import { useStateContext } from "../contexts/ContextProvider";

const CreateButton = ({ onClick, title }) => {
  const { currentColor } = useStateContext();
  return (
    <button
      className="create-button"
      style={{
        color: "white",
        backgroundColor: currentColor,
        borderRadius: "4px",
        padding: "7px 10px",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        transition: "box-shadow 0.3s", // Added transition for smooth hover effect
        // Apply drop shadow on hover
        ":hover": {
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)"
        }
      }}
      onClick={onClick}
      title={title}
    >
      <FiPlus style={{ color: "white" }} />
    </button>
  );
};

export default CreateButton;

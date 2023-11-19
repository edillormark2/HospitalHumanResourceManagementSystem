import React, { useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";

const ProgressBar = ({
  progress,
  width = "160px",
  height = "5px",
  controllable = false,
  background
}) => {
  const { currentColor } = useStateContext();
  const [currentProgress, setCurrentProgress] = useState(progress);

  // Function to determine color based on percentage
  const getColor = percentage => {
    if (percentage <= 20) {
      return "#DE3163";
    } else if (percentage <= 50) {
      return "#F39C12";
    } else if (percentage <= 80) {
      return "#03C9D7";
    } else if (percentage <= 100) {
      return "#2ECC71";
    }
  };

  const progressBarColor = getColor(parseInt(currentProgress));

  const handleInputChange = e => {
    if (controllable) {
      setCurrentProgress(e.target.value);
    }
  };

  return (
    <div className="flex flex-col items-start">
      <div className="text-xs mb-1">
        {currentProgress}
      </div>
      <div
        className={`rounded`}
        style={{
          width,
          height,
          backgroundColor: background || "transparent",
          cursor: controllable ? "pointer" : "default" // Set cursor pointer if controllable
        }}
      >
        {controllable
          ? <input
              type="range"
              min="0"
              max="100"
              value={currentProgress}
              onChange={handleInputChange}
              style={{
                width: "100%",
                height,
                backgroundColor: progressBarColor,
                borderRadius: "4px",
                cursor: "pointer" // Set cursor to pointer for input
              }}
            />
          : <div
              className={`h-full rounded`}
              style={{
                width: `${currentProgress}`,
                backgroundColor: progressBarColor,
                transition: "width 0.3s ease-in-out"
              }}
            />}
      </div>
    </div>
  );
};

export default ProgressBar;

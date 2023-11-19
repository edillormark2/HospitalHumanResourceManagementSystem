import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ModalClose from "@mui/joy/ModalClose";
import CardTitle from "../CardTitle";
import { Divider } from "@mui/joy";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewClaims = props => {
  const isMobile = window.innerWidth <= 768 && window.innerHeight <= 1024;
  const { openPopup, setOpenPopup, EmployeeID } = props;

  const [Name] = useState("Daniel Mark");
  const [Department] = useState("Medical");
  const [ClaimDate] = useState("Nov 10, 2023");
  const [ExpenseType] = useState("Travel");
  const [Description] = useState("Conference");
  const [Amount] = useState("₱ 100,000");
  const [Status] = useState("Approved");

  const dynamicPopupStyle = {
    position: "absolute",
    top: isMobile ? "35%" : "28%",
    left: "50%",
    width: "min(80%, 600px)", // Adjust the maximum width as needed (600px in this example)
    height: isMobile ? "60vh" : "min(60%, 60vh)", // Adjust the maximum height as needed (1500px in this example)
    transform: "translate(-50%, -50%)",
    overflowY: "auto",
    p: 4
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
          <ModalClose variant="outlined" onClick={() => setOpenPopup(false)} />
          <CardTitle title="CLaims Action" />
          <Divider />

          <div className="flex justify-between w-full mt-5 mb-3">
            <div className="flex flex-col">
              <p className="flex justify-star font-semibold text-sm">
                Employee Name
              </p>
            </div>
            <div className="flex flex-col">
              <p className="flex justify-center text-sm">
                {Name}
              </p>
            </div>
          </div>
          <Divider />
          <div className="flex justify-between w-full mt-5 mb-3">
            <div className="flex flex-col">
              <p className="flex justify-star font-semibold text-sm">
                Department
              </p>
            </div>
            <div className="flex flex-col">
              <p className="flex justify-end text-sm">
                {Department}
              </p>
            </div>
          </div>
          <Divider />
          <div className="flex justify-between w-full mt-5 mb-3">
            <div className="flex flex-col">
              <p className="flex justify-star font-semibold text-sm">
                Claim Date
              </p>
            </div>
            <div className="flex flex-col">
              <p className="flex justify-end text-sm">
                {ClaimDate}
              </p>
            </div>
          </div>
          <Divider />
          <div className="flex justify-between w-full mt-5 mb-3">
            <div className="flex flex-col">
              <p className="flex justify-star font-semibold text-sm">
                ExpenseType
              </p>
            </div>
            <div className="flex flex-col">
              <p className="flex justify-end text-sm">
                {ExpenseType}
              </p>
            </div>
          </div>
          <Divider />
          <div className="flex justify-between w-full mt-5 mb-3">
            <div className="flex flex-col">
              <p className="flex justify-star font-semibold text-sm">
                Description
              </p>
            </div>
            <div className="flex flex-col">
              <p className="flex justify-end text-sm">
                {Description}
              </p>
            </div>
          </div>
          <Divider />
          <div className="flex justify-between w-full mt-5 mb-3">
            <div className="flex flex-col">
              <p className="flex justify-star font-semibold text-sm">Amount</p>
            </div>
            <div className="flex flex-col">
              <p className="flex justify-end text-sm">
                {Amount}
              </p>
            </div>
          </div>
          <Divider />
          <div className="flex justify-between w-full mt-5 mb-3">
            <div className="flex flex-col">
              <p className="flex justify-star font-semibold text-sm">Status</p>
            </div>
            <div className="flex flex-col">
              <p className="flex justify-end text-sm">
                {Status}
              </p>
            </div>
          </div>
          <Divider />

          <div class="mt-6 flex justify-end items-center gap-3">
            <button
              type="button"
              style={{
                color: "white",
                backgroundColor: "#2ECC71",
                borderRadius: "10px",
                width: "100px"
              }}
              className={`text-md p-3  `}
            >
              Approved
            </button>
            <button
              type="button"
              style={{
                backgroundColor: "#DE3163",
                color: "white",
                borderRadius: "10px",
                width: "100px"
              }}
              className={`text-md p-3 `}
            >
              Reject
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ViewClaims;

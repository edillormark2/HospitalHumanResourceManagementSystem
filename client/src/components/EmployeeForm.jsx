import React, { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export const EmployeeForm = () => {
  const { currentColor } = useStateContext();

  return (
    <div className=" bg-white dark:bg-[#42464D] p-8 rounded-lg w-96 ">
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            required
            id="outlined-required"
            label="Required"
            defaultValue="Hello World"
          />
          <TextField
            disabled
            id="outlined-disabled"
            label="Disabled"
            defaultValue="Hello World"
          />
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
        </div>
      </Box>
    </div>
  );
};

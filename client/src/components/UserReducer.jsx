import { createSlice } from "@reduxjs/toolkit";
import { employeesData } from "../data/dummy";
// Define some dummy data in case employeesData is not available
const dummyEmployeeData = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  // ... add more dummy data as needed
];

// Use employeesData if available, otherwise use dummyEmployeeData
const initialState = employeesData || dummyEmployeeData;

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      // Add the new employee to the state
      state.push(action.payload);
    },
    updateEmployee: (state, action) => {
      const { id, updatedEmployeeData } = action.payload;
      const employeeIndex = state.findIndex((employee) => employee.id === id);

      if (employeeIndex !== -1) {
        state[employeeIndex] = {
          ...state[employeeIndex],
          ...updatedEmployeeData,
        };
      }
    },
  },
});

export const { addEmployee, updateEmployee } = userSlice.actions;
export default userSlice.reducer;

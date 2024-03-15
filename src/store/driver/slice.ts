import { createSlice } from "@reduxjs/toolkit";

const initialState: Driver = {
  id: "8289f072",
  name: "Marley Johns",
};

const driverSlice = createSlice({
  name: "driver",
  initialState,
  reducers: {},
});

export const driverActions = driverSlice.actions;
export default driverSlice;

import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";

const initialState: Ride[] = [];

export const fetchRides = createAsyncThunk("ride/fetchRides", async () => {
  const mockData = require("../../rides.json");
  return mockData;
});

const ridesReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchRides.fulfilled, (state, action) => {
    return action.payload;
  });
});

export default ridesReducer;

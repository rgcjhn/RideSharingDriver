import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: Ride[] = [];

export const fetchRides = createAsyncThunk("ride/fetchRides", async () => {
  const mockData = require("../../rides.json");
  return mockData;
});

const ridesSlice = createSlice({
  name: "rides",
  initialState,
  reducers: {
    setRide: (state, action: PayloadAction<Ride>) => {
      const { payload } = action;
      const index = state.findIndex((s) => s.id === payload.id);
      state[index] = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRides.fulfilled, (_, action) => {
      return action.payload;
    });
  },
});

export const ridesActions = { ...ridesSlice.actions, fetchRides };
export default ridesSlice;

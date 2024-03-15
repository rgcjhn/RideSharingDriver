import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as Location from "expo-location";
import moment from "moment";
import R from "res/R";

const initialState: Ride[] = [];

export const fetchRides = createAsyncThunk(
  "ride/fetchRides",
  async (userLocation: Location.LocationObject) => {
    let mockData: Ride[] = require("../../rides.json");

    mockData = mockData.map((v) => {
      const pickupDate = moment().add(
        Math.floor(Math.random() * 10 + 10),
        "minutes"
      );
      const postDate = moment().subtract(
        Math.floor(Math.random() * 10 + 1),
        "minutes"
      );

      v.pickupTime = pickupDate.toISOString();
      v.timestamp = postDate.toISOString();

      const pickup = R.helpers.randomCircumferencePoint(
        userLocation.coords,
        1500 // 1.5km
      );
      const destination = R.helpers.randomCircumferencePoint(
        pickup,
        1500 // 1.5km
      );
      v.pickupLocation = pickup;
      v.destination = destination;

      return v;
    });

    await R.helpers.timeout(2000);
    return mockData;
  }
);

export const setRide = createAsyncThunk("ride/setRide", async (ride: Ride) => {
  await R.helpers.timeout(2000);
  return ride;
});

const ridesSlice = createSlice({
  name: "rides",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRides.fulfilled, (_, action) => {
      return action.payload;
    });

    builder.addCase(setRide.fulfilled, (state, action) => {
      const { payload } = action;
      const index = state.findIndex((s) => s.id === payload.id);
      state[index] = payload;
    });
  },
});

export const ridesActions = { ...ridesSlice.actions, fetchRides, setRide };
export default ridesSlice;

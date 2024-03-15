import { createSlice } from "@reduxjs/toolkit";

const mockUsers = require("../../users.json");
const initialState: User[] = [...mockUsers];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

export const userActions = usersSlice.actions;
export default usersSlice;

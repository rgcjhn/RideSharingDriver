import { createReducer } from "@reduxjs/toolkit";

const mockUsers = require("../../users.json");

const initialState: User[] = [...mockUsers];

const usersReducer = createReducer(initialState, (builder) => {});

export default usersReducer;

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import driverSlice from "./driver/slice";
import ridesSlice from "./rides/slice";
import usersSlice from "./users/slice";

const combinedReducers = combineReducers({
  driver: driverSlice.reducer,
  rides: ridesSlice.reducer,
  users: usersSlice.reducer,
});

export const store = configureStore({
  reducer: combinedReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

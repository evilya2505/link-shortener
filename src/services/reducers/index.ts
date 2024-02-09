import { combineReducers } from "redux";
import authSlice from "./auth";
import statisticsSlice from "./statistics";
import paginationSlice from "./pagination";

export const rootReducer = combineReducers({
  auth: authSlice,
  statistics: statisticsSlice,
  pagination: paginationSlice,
});

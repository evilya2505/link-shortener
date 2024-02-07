import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TUserInfo } from "../../utils/types";

export interface TAuthListState {
  userInfo: TUserInfo;
  request: boolean;
  requestFailed: boolean;
  loggedIn: boolean;
}

export const initialState: TAuthListState = {
  userInfo: { username: "" },
  request: false,
  requestFailed: false,
  loggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo(state: TAuthListState, action: PayloadAction<TUserInfo>) {
        state.userInfo = action.payload;
        state.loggedIn = true;
    },
    registerRequest(state: TAuthListState) {
        state.request = true;
        state.requestFailed = false;
    },
    registerSuccess(state: TAuthListState, action: PayloadAction<TUserInfo>) {
        state.request = false;
        state.requestFailed = false;
    },
    loginRequest(state: TAuthListState) {
        state.request = true;
        state.requestFailed = false;
    },
    loginSuccess(state: TAuthListState, action: PayloadAction<TUserInfo>) {
        state.userInfo = action.payload;
        state.request = false;
        state.requestFailed = false;
        state.loggedIn = true;
    },
    requestFailed(state: TAuthListState) {
        state.request = false;
        state.requestFailed = true;
    },
    logoutSuccess(state: TAuthListState) {
        state.loggedIn = false;
        state.userInfo = { username: "" };
    }
  },
});
export const { setUserInfo, registerRequest, registerSuccess, requestFailed, loginRequest, loginSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;
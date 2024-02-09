import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TUserInfo } from "../../utils/types";

export interface TAuthListState {
  userInfo: TUserInfo;
  request: boolean;
  loggedIn: boolean;
  registerSuccess: boolean;
  errorText: string;
  registerFailed: boolean;
  loginFailed: boolean;
}

export const initialState: TAuthListState = {
  userInfo: { username: "" },
  request: false,
  registerFailed: false,
  loginFailed: false,
  loggedIn: false,
  registerSuccess: false,
  errorText: "",
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
      state.loginFailed = false;
      state.request = true;
      state.registerFailed = false;
    },
    registerSuccess(state: TAuthListState, action: PayloadAction<TUserInfo>) {
      state.request = false;
      state.registerSuccess = true;
      state.registerFailed = false;
      state.errorText = "";
    },
    loginRequest(state: TAuthListState) {
      state.registerFailed = false;
      state.request = true;
      state.loginFailed = false;
    },
    loginSuccess(state: TAuthListState, action: PayloadAction<TUserInfo>) {
      state.userInfo = action.payload;
      state.request = false;
      state.loginFailed = false;
      state.loggedIn = true;
      state.errorText = "";
    },
    loginRequestFailed(
      state: TAuthListState,
      action: PayloadAction<string | undefined>
    ) {
      state.request = false;
      state.loginFailed = true;
      if (action?.payload) state.errorText = action.payload;
    },
    tokenRequestFailed(
      state: TAuthListState,
      action: PayloadAction<string | undefined>
    ) {
      state.request = false;
      state.loginFailed = true;
      if (action?.payload) state.errorText = action.payload;
    },
    registerRequestFailed(
      state: TAuthListState,
      action: PayloadAction<string | undefined>
    ) {
      state.request = false;
      state.registerFailed = true;
      if (action?.payload) state.errorText = action.payload;
    },
    logoutSuccess(state: TAuthListState) {
      state.loggedIn = false;
      state.userInfo = { username: "" };
    },
  },
});
export const {
  loginRequestFailed,
  registerRequestFailed,
  setUserInfo,
  registerRequest,
  registerSuccess,
  loginRequest,
  loginSuccess,
  logoutSuccess,
} = authSlice.actions;

export default authSlice.reducer;

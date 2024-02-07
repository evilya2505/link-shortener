import { AppDispatch } from "../store";
import {
    registerRequest,
    registerSuccess,
    requestFailed,
    loginRequest,
    loginSuccess,
    logoutSuccess
} from "../reducers/auth";
import mainApi from "../../utils/mainApi";
import { FormValues } from "../../utils/types";

export const register = (userData: FormValues) => {
  return function (dispatch: AppDispatch) {
    dispatch(registerRequest());

    mainApi
      .register(userData)
      .then((data) => {
        console.log(data);
        dispatch(registerSuccess(data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(requestFailed());
      });
  };
};

export const login = (userData: FormValues) => {
    return function (dispatch: AppDispatch) {
      dispatch(loginRequest());
  
      mainApi
        .login(userData)
        .then((data) => {
          console.log(data);
          localStorage.setItem("access_token", data.access_token);
          localStorage.setItem("username", userData.username);
          dispatch(loginSuccess({ username: userData.username }));
        })
        .catch((err) => {
          console.log(err);
          dispatch(requestFailed());
        });
    };
};

export const logout = () => {
    return function (dispatch: AppDispatch) {
    localStorage.removeItem("access_token");
      localStorage.removeItem("username");
      dispatch(logoutSuccess());
    };
};
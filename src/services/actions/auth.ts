import { AppDispatch } from "../store";
import {
  registerRequest,
  registerSuccess,
  loginRequest,
  loginSuccess,
  logoutSuccess,
  setUserInfo,
  loginRequestFailed,
  registerRequestFailed,
} from "../reducers/auth";
import mainApi from "../../utils/mainApi";
import { FormValues } from "../../utils/types";

export const register = (userData: FormValues) => {
  return function (dispatch: AppDispatch) {
    dispatch(registerRequest());

    mainApi
      .register(userData)
      .then((data) => {
        dispatch(registerSuccess(data));
        localStorage.setItem("register_success", "true");
      })
      .catch((err) => {
        console.log(err);
        if (err === "Ошибка: 400") {
          dispatch(
            registerRequestFailed(
              "Пользователь с таким юзернейм уже существует."
            )
          );
        } else {
          dispatch(registerRequestFailed());
        }
      });
  };
};

export const login = (userData: FormValues) => {
  return function (dispatch: AppDispatch) {
    dispatch(loginRequest());

    mainApi
      .login(userData)
      .then((data) => {
        localStorage.removeItem("token_error");

        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("username", userData.username);
        dispatch(loginSuccess({ username: userData.username }));
      })
      .catch((err) => {
        console.log(err);
        if (err === "Ошибка: 400") {
          dispatch(loginRequestFailed("Неверный пароль или юзернейм."));
        } else {
          dispatch(loginRequestFailed());
        }
      });
  };
};

export const checkIsTokenValid = () => {
  return function (dispatch: AppDispatch) {
    const username = localStorage.getItem("username");

    mainApi
      .getStatistics({})
      .then((data) => {
        dispatch(setUserInfo({ username: username || "" }));
      })
      .catch((err) => {
        if (err === "Ошибка: 401") {
          dispatch(logout());
        }
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

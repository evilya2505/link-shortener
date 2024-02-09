import { AppDispatch } from "../store";
import {
  getStatisticsRequest,
  getStatisticsSuccess,
  squeezeLinkRequest,
  squeezeLinkSuccess,
  requestFailed,
} from "../reducers/statistics";
import mainApi from "../../utils/mainApi";
import { TSqueezeRequest } from "../../utils/types";
import { setTotalCount } from "../reducers/pagination";
import { countPages } from "../../utils/utils";
import { logout } from "./auth";
import { ELEMENTS_PER_PAGE } from "../../utils/constants";

export const getStatistics = (requestData: TSqueezeRequest) => {
  return function (dispatch: AppDispatch) {
    dispatch(getStatisticsRequest());

    mainApi
      .getStatistics(requestData)
      .then((data) => {
        dispatch(getStatisticsSuccess(data.result));
        if (data.totalCount)
          dispatch(
            setTotalCount(countPages(ELEMENTS_PER_PAGE, data.totalCount))
          );
      })
      .catch((err) => {
        if (err === "Ошибка: 401") {
          localStorage.setItem("token_error", "true");

          dispatch(logout());
        }
        dispatch(requestFailed());
      });
  };
};

export const squeezeLink = (targetLink: string) => {
  return function (dispatch: AppDispatch) {
    dispatch(squeezeLinkRequest());

    mainApi
      .postSqueeze(targetLink)
      .then((data) => {
        dispatch(squeezeLinkSuccess(data));
      })
      .catch((err) => {
        console.log(err);
        if (err === "Ошибка: 401") {
          localStorage.setItem("token_error", "true");

          dispatch(logout());
        }
        dispatch(requestFailed());
      });
  };
};

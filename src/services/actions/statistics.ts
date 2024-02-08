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

export const getStatistics = (requestData: TSqueezeRequest) => {
  return function (dispatch: AppDispatch) {
    dispatch(getStatisticsRequest());
    
    mainApi
      .getStatistics(requestData)
      .then((data) => {
        console.log(data);
        dispatch(getStatisticsSuccess(data.result));
        if (data.totalCount) dispatch(setTotalCount(countPages(10, data.totalCount)));
      })
      .catch((err) => {
        if (err == "Ошибка: 401") dispatch(logout());
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
          console.log(data);
          dispatch(squeezeLinkSuccess(data));
        })
        .catch((err) => {
          console.log(err);
          if (err == "Ошибка: 401") dispatch(logout());
          dispatch(requestFailed());
        });
    };
  };
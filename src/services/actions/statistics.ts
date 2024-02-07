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
        console.log(err);
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
          dispatch(requestFailed());
        });
    };
  };
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TSqueezeObj } from "../../utils/types";

export interface TStatisticsListState {
    lastSqueezeResult: TSqueezeObj | null;
    totalCount: number;
    statistics: TSqueezeObj[];
  request: boolean;
  requestFailed: boolean;
}

export const initialState: TStatisticsListState = {
    lastSqueezeResult: null,
    totalCount: 0,
  statistics: [],
  request: false,
  requestFailed: false,
};

const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    setTotalCount(state: TStatisticsListState, action: PayloadAction<number>) {
        state.totalCount = action.payload;
    },
    getStatisticsRequest(state: TStatisticsListState) {
        state.request = true;
        state.requestFailed = false;
    },
    getStatisticsSuccess(state: TStatisticsListState, action: PayloadAction<TSqueezeObj[]>) {
        state.statistics = action.payload;
        state.request = false;
        state.requestFailed = false;
    },
    squeezeLinkRequest(state: TStatisticsListState) {
        state.request = true;
        state.requestFailed = false;
    },
    squeezeLinkSuccess(state: TStatisticsListState, action: PayloadAction<TSqueezeObj>) {
        state.lastSqueezeResult = action.payload;
        state.request = false;
        state.requestFailed = false;
    },
    requestFailed(state: TStatisticsListState) {
        state.request = false;
        state.requestFailed = true;
    },
  },
});
export const { setTotalCount, getStatisticsRequest, getStatisticsSuccess, requestFailed, squeezeLinkSuccess, squeezeLinkRequest } = statisticsSlice.actions;

export default statisticsSlice.reducer;
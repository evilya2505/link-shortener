import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface TPaginationListState {
  currentPage: number;
  totalPages: number;
}

export const initialState: TPaginationListState = {
  currentPage: 1,
  totalPages: 1,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    setTotalCount(state: TPaginationListState, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
    forward(state: TPaginationListState) {
      state.currentPage += 1;
    },
    backward(state: TPaginationListState) {
      state.currentPage -= 1;
    },
    choosePage(state: TPaginationListState, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});
export const { setTotalCount, forward, backward, choosePage } =
  paginationSlice.actions;

export default paginationSlice.reducer;

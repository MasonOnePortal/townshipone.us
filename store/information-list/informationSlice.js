import { createSlice } from "@reduxjs/toolkit";
import { informationApi } from "./informationService";
const initialState = {};
export const informationSlice = createSlice({
  name: "information",
  initialState,
  reducers: {},
});
export const { updateReview } = informationSlice.actions;
export default informationSlice.reducer;

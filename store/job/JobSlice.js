import { createSlice } from "@reduxjs/toolkit";
import { jobApi } from "./JobService";
const initialState = {};
export const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {},
});

export default jobSlice.reducer;

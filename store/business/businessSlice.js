import { createSlice } from "@reduxjs/toolkit";
import { businessApi } from "./businessService";
const initialState = {
  posts: [],
  business: {},
  review_Rating: {},
};
export const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    updateReview: (state) => {
      state.review_Rating = { data };
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      businessApi.endpoints.getBusiness.matchFulfilled,
      (state, { payload }) => {
        state.business = { ...payload };
      }
    );
  },
});
export const { updateReview } = businessSlice.actions;
export default businessSlice.reducer;

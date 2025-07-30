import { createSlice } from "@reduxjs/toolkit";
import { planApi } from "./PlanService";
const EmptyPlan = {
  id: "",
  name: "",
  jobPosts: "",
  propertyPosts: "",
  images: "",
  price: "",
  planType: "",
  businesses: "",
  videos: "",
  canAddBusiness: false,
  canPostJob: false,
  canPostRealEstate: false,
  canUploadImage: false,
  canUploadVideo: false,
};
const initialState = {
  currentPlan: {
    ...EmptyPlan,
  },
};

export const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    updateCurrentPlan: (state, action) => {
      state.currentPlan = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      planApi.endpoints.getOnePlan.matchFulfilled,
      (state, { payload }) => {
        state.currentPlan = { ...payload };
      }
    );
  },
});

export const { updateCurrentPlan } = planSlice.actions;

export default planSlice.reducer;

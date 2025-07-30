import { createSlice } from "@reduxjs/toolkit";
import { mainCategoryApi } from "./mainCategoryService";
const initialState = {};
export const mainCategoriesSlice = createSlice({
  name: "mainCategory",
  initialState,
  reducers: {},
});
export default mainCategoriesSlice.reducer;

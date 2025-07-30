"use client";
import { createSlice, current } from "@reduxjs/toolkit";
import { getToken, removeToken, setToken } from "@/utils/token";
import { authApi } from "./authService";
import { hasCookie, setCookie, deleteCookie } from "cookies-next";
import { isNull } from "lodash";
const EmptyUser = {
  id: "",
  first_name: "",
  last_name: "",
  email: "",
  role: "",
};

const initialState = {
  currentUser: {
    ...EmptyUser,
  },
  businessName: "",
  sidebarStatus: false,
  filterSidebarStatus: false,
  profileSidebarStatus: false,
  content: {},
  isLoggedIn: hasCookie("isAuthenticated") ? true : false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      if (hasCookie("isAuthenticated")) {
        deleteCookie("isAuthenticated");
      }
      if (hasCookie("jwt_token")) {
        deleteCookie("jwt_token");
      }
      state.currentUser = { ...EmptyUser };
      state.isLoggedIn = false;
      removeToken();
    },
    updateToken: (state, action) => {
      console.log("token update", state, action.payload);
    },
    updateBusinessName: (state, action) => {
      state.businessName = action.payload;
    },
    toggleSidebar: (state, action) => {
      state.sidebarStatus = action.payload;
    },
    toggleFilerSidebar: (state, action) => {
      state.filterSidebarStatus = action.payload;
    },
    toggleProfileSidebar: (state, action) => {
      state.profileSidebarStatus = action.payload;
    },
    updateCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    pageContent: (state, action) => {
      state.content = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        setToken(payload.api_token);
        updateToken(payload);
        state.isLoggedIn = !isNull(payload.emailVerificationStatus)
          ? true
          : false;
        // state.isLoggedIn = true;
      }
    );
    builder.addMatcher(
      authApi.endpoints.currentUser.matchFulfilled,
      (state, { payload }) => {
        state.currentUser = { ...payload };
      }
    );
  },
});

export const {
  logoutUser,
  toggleSidebar,
  pageContent,
  toggleFilerSidebar,
  toggleProfileSidebar,
  updateToken,
  updateBusinessName,
  updateCurrentUser,
} = authSlice.actions;

export default authSlice.reducer;

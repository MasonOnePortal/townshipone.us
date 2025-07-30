import { createSlice, current } from "@reduxjs/toolkit";

const EmptyUser = {
  userId: "",
  name: "",
  email: "",
  image: "",
};
const initialState = {
  data: {
    ...EmptyUser,
  },
  allUsers: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.data = EmptyUser;
      state.isLoggedIn = false;
    },
  },

});

// Action creators are generated for each case reducer function
export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;

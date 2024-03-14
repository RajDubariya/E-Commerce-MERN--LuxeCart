import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("User")),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("User", JSON.stringify(action.payload));
    },
    removeUser: (state, action) => {
      state.user = null;
      localStorage.removeItem("User");
    },
  },
});

export const { setUser, removeUser } = authSlice.actions;

export default authSlice.reducer;

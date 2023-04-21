import { createSlice } from "@reduxjs/toolkit";

const state = {
  userId: null,
  userName: null,
  stateChange: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      userName: payload.userName,
      stateChange: payload.stateChange,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: () => state,
  },
});

export default authSlice;

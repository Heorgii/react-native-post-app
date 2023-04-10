import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    userName: null,
  },
  reducers:{

  }
});

export default authSlice;

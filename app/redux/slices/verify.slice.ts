import { createSlice } from "@reduxjs/toolkit";

type VerifyState = {
  isVerified: boolean;
};

const initialState: VerifyState = {
  isVerified: false,
};

const verifySlice = createSlice({
  name: "verify",
  initialState,
  reducers: {
    verify: (state) => {
      state.isVerified = true;
    },
    unVerify: (state) => {
      state.isVerified = false;
    },
  },
});

export const { verify, unVerify } = verifySlice.actions;
export default verifySlice.reducer;

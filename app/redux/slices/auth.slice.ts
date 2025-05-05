import { User } from "@/app/types/user";
import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  Token: string | null;
  localization: string;
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  Token: null,
  localization: "en",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.Token = action.payload.accessToken;
      state.localization = action.payload.localization;
    },
    changeLocalization: (state, action) => {
      state.localization = action.payload;
    },
    logOut: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.Token = null;
    },
  },
});

export const { signIn, logOut, changeLocalization } = authSlice.actions;
export default authSlice.reducer;

import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

// import { authApi } from './api/api';

export interface AuthenticationState {
  userId: string;
  accessToken: string;
  refreshToken: string;
}

const initialState: AuthenticationState = {
  userId: "",
  accessToken: "",
  refreshToken: ""
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refreshToken = action.payload;
    },
    login: (state, action: PayloadAction<AuthenticationState>) => {
      state.userId = action.payload.userId;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout: (state) => {
      state.userId = "";
      state.accessToken = "";
      state.refreshToken = "";
    }
  }
});

export const { setAccessToken, setRefreshToken, login, logout } =
  authenticationSlice.actions;

export default authenticationSlice.reducer;

export const selectAccessToken = (state: RootState) =>
  state.authentication.accessToken;

export const selectRefreshToken = (state: RootState) =>
  state.authentication.refreshToken || localStorage.getItem("refreshToken");

export const selectUserId = (state: RootState) => state.authentication.userId;
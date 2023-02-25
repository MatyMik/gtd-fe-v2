import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { User } from './authentication.types';
import jwt_decode from 'jwt-decode';
import { authApi } from './api/api';

export interface AuthenticationState {
	userId: string;
	accessToken: string;
	refreshToken: string;
}

const initialState: AuthenticationState = {
	userId: '',
	accessToken: '',
	refreshToken: '',
};

export const authenticationSlice = createSlice({
	name: 'authentication',
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
			state.userId = '';
			state.accessToken = '';
			state.refreshToken = '';
		},
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
				const { accessToken, refreshToken } = action.payload;
				const user: User = jwt_decode(accessToken);

				state.accessToken = accessToken;
				state.refreshToken = refreshToken;
				state.userId = user.userId;
				localStorage.setItem('refreshToken', refreshToken);
			})
			.addMatcher(authApi.endpoints.refresh.matchFulfilled, (state, action) => {
				const { accessToken, refreshToken } = action.payload;
				const user: User = jwt_decode(accessToken);

				state.accessToken = accessToken;
				state.refreshToken = refreshToken;
				state.userId = user.userId;
				localStorage.setItem('refreshToken', refreshToken);
			});
	},
});

export const { setAccessToken, setRefreshToken, login, logout } =
	authenticationSlice.actions;

export default authenticationSlice.reducer;

export const selectAccessToken = (state: RootState) =>
	state.authentication.accessToken;

export const selectRefreshToken = (state: RootState) =>
	state.authentication.refreshToken || localStorage.getItem('refreshToken');

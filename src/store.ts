import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from './Authentication/Authentication.store';
import { api } from './api/api';

export const store = configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		authentication: authenticationReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

/* eslint camelcase: 0 */ //
import {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { logout, setAccessToken } from '../Authentication/Authentication.store';
import { RootState } from '../store';

const baseQuery = (unauthorized: boolean) =>
	fetchBaseQuery({
		baseUrl: 'http://localhost:5000',
		prepareHeaders: (headers, { getState }) => {
			const {
				authentication: { accessToken, refreshToken },
			} = getState() as RootState;
			if (!unauthorized && accessToken && !headers.get('Authorization')) {
				headers.set('Authorization', `Bearer ${accessToken}`);
			} else if (
				(refreshToken || localStorage.getItem('refreshToken')) &&
				unauthorized
			) {
				headers.set(
					'Authorization',
					`Bearer ${String(
						refreshToken || localStorage.getItem('refreshToken')
					)}`
				);
			}
			return headers;
		},
	});
const mutex = new Mutex();

const baseQueryWithReauth: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	await mutex.waitForUnlock();

	let result = await baseQuery(
		typeof args !== 'string' && args?.url === '/auth/refresh'
	)(args, api, extraOptions);
	if (result.error && result.error.status === 401) {
		if (!mutex.isLocked()) {
			const release = await mutex.acquire();
			try {
				const refreshResult = (await baseQuery(true)(
					{ url: '/auth/refresh', method: 'POST' },
					api,
					extraOptions
				)) as { data: { accessToken: string } };

				api.dispatch(setAccessToken(refreshResult?.data?.accessToken));
				if (refreshResult) {
					await baseQuery(false)(args, api, extraOptions);
				} else {
					api.dispatch(logout());
				}
			} finally {
				release();
			}
		} else {
			await mutex.waitForUnlock();
			result = await baseQuery(false)(args, api, extraOptions);
		}
	}
	return result;
};

export const api = createApi({
	reducerPath: 'API',
	baseQuery: baseQueryWithReauth,
	tagTypes: [
		'Tables',
		'Graphs',
		'DerivedVariables',
		'SingleAlert',
		'ComplexAlert',
	],
	endpoints: () => ({}),
});

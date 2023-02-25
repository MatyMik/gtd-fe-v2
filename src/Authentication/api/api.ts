import { api } from '../../api';

export const authApi = api.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (loginData) => ({
				url: '/auth/login',
				method: 'POST',
				body: loginData,
			}),
		}),
		register: builder.mutation({
			query: (registerData) => ({
				url: '/auth/register',
				method: 'POST',
				body: registerData,
			}),
		}),
		refresh: builder.mutation({
			query: (refreshToken) => ({
				url: '/auth/refresh',
				method: 'POST',
				body: { refreshToken },
			}),
		}),
	}),
});

export const {
	useLoginMutation: useLogin,
	useRefreshMutation: useRefresh,
	useRegisterMutation: useRegister,
} = authApi;

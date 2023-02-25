import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLogin, useRefresh, useRegister } from './api/api';
import {
	login,
	selectAccessToken,
	selectRefreshToken,
} from './Authentication.store';
import { useAppDispatch, useAppSelector } from '../app.hook';
import { useLocation } from 'react-router';

type LoginHook = () => {
	email: string;
	password: string;
	typePassword: (event: BaseSyntheticEvent) => void;
	typeEmail: (event: BaseSyntheticEvent) => void;
	buttonDisabled: boolean;
	submitHandler: () => Promise<void>;
	error: boolean;
	confirmPassword: string;
	typeConfirmPassword: (event: BaseSyntheticEvent) => void;
	isLogin: boolean;
};

export const useLoginHook: LoginHook = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const [loginHandler, { isError, data, isLoading, error }] = useLogin();
	const [
		registerHandler,
		{
			isError: hasRegisterFailed,
			data: registerData,
			isLoading: isRegisterLoading,
			error: registerError,
		},
	] = useRegister();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [isLogin, setIsLogin] = useState(location.pathname.includes('login'));
	useEffect(() => {
		setIsLogin(location.pathname.includes('login'));
	}, [location.pathname]);

	const [buttonDisabled, setButtonDisabled] = useState(true);
	useEffect(() => {
		if (isLogin) {
			if (!!password && !!email && buttonDisabled) {
				setButtonDisabled(false);
			} else if ((!password || !email) && !buttonDisabled) {
				setButtonDisabled(true);
			}
		} else {
			if (!!password && !!email && !!confirmPassword && buttonDisabled) {
				setButtonDisabled(false);
			} else if ((!password || !email || !confirmPassword) && !buttonDisabled) {
				setButtonDisabled(true);
			}
		}
	}, [email, password, buttonDisabled, confirmPassword]);

	const typeEmail = (event: BaseSyntheticEvent) => setEmail(event.target.value);
	const typePassword = (event: BaseSyntheticEvent) =>
		setPassword(event.target.value);

	const typeConfirmPassword = (event: BaseSyntheticEvent) =>
		setConfirmPassword(event.target.value);

	const submitHandler = async () => {
		if (isLogin) {
			await loginHandler({ email, password });
		} else {
			await registerHandler({ email, password, confirmPassword });
		}
	};

	useEffect(() => {
		if (data && !error && !isLoading) {
			navigate('/');
		}
	}, [data, error, isLoading]);

	return {
		email,
		typeEmail,
		password,
		typePassword,
		buttonDisabled,
		submitHandler,
		error: isError,
		confirmPassword,
		typeConfirmPassword,
		isLogin,
	};
};

export const useAutoLogin = (): { isLoading: boolean } => {
	const navigate = useNavigate();
	const refreshToken = useAppSelector(selectRefreshToken);
	const [refresh, { data, isLoading, isError, isUninitialized }] = useRefresh();
	const accessToken = useAppSelector(selectAccessToken);

	useEffect(() => {
		if (!accessToken && isUninitialized && refreshToken) {
			refresh(refreshToken);
		}
		if (isError) {
			navigate('/auth/login');
		}
	}, [data, isLoading, isError, isUninitialized, accessToken, refreshToken]);

	return {
		isLoading,
	};
};

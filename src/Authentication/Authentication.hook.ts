import { BaseSyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useLogin, useRefresh, useRegister } from "./api/api";
import { login, selectAccessToken, selectRefreshToken } from "./Authentication.store";
import { useAppSelector } from "../app.hook";
import { useLocation } from "react-router";
import { useDispatch } from "react-redux";

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
  const location = useLocation();
  const navigate = useNavigate();
  const [loginHandler, { isError, data, isLoading, error }] = useLogin();
  const [
    registerHandler,
    {
      isError: hasRegisterFailed,
      data: registerData,
      isLoading: isRegisterLoading,
      error: registerError
    }
  ] = useRegister();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLogin, setIsLogin] = useState(location.pathname.includes("login"));
  useEffect(() => {
    setIsLogin(location.pathname.includes("login"));
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

  const dispatch = useDispatch();

  useEffect(() => {
    if (data && !error && !isLoading) {
      dispatch(login({ accessToken: data.accessToken, refreshToken: data.refreshToken, userId: data.userId }));
      localStorage.setItem("refreshToken", data.refreshToken);
      navigate("/");
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
    isLogin
  };
};

export const useAutoLogin = (): {
  isLoading: boolean;
  isUninitialized: boolean;
  accessToken: string;
} => {
  const navigate = useNavigate();
  const refreshToken = useAppSelector(selectRefreshToken);
  const [refresh, { data, isLoading, isError, isUninitialized }] = useRefresh();
  const accessToken = useAppSelector(selectAccessToken);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!accessToken && isUninitialized && refreshToken) {
      refresh(refreshToken)
        .then((results) => {
          const {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            userId
          } = results.data;
          dispatch(
            login({
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
              userId
            })
          );
        })
        .catch(() => {
          navigate("/auth/login");
        });
    }
  }, []);

  return {
    isLoading,
    isUninitialized,
    accessToken
  };
};

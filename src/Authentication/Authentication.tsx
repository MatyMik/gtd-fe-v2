import {
	ButtonContainer,
	FB,
	FooterContainer,
	Google,
	InputContainer,
	LoginFormContainer,
	SignupContainer,
	SignupImageContainer,
	SignupTitle,
	SocialMediaButton,
	SocialMediaContainer,
	Text
} from "./components";
import { LabelledInput } from "../common";
import { AuthenticationStrings } from "./Authentication.strings";
import { Button, ButtonTypes } from "../common/button/button";
import { NavLink } from "react-router-dom";
import { useLoginHook } from "./Authentication.hook";

export const Authentication = () => {
  const {
    email,
    typeEmail,
    password,
    typePassword,
    buttonDisabled,
    submitHandler,
    error,
    confirmPassword,
    typeConfirmPassword,
    isLogin
  } = useLoginHook();

  return (
    <SignupContainer>
      <SignupImageContainer src={require("../images/gtd.jpeg")} />
      <LoginFormContainer>
        <SignupTitle>
          {isLogin
            ? AuthenticationStrings.SIGN_IN
            : AuthenticationStrings.SIGN_UP}
        </SignupTitle>
        <InputContainer>
          <LabelledInput
            id="email"
            label={AuthenticationStrings.EMAIL}
            value={email}
            onChange={typeEmail}
            type="email"
          />
        </InputContainer>
        <InputContainer>
          <LabelledInput
            id="password"
            label={AuthenticationStrings.PASSWORD}
            value={password}
            onChange={typePassword}
            type="password"
          />
        </InputContainer>
        {!isLogin && (
          <InputContainer>
            <LabelledInput
              id="confirmPassword"
              label={AuthenticationStrings.PASSWORD}
              value={confirmPassword}
              onChange={typeConfirmPassword}
              type="password"
            />
          </InputContainer>
        )}
        <ButtonContainer>
          <Button
            label={
              isLogin
                ? AuthenticationStrings.SIGN_IN
                : AuthenticationStrings.SIGN_UP
            }
            type={ButtonTypes.PRIMARY}
            onClick={submitHandler}
            disabled={buttonDisabled}
          />
        </ButtonContainer>
        <SocialMediaContainer>
          <SocialMediaButton>
            <FB />
            {AuthenticationStrings.FACEBOOK}
          </SocialMediaButton>
          <SocialMediaButton>
            <Google />
            {AuthenticationStrings.GOOGLE}
          </SocialMediaButton>
        </SocialMediaContainer>
        <FooterContainer>
          <Text>
            {isLogin
              ? AuthenticationStrings.NOT_YET_SIGNED_UP
              : AuthenticationStrings.ALREADY_SIGNED_UP}{" "}
          </Text>
          <NavLink to={isLogin ? "/auth/register" : "/auth/login"}>
            {AuthenticationStrings.CLICK_HERE}
          </NavLink>
        </FooterContainer>
      </LoginFormContainer>
    </SignupContainer>
  );
};

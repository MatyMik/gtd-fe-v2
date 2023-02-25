import styled from 'styled-components';
import { ReactComponent as FBSVG } from '../images/fb.svg';
import { ReactComponent as GoogleSVG } from '../images/google.svg';

export const SignupContainer = styled.div`
	width: 100vw;
	heigth: 100vh;
`;

export const SignupImageContainer = styled.img`
	width: 80vw;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
`;

export const LoginFormContainer = styled.div`
	background: ${({ theme }) => theme.colors.white};
	position: fixed;
	width: 30vw;
	height: 50vh;
	top: 20vh;
	right: 10vw;
	box-shadow: 4px 4px 4px 4px ${({ theme }) => theme.colors.grey};
	border-radius: 10px;
`;

export const SignupTitle = styled.h1`
	color: black;
	text-transform: uppercase;
	text-align: center;
`;

export const InputContainer = styled.div`
	width: 80%;
	margin: 3rem auto;
`;

export const FB = styled(FBSVG)`
	width: ${({ theme }) => theme.sizes.md};
	height: ${({ theme }) => theme.sizes.md};
`;

export const Google = styled(GoogleSVG)`
	width: ${({ theme }) => theme.sizes.md};
	height: ${({ theme }) => theme.sizes.md};
`;

export const ButtonContainer = styled.div`
	margin: 2rem auto;
	display: grid;
	justify-content: center;
`;

export const SocialMediaContainer = styled.div`
	width: 60%;
	margin: 0 auto;
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 10%;
`;

export const SocialMediaButton = styled.button`
	background: white;
	width: 100%;
	border: none;
	box-shadow: 2px 2px 2px 2px ${({ theme }) => theme.colors.grey};
	border-radius: 10px;
	padding: 0 0.5rem;
	display: grid;
	grid-template-columns: 1fr 2fr;
	justify-items: center;
	align-items: center;
	font-size: 16px;
	text-transform: uppercase;
	outline: none;

	&:focus,
	&:active,
	&:focus-visible {
		outline: none;
	}
`;

export const Text = styled.div`
	margin-right: 4px;
`;

export const FooterContainer = styled.div`
	margin: 2rem auto;
	display: flex;
	width: 40%;
`;

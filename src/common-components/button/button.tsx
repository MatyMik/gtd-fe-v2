import styled from 'styled-components';

export const Button = ({
	label,
	type,
	onClick,
	disabled = false,
}: ButtonProps): JSX.Element => (
	<StyledButton type={type} onClick={onClick} disabled={disabled}>
		{label}
	</StyledButton>
);

type ButtonProps = {
	label: string;
	type: ButtonTypes;

	onClick: () => void | Promise<void>;
	disabled?: boolean;
};

export enum ButtonTypes {
	PRIMARY = 'primary',
	CANCEL = 'cancel',
}

export const StyledButton = styled.button<{ type: ButtonTypes }>`
	${({ theme, type }) => {
		switch (type) {
			case ButtonTypes.PRIMARY: {
				return `
        background:${theme.colors.black};
        color: ${theme.colors.white};
        border-radius: 0.5rem;
        padding: 0.5rem 1rem;
        text-transform: uppercase;
        font-weight: bold;
        border: none;
        
        &:focus, &:active, &:focus-visible {
        outline: none !important;
        border: none;
        }
	`;
			}
		}
	}}
`;

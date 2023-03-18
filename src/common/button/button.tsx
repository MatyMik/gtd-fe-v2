import styled from "styled-components";

export const Button = ({
                         label,
                         type = ButtonTypes.PRIMARY,
                         onClick,
                         disabled = false,
                         children,
                         labelHidden = false
                       }: ButtonProps): JSX.Element => (
  <StyledButton type={type} onClick={onClick} disabled={disabled} aria-label={label}>
    {labelHidden ? "" : label}
    {children}
  </StyledButton>
);

type ButtonProps = {
  label: string;
  type?: ButtonTypes;

  onClick: () => void | Promise<void>;
  disabled?: boolean;
  children?: JSX.Element;

  labelHidden?: boolean;
};

export enum ButtonTypes {
  PRIMARY = "primary",
  CANCEL = "cancel",
  STYLELESS = "styleless"
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
      case ButtonTypes.CANCEL: {
        return `background: white;
        border: none;
        box-shadow: 2px 2px 2px 2px ${theme.colors.grey};
        border-radius: 10px;
        padding: 0 0.5rem;
        display: grid;
        justify-items: center;
        align-items: center;
        font-size: 16px;
        text-transform: uppercase;
        outline: none;

      &:focus,
      &:active,
      &:focus-visible {
        outline: none;
      }`;
      }
      case ButtonTypes.STYLELESS: {
        return `background: none;
        border: none;
        display: grid;
        justify-items: center;
        align-items: center;
        font-size: 16px;
        text-transform: uppercase;
        outline: none;

      &:focus,
      &:active,
      &:focus-visible {
        outline: none;
      }`;
      }
    }
  }}
`;

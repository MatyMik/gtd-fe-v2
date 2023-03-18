import styled from "styled-components";
import { NavLink } from "react-router-dom";
import React from "react";

export const MenuItem = ({ label, Icon, to }: MenuItemProps) => {
  return (
    <NavItem to={to}>
      <div>{label}</div>
      <Icon />
    </NavItem>
  );
};

const NavItem = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  height: 5rem;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.black};

  & div {
    text-align: left;
  }

  & svg {
    fill: ${({ theme }) => theme.colors.black};
  }

  &:hover {
    & svg {
      fill: ${({ theme }) => theme.colors.white};
    }

    color: ${({ theme }) => theme.colors.white};
    background: linear-gradient(45deg, ${({ theme }) => theme.colors.primary.backgroundGradient} 0%, ${({ theme }) => theme.colors.primary.opacity()} 50%, ${({ theme }) => theme.colors.primary.backgroundGradient} 200%);

  }
`;

type MenuItemProps = {
  label: string;
  Icon: React.FC;
  to: string;
}
import styled from "styled-components";

export const Tab = ({ label, clickHandler, active }: TabProps) => (
  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  <StyledTabButton onClick={clickHandler} $active={active}>{label}</StyledTabButton>
);

const StyledTabButton = styled.button<{ $active: boolean }>`
  border: 1px solid ${({ theme }) => theme.colors.black};
  border-bottom: none;
  border-radius: 10px 10px 0 0;
  background-color: ${({ $active, theme }) => $active ? theme.colors.primary.opacity(0.4) : "transparent"};
  min-width: 5rem;
  padding: 0.25rem 1rem;
  color: black;
`;

type TabProps = {
  label: string;
  clickHandler: () => void;

  active: boolean;
};

export default Tab;

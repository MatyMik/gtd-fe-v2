import styled from "styled-components";

export const NextActionsMain = styled.section`
  height: 100%;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const NextActionsHeader = styled.h1`
  text-transform: uppercase;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
  margin: 0;
  text-align: center;
  padding: 1rem;
`;
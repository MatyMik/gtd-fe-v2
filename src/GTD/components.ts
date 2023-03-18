import styled from "styled-components";

export const Main = styled.main`
  height: 93vh;
  width: 93vw;
  margin-left: 7vw;
  background-color: ${(props) => props.theme.colors.primary.opacity(1)};
`;

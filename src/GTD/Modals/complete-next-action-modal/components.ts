import styled from "styled-components";

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 70%;
  margin: 2rem auto;
`;

export const ModalTitle = styled.h1`
  ${props => props.theme.modal.header};
`;

export const TextContainer = styled.div`
  width: 80%;
  margin: 2rem auto;
  text-align: center;
`;
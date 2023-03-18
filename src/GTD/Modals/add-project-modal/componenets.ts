import styled from "styled-components";

export const ButtonsContainer = styled.div`
  width: 60%;
  margin: 1rem auto;
  display: flex;
  justify-content: space-between;
`;

export const InputContainer = styled.div`
  width: 70%;
  margin: 1rem auto;

`;

export const Title = styled.h1`
  ${({ theme }) => theme.modal.header};
`;

export const Label = styled.label`
  margin: 1rem 0;
`;
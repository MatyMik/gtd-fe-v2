import styled from "styled-components";

export const ButtonsContainer = styled.div`
  width: 60%;
  margin: 3rem auto;
  display: grid;
  grid-auto-flow: column;
  gap: 2rem;
`;

export const InputContainer = styled.div`
  width: 70%;
  margin: 2rem auto;
`;

export const Title = styled.h1`
  ${({ theme }) => theme.modal.header};
`;

export const Label = styled.label`
  margin: 1rem 0;
  display: block;
`;
import styled from "styled-components";

export const ButtonsContainer = styled.div`
  width: 70%;
  margin: 3rem auto;
  display: flex;
  justify-content: space-between;
`;

export const InputContainer = styled.div`
  width: 70%;
  margin: 1rem auto;
  display: grid;
`;

export const Title = styled.h1`
  ${({ theme }) => theme.modal.header};
`;

export const Label = styled.label`
  margin: 1rem 0;
`;

export const TextArea = styled.textarea`
  width: 100%;
  display: block;
`;
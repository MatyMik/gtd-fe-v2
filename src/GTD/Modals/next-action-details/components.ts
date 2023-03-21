import styled from "styled-components";

export const ModalTitle = styled.h2`
  ${props => props.theme.modal.header}
  margin: 2rem auto;
`;

export const NextActionAttribute = styled.div`
  width: 80%;
  margin: 1rem auto;
`;

export const NextActionAttributeLabel = styled.label`
  text-transform: uppercase;
  text-decoration: underline;
`;

export const NextActionAttributeContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  width: 90%;
  margin: 1rem auto;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 3rem auto;
`;
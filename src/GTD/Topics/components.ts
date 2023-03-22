import styled from "styled-components";

export const ModalHeader = styled.h1`
  ${props => props.theme.modal.header};
`;

export const InputContainer = styled.div`
  width: 70%;
  margin: 2rem auto;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 70%;
  margin: 1rem auto;
`;

export const TagSelectorLabel = styled.label`
  margin: 1rem 0;
`;

export const TopicsWithMenusContainer = styled.div`
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  height: 100%;
  gap: 2rem;
`;

export const TopicsContainer = styled.section`
  //border-radius: 4.5rem;
  background-color: ${props => props.theme.colors.white};
`;

export const ProjectsContainer = styled.div`

`;

export const AddProjectButtonContainer = styled.div`
  width: 90%;
  margin: 1rem auto;
`;

export const ProjectsHeader = styled.div`
  display: grid;
  width: 90%;
  margin: auto;
  grid-template-columns: 4fr 2fr 1fr;
`;
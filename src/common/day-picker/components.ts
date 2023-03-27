import styled from "styled-components";

export const DayPickerContainer = styled.div`
  display: grid;
  grid-template-columns:1fr 2fr 1fr;
  width: 20%;
  margin: 1rem auto;
  height: 2rem;
  border: 1px solid grey;
  border-radius: 1rem;
  overflow: hidden;
  background-color: ${props => props.theme.colors.white};
`;

export const DayPickerButton = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
`;

export const DayPickerDate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid grey;
  border-right: 1px solid grey;
`;
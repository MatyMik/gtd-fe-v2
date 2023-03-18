import styled from "styled-components";

export const ActionsRightBarContainer = styled.section`
  background-color: ${props => props.theme.colors.white};
  //border-radius: 4.5rem;
`;

export const SingleNextActionContainer = styled.div<{ overdue: boolean }>`
  display: grid;
  grid-template-columns: 1fr 3fr;
  margin: 1rem auto;
  width: 90%;
  border: 1px solid ${({ overdue, theme }) => overdue ? "red" : theme.colors.primary.opacity(0.5)};
  border-radius: 1rem;
`;

export const SingleNextActionName = styled.div``;

export const CalendarContainer = styled.div<{ overdue: boolean }>`
  border: 1px solid ${({ theme, overdue }) => overdue ? "red" : theme.colors.primary.opacity(0.5)};
  border-radius: 1rem;
  overflow: hidden;
`;

export const CalendarColorTextContainer = styled.div<{ overdue: boolean }>`
  background-color: ${props => props.overdue ? "red" : props.theme.colors.primary.opacity(0.5)};
  text-align: center;
  color: ${props => props.theme.colors.white};
`;
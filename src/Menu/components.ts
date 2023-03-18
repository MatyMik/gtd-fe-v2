import styled from "styled-components";
import { ReactComponent as HomeSVG } from "../images/home.svg";
import { ReactComponent as TopicSVG } from "../images/topic.svg";
import { ReactComponent as NextActionSVG } from "../images/action.svg";
import { ReactComponent as CalendarSVG } from "../images/calendar.svg";

export const MenuContainer = styled.nav`
  background-color: ${props => props.theme.mainMenu.backgroundColor};
  width: ${props => props.theme.mainMenu.width};
  height: ${props => props.theme.mainMenu.height};
  display: flex;
  flex-direction: column;
  position: fixed;
`;

export const Home = styled(HomeSVG)`
  ${({ theme }) => theme.svg}
`;

export const Topic = styled(TopicSVG)`
  ${({ theme }) => theme.svg}
`;

export const NextAction = styled(NextActionSVG)`
  ${({ theme }) => theme.svg}
`;

export const Calendar = styled(CalendarSVG)`
  ${({ theme }) => theme.svg}
`;
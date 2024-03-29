import styled from "styled-components";
import { ReactComponent as AddSVG } from "../../../images/add-icon.svg";
import { ReactComponent as DetailsSVG } from "../../../images/details.svg";

export const NextActionContainer = styled.button`
  font-family: inherit;
  background-color: transparent;
  text-align: left;
  font-size: 14px;
  width: 85%;
  margin-left: 10%;
  border: 1px solid grey;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  border-radius: 8px;
  overflow: hidden;
`;

export const TextContainer = styled.div``;

export const Add = styled(AddSVG)`
  width: 1.5rem;
  height: 1.5rem;
`;

export const Details = styled(DetailsSVG)`
  width: 1.5rem;
  height: 1.5rem;
`;

export const NextActionsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

export const Input = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  border-right: 1px solid grey;
  height: 1.5rem;
`;
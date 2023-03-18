import styled from "styled-components";
import { ModalTypes } from "./constants";

export const Backdrop = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  background: grey;
  opacity: 0.3;
  left: 0px;
  top: 0px;
  z-index: 1000;
`;

export const ModalContainer = styled.div<{ modalType: ModalTypes }>`
  position: fixed;
  ${(props) => props.theme.modalTypes[props.modalType]}
  background: white;
  box-shadow: 0px 10px 40px ${(props) => props.theme.colors.primary.opacity(0.4)}, inset 0px 0px 10px rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  z-index: 1001;
`;

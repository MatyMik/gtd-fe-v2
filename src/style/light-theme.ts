import { ModalTypes } from "../common/Modal";

export const lightTheme = {
  mainMenu: {
    backgroundColor: "rgba(0,0,0, 0.1)",
    width: "7vw",
    height: "93vh"
  },
  modalTypes: {
    [ModalTypes.NORMAL]: {
      width: "30vw",
      top: "35vh",
      left: "35vw"
    },
    [ModalTypes.MEDIUM]: {
      width: "30vw",
      top: "35vh",
      left: "35vw"
    }, [ModalTypes.LARGE]: {
      width: "30vw",
      top: "20vh",
      left: "35vw"
    },
    [ModalTypes.SMALL]: {
      width: "30vw",
      top: "40vh",
      left: "35vw"
    }
  },
  modal: {
    backgroundColor: "rgba(0,0,0, 0.1)",
    header: {
      fontSize: "1.5rem",
      color: "black",
      textTransform: "uppercase",
      textAlign: "center"
    }
  },
  backgroundGradient: "linear-gradient(45deg, #104173 0%, rgb(52, 143, 235) 50%, #104173 200%)"
};
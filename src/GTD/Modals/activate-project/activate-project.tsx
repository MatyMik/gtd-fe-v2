import { Modal, ModalTypes } from "../../../common/Modal";
import { GTDStrings } from "../../GTD.strings";
import { ButtonsContainer, ModalTitle, TextContainer } from "./components";
import { Button, ButtonTypes } from "../../../common/button/button";
import { commonStrings } from "../../../common/common-strings";

export const ActivateProjectModal = ({
                                       closeHandler,
                                       activateHandler,
                                       projectName,
                                       isProjectActive
                                     }: ActivateProjectModalProps) => {
  return <Modal modalType={ModalTypes.SMALL} closeHandler={closeHandler}>
    <ModalTitle>{GTDStrings.ACTIVATE_PROJECT_TITLE}</ModalTitle>
    <TextContainer>
      {isProjectActive ? GTDStrings.DEACTIVATE_PROJECT_TEXT(projectName) : GTDStrings.ACTIVATE_PROJECT_TEXT(projectName)}
    </TextContainer>
    <ButtonsContainer>
      <Button label={commonStrings.CANCEL} onClick={closeHandler} type={ButtonTypes.CANCEL} />
      <Button
        label={isProjectActive ? GTDStrings.DEACTIVATE_PROJECT : GTDStrings.ACTIVATE_PROJECT}
        onClick={activateHandler}
        type={ButtonTypes.PRIMARY}
      />
    </ButtonsContainer>
  </Modal>;
};

type ActivateProjectModalProps = {
  closeHandler: () => void;
  activateHandler: () => void;
  projectName: string;
}
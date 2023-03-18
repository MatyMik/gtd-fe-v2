import { Modal, ModalTypes } from "../../../common/Modal";
import { GTDStrings } from "../../GTD.strings";
import { ButtonsContainer, ModalTitle, TextContainer } from "./components";
import { Button, ButtonTypes } from "../../../common/button/button";
import { commonStrings } from "../../../common/common-strings";

export const CompleteProjectModal = ({
                                       closeHandler,
                                       completeHandler,
                                       projectName,
                                       isProjectComplete
                                     }: CompleteProjectModalProps) => {
  return <Modal modalType={ModalTypes.SMALL} closeHandler={closeHandler}>
    <ModalTitle>{GTDStrings.ACTIVATE_PROJECT_TITLE}</ModalTitle>
    <TextContainer>
      {isProjectComplete ? GTDStrings.UNDO_COMPLETE_TEXT(projectName) : GTDStrings.COMPLETE_TEXT(projectName)}
    </TextContainer>
    <ButtonsContainer>
      <Button label={commonStrings.CANCEL} onClick={closeHandler} type={ButtonTypes.CANCEL} />
      <Button
        label={commonStrings.CONFIRM}
        onClick={completeHandler}
        type={ButtonTypes.PRIMARY}
      />
    </ButtonsContainer>
  </Modal>;
};

type CompleteProjectModalProps = {
  closeHandler: () => void;
  completeHandler: () => void;
  projectName: string;
  isProjectComplete: boolean;
}
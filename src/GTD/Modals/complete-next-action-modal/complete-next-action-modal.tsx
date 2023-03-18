import { Modal, ModalTypes } from "../../../common/Modal";
import { GTDStrings } from "../../GTD.strings";
import { ButtonsContainer, ModalTitle, TextContainer } from "./components";
import { Button, ButtonTypes } from "../../../common/button/button";
import { commonStrings } from "../../../common/common-strings";

export const CompleteNextActionModal = ({
                                          closeHandler,
                                          completeHandler,
                                          nextActionTitle,
                                          isNextActionComplete
                                        }: CompleteNextActionModalProps) => {
  return <Modal modalType={ModalTypes.SMALL} closeHandler={closeHandler}>
    <ModalTitle>{GTDStrings.ACTIVATE_PROJECT_TITLE}</ModalTitle>
    <TextContainer>
      {isNextActionComplete ? GTDStrings.UNDO_COMPLETE_TEXT(nextActionTitle) : GTDStrings.COMPLETE_TEXT(nextActionTitle)}
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

type CompleteNextActionModalProps = {
  closeHandler: () => void;
  completeHandler: () => void;
  nextActionTitle: string;
  isNextActionComplete: boolean;
}
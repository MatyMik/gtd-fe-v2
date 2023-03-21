import { Modal, ModalTypes } from "../../../common/Modal";
import { NextActionType } from "../../GTD.types";
import {
  ButtonContainer,
  ModalTitle,
  NextActionAttribute,
  NextActionAttributeContainer,
  NextActionAttributeLabel
} from "./components";
import { Button, ButtonTypes } from "../../../common/button/button";
import { commonStrings } from "../../../common/common-strings";
import { convertDateString } from "../../../common/helpers/convert-date";
import { GTDStrings } from "../../GTD.strings";

export const NextActionDetails = ({ nextAction, closeHandler, editHandler }: NextActionDetailsProps) => {
  return (
    <Modal closeHandler={closeHandler} modalType={nextAction.description ? ModalTypes.NORMAL : ModalTypes.SMALL}>
      <ModalTitle>{nextAction.name}</ModalTitle>
      <NextActionAttributeContainer>
        <NextActionAttributeLabel>Deadline</NextActionAttributeLabel>
        <NextActionAttribute>{convertDateString(nextAction.deadline)}</NextActionAttribute>
      </NextActionAttributeContainer>
      {nextAction.description ? <NextActionAttributeContainer>
        <NextActionAttributeLabel>Description</NextActionAttributeLabel>
        <NextActionAttribute>{nextAction.description}</NextActionAttribute>
      </NextActionAttributeContainer> : null}
      <ButtonContainer>
        <Button label={commonStrings.CLOSE} onClick={closeHandler} type={ButtonTypes.CANCEL} />
        <Button label={GTDStrings.EDIT} onClick={editHandler} type={ButtonTypes.PRIMARY} />
      </ButtonContainer>
    </Modal>
  );
};

type NextActionDetailsProps = {
  nextAction: NextActionType
  closeHandler: () => void
  editHandler: () => void
}
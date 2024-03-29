import { Details, NextActionContainer, TextContainer } from "./components";
import { NextActionType } from "../../GTD.types";
import { Button, ButtonTypes } from "../../../common/button/button";
import { ActionsContainer, Complete, Delete, Edit } from "../Projects/components";
import { convertDateString } from "../../../common/helpers/convert-date";
import { EditNextActionModal } from "../../Modals/add-next-action-modal/edit-next-action-modal";
import { useState } from "react";
import { CompleteNextActionModal } from "../../Modals/complete-next-action-modal/complete-next-action-modal";
import { useUpdateNextAction } from "../../GTD.api";
import { NextActionDetails } from "../../Modals/next-action-details/next-action-details";

export const NextAction = ({ nextAction }: NextActionProps) => {
  const [isNextActionEditModalOpen, setIsNextActionEditModalOpen] = useState(false);
  const [isNextActionCompleteModalOpen, setIsNextActionCompleteModalOpen] = useState(false);
  const [isNextActionDetailsModalOpen, setIsNextActionDetailsModalOpen] = useState(false);
  const [updateNextAction] = useUpdateNextAction();
  const toggleCompleteNextActionHandler = async () => {
    const updatedNextAction = { ...nextAction, done: !nextAction.done };
    await updateNextAction(updatedNextAction);
  };
  return <NextActionContainer>
    <TextContainer>{nextAction.name}</TextContainer>
    <TextContainer>{nextAction?.tags.map(tag => tag.name)}</TextContainer>
    <TextContainer>{convertDateString(nextAction.deadline) || "-"}</TextContainer>
    <ActionsContainer>
      <Button label="" type={ButtonTypes.STYLELESS} key={"complete"}
              onClick={() => setIsNextActionCompleteModalOpen(true)}>
        <Complete />
      </Button>
      <Button label="" type={ButtonTypes.STYLELESS} key={"edit"} onClick={() => setIsNextActionEditModalOpen(true)}>
        <Edit />
      </Button>
      <Button label="" type={ButtonTypes.STYLELESS} key={"details"}
              onClick={() => setIsNextActionDetailsModalOpen(true)}>
        <Details />
      </Button>
      <Button label="" type={ButtonTypes.STYLELESS} key={"delete"} onClick={console.log}>
        <Delete />
      </Button>
    </ActionsContainer>
    {isNextActionEditModalOpen ? <EditNextActionModal
      originalDeadline={nextAction.deadline}
      originalNextActionTitle={nextAction.name}
      originalTags={nextAction.tags}
      originalDescription={nextAction.description}
      originalNextActionId={nextAction.id}
      closeModal={() => setIsNextActionEditModalOpen(false)}
    /> : null}
    {isNextActionCompleteModalOpen ? <CompleteNextActionModal
      closeHandler={() => setIsNextActionCompleteModalOpen(false)}
      nextActionTitle={nextAction.name}
      completeHandler={toggleCompleteNextActionHandler}
      isNextActionComplete={nextAction.done}
    /> : null}
    {isNextActionDetailsModalOpen ? <NextActionDetails
      nextAction={nextAction}
      closeHandler={() => {
        setIsNextActionDetailsModalOpen(false);
      }}
      editHandler={() => setIsNextActionEditModalOpen(true)}
    /> : null}
  </NextActionContainer>;
};

type NextActionProps = {
  nextAction: NextActionType;
}
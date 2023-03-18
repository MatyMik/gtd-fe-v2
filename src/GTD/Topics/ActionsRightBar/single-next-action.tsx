import { NextActionType } from "../../GTD.types";
import { CalendarIcon } from "./calendar-icon";
import { SingleNextActionContainer, SingleNextActionName } from "./components";

export const SingleNextAction = ({ nextAction }: SingleNextActionProps) => {
  return (
    <SingleNextActionContainer overdue={(new Date(nextAction.deadline)).getTime() < (new Date()).getTime()}>
      <CalendarIcon date={nextAction.deadline} />
      <SingleNextActionName>{nextAction.name}</SingleNextActionName>
    </SingleNextActionContainer>
  );
};

type SingleNextActionProps = {
  nextAction: NextActionType
}
import { Add, NextActionsContainer } from "./components";
import { NextActionType } from "../../GTD.types";
import { Button, ButtonTypes } from "../../../common/button/button";
import { GTDStrings } from "../../GTD.strings";
import { NextAction } from "./next-action";

export const NextActions = ({
                              nextActions,
                              addNewNextActionHandler,
                              areCompleteNextActionsVisible
                            }: NextActionsProps) => {
  return (
    <NextActionsContainer>
      {nextActions ? nextActions.map((nextAction) => {
        if (areCompleteNextActionsVisible && nextAction.done) return null;
        return <NextAction nextAction={nextAction} key={nextAction.id} />;
      }) : null}
      <Button
        label={GTDStrings.ADD_NEXT_ACTION}
        onClick={addNewNextActionHandler}
        type={ButtonTypes.STYLELESS}
        labelHidden
      >
        <Add />
      </Button>
    </NextActionsContainer>
  );
};

type NextActionsProps = {
  nextActions?: NextActionType[];
  addNewNextActionHandler?: () => void;

  areCompleteNextActionsVisible: boolean;
}
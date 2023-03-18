import { ActionsRightBarContainer } from "./components";
import { useGetNextActions } from "../../GTD.api";
import { SingleNextAction } from "./single-next-action";

export const ActionsRightBar = () => {
  const { data: nextAction } = useGetNextActions("");
  return (
    <ActionsRightBarContainer>
      <h1>ActionsRightBar</h1>
      {nextAction?.map(action =>
        action.done ? null : <SingleNextAction key={action.id} nextAction={action} />
      )}
    </ActionsRightBarContainer>
  );
};
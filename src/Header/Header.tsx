import {
  ButtonsContainer,
  HeaderContainer,
  Logo,
  Picture,
  RightItemsContainer,
  RightMenuContainer
} from "./components";
import { Button } from "../common/button/button";
import { GTDStrings } from "../GTD/GTD.strings";
import { setIsNextActionModalOpen, setIsProjectModalOpen } from "../GTD/GTD.store";
import { useAppDispatch } from "../app.hook";

export const Header = () => {
  const dispatch = useAppDispatch();

  const openAddProjectModal = () => {
    dispatch(setIsProjectModalOpen(true));
  };
  const openAddNextActionModal = () => {
    dispatch(setIsNextActionModalOpen(true));
  };
  return (
    <HeaderContainer>
      <Picture><Logo src={require("../images/gtd_logo.jpeg")} alt="Logo" /></Picture>
      <RightMenuContainer>
        <ButtonsContainer>
          <Button label={GTDStrings.ADD_PROJECT} onClick={openAddProjectModal} />
          <Button label={GTDStrings.ADD_NEXT_ACTION} onClick={openAddNextActionModal} />
        </ButtonsContainer>
        <RightItemsContainer>
          <div>Search</div>
          <div>Notification</div>
          <div>Profile</div>
        </RightItemsContainer>
      </RightMenuContainer>
    </HeaderContainer>
  );
};

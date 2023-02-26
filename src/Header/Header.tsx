import { HeaderContainer, Logo, Picture, RightItemsContainer } from "./components";

export const Header = () => {
  return (
    <HeaderContainer>
      <Picture><Logo src={require("../images/gtd_logo.jpeg")} alt="Logo" /></Picture>
      <RightItemsContainer>
        <div>Search</div>
        <div>Notification</div>
        <div>Profile</div>
      </RightItemsContainer>
    </HeaderContainer>
  );
};

import { Calendar, Home, MenuContainer, NextAction, Topic } from "./components";
import { MenuItem } from "./MenuItem";
import { MenuStrings } from "./Menu.strings";

export const Menu = () => {
  return (
    <MenuContainer>
      <MenuItem label={MenuStrings.HOME} to="/" Icon={Home} />
      <MenuItem label={MenuStrings.TOPICS} to="/topic" Icon={Topic} />
      <MenuItem label={MenuStrings.NEXT_ACTIONS} to="/next-actions" Icon={NextAction} />
      <MenuItem label={MenuStrings.CALENDAR} to="/calendar" Icon={Calendar} />
      <MenuItem label={MenuStrings.MY_DAY} to="/my-days" Icon={Calendar} />
    </MenuContainer>
  );
};
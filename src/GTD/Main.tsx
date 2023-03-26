import { Main } from "./components";
import { Topics } from "./Topics";
import { Route, Routes } from "react-router-dom";
import { Calendar } from "./Calendar/Calendar";
import { NextActions } from "./NextActionsPage/NextActions";
import { MyDays } from "../MyDays/my-days";

export const MainPage = () => {

  return (
    <Main>
      <Routes>
        <Route path="/topic" element={<Topics />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/next-actions" element={<NextActions />} />
        <Route path="/my-days" element={<MyDays />} />
      </Routes>
    </Main>
  );
};

export default MainPage;

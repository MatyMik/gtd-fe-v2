import { Main } from "./components";
import { Topics } from "./Topics";
import { Route, Routes } from "react-router-dom";
import { Calendar } from "./Calendar/Calendar";

export const MainPage = () => {

  return (
    <Main>
      <Routes>
        <Route path="/topic" element={<Topics />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </Main>
  );
};

export default MainPage;

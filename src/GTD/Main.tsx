import { Main } from "./components";
import { Topics } from "./Topics";
import { Route, Routes } from "react-router-dom";

export const MainPage = () => {

  return (
    <Main>
      <Routes>
        <Route path="/topic" element={<Topics />} />
      </Routes>
    </Main>
  );
};

export default MainPage;

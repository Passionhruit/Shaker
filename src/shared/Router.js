import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import List from "../pages/List";
import Detail from "../pages/Detail";
import MyPage from "../pages/MyPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/cocktails" element={<List />} />
        <Route path="/cocktails/details/:id" element={<Detail />} />
        <Route path="/mypage/:id" element={<MyPage />} />
        <Route />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Detail from "../pages/Detail";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="details/:id" element={<Detail />} />
        <Route />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

import React from "react";
import Input from "../components/Input";
import Cocktails from "../components/Cocktails";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GlobalStyle from "../GlobalStyle";

function List() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Input />
      <Cocktails />
      <Footer />
    </>
  );
}

export default List;

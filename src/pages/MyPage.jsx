import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GlobalStyle from "../GlobalStyle";
import MyPost from "../components/MyPost";

function MyPage() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <MyPost />
      <Footer />
    </>
  );
}

export default MyPage;

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { styled } from "styled-components";
import GlobalStyle from "../GlobalStyle";
import cocktail from "../img/cocktail.png";
import { useNavigate } from "react-router-dom";

const MainContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
      to right,
      rgba(254, 252, 252, 0.1) 10%,
      rgba(20, 20, 20, 0.7) 70%,
      rgba(20, 20, 20, 1)
    ),
    url(https://images.unsplash.com/photo-1581646835395-97e291c4aab5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1746&q=80);
  /* url(${cocktail}); */
  background-size: cover;
`;

const ContentsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const MainTitle = styled.h1`
  font-size: 90px;
  margin-top: 20%;
`;

const ViewMore = styled.button`
  background: #767575;
  color: white;
  border-radius: 20px;
  border: none;
  width: 110px;
  font-size: 18px;
  padding: 3px;
  margin-top: 10px;
  cursor: pointer;
`;

function Main() {
  const navigate = useNavigate();
  return (
    <>
      <GlobalStyle />
      <Header />
      <MainContainer>
        <ContentsContainer>
          <MainTitle>
            MAKE
            <br />
            YOUR OWN
            <br />
            COCKTAILS{" "}
          </MainTitle>
          <ViewMore
            onClick={() => {
              navigate(`/cocktails`);
            }}
          >
            View more
          </ViewMore>
        </ContentsContainer>
      </MainContainer>
      <Footer />
    </>
  );
}

export default Main;

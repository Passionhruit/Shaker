import React from "react";
import { styled } from "styled-components";
import logo from "../img/shaker.png";

const FooterContainer = styled.div`
  height: 50px;
  margin-top: 100px;
`;

const Logo = styled.h1`
  font-size: 20px;
  font-weight: bold;
  margin-left: 7px;
  margin-right: 5px;
  display: inline-block;
`;

const LogoImg = styled.img`
  width: 20px;
  display: inline-block;
`;

const LogoSpan = styled.span`
  font-size: 18px;
`;

function Footer() {
  return (
    <FooterContainer>
      <LogoImg src={logo} alt="logo" />
      <Logo>Shaker</Logo>
      <LogoSpan>| 나만의 칵테일 레시피 공유 웹사이트</LogoSpan>
    </FooterContainer>
  );
}

export default Footer;

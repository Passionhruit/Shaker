import React from "react";
import { styled } from "styled-components";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useNavigate } from "react-router-dom";

const HeaderContainer = styled.div`
  position: relative;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  height: 70px;
  line-height: 70px;
  z-index: 10;
`;

const Title = styled.h1`
  margin-left: 40px;
  font-size: 40px;

  font-weight: bold;
  cursor: pointer;
`;

const NavContainer = styled.ul`
  display: flex;
  font-size: 14px;
`;

const Nav = styled.li`
  margin-right: 30px;
  cursor: pointer;
`;

function Header() {
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <NavContainer>
        <Nav
          onClick={() => {
            navigate(`/cocktails`);
          }}
        >
          칵테일
        </Nav>
        {/* <Nav>검색하기</Nav> */}
      </NavContainer>
      <Title
        onClick={() => {
          navigate(`/`);
        }}
      >
        Shaker
      </Title>
      <NavContainer>
        <SignIn>로그인</SignIn>
        <SignUp>회원가입</SignUp>
      </NavContainer>
    </HeaderContainer>
  );
}

export default Header;

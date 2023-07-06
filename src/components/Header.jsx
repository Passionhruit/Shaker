import React from "react";
import { styled } from "styled-components";

const HeaderContainer = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  height: 70px;
  line-height: 70px;
`;

const Title = styled.h1`
  margin-left: 40px;
  font-size: 40px;
  color: white;
  font-weight: bold;
`;

const NavContainer = styled.ul`
  display: flex;
  font-size: 16px;
`;

const Nav = styled.li`
  margin-right: 30px;
`;

function Header() {
  return (
    <HeaderContainer>
      <Title>Shakers</Title>
      <NavContainer>
        <Nav>로그인</Nav>
        <Nav>회원가입</Nav>
      </NavContainer>
    </HeaderContainer>
  );
}

export default Header;

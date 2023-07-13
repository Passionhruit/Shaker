import React from "react";
import { styled } from "styled-components";

const AddCocktailBtn = styled.button`
  width: 90px;
  height: 27px;
  font-size: 14px;
  margin-top: 20px;
  border: 1px solid white;
  color: white;
  background-color: transparent;
  cursor: pointer;
  float: right;
  &:hover {
    background-color: #fafafa;
    color: black;
  }
`;

const CommonBtn = styled.button`
  width: 80px;
  height: 25px;
  border: 1px solid black;
  background-color: transparent;
  float: right;
  cursor: pointer;
  &:hover {
    background-color: #464646;
    color: white;
    border: none;
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  background-color: transparent;
  border-style: none;
  right: 10px;
  top: 10px;
  font-size: 17px;

  cursor: pointer;
`;

const EditBtn = styled.button`
  width: 50px;
  height: 25px;
  color: white;
  border: 1px solid white;
  margin: 7px;
  cursor: pointer;
  background-color: transparent;
  &:hover {
    background-color: #f2f2f2;
    color: black;
    border: none;
  }
`;

const CommentBtn = styled.button`
  width: 55px;
  height: 35px;
  background-color: transparent;
  border: 1px solid gray;
  color: black;
  cursor: pointer;
  margin-left: 20px;
  &:hover {
    background-color: #353434;
    color: #ffffff;
  }
`;

const LoginBtn = styled.button`
  width: 70px;
  height: 27px;
  display: block;
  line-height: 27px;
  background-color: #3e3e3e;
  color: white;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin: 10px auto 0 auto;
`;

const googleLoginBtn = styled.button`
  margin: 0 auto;
  display: block;
  width: 250px;
  height: 25px;
  margin-top: 10px;
  border-style: none;
  border: 1px solid gray;
  background-color: white;
  color: black;
  border-radius: 3px;
  line-height: 20px;
  cursor: pointer;
`;

const githubLoginBtn = styled.button`
  margin: 0 auto;
  display: block;
  width: 250px;
  height: 25px;
  margin-top: 10px;
  border-style: none;
  background-color: black;
  color: white;
  border-radius: 3px;
  line-height: 20px;
  cursor: pointer;
`;

function Button({ children, onClick, type }) {
  let ButtonComponent;

  switch (type) {
    case "add":
      ButtonComponent = AddCocktailBtn;
      break;
    case "common":
      ButtonComponent = CommonBtn;
      break;
    case "close":
      ButtonComponent = CloseBtn;
      break;
    case "edit":
      ButtonComponent = EditBtn;
      break;
    case "commentBtn":
      ButtonComponent = CommentBtn;
      break;
    case "loginBtn":
      ButtonComponent = LoginBtn;
      break;
    case "gihubBtn":
      ButtonComponent = githubLoginBtn;
      break;
    case "googleBtn":
      ButtonComponent = googleLoginBtn;
      break;
    default:
      ButtonComponent = CommonBtn;
      break;
  }

  return <ButtonComponent onClick={onClick}>{children}</ButtonComponent>;
}

export default Button;

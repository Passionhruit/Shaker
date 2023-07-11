import React from "react";
import { styled } from "styled-components";

const AddCocktailBtn = styled.button`
  width: 100px;
  height: 30px;
  font-size: 14px;
  margin-top: 20px;
  border: 1px solid white;
  color: white;
  background-color: transparent;
  cursor: pointer;
  float: right;
  &:hover {
    background-color: #e6e4e4;
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

const DeleteCommentBtn = styled.button`
  width: 50px;
  height: 25px;
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
    case "deleteComment":
      ButtonComponent = DeleteCommentBtn;
      break;
    default:
      ButtonComponent = CommonBtn;
      break;
  }

  return <ButtonComponent onClick={onClick}>{children}</ButtonComponent>;
}

export default Button;

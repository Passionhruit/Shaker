import React from "react";
import { useState } from "react";
import uuid from "react-uuid";
import api from "../axios/api";
import { useMutation, useQueryClient } from "react-query";
import { addCocktail } from "../api/cocktails";
import { styled } from "styled-components";

const ModalDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  width: 100%;
  height: 100%;
  display: ${(props) => (props.open ? "block" : "none")};
`;

const ModalCloseBtn = styled.button`
  position: absolute;
  background-color: transparent;
  border-style: none;
  right: 10px;
  top: 10px;
  font-size: 17px;

  cursor: pointer;
`;

const FormContainer = styled.div`
  width: 600px;
  height: 400px;
  z-index: 2;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalOpenBtn = styled.button`
  width: 170px;
  height: 40px;
  border-radius: 8px;
  border-style: none;
  cursor: pointer;
`;

const NameInput = styled.input`
  width: 300px;
  height: 30px;
  border-radius: 5px;
  padding: 10px;
  margin-top: 20px;
  border: none;
  background-color: #f5f5f5;
`;

function Input() {
  const [name, setName] = useState("");
  const [taste, setTaste] = useState("");
  const [img, setImg] = useState("");
  const [recipe, setRecipe] = useState("");
  const [open, setOpen] = useState(false);

  // 리액트 쿼리 관련 코드
  const queryClient = useQueryClient();
  const mutation = useMutation(addCocktail, {
    onSuccess: () => {
      queryClient.invalidateQueries("cocktails");
      console.log("성공하였습니다.");
    },
  });

  const openModalHandler = () => {
    setOpen(!open);
  };

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };

  const tasteChangeHandler = (e) => {
    setTaste(e.target.value);
  };

  const imgChangeHandler = (e) => {
    setImg(e.target.files[0]);
  };

  const recipeChangeHandler = (e) => {
    setRecipe(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const newCocktail = {
      id: uuid(),
      name,
      taste,
      img: img,
      recipe,
    };

    mutation.mutate(newCocktail);

    setName("");
    setTaste("");
    setRecipe("");
  };

  return (
    <>
      <ModalOpenBtn onClick={openModalHandler}>칵테일 추가하기</ModalOpenBtn>
      <ModalDiv open={open} onClick={openModalHandler}>
        <FormContainer onClick={(e) => e.stopPropagation()}>
          <form>
            <h2>칵테일 추가하기</h2>
            <p>
              {" "}
              <NameInput
                type="text"
                value={name}
                placeholder="칵테일 이름을 입력해주세요."
                onChange={nameChangeHandler}
              />
            </p>
            <p>
              <input
                type="text"
                value={taste}
                placeholder="칵테일 설명을 입력해주세요."
                onChange={tasteChangeHandler}
              />
            </p>
            <p>
              <input
                type="text"
                value={recipe}
                placeholder="레시피를 입력해주세요."
                onChange={recipeChangeHandler}
              />
            </p>
            <p>
              사진 <input type="file" onChange={imgChangeHandler} />
            </p>
            <button onClick={submitHandler}>등록</button>
          </form>
          <ModalCloseBtn onClick={openModalHandler}>x</ModalCloseBtn>
        </FormContainer>
      </ModalDiv>
    </>
  );
}

export default Input;

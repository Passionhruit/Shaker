import React from "react";
import { useState } from "react";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { storage, auth } from "../service/firebase";
import uuid from "react-uuid";
import axios from "axios";
import api from "../axios/api";
import { useMutation, useQueryClient } from "react-query";
import { addCocktail } from "../api/cocktails";
import { styled } from "styled-components";
import useInput from "../hooks/useInput";

import Button from "./Button";

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
  width: 700px;
  height: 500px;
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
  float: right;
`;

const InputTitle = styled.h2`
  color: #657af0;
  font-weight: bold;
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

const TasteInput = styled(NameInput)``;

const GarnishInput = styled(NameInput)``;

const RecipeInput = styled.textarea`
  width: 300px;
  height: 100px;
  border-radius: 5px;
  padding: 10px;
  margin-top: 20px;
  border: none;
  background-color: #f5f5f5;
`;

// 카테고리 옵션

const categoryObtions = [
  { value: "", label: "베이스주" },
  { value: "럼", label: "럼" },
  { value: "보드카", label: "보드카" },
  { value: "위스키", label: "위스키" },
  { value: "진", label: "진" },
  { value: "데킬라", label: "데킬라" },
];

function Input() {
  const [name, nameHandler] = useInput("");
  const [taste, tasteHandler] = useInput("");
  const [garnish, garnishHandler] = useInput("");
  const [recipe, recipeHandler] = useInput("");
  const [selectedFile, setSelectedFile] = useState(new FormData());
  const [category, setCategory] = useState("");
  const [downloadURL, setDownloadURL] = useState("");
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

  const fileSelectHandler = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // 파일 선택 여부 확인
    if (!selectedFile) {
      console.log("파일을 선택해주세요.");
      return;
    }

    const imageRef = ref(
      storage,
      `${auth.currentUser.uid}/${selectedFile.name}`
    );
    await uploadBytes(imageRef, selectedFile);

    const downloadURL = await getDownloadURL(imageRef);

    setDownloadURL(downloadURL);

    const newCocktail = {
      id: uuid(),
      name,
      taste,
      garnish,
      img: downloadURL,
      recipe,
      userId: auth.currentUser.uid,
      category,
    };

    mutation.mutate(newCocktail);

    // 폼 초기화
    nameHandler({ target: { value: "" } });
    tasteHandler({ target: { value: "" } });
    garnishHandler({ target: { value: "" } });
    recipeHandler({ target: { value: "" } });
  };

  const categoryHandler = (e) => {
    setCategory(e.target.value);
  };

  return (
    <>
      <Button onClick={openModalHandler}>칵테일 추가</Button>
      <ModalDiv open={open} onClick={openModalHandler}>
        <FormContainer onClick={(e) => e.stopPropagation()}>
          <form>
            <InputTitle>칵테일 추가하기</InputTitle>
            <p>
              {" "}
              <NameInput
                type="text"
                value={name}
                placeholder="칵테일 이름을 입력해주세요."
                onChange={nameHandler}
              />
            </p>
            <p>
              <TasteInput
                type="text"
                value={taste}
                placeholder="칵테일 설명을 입력해주세요."
                onChange={tasteHandler}
              />
            </p>
            <p>
              <GarnishInput
                type="text"
                value={garnish}
                placeholder="칵테일 가니쉬를 입력해주세요."
                onChange={garnishHandler}
              />
            </p>
            <p>
              <RecipeInput
                type="text"
                value={recipe}
                placeholder="레시피를 입력해주세요."
                onChange={recipeHandler}
              />
            </p>
            <p>
              <input
                type="file"
                onChange={fileSelectHandler}
                style={{ color: "black" }}
              />
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

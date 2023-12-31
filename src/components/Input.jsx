import React from "react";
import { useState } from "react";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { storage, auth } from "../service/firebase";
import uuid from "react-uuid";
import { useMutation, useQueryClient } from "react-query";
import { addCocktail } from "../api/cocktails";
import { styled } from "styled-components";
import useInput from "../hooks/useInput";
import CategorySelect from "./CategorySelect";
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

const FormContainer = styled.div`
  width: 700px;
  height: 500px;
  z-index: 2;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputTitle = styled.h2`
  color: #525252;
  font-weight: bold;
  display: inline-block;
`;

const NameInput = styled.input`
  width: 300px;
  height: 30px;
  border-radius: 5px;
  padding: 10px;
  margin-top: 20px;
  border: none;
  background-color: #f5f5f5;
  outline: none;
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
  outline: none;
`;

// 카테고리 옵션

const categoryOptions = [
  { value: "", label: "베이스주" },
  { value: "데킬라", label: "데킬라" },
  { value: "럼", label: "럼" },
  { value: "리큐르", label: "리큐르" },
  { value: "보드카", label: "보드카" },
  { value: "위스키", label: "위스키" },
  { value: "진", label: "진" },
  { value: "목테일", label: "목테일" },
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
    },
  });

  const openModalHandler = () => {
    if (auth.currentUser) {
      setOpen(!open);
    } else {
      alert("로그인 후 사용해주세요.");
    }
  };

  const fileSelectHandler = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    // 사진 제외한 모든 항목 입력 필터
    if (name && taste && garnish && recipe) {
      // 파일 선택 여부 확인
      if (!selectedFile) {
        alert("파일을 선택해주세요.");
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

      setOpen(!open);
    } else {
      alert("모든 항목을 입력해주세요.");
    }
  };

  return (
    <>
      <Button onClick={openModalHandler} type={"add"}>
        칵테일 추가
      </Button>
      <ModalDiv open={open} onClick={openModalHandler}>
        <FormContainer onClick={(e) => e.stopPropagation()}>
          <form>
            <InputTitle>칵테일 추가하기</InputTitle>
            <CategorySelect
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={categoryOptions}
            />
            <p>
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
            <Button onClick={submitHandler}>등록</Button>
          </form>
          <Button onClick={openModalHandler} type={"close"}>
            x
          </Button>
        </FormContainer>
      </ModalDiv>
    </>
  );
}

export default Input;

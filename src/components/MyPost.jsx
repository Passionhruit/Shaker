import React from "react";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { storage, auth } from "../service/firebase";
import { useQuery } from "react-query";
import { getCocktails } from "../api/cocktails";
import { styled } from "styled-components";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { deleteCocktail, updateCocktail } from "../api/cocktails";
import { useParams } from "react-router-dom";
import { useState } from "react";
import useInput from "../hooks/useInput";

const CocktailsContainer = styled.div`
  margin: 50px auto;
`;

const CocktailContainer = styled.ul`
  display: inline-table;
  width: 250px;
  height: 330px;
  background-color: #ececec;
  padding: 10px;
  text-align: center;
  border-radius: 10px;
  color: #242424;
  margin: 15px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const Name = styled.li`
  font-size: 22px;
  font-weight: bold;
`;

const Taste = styled.li`
  font-size: 16px;
  margin-top: 10px;
`;

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

const categoryOptions = [
  { value: "", label: "베이스주" },
  { value: "럼", label: "럼" },
  { value: "보드카", label: "보드카" },
  { value: "위스키", label: "위스키" },
  { value: "진", label: "진" },
  { value: "데킬라", label: "데킬라" },
  { value: "목테일", label: "목테일" },
];

function MyPost() {
  const [name, nameHandler] = useInput("");
  const [taste, tasteHandler] = useInput("");
  const [garnish, garnishHandler] = useInput("");
  const [recipe, recipeHandler] = useInput("");
  const [selectedFile, setSelectedFile] = useState("");
  const [category, setCategory] = useState("");
  const [downloadURL, setDownloadURL] = useState("");
  const [open, setOpen] = useState(false);
  const [modalId, setModalId] = useState("");

  const { isLoading, isError, data } = useQuery("cocktails", getCocktails);

  const navigate = useNavigate();
  const params = useParams();

  const { id } = params;

  const queryClient = useQueryClient();
  const deleteMutation = useMutation(deleteCocktail, {
    onSuccess: () => {
      queryClient.invalidateQueries("cocktails");
      console.log("삭제되었습니다.");
    },
  });

  const updateMutation = useMutation(updateCocktail, {
    onSuccess: () => {
      queryClient.invalidateQueries("cocktails");
      console.log("수정되었습니다.");
    },
  });

  const openModalHandler = (cocktail) => {
    setModalId(cocktail.id);
    setOpen(!open);

    nameHandler({ target: { value: cocktail.name } });
    tasteHandler({ target: { value: cocktail.taste } });
    garnishHandler({ target: { value: cocktail.garnish } });
    recipeHandler({ target: { value: cocktail.recipe } });
  };

  const fileSelectHandler = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  // 수정하기
  const updateHandler = async (id, e) => {
    setOpen(!open);
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

    const updatedCocktail = {
      id,
      name,
      taste,
      garnish,
      img: downloadURL,
      recipe,
      userId: auth.currentUser.uid,
      category,
    };

    updateMutation.mutate({ id, updatedCocktail });

    nameHandler({ target: { value: "" } });
    tasteHandler({ target: { value: "" } });
    garnishHandler({ target: { value: "" } });
    recipeHandler({ target: { value: "" } });
  };

  // 삭제하기
  const deleteHandler = (id) => {
    deleteMutation.mutate(id);
  };

  const CategorySelect = ({ value, onChange, options }) => {
    return (
      <select value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div>
      MyPost
      <CocktailsContainer>
        {data
          ?.filter((cocktail) => cocktail.userId == params.id)
          .map((cocktail) => {
            return (
              <CocktailContainer key={cocktail.id}>
                <Name>{cocktail.name}</Name>
                <Taste>{cocktail.taste}</Taste>
                <img
                  src={cocktail.img}
                  style={{
                    width: "220px",
                    borderRadius: "220px",
                    marginTop: "10px",
                  }}
                  alt={cocktail.name}
                />
                <button
                  onClick={() => {
                    navigate(`/cocktails/details/${cocktail.id}`);
                  }}
                >
                  상세보기
                </button>
                <button onClick={() => openModalHandler(cocktail)}>수정</button>
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
                      <button onClick={(e) => updateHandler(modalId, e)}>
                        등록
                      </button>
                    </form>
                    <ModalCloseBtn onClick={openModalHandler}>x</ModalCloseBtn>
                  </FormContainer>
                </ModalDiv>

                <button onClick={() => deleteHandler(cocktail.id)}>삭제</button>
              </CocktailContainer>
            );
          })}
      </CocktailsContainer>
    </div>
  );
}

export default MyPost;

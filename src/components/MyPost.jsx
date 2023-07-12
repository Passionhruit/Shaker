import React from "react";
import { getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { storage, auth } from "../service/firebase";
import { useQuery } from "react-query";
import { getCocktails } from "../api/cocktails";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { deleteCocktail, updateCocktail } from "../api/cocktails";
import { useParams } from "react-router-dom";
import { useState } from "react";
import useInput from "../hooks/useInput";
import Button from "./Button";
import CategorySelect from "./CategorySelect";

const CocktailsContainer = styled.div`
  margin: 50px auto;
`;

const CocktailContainer = styled.ul`
  display: inline-table;
  width: 250px;
  height: 330px;
  background-image: linear-gradient(
      to bottom,
      rgba(254, 252, 252, 0.043) 10%,
      rgba(20, 20, 20, 0.8) 70%,
      rgba(20, 20, 20, 1)
    ),
    ${(props) => `url(${props.img})`};
  background-size: auto 100%;
  background-position: center;
  padding: 10px;
  text-align: center;
  color: white;
  margin: 15px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  &:hover {
    background-image: linear-gradient(
        to bottom,
        rgba(254, 252, 252, 0) 10%,
        rgba(20, 20, 20, 0.4) 70%,
        rgba(20, 20, 20, 1)
      ),
      ${(props) => `url(${props.img})`};
  }
  background-size: cover;
`;

const Name = styled.li`
  font-size: 22px;
  font-weight: bold;
  margin-top: 250px;
`;

const Taste = styled.li`
  font-size: 16px;
  margin-top: 10px;
`;

const ModalDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.1);
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
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputTitle = styled.h2`
  color: #525252;
  font-weight: bold;
  float: left;
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
    setCategory(cocktail.category);
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
    const confirmed = window.confirm("이 게시물을 삭제하시겠습니까?");
    if (confirmed) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div>
      내가 작성한 글
      <CocktailsContainer>
        {data
          ?.filter((cocktail) => cocktail.userId == params.id)
          .map((cocktail) => {
            return (
              <CocktailContainer
                key={cocktail.id}
                img={cocktail.img}
                // onClick={() => {
                //   navigate(`/cocktails/details/${cocktail.id}`);
                // }}
              >
                <Name>{cocktail.name}</Name>
                <Taste>{cocktail.taste}</Taste>
                <Button
                  onClick={(e) => {
                    openModalHandler(cocktail);
                    e.stopPropagation();
                  }}
                  type={"edit"}
                >
                  수정
                </Button>
                <ModalDiv open={open} onClick={openModalHandler}>
                  <FormContainer onClick={(e) => e.stopPropagation()}>
                    <form>
                      <InputTitle>글 수정하기</InputTitle>
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
                      <Button onClick={(e) => updateHandler(modalId, e)}>
                        등록
                      </Button>
                    </form>
                    <ModalCloseBtn onClick={openModalHandler}>x</ModalCloseBtn>
                  </FormContainer>
                </ModalDiv>

                <Button
                  onClick={(e) => {
                    deleteHandler(cocktail.id);
                    e.stopPropagation();
                  }}
                  type="edit"
                >
                  삭제
                </Button>
              </CocktailContainer>
            );
          })}
      </CocktailsContainer>
    </div>
  );
}

export default MyPost;

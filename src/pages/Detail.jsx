import React from "react";
import { getCocktails } from "../api/cocktails";
import { useQuery } from "react-query";
import GlobalStyle from "../GlobalStyle";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";

const CocktailContainer = styled.ul`
  background-color: #ffffff;
  color: black;
  width: 600px;
  height: 600px;
  border-radius: 20px;
  text-align: center;
  padding: 30px;
  margin: 20px auto;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

const Name = styled.li`
  font-size: 35px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Taste = styled.li`
  font-size: 20px;
  margin-bottom: 10px;
`;

const RecipeContainer = styled.div`
  width: 400px;
  height: 150px;
  margin: 0 auto;
  background-color: #e5e5e5;
`;

function Detail() {
  const { isLoading, isError, data } = useQuery("cocktails", getCocktails);
  console.log(data);
  const { id } = useParams();
  const navigate = useNavigate();

  // 리액트 쿼리 관련 코드
  return (
    <>
      <GlobalStyle />
      <Header />
      {data
        ?.filter((cocktail) => cocktail.id === id)
        .map((cocktail) => {
          return (
            <CocktailContainer key={cocktail.id}>
              <Name>{cocktail.name}</Name>
              <Taste>{cocktail.taste}</Taste>
              <img
                src={cocktail.img}
                style={{ width: "350px" }}
                alt={cocktail.name}
              />

              <li>가니쉬 : {cocktail.garnish}</li>
              <RecipeContainer>
                <pre>
                  <h3>레시피</h3>
                  {cocktail.recipe}
                </pre>
              </RecipeContainer>
              <button
                onClick={() => {
                  navigate(`/cocktails`);
                }}
              >
                돌아가기
              </button>
              <button>수정</button>
              {/* <button onClick={() => deleteHandler(cocktail.id)}>삭제</button> */}
            </CocktailContainer>
          );
        })}
      <Footer />
    </>
  );
}

export default Detail;

import React from "react";
import { getCocktails } from "../api/cocktails";
import { useQuery } from "react-query";
import GlobalStyle from "../GlobalStyle";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Comments from "../components/Comments";

const CocktailContainer = styled.ul`
  margin: 30px auto;
  text-align: center;
  width: 500px;
  background-color: #ffffff;
  color: black;
`;

const ImgContainer = styled.div`
  width: 500px;
  height: 500px;
  overflow: hidden;
  background-image: linear-gradient(
      to bottom,
      rgba(248, 243, 243, 0.045) 10%,
      rgba(152, 152, 152, 0.125) 70%,
      #ffffff
    ),
    ${(props) => `url(${props.img})`};
  background-size: cover;
  background-position: center;
`;

const Name = styled.li`
  margin-top: 15px;
  font-size: 35px;
  font-weight: bold;
`;

const Taste = styled.li`
  font-size: 20px;
  margin-top: 15px;
`;

const RecipeContainer = styled.div`
  text-align: left;
  padding: 25px;
  border-radius: 10px;
  margin-top: 15px;
  font-size: 20px;
  overflow: auto;
  max-height: 200px;
`;

const RecipeSubTitle = styled.h3`
  font-weight: bold;
  margin: 10px 0 10px 0;
`;

function Detail() {
  const { isLoading, isError, data } = useQuery("cocktails", getCocktails);
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
              <ImgContainer img={cocktail.img}>
                {/* <CocktailImg src={cocktail.img} alt={cocktail.name} /> */}
              </ImgContainer>
              <Name>{cocktail.name}</Name>
              <Taste>{cocktail.taste}</Taste>

              <RecipeContainer>
                <li>
                  <RecipeSubTitle>가니쉬</RecipeSubTitle>
                  {cocktail.garnish}
                </li>
                <pre>
                  <RecipeSubTitle>레시피</RecipeSubTitle>
                  {cocktail.recipe}
                </pre>
              </RecipeContainer>
              <Button
                onClick={() => {
                  navigate(`/cocktails`);
                }}
                type={"add"}
              >
                돌아가기
              </Button>
              {/* <button onClick={() => deleteHandler(cocktail.id)}>삭제</button> */}
            </CocktailContainer>
          );
        })}

      <Comments />
      <Footer />
    </>
  );
}

export default Detail;

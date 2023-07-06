import React from "react";
import api from "../axios/api";
import { useState, useEffect } from "react";
import { getCocktails } from "../api/cocktails";
import { useQuery } from "react-query";
import { useMutation, useQueryClient } from "react-query";
import { deleteCocktail } from "../api/cocktails";
import { styled } from "styled-components";

const CocktailsContainer = styled.div`
  background-color: #bade87;
  margin: 50px auto;
`;

const CocktailContainer = styled.ul`
  display: inline-block;
  width: 250px;
  height: 330px;
  background-color: white;
  padding: 10px;
  text-align: center;
  border-radius: 10px;
  margin: 15px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;

function Cocktails() {
  const { isLoading, isError, data } = useQuery("cocktails", getCocktails);
  console.log(data);

  // 리액트 쿼리 관련 코드
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteCocktail, {
    onSuccess: () => {
      queryClient.invalidateQueries("cocktails");
      console.log("성공하였습니다.");
    },
  });

  const deleteHandler = (id) => {
    mutation.mutate(id);
  };

  const updateHandler = (id) => {
    mutation.mutate(id);
  };

  return (
    <CocktailsContainer>
      {data?.map((cocktail) => {
        return (
          <CocktailContainer key={cocktail.id}>
            <li>{cocktail.name}</li>
            <li>{cocktail.taste}</li>
            <img
              src={cocktail.img}
              style={{ width: "200px" }}
              alt={cocktail.title}
            />
            <li>{cocktail.recipe}</li>
            <button>상세보기</button>
            <button>수정</button>
            <button onClick={() => deleteHandler(cocktail.id)}>삭제</button>
          </CocktailContainer>
        );
      })}
    </CocktailsContainer>
  );
}

export default Cocktails;

import React from "react";
import api from "../axios/api";
import { useState, useEffect } from "react";
import { getCocktails } from "../api/cocktails";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useMutation, useQueryClient } from "react-query";
import { deleteCocktail } from "../api/cocktails";
import { styled } from "styled-components";
import CategorySelect from "./CategorySelect";

const CocktailsContainer = styled.div`
  margin: 20px auto;
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

const categoryOptions = [
  { value: "", label: "베이스주" },
  { value: "럼", label: "럼" },
  { value: "보드카", label: "보드카" },
  { value: "위스키", label: "위스키" },
  { value: "진", label: "진" },
  { value: "데킬라", label: "데킬라" },
  { value: "목테일", label: "목테일" },
];

function Cocktails() {
  const { isLoading, isError, data } = useQuery("cocktails", getCocktails);
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  return (
    <>
      <CategorySelect
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        options={categoryOptions}
      />
      <CocktailsContainer>
        {data
          ?.filter((cocktail) =>
            category !== "" ? cocktail.category === category : cocktail
          )
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
              </CocktailContainer>
            );
          })}
      </CocktailsContainer>
    </>
  );
}

export default Cocktails;

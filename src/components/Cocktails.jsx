import React from "react";
import { useState } from "react";
import { getCocktails } from "../api/cocktails";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { styled } from "styled-components";
import useInput from "../hooks/useInput";
import CategorySelect from "./CategorySelect";

const CocktailsContainer = styled.div`
  margin: 20px auto;
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

const SearchForm = styled.form`
  display: inline-block;
`;

const SearchInput = styled.input`
  width: 180px;
  height: 20px;
  padding: 5px;
  color: white;
  background-color: transparent;
  border: 1px solid white;
  margin-left: 20px;
  outline: none;
`;

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

function Cocktails() {
  const [search, searchHandler] = useInput();
  const { isLoading, isError, data } = useQuery("cocktails", getCocktails);
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  return (
    <>
      <CategorySelect
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        options={categoryOptions}
        type={"list"}
      />
      <SearchForm>
        <SearchInput
          type="text"
          value={search}
          placeholder="찾으시는 칵테일을 검색해보세요."
          onChange={searchHandler}
        />
      </SearchForm>
      <CocktailsContainer>
        {data
          ?.filter((cocktail) =>
            category !== "" ? cocktail.category === category : cocktail
          )
          .filter((cocktail) => cocktail.name.includes(search))
          .map((cocktail) => {
            return (
              <CocktailContainer
                key={cocktail.id}
                img={cocktail.img}
                onClick={() => {
                  navigate(`/cocktails/details/${cocktail.id}`);
                }}
              >
                <Name>{cocktail.name}</Name>
                <Taste>{cocktail.taste}</Taste>
              </CocktailContainer>
            );
          })}
      </CocktailsContainer>
    </>
  );
}

export default Cocktails;

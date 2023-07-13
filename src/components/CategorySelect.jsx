import React from "react";
import { styled } from "styled-components";

const ListSelect = styled.select`
  width: 90px;
  height: 27px;
  background-color: #e3e3e3;
  color: #191919;
  font-size: 14px;
  padding-left: 8px;
  margin-top: 20px;
  outline: none;
`;

const AddSelect = styled.select`
  width: 80px;
  height: 25px;
  padding: 5px;
  outline: none;
  float: right;
`;

function CategorySelect({ value, onChange, options, type }) {
  const SelectComponent = type === "list" ? ListSelect : AddSelect;
  return (
    <SelectComponent value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </SelectComponent>
  );
}

export default CategorySelect;

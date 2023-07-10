import React from "react";
import TextSpan from "./TextSpan";
import { motion } from "framer-motion";
import { styled } from "styled-components";

const TextContainer = styled.div`
  margin-top: 20%;
`;

function MainText() {
  const sentence1 = "MAKE".split("");
  const sentence2 = "YOUR OWN".split("");
  const sentence3 = "COCKTAILS".split("");

  return (
    <TextContainer>
      {sentence1.map((letter, i) => {
        return (
          <TextSpan key={i}>{letter === " " ? "\u00A0" : letter}</TextSpan>
        );
      })}
      <br />
      {sentence2.map((letter, i) => {
        return (
          <TextSpan key={i}>{letter === " " ? "\u00A0" : letter}</TextSpan>
        );
      })}
      <br />
      {sentence3.map((letter, i) => {
        return (
          <TextSpan key={i}>{letter === " " ? "\u00A0" : letter}</TextSpan>
        );
      })}
    </TextContainer>
  );
}

export default MainText;

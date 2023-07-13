import React from "react";
import TextSpan from "./TextSpan";
import { styled } from "styled-components";

const TextContainer = styled.div`
  margin-top: 21%;
`;

function MainText() {
  const sentences = ["MAKE", "YOUR OWN", "COCKTAILS"];

  return (
    <TextContainer>
      {sentences.map((sentence, i) => (
        <span key={i}>
          {sentence.split("").map((letter, i) => (
            <TextSpan key={i}>{letter === " " ? "\u00A0" : letter}</TextSpan>
          ))}
          <br />
        </span>
      ))}
    </TextContainer>
  );
}

export default MainText;

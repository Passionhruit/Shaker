import React from "react";
import spiner from "../img/spiner.gif";
import { styled } from "styled-components";

const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: transparent;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function Loading() {
  return (
    <Background>
      <img src={spiner} alt="로딩 중 입니다" style={{ width: "100px" }} />
    </Background>
  );
}

export default Loading;

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

    body {
        max-width: 1200px;
        min-height: 700px;
        margin: 0 auto;
        color: white;
        background: linear-gradient(to bottom,#1c1c1c,#0f0f0f);
    }
    @font-face {
  font-family: 'Noto Sans KR';
  src: url('https://fonts.googleapis.com/earlyaccess/notosanskr.css'); /* 폰트 파일 경로 */
  font-weight: normal;
  font-style: normal;
}

    a {
        text-decoration: none;
        color: inherit;
    }
    li {
        list-style: none;
    }
    
`;

export default GlobalStyle;

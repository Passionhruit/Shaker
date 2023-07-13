import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        max-width: 1200px;
        min-height: 700px;
        margin: 0 auto;
        color: white;
        background: linear-gradient(to bottom,#1c1c1c,#0f0f0f);
        font-family: 'NanumBarunGothic', sans-serif;
    }

    @font-face {
        font-family: 'NanumBarunGothic';
        font-style: normal;
        font-weight: 400;
        src: url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.eot');
        src: url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.eot?#iefix') format('embedded-opentype'), url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.woff') format('woff'), url('//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.ttf') format('truetype');
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

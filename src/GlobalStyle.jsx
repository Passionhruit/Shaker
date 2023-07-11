import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

    body {
        max-width: 1200px;
        min-height: 900px;
        margin: 0 auto;
        color: white;
        background: linear-gradient(to bottom,#1c1c1c,#0f0f0f);
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

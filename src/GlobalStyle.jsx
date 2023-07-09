import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

    body {
        max-width: 1200px;
        margin: 0 auto;
        color: white;
        background: linear-gradient(to right bottom,#282828,#0f0f0f);
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

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

    body {
        max-width: 1200px;
        margin: 0 auto;
        background-color: #f8b8b8;
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

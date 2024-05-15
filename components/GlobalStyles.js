import { createGlobalStyle } from "styled-components";
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});



const GlobalStyle = createGlobalStyle`

  body {
    margin: 0;
    padding: 0;
    background-color: #c8ecb8;
    font-family: Roboto, sans-serif;

    
  }
`;

export default GlobalStyle;

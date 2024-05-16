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
    font-family: 'Roboto', sans-serif;
  };
  :root{
    --label-font-size: 130%;
    --headline-font: roboto, sans-serif;
    --box-background-color: white;
    --input-field-width: 100%;
    --primary-border-radius: 20px;
    --secondary-border-radius: 8px;
    --secondary-background-color: #faf1d2;
    --secondary-border: 
}
`;

export default GlobalStyle;

// TODO was gehört hierher, was in styles.js ?
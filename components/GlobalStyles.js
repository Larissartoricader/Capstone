import { createGlobalStyle } from "styled-components";
import { Merienda } from 'next/font/google'

const merienda = Merienda({
  weight: '400',
  subsets: ['latin'],
});



const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #c8ecb8;
   
  };
  :root{
    --label-font-size: 130%;
    --headline-font: ${merienda.style.fontFamily};
    --box-background-color: white;
    --input-field-width: 100%;
    --big-box-border-radius: 20px;
    --small-box-border-radius: 8px;
    --secondary-background-color: #faf1d2;
    --general-border: 1px solid #ccc;
}
`;

export default GlobalStyle;

// TODO was gehört hierher, was in styles.js ?
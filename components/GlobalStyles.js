import { createGlobalStyle } from "styled-components";
import { Merienda } from 'next/font/google'

const merienda = Merienda({
  weight: '700',
  subsets: ['latin'],
});


const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: var(--primary-background-color);
    font-family: var(--general-font);
  
  }

  :root{
    --herbie-font: ${merienda.style.fontFamily};
    --general-font: 'Arial';
 
    --font-color: #013220;
    --box-background-color: white;
    --primary-background-color: #c8ecb8;
    --secondary-background-color: #fcfbf4;
    --primary-button-and-header-color: #014F32;
    --secondary-button-color: #FFC107;
    --selected-value-color: #f1efe2;
 
    --big-box-border-radius: 20px;
    --small-box-border-radius: 10px;
    --general-border: 2px solid #ccc;
}
`;

export default GlobalStyle;
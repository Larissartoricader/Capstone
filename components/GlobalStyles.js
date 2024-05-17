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
    background-color: #c8ecb8;
    font-family: 'Georgia';
  };

  :root{
    // fonts
    --headline-font: ${merienda.style.fontFamily};
    --general-font: 'Georgia';
    --input-field-font-size: 15%;
    // colors
    --font-color: #013220;
    --box-background-color: white;
    --secondary-background-color: #faf1d2;
   
    // borders
    --big-box-border-radius: 20px;
    --small-box-border-radius: 8px;
    --general-border: 1px solid #ccc;
    // others
    --input-field-width: 100%;
}
`;

export default GlobalStyle;
import { createGlobalStyle } from "styled-components";
import { Merienda } from "next/font/google";

const merienda = Merienda({
  weight: "700",
  subsets: ["latin"],
});

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #c8ecb8;
    font-family: 'Arial';
  
  };

  :root{
    // fonts
    --herbie-font: ${merienda.style.fontFamily};
    --general-font: 'Arial';
 
   
    --font-color: #013220;
    --box-background-color: white;
    --secondary-background-color: #fcfbf4;
 
 
    --big-box-border-radius: 20px;
    --small-box-border-radius: 10px;
    --general-border: 2px solid #ccc;
}
`;

export default GlobalStyle;

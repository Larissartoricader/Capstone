import GlobalStyle from "../styles";
import { initialRecipes } from "@/lib/recipes";
import { useState } from "react";
import { uid } from "uid";

export default function App({ Component, pageProps }) {
  const [recipes, setRecipes] = useState(initialRecipes);
  function handleAddNewRecipe(newRecipe) {
    newRecipe.id = uid();
    console.log(newRecipe);
  }
  return (
    <>
      <GlobalStyle />
      <Component
        {...pageProps}
        recipes={recipes}
        onAddNewRecipe={handleAddNewRecipe}
      />
    </>
  );
}

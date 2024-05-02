import GlobalStyle from "../styles";
import { initialRecipes } from "@/lib/recipes";
import { useState } from "react";
import { uid } from "uid";

export default function App({ Component, pageProps }) {
  const [recipes, setRecipes] = useState(initialRecipes);

  function handleAddRecipe(newRecipe) {
    newRecipe.id = uid();
    newRecipe.editable = true;
    const updatedRecipes = [...recipes, newRecipe];
    setRecipes(updatedRecipes);
  }

  console.log(recipes[31]);

  return (
    <>
      <GlobalStyle />
      <Component
        {...pageProps}
        recipes={recipes}
        onAddRecipe={handleAddRecipe}
      />
    </>
  );
}

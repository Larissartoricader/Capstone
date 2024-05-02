import GlobalStyle from "../styles";
import { initialRecipes } from "@/lib/recipes";
import { useState } from "react";
import { uid } from "uid";

export default function App({ Component, pageProps }) {
  const [recipes, setRecipes] = useState(initialRecipes);

  function handleAddRecipe(newRecipe) {
    newRecipe.id = uid();
    newRecipe.editable = true;
    const { id, ingredients, preparation, symptoms, title, usage } = newRecipe;
    // TODO keys so ordnen wie in ursprünglichen recipes
    const updatedRecipes = [...recipes, newRecipe];
    setRecipes(updatedRecipes);
  }

  console.log(recipes[30]);

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

import NavigationBar from "@/components/NavigationBar";
import GlobalStyle from "../styles";
import { initialRecipes } from "@/lib/recipes";
import { useState } from "react";
import { uid } from "uid";
import { useState } from "react";
import { initialRecipes } from "@/lib/recipes";

export default function App({ Component, pageProps }) {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [bookmarkedRecipesIDs, setBookmarkedRecipesIDs] = useState([]);

  function handleAddRecipe(newRecipe) {
    newRecipe.id = uid();
    newRecipe.editable = true;
    const updatedRecipes = [...recipes, newRecipe];
    setRecipes(updatedRecipes);
  }

  function checkIfRecipeIsBookmarked(id) {
    return bookmarkedRecipesIDs.includes(id);
  }

  function addRecipeToBookmarked(id) {
    setBookmarkedRecipesIDs([id, ...bookmarkedRecipesIDs]);
  }

  function removeRecipeFromBookmarked(id) {
    const recipeIsBookmarkedWithoutCertainID = bookmarkedRecipesIDs.filter(
      (item) => item !== id
    );
    setBookmarkedRecipesIDs(recipeIsBookmarkedWithoutCertainID);
  }

  function handleBookmarkedIcon(recipe) {
    const id = recipe.id;
    checkIfRecipeIsBookmarked(id)
      ? removeRecipeFromBookmarked(id)
      : addRecipeToBookmarked(id);
  }

  return (
    <>
      <GlobalStyle />
      <Component
        {...pageProps}
        recipes={recipes}
        onAddRecipe={handleAddRecipe}
        onHandleBookmarkedIcon={handleBookmarkedIcon}
        bookmarkedRecipesIDs={bookmarkedRecipesIDs}
      />
      <NavigationBar />
    </>
  );
}

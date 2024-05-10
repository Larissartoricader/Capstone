import NavigationBar from "@/components/NavigationBar";
import GlobalStyle from "@/components/GlobalStyles";
import { useState } from "react";
import { uid } from "uid";
import { SWRConfig } from "swr";
import useSWR from "swr";

import useLocalStorageState from "use-local-storage-state";

export default function App({ Component, pageProps }) {
  const fetcher = async (url) => {
    const res = await fetch(url);
    if (!res.ok) {
      const error = new Error("An error occurred while trying to fetch");
      error.info = await res.json();
      error.status = res.status;
      throw error;
    }
    return res.json();
  };

  const [bookmarkedRecipesIDs, setBookmarkedRecipesIDs] = useLocalStorageState(
    "bookmarkedRecipesIDs",
    { defaultValue: [] }
  );

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
    const id = recipe._id;
    checkIfRecipeIsBookmarked(id)
      ? removeRecipeFromBookmarked(id)
      : addRecipeToBookmarked(id);
  }

  function handleEditRecipe(editedRecipe, recipeToEdit) {
    recipeToEdit.title = editedRecipe.title;
    recipeToEdit.ingredients = editedRecipe.ingredients;
    recipeToEdit.preparation = editedRecipe.preparation;
    recipeToEdit.usage = editedRecipe.usage;
    recipeToEdit.symptoms = editedRecipe.symptoms;
  }

  function handleDeleteRecipe(deletedRecipe) {
    const updatedRecipes = recipes.filter(
      (recipe) => recipe.id !== deletedRecipe
    );
    setRecipes(updatedRecipes);
  }

  return (
    <>
      <GlobalStyle />
      <SWRConfig value={{ fetcher }}>
        <Component
          {...pageProps}
          onHandleBookmarkedIcon={handleBookmarkedIcon}
          bookmarkedRecipesIDs={bookmarkedRecipesIDs}
          onEditRecipe={handleEditRecipe}
          onDeleteRecipe={handleDeleteRecipe}
        />
      </SWRConfig>

      <NavigationBar />
    </>
  );
}

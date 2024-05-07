import NavigationBar from "@/components/NavigationBar";
import GlobalStyle from "../styles";
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
    const id = recipe.id;
    checkIfRecipeIsBookmarked(id)
      ? removeRecipeFromBookmarked(id)
      : addRecipeToBookmarked(id);
  }

  function handleAddRecipe(newRecipe) {
    newRecipe.id = uid();
    newRecipe.editable = true;
    const updatedRecipes = [newRecipe, ...recipes];
    setRecipes(updatedRecipes);
  }

  function handleEditRecipe(editedRecipe, recipeToEdit) {
    recipeToEdit.title = editedRecipe.title;
    recipeToEdit.ingredients = editedRecipe.ingredients;
    recipeToEdit.preparation = editedRecipe.preparation;
    recipeToEdit.usage = editedRecipe.usage;
    recipeToEdit.symptoms = editedRecipe.symptoms;
  }

  const { data: recipes, isLoading, error } = useSWR("/api/recipes", fetcher);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Oops! Something went wrong..</h1>;
  }

  return (
    <>
      <GlobalStyle />
      <SWRConfig value={{ fetcher }}></SWRConfig>
      <Component
        {...pageProps}
        recipes={recipes}
        onAddRecipe={handleAddRecipe}
        onHandleBookmarkedIcon={handleBookmarkedIcon}
        bookmarkedRecipesIDs={bookmarkedRecipesIDs}
        onEditRecipe={handleEditRecipe}
      />
      <NavigationBar />
    </>
  );
}

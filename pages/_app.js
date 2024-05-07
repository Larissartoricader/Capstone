import NavigationBar from "@/components/NavigationBar";
import GlobalStyle from "@/components/GlobalStyles";
import { useState } from "react";
import { uid } from "uid";
import { initialRecipes } from "@/lib/recipes";
import useLocalStorageState from "use-local-storage-state";

export default function App({ Component, pageProps }) {
  const [recipes, setRecipes] = useState(initialRecipes);
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

  function handleDeleteRecipe(deletedRecipe) {
    const updatedRecipes = recipes.filter(
      (recipe) => recipe.id !== deletedRecipe
    );
    setRecipes(updatedRecipes);
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
        onEditRecipe={handleEditRecipe}
        onDeleteRecipe={handleDeleteRecipe}
      />
      <NavigationBar />
    </>
  );
}

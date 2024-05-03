import NavigationBar from "@/components/NavigationBar";
import GlobalStyle from "../styles";
import { useState } from "react";
import { uid } from "uid";
import { initialRecipes } from "@/lib/recipes";

export default function App({ Component, pageProps }) {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [bookmarkedRecipesIDs, setBookmarkedRecipesIDs] = useState([]);

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

  const [recipeToEdit, setRecipeToEdit] = useState(null);

  function passRecipeToForm(recipe) {
    setRecipeToEdit(recipe);
  }

  // ich möchte das recipe, wo der edit-befehl herkam, ändern.
  // das ist ja im state zwischengespeichert.
  // ich manipuliere hier aber den state (also das recipe wo es herkam) direkt ?? was man eigentlich nicht soll (funktioniert aber)
  // und wenn ich das über den setter versuche, funktioniert es auch nicht
  function handleEditRecipe(editedRecipe) {
    recipeToEdit.title = editedRecipe.title;
    recipeToEdit.ingredients = editedRecipe.ingredients;
    recipeToEdit.preparation = editedRecipe.preparation;
    recipeToEdit.usage = editedRecipe.usage;
    recipeToEdit.symptoms = editedRecipe.symptoms;
    setRecipeToEdit(null);
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
        recipeToEdit={recipeToEdit}
        passRecipeToForm={passRecipeToForm}
        onEditRecipe={handleEditRecipe}
      />
      <NavigationBar />
    </>
  );
}

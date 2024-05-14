import NavigationBar from "@/components/NavigationBar";
import GlobalStyle from "@/components/GlobalStyles";
import { SWRConfig } from "swr";
import useLocalStorageState from "use-local-storage-state";
import { ToastContainer, toast } from "react-toastify";

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

  function addRecipeToBookmarked(id) {
    setBookmarkedRecipesIDs([id, ...bookmarkedRecipesIDs]);
    showToastMessage("Rezept wurde den Lesezeichen hinzugefügt.");
  }

  function removeRecipeFromBookmarked(id) {
    const recipeIsBookmarkedWithoutCertainID = bookmarkedRecipesIDs.filter(
      (item) => item !== id
    );
    setBookmarkedRecipesIDs(recipeIsBookmarkedWithoutCertainID);
    showToastMessage("Rezept wurde aus den Lesezeichen entfernt.");
  }

  function showToastMessage(message) {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
    });
  }

  function handleBookmarkedIcon(recipe) {
    const id = recipe._id;
    checkIfRecipeIsBookmarked(id)
      ? removeRecipeFromBookmarked(id)
      : addRecipeToBookmarked(id);
  }

  function handleDeleteRecipe(deletedRecipe) {
    const updatedRecipes = recipes.filter(
      (recipe) => recipe.id !== deletedRecipe
    );
    setRecipes(updatedRecipes);
    showToastMessage("Rezept wurde gelöscht.");
  }

  return (
    <>
      <GlobalStyle />
      <SWRConfig value={{ fetcher }}>
        <Component
          {...pageProps}
          onHandleBookmarkedIcon={handleBookmarkedIcon}
          bookmarkedRecipesIDs={bookmarkedRecipesIDs}
          onDeleteRecipe={handleDeleteRecipe}
        />
      </SWRConfig>
      <NavigationBar />
      <ToastContainer />
    </>
  );
}

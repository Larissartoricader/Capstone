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
          onDeleteRecipe={handleDeleteRecipe}
        />
      </SWRConfig>
      <NavigationBar />
    </>
  );
}

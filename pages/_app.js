import NavigationBar from "@/components/NavigationBar";
import GlobalStyle from "@/components/GlobalStyles";
import { SWRConfig } from "swr";
import useLocalStorageState from "use-local-storage-state";

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

export default function App({ Component, pageProps }) {
  const [bookmarkedRecipesIDs, setBookmarkedRecipesIDs] = useLocalStorageState(
    "bookmarkedRecipesIDs",
    { defaultValue: [] },
  );

  function checkIfRecipeIsBookmarked(id) {
    return bookmarkedRecipesIDs.includes(id);
  }

  function addRecipeToBookmarked(id) {
    setBookmarkedRecipesIDs([id, ...bookmarkedRecipesIDs]);
  }

  function removeRecipeFromBookmarked(id) {
    const recipeIsBookmarkedWithoutCertainID = bookmarkedRecipesIDs.filter(
      (item) => item !== id,
    );
    setBookmarkedRecipesIDs(recipeIsBookmarkedWithoutCertainID);
  }

  function handleBookmarkedIcon(recipe) {
    const id = recipe._id;
    checkIfRecipeIsBookmarked(id)
      ? removeRecipeFromBookmarked(id)
      : addRecipeToBookmarked(id);
  }

  return (
    <>
      <GlobalStyle />
      <SWRConfig value={{ fetcher }}>
        <Component
          {...pageProps}
          onHandleBookmarkedIcon={handleBookmarkedIcon}
          bookmarkedRecipesIDs={bookmarkedRecipesIDs}
        />
      </SWRConfig>
      <NavigationBar />
    </>
  );
}

import FilterForm from "@/components/FilterForm";
import useSWR from "swr";

export default function HomePage({
  bookmarkedRecipesIDs,
  onHandleBookmarkedIcon,
}) {
  const { data: recipes, isLoading, error } = useSWR("/api/recipes");

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Oops! Something went wrong..</h1>;
  }
  return (
    <div>
      <FilterForm
        recipes={recipes}
        bookmarkedRecipesIDs={bookmarkedRecipesIDs}
        onHandleBookmarkedIcon={onHandleBookmarkedIcon}
      />
    </div>
  );
}

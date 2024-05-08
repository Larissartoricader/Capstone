import FilterForm from "@/components/FilterForm";
import Link from "next/link";
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
      <Link href={"/recipe-form"}>Create</Link>
      <FilterForm
        recipes={recipes}
        bookmarkedRecipesIDs={bookmarkedRecipesIDs}
        onHandleBookmarkedIcon={onHandleBookmarkedIcon}
      />
    </div>
  );
}

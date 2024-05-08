import FilterForm from "@/components/FilterForm";
import RecipeList from "@/components/RecipeList";
import Link from "next/link";
import styled from "styled-components";

export default function HomePage({
  recipes,
  bookmarkedRecipesIDs,
  onHandleBookmarkedIcon,
}) {
  return (
    <div>
      <Link href={"/recipe-form"}>Create</Link>
      <FilterForm
        recipes={recipes}
        bookmarkedRecipesIDs={bookmarkedRecipesIDs}
        onHandleBookmarkedIcon={onHandleBookmarkedIcon}
      />
      {/* <RecipeList
        bookmarkedRecipesIDs={bookmarkedRecipesIDs}
        recipes={recipes}
        onHandleBookmarkedIcon={onHandleBookmarkedIcon}
      /> */}
    </div>
  );
}

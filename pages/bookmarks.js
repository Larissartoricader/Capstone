import React from "react";
import RecipeList from "@/components/RecipeList/RecipeList";
import useSWR from "swr";
import { WhiteSpace, BookmarkWrapper } from "@/components/BookmarkPage.styles";

export default function BookmarkPage({
  bookmarkedRecipesIDs,
  onToggleBookmark,
}) {
  const { data: recipes, isLoading, error } = useSWR("/api/recipes");

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Oops! Something went wrong..</h1>;
  }

  const bookmarkedRecipes = recipes.filter((recipe) =>
    bookmarkedRecipesIDs.includes(recipe._id)
  );

  return (
    <>
      <BookmarkWrapper>
        <RecipeList
          bookmarkedRecipesIDs={bookmarkedRecipesIDs}
          recipes={bookmarkedRecipes}
          onToggleBookmark={onToggleBookmark}
        />
      </BookmarkWrapper>
      <WhiteSpace />
    </>
  );
}

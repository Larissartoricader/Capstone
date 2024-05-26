import React from "react";
import styled from "styled-components";
import RecipeList from "@/components/RecipeList/RecipeList";
import useSWR from "swr";

const WhiteSpace = styled.div`
  height: 20vh;
`;

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
    bookmarkedRecipesIDs.includes(recipe._id),
  );

  return (
    <>
      <RecipeList
        bookmarkedRecipesIDs={bookmarkedRecipesIDs}
        recipes={bookmarkedRecipes}
        onToggleBookmark={onToggleBookmark}
      />
      <WhiteSpace />
    </>
  );
}

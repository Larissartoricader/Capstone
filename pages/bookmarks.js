import React from "react";
import styled from "styled-components";
import RecipeList from "@/components/RecipeList";
import useSWR from "swr";

const WhiteSpace = styled.div`
  height: 20vh;
`;

const StyledHeadline = styled.h1`
  text-align: center;
`;

export default function BookmarkPage({
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

  const bookmarkedRecipes = recipes.filter((recipe) =>
    bookmarkedRecipesIDs.includes(recipe._id)
  );

  return (
    <>
      <StyledHeadline>Bookmark Page</StyledHeadline>
      <RecipeList
        bookmarkedRecipesIDs={bookmarkedRecipesIDs}
        recipes={bookmarkedRecipes}
        onHandleBookmarkedIcon={onHandleBookmarkedIcon}
      />
      <WhiteSpace />
    </>
  );
}

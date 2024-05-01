import React from "react";
import styled from "styled-components";

import RecipeList from "@/components/RecipeList";

export default function BookmarkPage({
  bookmarkedRecipesIDs,
  onHandleBookmarkedIcon,
  recipes,
}) {
  const StyledHeadline = styled.h1`
    text-align: center;
  `;

  const bookmarkedRecipes = recipes.filter((recipe) =>
    bookmarkedRecipesIDs.includes(recipe.id)
  );

  return (
    <>
      <h2>Bookmark Page</h2>
      <RecipeList
        bookmarkedRecipesIDs={bookmarkedRecipesIDs}
        recipes={bookmarkedRecipes}
        onHandleBookmarkedIcon={onHandleBookmarkedIcon}
      />
    </>
  );
}

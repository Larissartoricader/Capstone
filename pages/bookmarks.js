import React from "react";
import styled from "styled-components";
import Link from "next/link";

import RecipeList from "@/components/RecipeList";

const WhiteSpace = styled.div`
  height: 20vh;
`;

export default function BookmarkPage({
  bookmarkedRecipesIDs,
  onHandleBookmarkedIcon,
  recipes,
}) {
  const bookmarkedRecipes = recipes.filter((recipe) =>
    bookmarkedRecipesIDs.includes(recipe.id)
  );
  const StyledHeadline = styled.h1`
    text-align: center;
  `;
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

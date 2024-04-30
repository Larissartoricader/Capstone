import React, { useState } from "react";
import styled from "styled-components";
import { recipes } from "@/lib/recipes";
import RecipeList from "@/components/RecipeList";

export default function BookmarkPage({ bookmarkedRecipesIDs }) {
  const StyledHeadline = styled.h1`
    text-align: center;
  `;

  const bookmarkedRecipes = recipes.filter((recipe) =>
    bookmarkedRecipesIDs.includes(parseInt(recipe.id))
  );

  console.log(bookmarkedRecipes);
  return (
    <>
      <h2>Bookmark Page</h2>
      <RecipeList recipes={bookmarkedRecipes} />
    </>
  );
}

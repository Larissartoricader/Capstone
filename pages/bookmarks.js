import React, { useState } from "react";
import styled from "styled-components";
import RecipeList from "@/components/RecipeList";
import { recipes } from "@/lib/recipes";

export default function BookmarkPage() {
  const StyledHeadline = styled.h1`
    text-align: center;
  `;

  const [bookmarkedRecipes, setBookmarkedRecipes] = useState(
    recipes.filter((item) => item.isBookmarked)
  );

  const removeBookmark = (recipeId) => {
    setBookmarkedRecipes((prevBookmarkedRecipes) =>
      prevBookmarkedRecipes.filter((recipe) => recipe.id !== recipeId)
    );
  };

  return (
    <div>
      <StyledHeadline>Bookmarked Page</StyledHeadline>
      <RecipeList
        recipes={bookmarkedRecipes}
        onBookmarkToggle={removeBookmark}
      />
    </div>
  );
}

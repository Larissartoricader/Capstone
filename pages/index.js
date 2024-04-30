import RecipeList from "@/components/RecipeList";
import styled from "styled-components";

export default function HomePage({
  recipes,
  bookmarkedRecipesIDs,
  onHandleBookmarkedIcon,
}) {
  console.log("recipes", recipes);
  const StyledHeadline = styled.h1`
    text-align: center;
  `;
  return (
    <div>
      <StyledHeadline>Recipes Overview</StyledHeadline>
      <RecipeList
        bookmarkedRecipesIDs={bookmarkedRecipesIDs}
        recipes={recipes}
        onHandleBookmarkedIcon={onHandleBookmarkedIcon}
      />
    </div>
  );
}

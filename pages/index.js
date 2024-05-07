import RecipeList from "@/components/RecipeList";
import { useRouter } from "next/router";
import styled from "styled-components";

const StyledHeadline = styled.h1`
  text-align: center;
`;

export default function HomePage({
  recipes,
  bookmarkedRecipesIDs,
  onHandleBookmarkedIcon,
}) {
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

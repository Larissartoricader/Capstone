import RecipeList from "@/components/RecipeList";
import styled from "styled-components";
import useSWR from "swr";

const StyledHeadline = styled.h1`
  text-align: center;
`;

export default function HomePage({
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

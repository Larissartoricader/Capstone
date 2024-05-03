import RecipeCard from "./RecipeCard";
import styled from "styled-components";

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4vh;
  padding: 0 5vw;
`;

const WhiteSpace = styled.div`
  height: 11vh;
`;

export default function RecipeList({
  recipes,
  onHandleBookmarkedIcon,
  bookmarkedRecipesIDs,
}) {
  return (
    <>
      <StyledList>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <RecipeCard
              onHandleBookmarkedIcon={onHandleBookmarkedIcon}
              bookmarkedRecipesIDs={bookmarkedRecipesIDs}
              recipe={recipe}
            />
          </li>
        ))}
      </StyledList>
      <WhiteSpace></WhiteSpace>
    </>
  );
}

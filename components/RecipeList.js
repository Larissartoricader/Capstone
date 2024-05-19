import RecipeCard from "./RecipeCard";
import styled from "styled-components";

const StyledList = styled.div`
  list-style: none;
  display: grid;
  column-gap: 20px;
  row-gap: 40px;
  grid-template-columns: 1fr;

  @media only screen and (min-width: 425px) {
    grid-template-columns: 1fr;
  }

  @media only screen and (min-width: 580px) {
    grid-template-columns: 1fr 1fr;
  }

  @media only screen and (min-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const WhiteSpace = styled.div`
  height: 20vh;
`;

export default function RecipeList({
  recipes,
  onToggleBookmark,
  bookmarkedRecipesIDs,
}) {
  return (
    <>
      <StyledList>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <RecipeCard
              onToggleBookmark={onToggleBookmark}
              bookmarkedRecipesIDs={bookmarkedRecipesIDs}
              recipe={recipe}
            />
          </li>
        ))}
      </StyledList>
      <WhiteSpace />
    </>
  );
}

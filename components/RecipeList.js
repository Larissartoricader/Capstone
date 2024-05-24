import RecipeCard from "./RecipeCard";
import styled from "styled-components";

const StyledList = styled.div`
  list-style: none;
  display: grid;
  column-gap: 30px;
  row-gap: 20px;
  grid-template-columns: 1fr;
  padding-inline: 10px;

  /* @media only screen and (min-width: 425px) {
    grid-template-columns: 1fr;
  } */

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
  const sortedRecipes = recipes.sort((a, b) => {
    if (a._id > b._id) return -1;
    if (a._id < b._id) return 1;
    return 0;
  });

  return (
    <>
      <StyledList>
        {sortedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <RecipeCard
              onToggleBookmark={onToggleBookmark}
              bookmarkedRecipesIDs={bookmarkedRecipesIDs}
              recipe={recipe}
              aria-label={`Recipe card for ${recipe.title}`}
            />
          </li>
        ))}
      </StyledList>
      <WhiteSpace />
    </>
  );
}

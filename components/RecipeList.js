import RecipeCard from "./RecipeCard";
import styled from "styled-components";

const StyledList = styled.ul`
  list-style: none;
  display: grid;
  column-gap: 20px;
  row-gap: 40px;
  grid-template-columns: 1fr;
  padding: 0 28px;

  @media only screen and (min-width: 425px) {
    grid-template-columns: 1fr 1fr;
  }

  @media only screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const WhiteSpace = styled.div`
  height: 20vh;
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
          <li key={recipe._id}>
            <RecipeCard
              onHandleBookmarkedIcon={onHandleBookmarkedIcon}
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

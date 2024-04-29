import { recipes } from "@/lib/recipes";
import RecipeCard from "./RecipeCard";
import styled from "styled-components";

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4vh;
  padding: 0 5vw;
`;

export default function RecipeList() {
  return (
    <StyledList>
      {recipes.map((recipe) => (
        <li key={recipe.id}>
          <RecipeCard recipe={recipe} />
        </li>
      ))}
    </StyledList>
  );
}

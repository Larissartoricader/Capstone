import { recipes } from "@/lib/recipes";
import RecipeCard from "./RecipeCard";
import styled from "styled-components";
export const StyledList = styled.ul`
  list-style: none;
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

import { recipes } from "@/lib/recipes";
import RecipeCard from "./RecipeCard";

export default function RecipeList() {
  const StyledList = styled.ul`
    list-style: none;
  `;
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

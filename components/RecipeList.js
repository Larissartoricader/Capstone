import { recipes } from "@/lib/recipes";
import RecipeCard from "./RecipeCard";
export default function RecipeList() {
  return (
    <ul>
      {recipes.map((recipe) => (
        <li>
          <RecipeCard recipe={recipe} />
        </li>
      ))}
    </ul>
  );
}

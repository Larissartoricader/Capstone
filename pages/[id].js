import { useRouter } from "next/router";
import { recipes } from "../lib/recipe";
import RecipeDetails from "@/components/RecipeDetails";

export default function RecipeDetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <p>No recipe ID specified</p>;
  }

  const currentRecipe = recipes.find((recipe) => recipe.id === id);

  if (!currentRecipe) {
    return <p>Recipe not found</p>;
  }

  return <RecipeDetails currentRecipe={currentRecipe} />;
}

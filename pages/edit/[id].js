import RecipeForm from "@/components/RecipeForm";
import { useRouter } from "next/router";

export default function EditRecipePage({ recipes, onEditRecipe }) {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <p>No recipe ID specified</p>;
  }

  const currentRecipe = recipes.find((recipe) => recipe.id === id);

  return (
    <RecipeForm recipeToEdit={currentRecipe} onEditRecipe={onEditRecipe} />
  );
}

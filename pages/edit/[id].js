import RecipeForm from "@/components/RecipeForm";
import { useRouter } from "next/router";

export default function EditPage({ recipes }) {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <p>No recipe ID specified</p>;
  }

  const currentRecipe = recipes.find((recipe) => recipe.id === id);
  console.log(currentRecipe);
  return <RecipeForm recipeToEdit={currentRecipe} />;
}

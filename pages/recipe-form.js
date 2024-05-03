import RecipeForm from "@/components/RecipeForm";
import Link from "next/link";

export default function RecipeFormPage({
  onAddRecipe,
  onEditRecipe,
  recipeToEdit,
}) {
  return (
    <>
      <RecipeForm
        onAddRecipe={onAddRecipe}
        recipeToEdit={recipeToEdit}
        onEditRecipe={onEditRecipe}
      />
      <Link href={"./"}>Back</Link>
    </>
  );
}

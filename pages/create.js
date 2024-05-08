import RecipeForm from "@/components/RecipeForm";

export default function CreateRecipePage({ onAddRecipe }) {
  return (
    <>
      <RecipeForm onAddRecipe={onAddRecipe} />
    </>
  );
}

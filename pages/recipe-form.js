import RecipeForm from "@/components/RecipeForm";
import Link from "next/link";

export default function RecipeFormPage({ onAddRecipe }) {
  return (
    <>
      <RecipeForm onAddRecipe={onAddRecipe} />
      <Link href={"./"}>Back</Link>
    </>
  );
}

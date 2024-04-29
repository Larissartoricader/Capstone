import RecipeForm from "@/components/RecipeForm";
import Link from "next/link";

export default function RecipeFormPage({ onAddNewRecipe }) {
  return (
    <>
      <RecipeForm onAddNewRecipe={onAddNewRecipe} />
      <Link href={"./"}>Back</Link>
    </>
  );
}

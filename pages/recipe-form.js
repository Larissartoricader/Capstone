import RecipeForm from "@/components/RecipeForm";
import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";

export default function RecipeFormPage({
  onAddRecipe,
  // onEditRecipe,
  // recipeToEdit,
}) {
  const router = useRouter();
  return (
    <>
      <RecipeForm
        onAddRecipe={onAddRecipe}
        // recipeToEdit={recipeToEdit}
        // onEditRecipe={onEditRecipe}
      />
    </>
  );
}

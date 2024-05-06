import RecipeForm from "@/components/RecipeForm";
import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";

const Button = styled.button``;

export default function RecipeFormPage({
  onAddRecipe,
  onEditRecipe,
  recipeToEdit,
}) {
  const router = useRouter();
  return (
    <>
      <Button onClick={() => router.back()}>Cancel</Button>
      <RecipeForm
        onAddRecipe={onAddRecipe}
        recipeToEdit={recipeToEdit}
        onEditRecipe={onEditRecipe}
      />
    </>
  );
}

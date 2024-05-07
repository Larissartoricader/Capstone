import RecipeForm from "@/components/RecipeForm";
import styled from "styled-components";
import Link from "next/link";

export default function CreateRecipePage({ onAddRecipe }) {
  return (
    <>
      <RecipeForm onAddRecipe={onAddRecipe} />
    </>
  );
}

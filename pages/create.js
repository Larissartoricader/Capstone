import RecipeForm from "@/components/RecipeForm";
import styled from "styled-components";
import { useRouter } from "next/router";
import Link from "next/link";

export default function RecipeFormPage({ onAddRecipe }) {
  const router = useRouter();
  return (
    <>
      <RecipeForm onAddRecipe={onAddRecipe} />
    </>
  );
}

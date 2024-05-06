import RecipeForm from "@/components/RecipeForm";
import styled from "styled-components";
import { useRouter } from "next/router";

const Button = styled.button``;

export default function RecipeFormPage({ onAddRecipe }) {
  const router = useRouter();
  return (
    <>
      <div>
        <Button onClick={() => router.back()}>Cancel</Button>
      </div>
      <RecipeForm onAddRecipe={onAddRecipe} />
    </>
  );
}

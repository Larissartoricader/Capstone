import RecipeList from "@/components/RecipeList";
import styled from "styled-components";

export default function HomePage({ recipes }) {
  console.log("recipes", recipes);
  const StyledHeadline = styled.h1`
    text-align: center;
  `;
  return (
    <div>
      <StyledHeadline>Recipes Overview</StyledHeadline>
      <RecipeList recipes={recipes} />
    </div>
  );
}

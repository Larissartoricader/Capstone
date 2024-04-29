import RecipeList from "@/components/RecipeList";
import Link from "next/link";

import styled from "styled-components";

export default function HomePage({ recipes }) {
  const StyledHeadline = styled.h1`
    text-align: center;
  `;

  return (
    <div>
      <Link href={"/recipe-form"}>Create</Link>
      <StyledHeadline>Recipes Overview</StyledHeadline>
      <RecipeList recipes={recipes} />
    </div>
  );
}

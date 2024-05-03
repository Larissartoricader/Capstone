import FilterForm from "@/components/FilterForm";
import RecipeList from "@/components/RecipeList";
import Link from "next/link";

import styled from "styled-components";

export default function HomePage({
  recipes,
  bookmarkedRecipesIDs,
  onHandleBookmarkedIcon,
}) {
  const StyledHeadline = styled.h1`
    text-align: center;
  `;

  return (
    <div>
      <Link href={"/recipe-form"}>Create</Link>
      <FilterForm />
      <StyledHeadline>Recipes Overview</StyledHeadline>
      <RecipeList
        bookmarkedRecipesIDs={bookmarkedRecipesIDs}
        recipes={recipes}
        onHandleBookmarkedIcon={onHandleBookmarkedIcon}
      />
    </div>
  );
}

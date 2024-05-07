import FilterForm from "@/components/FilterForm";
import RecipeList from "@/components/RecipeList";
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
<<<<<<< HEAD
      <Link href={"/recipe-form"}>Create</Link>
      <FilterForm
        recipes={recipes}
        bookmarkedRecipesIDs={bookmarkedRecipesIDs}
        onHandleBookmarkedIcon={onHandleBookmarkedIcon}
      />
=======
>>>>>>> main
      <StyledHeadline>Recipes Overview</StyledHeadline>
      <RecipeList
        bookmarkedRecipesIDs={bookmarkedRecipesIDs}
        recipes={recipes}
        onHandleBookmarkedIcon={onHandleBookmarkedIcon}
      />
    </div>
  );
}

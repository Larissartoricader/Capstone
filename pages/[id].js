import { useRouter } from "next/router";
import RecipeDetails from "@/components/RecipeDetails";
import { StyledRecipeHeader, BackLink, StyledRecipeBy, StyledHerbie, StyledHerbieBox, StyledStar, HerbieStarBox, ContentContainer, WhiteSpace
 } from "@/components/RecipeDetailsPage.styles";
import useSWR from "swr";
import Link from "next/link";
import { GoStarFill } from "react-icons/go";



export default function RecipeDetailsPage({
  onDeleteRecipe,
  bookmarkedRecipesIDs,
  onToggleBookmark,
}) {
  const router = useRouter();
  const { id } = router.query;
  const {
    data: currentRecipe,
    isLoading,
    error,
  } = useSWR(`/api/recipes/${id || ""}`);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <div>Oops! Something went wrong.</div>;
  }

  function handleBackClick(event) {
    event.preventDefault();
    router.back();
  }

  return (
    <>
      <StyledRecipeHeader>
        <BackLink href="/" onClick={handleBackClick}>
          back
        </BackLink>
        <StyledHerbieBox>
          <StyledRecipeBy>Recipe by</StyledRecipeBy>
          {currentRecipe.author ? (
            <p>{currentRecipe.author}</p>
          ) : (
            <HerbieStarBox>
              <StyledHerbie>herbie</StyledHerbie>
              <StyledStar />
            </HerbieStarBox>
          )}
        </StyledHerbieBox>

      </StyledRecipeHeader>

      <ContentContainer>
        <RecipeDetails
          currentRecipe={currentRecipe}
          onDeleteRecipe={onDeleteRecipe}
          onToggleBookmark={onToggleBookmark}
          bookmarkedRecipesIDs={bookmarkedRecipesIDs}
        />
      </ContentContainer>
      <WhiteSpace />
    </>
  );
}

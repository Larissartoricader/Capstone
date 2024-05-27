import { useRouter } from "next/router";
import RecipeDetails from "@/components/RecipeDetails/RecipeDetails";
import { AuthorName, StyledRecipeHeader, BackLink, StyledRecipeBy, StyledHerbie, StyledHerbieBox, StyledStar, HerbieStarBox, ContentContainer, WhiteSpace
 } from "@/components/RecipeDetailsPage.styles";
import useSWR from "swr";
import { ConfirmationModal } from "@/components/ConfirmationModal/ConfirmationModal";


export default function RecipeDetailsPage({
  onDeleteRecipe,
  bookmarkedRecipesIDs,
  onToggleBookmark,
  modalInfo,
  openModal,
  modalRef,
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
            <AuthorName>{currentRecipe.author}</AuthorName>
          ) : (
            <HerbieStarBox>
              <StyledHerbie>herbie</StyledHerbie>
              <StyledStar />
            </HerbieStarBox>
          )}
        </StyledHerbieBox>

      </StyledRecipeHeader>

      <ContentContainer>
        <ConfirmationModal modalRef={modalRef} modalInfo={modalInfo} />
        <RecipeDetails
          currentRecipe={currentRecipe}
          onDeleteRecipe={onDeleteRecipe}
          onToggleBookmark={onToggleBookmark}
          bookmarkedRecipesIDs={bookmarkedRecipesIDs}
          showDeleteModal={openModal}
        />
      </ContentContainer>
      <WhiteSpace />
    </>
  );
}

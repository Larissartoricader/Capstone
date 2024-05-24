import { useRouter } from "next/router";
import RecipeDetails from "@/components/RecipeDetails";
import styled from "styled-components";
import useSWR from "swr";
import Link from "next/link";
import { GoStarFill } from "react-icons/go";
import { ConfirmationModal } from "@/components/ConfirmationModal";

const StyledRecipeHeader = styled.div`
  display: flex;
  padding-right: 10px;
  justify-content: space-between;
`;

const BackLink = styled(Link).attrs({
  alt: "Back to recipes",
})`
  background-color: #fcfbf4;
  padding: 10px;
  margin-top: 20px;
  margin-left: 20px;
  border-radius: 15px;
  width: 10%;
  height: 10%;
  color: black;
  text-align: center;
  font-weight: bold;
`;

const StyledRecipeBy = styled.p`
  font-size: small;
`;

const StyledHerbie = styled.p`
  font-size: large;
  font-family: var(--herbie-font);
`;

const StyledHerbieBox = styled.div`
  display: flex;
  gap: 3px;
  align-items: center;
`;

const StyledStar = styled(GoStarFill)`
  color: #ffa62f;
  font-size: 20px;
  filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.3));
`;

const HerbieStarBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1px;
`;

const ContentContainer = styled.div`
  margin-top: 3px;
`;

const WhiteSpace = styled.div`
  height: 20vh;
`;

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

import { useRouter } from "next/router";
import RecipeDetails from "@/components/RecipeDetails";
import styled from "styled-components";
import useSWR from "swr";
import Link from "next/link";

const StyledRecipeHeader = styled.div`
  display: flex;
  padding-right: 10px;
  justify-content: space-between;
`;

const BackLink = styled(Link)`
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
  font-size: x-large;
`;

const StyledHerbieBox = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
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
          <StyledHerbie>herbie</StyledHerbie>
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

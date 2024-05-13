import { useRouter } from "next/router";
import RecipeDetails from "@/components/RecipeDetails";
import styled from "styled-components";
import useSWR from "swr";

const StyledRecipeDetailPage = styled.div`
  background-color: #c8ecb8;
`;

const BackLink = styled.a`
  background-color: #fcfbf4;
`;

const ContentContainer = styled.div`
  margin-top: 70px;
`;

const WhiteSpace = styled.div`
  height: 20vh;
`;

export default function RecipeDetailsPage({ onDeleteRecipe }) {
  const router = useRouter();
  const { id } = router.query;
  const {
    data: currentRecipe,
    isLoading,
    error,
  } = useSWR(`/api/recipes/${id}`);

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
    <StyledRecipeDetailPage>
      <BackLink href="/" onClick={handleBackClick}>
        Back
      </BackLink>
      <ContentContainer>
        <RecipeDetails
          currentRecipe={currentRecipe}
          onDeleteRecipe={onDeleteRecipe}
        />
      </ContentContainer>
      <WhiteSpace />
    </StyledRecipeDetailPage>
  );
}

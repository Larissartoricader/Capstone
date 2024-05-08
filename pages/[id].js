import { useRouter } from "next/router";
import RecipeDetails from "@/components/RecipeDetails";
import styled from "styled-components";
import useSWR from "swr";

const BackgroundContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 10vh;
  /* background-image: url("https://unsplash.com/de/fotos/green-vegetable-beside-ceramic-bowl-kXQ3J7_2fpc"); */
  background-color: lightgray;
  background-size: cover;
  z-index: 0;
`;

const BackLink = styled.a`
  position: relative;
  border: solid 2px black;
  margin-top: 20%;
`;

const ContentContainer = styled.div`
  position: relative;
  margin-top: 100px;
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
    <>
      <BackgroundContainer>
        <BackLink href="/" onClick={handleBackClick}>
          Back
        </BackLink>
      </BackgroundContainer>
      <ContentContainer>
        <RecipeDetails
          currentRecipe={currentRecipe}
          onDeleteRecipe={onDeleteRecipe}
        />
      </ContentContainer>
      <WhiteSpace />
    </>
  );
}

import { useRouter } from "next/router";

import RecipeDetails from "@/components/RecipeDetails";
import styled from "styled-components";
import { recipes } from "@/lib/recipes";

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

export default function RecipeDetailsPage({
  recipes,
  passRecipeToForm,
  onDeleteRecipe,
}) {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <p>No recipe ID specified</p>;
  }

  const currentRecipe = recipes.find((recipe) => recipe.id === id);

  if (!currentRecipe) {
    return <p>Recipe not found</p>;
  }

  function handleBackClick(event) {
    event.preventDefault();
    router.back();
  }

  return (
    <>
      <BackgroundContainer>
        <BackLink href="#" onClick={handleBackClick}>
          Back
        </BackLink>
      </BackgroundContainer>
      <ContentContainer>
        <RecipeDetails
          currentRecipe={currentRecipe}
          passRecipeToForm={passRecipeToForm}
          onDeleteRecipe={onDeleteRecipe}
        />
      </ContentContainer>
      <WhiteSpace />
    </>
  );
}

import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { RiArrowDropDownLine } from "react-icons/ri";
import Image from "next/image";

const RecipeArticle = styled.article`
  background-color: #fcfbf4;
  margin-inline: 15px;
  border-radius: 20px;
`;

const StyledRecipeDetailPicture = styled.div`
  border-radius: 20px 20px 0 0;
  width: 100%;
  height: 180px;
  position: relative;
`;

const StyledImage = styled(Image)`
  border-radius: 20px 20px 0 0;
`;

const SytledRecipeTitle = styled.h2`
  margin-left: 20px;
  font-size: xx-large;
`;

const StyledItemsBox = styled.div`
  list-style: none;
  display: flex;
  align-items: center;
  gap: 5px;
  padding-bottom: 10px;
`;

const StyledItemListTitle = styled.h3`
  margin-left: 20px;
  font-size: medium;
  margin-left: 20px;
`;

const StyleItemsList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 10px;
`;

const StyledItems = styled.li`
  background-color: #f1efe2;
  border-radius: 10px;
  text-align: center;
  padding: 5px;
`;

const CollapsibleContainer = styled.div`
  margin-bottom: 10px;
`;

const CollapsibleButton = styled.div`
  background-color: #dedbdb;
  color: black;
  cursor: pointer;
  padding: 2px;
  margin: 5px;
  border-radius: 7px;
  border: solid black 1px;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledIcon = styled(RiArrowDropDownLine)`
  font-size: 40px;
`;

const StyledTextButton = styled.p`
  font-size: medium;
  text-align: center;
`;

const CollapsibleContent = styled.div`
  padding: 0 18px;
  margin: 5px;
  overflow: hidden;
  background-color: #f1f1f1;
  max-height: ${(props) => (props.isOpen ? "500px" : "0")};
  transition: max-height 0.3s ease-out;
`;

const CollapsibleText = styled.p`
  font-size: medium;
`;

export default function RecipeDetails({ currentRecipe, onDeleteRecipe }) {
  const router = useRouter();
  const { title, ingredients, preparation, usage, symptoms } = currentRecipe;

  const [isPreparationOpen, setIsPreparationOpen] = useState(false);
  const [isUsageOpen, setIsUsageOpen] = useState(false);

  const togglePreparationCollapse = () => {
    setIsPreparationOpen(!isPreparationOpen);
  };

  const toggleUsageCollapse = () => {
    setIsUsageOpen(!isUsageOpen);
  };

  function handleClick() {
    router.push(`/edit/${currentRecipe._id}`);
  }

  function handleDelete() {
    if (confirm("Are you sure you want to delete this recipe?")) {
      onDeleteRecipe(currentRecipe._id);
      router.push("/");
    }
  }

  console.log(currentRecipe);

  return (
    <RecipeArticle aria-label="Recipe Details">
      <StyledRecipeDetailPicture>
        <StyledImage
          src="https://images.unsplash.com/photo-1564278453360-c65eda0a200e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          layout="fill"
          objectFit="cover"
          alt="bottle of rum e.g. remedy"
        />
      </StyledRecipeDetailPicture>
      <SytledRecipeTitle>{title}</SytledRecipeTitle>
      <StyledItemsBox>
        <StyledItemListTitle>Ingredients:</StyledItemListTitle>
        <StyleItemsList>
          {ingredients.map((ingredient, index) => (
            <StyledItems key={index}>{ingredient}</StyledItems>
          ))}
        </StyleItemsList>
      </StyledItemsBox>
      <CollapsibleContainer>
        <CollapsibleButton onClick={togglePreparationCollapse}>
          <StyledTextButton>Preparation</StyledTextButton>
          <StyledIcon />
        </CollapsibleButton>
        <CollapsibleContent isOpen={isPreparationOpen}>
          <CollapsibleText>{preparation}</CollapsibleText>
        </CollapsibleContent>

        <CollapsibleButton onClick={toggleUsageCollapse}>
          Usage
          <StyledIcon />
        </CollapsibleButton>

        <CollapsibleContent isOpen={isUsageOpen}>
          <CollapsibleText>{usage}</CollapsibleText>
        </CollapsibleContent>
      </CollapsibleContainer>
      <StyledItemsBox>
        <StyledItemListTitle> Symptoms</StyledItemListTitle>
        <StyleItemsList>
          {symptoms.map((symptoms, index) => (
            <StyledItems key={index}>{symptoms}</StyledItems>
          ))}
        </StyleItemsList>
      </StyledItemsBox>
      {currentRecipe.editable && <button onClick={handleClick}>Edit</button>}
      {currentRecipe.editable && <button onClick={handleDelete}>Delete</button>}
    </RecipeArticle>
  );
}

import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { RiArrowDropDownLine } from "react-icons/ri";
import Image from "next/image";
import { BookmarkIcon } from "./BookmarkIcon";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";

const StyledToast = styled.div`
  background-color: #5cb85c;
  color: #fff;
  padding: 10px;
  border-radius: 4px;
`;

const RecipeArticle = styled.article`
  background-color: var(--secondary-background-color);
  margin-inline: 15px;
  border-radius: var(--big-box-border-radius);
  position: relative;
`;

const StyledRecipeDetailPicture = styled.div`
  border-radius: 20px 20px 0 0;
  width: 100%;
  height: 180px;
  position: relative;
`;

const StyledBookmarkIcon = styled.div`
  width: 40px;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
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

const StyledButton = styled.button`
  height: 32px;
  width: 64px;
  color: white;
  font-size: medium;
  border-radius: 7px;
  border: none;
  &:hover {
    background-color: #808080;
  }
`;

const EditButton = styled(StyledButton)`
  background-color: #ffc107;
`;

const DeleteButton = styled(StyledButton)`
  background-color: #ff0000;
`;

const ButtonsBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 10px;
  padding-bottom: 10px;
`;

export default function RecipeDetails({
  currentRecipe,
  bookmarkedRecipesIDs,
  onToggleBookmark,
  showDeleteModal,
}) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isOwner = currentRecipe.owner === session?.user.email;

  const { title, image, ingredients, preparation, usage, symptoms } =
    currentRecipe;

  const [isPreparationOpen, setIsPreparationOpen] = useState(false);
  const [isUsageOpen, setIsUsageOpen] = useState(false);

  const togglePreparationCollapse = () => {
    setIsPreparationOpen(!isPreparationOpen);
  };

  const toggleUsageCollapse = () => {
    setIsUsageOpen(!isUsageOpen);
  };

  const handleDelete = async () => {
    const response = await fetch(`/api/recipes/${currentRecipe._id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      router.push("/");
      toast.success("Recipe deleted successfully!", {});
    }
  };
  const modalContent = {
    message: "Do you really want to delete this Recipe?",
    textButtonClose: "No",
    textButtonConfirm: "Yes",
    onConfirm: handleDelete,
  };

  return (
    <RecipeArticle aria-label="Recipe Details">
      <StyledBookmarkIcon>
        <BookmarkIcon
          onToggleBookmark={onToggleBookmark}
          bookmarkedRecipesIDs={bookmarkedRecipesIDs}
          recipe={currentRecipe}
        />
      </StyledBookmarkIcon>
      <StyledRecipeDetailPicture>
        <StyledImage src={image} layout="fill" objectFit="cover" alt={title} />
      </StyledRecipeDetailPicture>
      <SytledRecipeTitle>{title}</SytledRecipeTitle>
      <StyledItemsBox>
        <StyledItemListTitle>Ingredients:</StyledItemListTitle>
        <StyleItemsList>
          {ingredients.map((ingredient) => (
            <StyledItems key={ingredient}>{ingredient}</StyledItems>
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
          {symptoms.map((symptom) => (
            <StyledItems key={symptom}>{symptom}</StyledItems>
          ))}
        </StyleItemsList>
      </StyledItemsBox>
      <ButtonsBox>
        {status === "authenticated" && isOwner && (
          <>
            <Link href={`/edit/${currentRecipe._id}`}>
              <EditButton type="button">Edit</EditButton>
            </Link>
            <DeleteButton
              onClick={() => {
                showDeleteModal(modalContent);
              }}
              type="button"
            >
              Delete
            </DeleteButton>
          </>
        )}
      </ButtonsBox>
    </RecipeArticle>
  );
}

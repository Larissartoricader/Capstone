import { useRouter } from "next/router";
import { useState } from "react";
import { BookmarkIcon } from "../BookmarkIcon";
import Link from "next/link";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { RecipeArticle, StyledRecipeDetailPicture, StyledBookmarkIcon, StyledImage, SytledRecipeTitle, StyledItemsBox, StyledItemListTitle, StyleItemsList, StyledItems, CollapsibleButton, CollapsibleContainer, StyledIcon, StyledTextButton, CollapsibleContent, CollapsibleText, EditButton, DeleteButton, ButtonsBox } from "./RecipeDetails.styles";


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
        <CollapsibleButton
          onClick={togglePreparationCollapse}
          aria-expanded={isPreparationOpen}
        >
          <StyledTextButton>Preparation</StyledTextButton>
          <StyledIcon />
        </CollapsibleButton>
        <CollapsibleContent isOpen={isPreparationOpen}>
          <CollapsibleText>{preparation}</CollapsibleText>
        </CollapsibleContent>

        <CollapsibleButton
          onClick={toggleUsageCollapse}
          aria-expanded={isUsageOpen}
        >
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

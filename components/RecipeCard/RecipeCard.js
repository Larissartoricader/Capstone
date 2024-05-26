import { BookmarkIcon } from "../BookmarkIcon/BookmarkIcon";
import { useSession } from "next-auth/react";
import { StyledArticle, ReadMoreLink, WrapperBookmarkIcon, StyledImageWrapper, StyledImage, StyledContentWrapper, StyledInfoBox, StyledHeader, AuthorBox, StyledRecipeBy, StyledHerbie, StyleItemsList, StyledItems, StyledStar, HerbieStarBox } from "./RecipeCard.styles";

export default function RecipeCard({
  bookmarkedRecipesIDs,
  onToggleBookmark,
  recipe,
}) {
  const { data: session } = useSession();
  return (
    <StyledArticle>
      <StyledContentWrapper>
        <ReadMoreLink href={`/${recipe._id}`}>
          <StyledInfoBox>
            <StyledHeader>{recipe.title}</StyledHeader>
            <StyleItemsList>
              {recipe.symptoms.map((symptom) => (
                <StyledItems key={symptom}>{symptom}</StyledItems>
              ))}
            </StyleItemsList>
          </StyledInfoBox>
          <AuthorBox>
            <StyledRecipeBy>Recipe by</StyledRecipeBy>
            {recipe.owner ? (
              <p>{recipe.author}</p>
            ) : (
              <HerbieStarBox>
                <StyledHerbie>Herbie</StyledHerbie>
                <StyledStar />
              </HerbieStarBox>
            )}
          </AuthorBox>
        </ReadMoreLink>
      </StyledContentWrapper>

      <StyledImageWrapper>
        <StyledImage
          src={recipe.image}
          height={200}
          width={200}
          alt={recipe.title}
        />
        <WrapperBookmarkIcon>
          <BookmarkIcon
            onToggleBookmark={onToggleBookmark}
            bookmarkedRecipesIDs={bookmarkedRecipesIDs}
            recipe={recipe}
          />
        </WrapperBookmarkIcon>
      </StyledImageWrapper>
    </StyledArticle>
  );
}

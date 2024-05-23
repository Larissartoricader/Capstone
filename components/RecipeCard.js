import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { BookmarkIcon } from "./BookmarkIcon";
import { useSession } from "next-auth/react";

// Container
const StyledArticle = styled.article`
  display: grid;
  grid-template-columns: 4fr 3fr;
  height: 40vh;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }

  @media only screen and (min-width: 580px) {
    height: 30vh;
  }

  @media only screen and (min-width: 1200px) {
    height: 30vh;
  }
`;

const ReadMoreLink = styled(Link)`
  color: black;
  text-decoration: none;
  display: block;
  height: 100%;
`;

// Image-BOX
const WrapperBookmarkIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const StyledImageWrapper = styled.div`
  border-radius: 0 20px 20px 0;
  position: relative;
  overflow: hidden;
`;

const StyledImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

// Text-Box
const StyledContentWrapper = styled.div`
  background-color: #fcfbf4;
  border-radius: 20px 0 0 20px;
  position: relative;
`;

const StyledInfoBox = styled.div`
  margin-left: 10px;
`;

const StyledHeader = styled.p`
  font-weight: bold;
  font-size: large;
  padding-inline: 5px;
`;

const AuthorBox = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  position: absolute;
  bottom: -9px;
  left: 1px;
  font-size: small;
  margin-left: 10px;
`;

const StyledRecipeBy = styled.p`
  font-size: small;
`;

const StyledHerbie = styled.p`
  font-size: medium;
  font-style: italic;
  font-weight: bold;
`;

const StyleItemsList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 7px;
  padding: 5px;
`;

const StyledItems = styled.li`
  background-color: #f1efe2;
  border-radius: 10px;

  padding: 5px;
  font-size: medium;
`;

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
              <StyledHerbie>{recipe.author}</StyledHerbie>
            ) : (
              <StyledHerbie>Herbie</StyledHerbie>
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

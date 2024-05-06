import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { BookmarkIcon } from "./BookmarkIcon";

const StyledList = styled.ul`
  list-style: none;
  padding-left: 2vw;
`;

const StyledArticle = styled.article`
  border: 1px solid black;
  display: flex;
  align-items: center;
  margin-left: 1vw;
  box-sizing: border-box;
`;

const StyledHeadline = styled.h2`
  padding-left: 2vw;
`;

const StyledListHeader = styled.p`
  padding-left: 2vw;
  margin-bottom: vh;
  font-weight: bold;
  font-size: 1.2em;
`;

const StyledListItems = styled.li`
  margin-bottom: 0.5em;
`;

const StyledHeadlineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledCardWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const StyledImageWrapper = styled.div`
  width: 50%;
`;

const StyledLink = styled.link`
  text-decoration: none;
  color: #333;
  padding: 0.5rem 1rem;
  background-color: #eee;
  border-radius: 5px;
  transition: background-color 0.3s ease;
`;

export default function RecipeCard({
  bookmarkedRecipesIDs,
  onHandleBookmarkedIcon,
  recipe,
}) {
  return (
    <StyledArticle>
      <StyledImageWrapper>
        <Image
          src="https://images.unsplash.com/photo-1564278453360-c65eda0a200e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          // fill={true}
          height={250}
          width={250}
          objectFit="contain"
          alt="bottle of rum e.g. remedy"
        ></Image>
      </StyledImageWrapper>
      <StyledCardWrapper>
        <StyledHeadlineWrapper>
          <StyledHeadline>{recipe.title}</StyledHeadline>
          <BookmarkIcon
            onHandleBookmarkedIcon={onHandleBookmarkedIcon}
            bookmarkedRecipesIDs={bookmarkedRecipesIDs}
            recipe={recipe}
          />
        </StyledHeadlineWrapper>
        <StyledListHeader>Symptoms:</StyledListHeader>
        <StyledList>
          {recipe.symptoms.map((symptom) => (
            <StyledListItems key={symptom}>{symptom}</StyledListItems>
          ))}
        </StyledList>
        <Link href={`/${recipe.id}`}>Read More</Link>
      </StyledCardWrapper>
    </StyledArticle>
  );
}

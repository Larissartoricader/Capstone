import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { Bookmark } from "./Bookmark";
import { useState } from "react";

const StyledList = styled.ul`
  list-style: none;
`;

const StyledArticle = styled.article`
  border: 1px solid black;
  margin-left: 1vw;
  display: flex;
`;

const StyledHeadline = styled.h2`
  padding-left: 2vw;
`;

const StyledListHeader = styled.p`
  padding-left: 2vw;
  margin-bottom: 0.5vh;
`;

const StyledListItems = styled.li`
  margin-bottom: 0.5vh;
`;

const StyledHeadlineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const StyledCardWrapper = styled.div`
  width: 100%;
`;

export default function RecipeCard({ recipe }) {
  const [isBookmarked, setIsBookmarked] = useState(recipe.isBookmarked);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <StyledArticle>
      <Image
        src="https://images.unsplash.com/photo-1564278453360-c65eda0a200e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        width={140}
        height={100}
        alt="bottle of rum e.g. remedy"
      ></Image>
      <StyledCardWrapper>
        <StyledHeadlineWrapper>
          <StyledHeadline>{recipe.title}</StyledHeadline>
          <Bookmark onClick={toggleBookmark} isBookmarked={isBookmarked} />
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

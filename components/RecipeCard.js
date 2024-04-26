import Image from "next/image";
import styled from "styled-components";

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
  border: 1px solid black;
`;

export default function RecipeCard({ recipe }) {
  return (
    <StyledArticle>
      <Image
        src="https://images.unsplash.com/photo-1564278453360-c65eda0a200e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        width={140}
        height={100}
        alt="bottle of rum e.g. remedy"
      ></Image>
      <div>
        <StyledHeadline>{recipe.title}</StyledHeadline>
        <StyledListHeader>Symptoms:</StyledListHeader>
        <StyledList>
          {recipe.symptoms.map((symptom) => (
            <StyledListItems key={symptom}>{symptom}</StyledListItems>
          ))}
        </StyledList>
      </div>
    </StyledArticle>
  );
}

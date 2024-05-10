"use client";
import RecipeList from "@/components/RecipeList";
import TipOfTheDay from "@/components/TipOfTheDay";
import styled from "styled-components";
import { useState } from "react";

export default function HomePage({
  recipes,
  bookmarkedRecipesIDs,
  onHandleBookmarkedIcon,
}) {
  const StyledHeadline = styled.h1`
    text-align: center;
    font: Lora;
  `;
  const Button = styled.button`
    background-color: black;

    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
  `;
  const TipOfTheDayWrapper = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  const getRandomIndex = () => {
    return Math.floor(Math.random() * recipes.length);
  };
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const handleNextTip = () => {
    const newIndex = getRandomIndex();
    setCurrentTipIndex(newIndex);
  };

  const currentTip = recipes[currentTipIndex];

  return (
    <div>
      <StyledHeadline>Recipes Overview</StyledHeadline>
      <TipOfTheDayWrapper>
        <Button onClick={handleNextTip}>Get Another Tip</Button>
        <TipOfTheDay recipe={currentTip}></TipOfTheDay>
      </TipOfTheDayWrapper>
      <RecipeList
        bookmarkedRecipesIDs={bookmarkedRecipesIDs}
        recipes={recipes}
        onHandleBookmarkedIcon={onHandleBookmarkedIcon}
      />
    </div>
  );
}

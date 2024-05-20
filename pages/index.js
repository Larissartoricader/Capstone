"use client";
import FilteredRecipes from "@/components/FilteredRecipes";
import TipOfTheDay from "@/components/TipOfTheDay";
import styled from "styled-components";
import { useState } from "react";
import useSWR from "swr";

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

export default function HomePage({ bookmarkedRecipesIDs, onToggleBookmark }) {
  const getRandomIndex = () => {
    return Math.floor(Math.random() * recipes.length);
  };
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const handleNextTip = () => {
    const newIndex = getRandomIndex();
    setCurrentTipIndex(newIndex);
  };
  const { data: recipes, isLoading, error } = useSWR("/api/recipes");

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Oops! Something went wrong..</h1>;
  }
  const currentTip = recipes[currentTipIndex];
  return (
    <div>
      <FilteredRecipes
        recipes={recipes}
        bookmarkedRecipesIDs={bookmarkedRecipesIDs}
        onToggleBookmark={onToggleBookmark}
      />
      {/* <TipOfTheDayWrapper>
        <Button onClick={handleNextTip}>Get Another Tip</Button>
        <TipOfTheDay recipe={currentTip}></TipOfTheDay>
      </TipOfTheDayWrapper> */}
    </div>
  );
}

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
  position: fixed;
  z-index: 1;
  bottom: 100px;
  left: 50px;
  display: flex;
  flex-direction: column;
`;

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;
const Backdrop = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: black;
  opacity: 0.4;
  z-index: 1;
`;

export default function HomePage({ bookmarkedRecipesIDs, onToggleBookmark }) {
  const getRandomIndex = () => {
    return Math.floor(Math.random() * recipes.length);
  };
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleNextTip = () => {
    const newIndex = getRandomIndex();
    setCurrentTipIndex(newIndex);
    setIsPopupOpen(true);
  };
  const { data: recipes, isLoading, error } = useSWR("/api/recipes");

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Oops! Something went wrong..</h1>;
  }

  const closePopup = () => {
    setIsPopupOpen(false);
  };
  const currentTip = recipes[currentTipIndex];
  return (
    <div>
      {isPopupOpen ? <Backdrop onClick={closePopup} /> : null}
      <TipOfTheDayWrapper>
        {isPopupOpen ? (
          <TipOfTheDay recipe={currentTip} onClose={closePopup} />
        ) : null}
        <ButtonWrapper>
          <Button onClick={handleNextTip}>
            {isPopupOpen ? "Herbie's Next Tip" : "Herbie's Tip"}
          </Button>
        </ButtonWrapper>
      </TipOfTheDayWrapper>
      <FilteredRecipes
        recipes={recipes}
        bookmarkedRecipesIDs={bookmarkedRecipesIDs}
        onToggleBookmark={onToggleBookmark}
      />
    </div>
  );
}

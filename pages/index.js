"use client";
import FilteredRecipes from "@/components/FilteredRecipes/FilteredRecipes";
import TipOfTheDay from "@/components/TipOfTheDay/TipOfTheDay";
import { useState } from "react";
import useSWR from "swr";
import Image from "next/image";
import ClickButton from "@/assets/ClickButton.png";
import ReloadButton from "@/assets/ReloadButton.png";
import React from "react";
import { Button, TipOfTheDayWrapper, Backdrop } from "@/components/HomePage.styles";


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
    <>
      {isPopupOpen ? <Backdrop onClick={closePopup} /> : null}
      <TipOfTheDayWrapper>
        {isPopupOpen ? (
          <TipOfTheDay recipe={currentTip} onClose={closePopup} />
        ) : null}
        <Button
          onClick={handleNextTip}
          aria-label={isPopupOpen ? "Reload tip" : "Get tip"}
        >
          <Image
            src={isPopupOpen ? ReloadButton : ClickButton}
            alt={isPopupOpen ? "Reloading tip" : "Get tip"}
            width={60}
            height={60}
          />
        </Button>
      </TipOfTheDayWrapper>
      <FilteredRecipes
        recipes={recipes}
        bookmarkedRecipesIDs={bookmarkedRecipesIDs}
        onToggleBookmark={onToggleBookmark}
      />
    </>
  );
}

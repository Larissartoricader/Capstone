"use client";
import RecipeList from "@/components/RecipeList";
import TipOfTheDay from "@/components/TipOfTheDay";
import styled from "styled-components";
import { useState } from "react";
import FilterForm from "@/components/FilterForm";
import useSWR from "swr";

export default function HomePage({
	bookmarkedRecipesIDs,
	onToggleBookmark,
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
			<StyledHeadline>Recipes Overview</StyledHeadline>
			<TipOfTheDayWrapper>
				<Button onClick={handleNextTip}>Get Another Tip</Button>
				<TipOfTheDay recipe={currentTip}></TipOfTheDay>
			</TipOfTheDayWrapper>
			<FilterForm
				recipes={recipes}
				bookmarkedRecipesIDs={bookmarkedRecipesIDs}
				onToggleBookmark={onToggleBookmark}
			/>
		</div>
	);
}

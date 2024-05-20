import { useState } from "react";
import styled from "styled-components";
import RecipeList from "./RecipeList";

//Search

const SearchBox = styled.div`
  margin-inline: 40px;
  margin: 5px;
  padding: 5px;
  border-radius: 10px;
  position: relative;
`;

const StyledFilterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledInput = styled.input`
  position: absolute;
  width: 70%;
  right: 20px;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 10px;
  outline: none;
  transition: border-color 0.3s;
  &:focus {
    border-color: #8fc379;
  }
  &::placeholder {
    color: #999;
    font-size: 12px;
  }
  &::before {
    content: "";
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
    background-size: cover;
    pointer-events: none;
  }
`;

//Suggestion
const StyledSuggestionsList = styled.div`
  background-color: white;
  border-radius: 10px;
  position: absolute;
  top: 50px;
  right: 0;
  width: 80%;
  z-index: 1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
`;

const StyledTextSuggestion = styled.p`
  color: black;
  font-size: medium;
  display: block;
`;

//Selected Suggestion

const StyledSelectedSuggestionBox = styled.div`
  position: absolute;

  top: 70px;
  right: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const StyledSelectedSuggestion = styled.p`
  background-color: #f1efe2;
  font-size: small;
  padding: 5px;
  border-radius: 10px;
  display: block;
`;

const StyledCross = styled.span`
  color: green;
  cursor: pointer;
`;

const ResetButton = styled.button`
  border: none;
  background-color: #ffc107;
  color: white;
  border-radius: 10px;
  padding: 7px;
  position: absolute;
  right: 20px;
  top: 50px;
`;
// Showed Filtered Recipes

const FilteredRecipesContainer = styled.div`
  position: absolute;
  top: 200px;
`;

export default function FilteredRecipes({
  recipes,
  bookmarkedRecipesIDs,
  onToggleBookmark,
}) {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [symptomSuggestions, setSymptomSuggestions] = useState([]);

  function handleSymptomsChange(event) {
    const userInput = event.target.value;
    setSymptomSuggestions([]);
    const suggestions = recipes.reduce((acc, recipe) => {
      const matchingSymptoms = recipe.symptoms.filter((symptom) =>
        symptom.toLowerCase().startsWith(userInput.toLowerCase())
      );
      return [...acc, ...matchingSymptoms];
    }, []);
    const notYetSelectedSuggestions = suggestions.filter(
      (suggestion) => !selectedSymptoms.includes(suggestion)
    );
    setSymptomSuggestions(Array.from(new Set(notYetSelectedSuggestions)));
  }

  function handleSymptomSuggestionClick(suggestion) {
    setSelectedSymptoms((prevSelectedSymptoms) => [
      ...prevSelectedSymptoms,
      suggestion,
    ]);
    setSymptomSuggestions([]);
    setUserInput("");
  }

  function removeSelectedSymptom(index) {
    setSelectedSymptoms((prevSelectedSymptoms) => {
      const updatedSymptoms = [...prevSelectedSymptoms];
      updatedSymptoms.splice(index, 1);
      return updatedSymptoms;
    });
  }

  function filterRecipes() {
    let filteredRecipes = [...recipes];
    if (selectedSymptoms.length > 0) {
      filteredRecipes = filteredRecipes.filter((recipe) =>
        selectedSymptoms.every((symptom) => recipe.symptoms.includes(symptom))
      );
    }
    return filteredRecipes;
  }

  const filteredRecipes = filterRecipes();

  function handleSearchSubmit(event) {
    event.preventDefault();
    event.target.reset();
  }

  const [userInput, setUserInput] = useState("");

  function handleResetSubmit(event) {
    event.preventDefault();
    setSelectedSymptoms([]);
    setUserInput("");
  }

  return (
    <>
      <SearchBox>
        <StyledFilterForm onSubmit={handleSearchSubmit}>
          <label htmlFor="symptom"></label>
          <StyledInput
            placeholder="Type your symptom and select from the list"
            type="text"
            id="symptom"
            name="inputfield"
            onChange={(event) => {
              handleSymptomsChange(event);
              setUserInput(event.target.value);
            }}
            value={userInput}
          />
          <StyledSuggestionsList>
            {userInput &&
              symptomSuggestions.map((suggestion, index) => (
                <StyledTextSuggestion
                  key={index}
                  onClick={() => handleSymptomSuggestionClick(suggestion)}
                >
                  {suggestion}
                </StyledTextSuggestion>
              ))}
          </StyledSuggestionsList>
          <StyledSelectedSuggestionBox>
            {selectedSymptoms.map((symptom, index) => (
              <StyledSelectedSuggestion key={index}>
                {symptom}{" "}
                <StyledCross onClick={() => removeSelectedSymptom(index)}>
                  ✖️
                </StyledCross>
              </StyledSelectedSuggestion>
            ))}
          </StyledSelectedSuggestionBox>
          <ResetButton onClick={handleResetSubmit}>Reset</ResetButton>
        </StyledFilterForm>
      </SearchBox>
      <FilteredRecipesContainer>
        <RecipeList
          bookmarkedRecipesIDs={bookmarkedRecipesIDs}
          recipes={filteredRecipes}
          onToggleBookmark={onToggleBookmark}
        />
      </FilteredRecipesContainer>
    </>
  );
}

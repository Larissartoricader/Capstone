import { useState } from "react";
import styled from "styled-components";
import RecipeList from "./RecipeList";
import { uid } from "uid";

//Search

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-inline: 10px;
  gap: 10px;
`;

const SearchBox = styled.div`
  border-radius: 10px;
  position: relative;
`;

const StyledFilterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const StyledInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: none;
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
  top: 38px;
  right: 2px;
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
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const StyledSelectedSuggestion = styled.button`
  background-color: #f1efe2;
  font-size: small;
  padding: 5px;
  border-radius: 10px;
  display: block;
`;

const StyledCross = styled.button`
  color: green;
  cursor: pointer;
  border: none;
`;

const ResetButton = styled.button`
  max-width: 60px;
  border: none;
  background-color: #ffc107;
  color: white;
  border-radius: 10px;
  padding: 5px 10px;
`;

const FilterHeadline = styled.h1`
  font-family: var(--headline-font);
  font-size: 200%;
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
    <SearchContainer>
      <SearchBox>
        <StyledFilterForm onSubmit={handleSearchSubmit}>
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
              symptomSuggestions.map((suggestion) => (
                <StyledTextSuggestion
                  key={uid()}
                  onClick={() => handleSymptomSuggestionClick(suggestion)}
                >
                  {suggestion}
                </StyledTextSuggestion>
              ))}
          </StyledSuggestionsList>
          <StyledSelectedSuggestionBox>
            {selectedSymptoms.map((symptom) => (
              <StyledSelectedSuggestion key={uid()}>
                {symptom}{" "}
                <StyledCross onClick={() => removeSelectedSymptom(symptom)}>
                  ✖️
                </StyledCross>
              </StyledSelectedSuggestion>
            ))}
          </StyledSelectedSuggestionBox>
          <ResetButton onClick={handleResetSubmit}>Reset</ResetButton>
        </StyledFilterForm>
      </SearchBox>

      <RecipeList
        bookmarkedRecipesIDs={bookmarkedRecipesIDs}
        recipes={filteredRecipes}
        onToggleBookmark={onToggleBookmark}
      />
    </SearchContainer>
  );
}

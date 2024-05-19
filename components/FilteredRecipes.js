import { useState } from "react";
import styled from "styled-components";
import RecipeList from "./RecipeList";

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
  }
`;

const StyledSuggestionsList = styled.div`
  background-color: white;
  border-radius: 10px;
  position: absolute;
  top: 50px;
  left: 0;
  width: 80%;
  z-index: 1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
`;

const StyledTextSuggestion = styled.p`
  color: black;
  font-size: medium;
`;

const StyledSelectedSuggestion = styled.p`
  color: red;
`;

const StyledCross = styled.span`
  color: green;
`;

const ResetButton = styled.button`
  background-color: yellow;
  border-radius: 10px;
  padding: 5px;
`;

const StyledFilterInfo = styled.p`
  font-size: 12px;
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
            {selectedSymptoms.map((symptom, index) => (
              <StyledSelectedSuggestion key={index}>
                {symptom}{" "}
                <StyledCross onClick={() => removeSelectedSymptom(index)}>
                  ✖️
                </StyledCross>
              </StyledSelectedSuggestion>
            ))}
          </StyledSuggestionsList>
          <div>
            <ResetButton onClick={handleResetSubmit}>Reset</ResetButton>
          </div>
        </StyledFilterForm>
      </SearchBox>
      <div>
        <h2>The Perfect Recipes for you</h2>
        <RecipeList
          bookmarkedRecipesIDs={bookmarkedRecipesIDs}
          recipes={filteredRecipes}
          onToggleBookmark={onToggleBookmark}
        />
      </div>
    </>
  );
}

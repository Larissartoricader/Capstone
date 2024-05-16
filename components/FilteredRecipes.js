import { useState } from "react";
import styled from "styled-components";
import RecipeList from "./RecipeList";

const SearchBox = styled.div`
  margin-inline: 40px;
  background-color: lightgrey;
  margin: 5px;
  padding: 5px;
  border-radius: 10px;
`;

const StyledFilterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
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
        symptom.toLowerCase().startsWith(userInput.toLowerCase()),
      );
      return [...acc, ...matchingSymptoms];
    }, []);
   const notYetSelectedSuggestions = suggestions.filter((suggestion) => !selectedSymptoms.includes(suggestion));
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
        selectedSymptoms.every((symptom) => recipe.symptoms.includes(symptom)),
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
        <h1>Search Recipes</h1>
        <StyledFilterForm onSubmit={handleSearchSubmit}>
          <label htmlFor="symptom">Select a symptom</label>
          <input
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
           <div>
            {selectedSymptoms.map((symptom, index) => (
              <p key={index}>
                {symptom}{" "}
                <span onClick={() => removeSelectedSymptom(index)}>✖️</span>
              </p>
            ))}
            {userInput && symptomSuggestions.map((suggestion, index) => (
              <p
                key={index}
                onClick={() => handleSymptomSuggestionClick(suggestion)}
              >
                {suggestion}
              </p>
            ))}
          </div>
          <div>
          
            <button onClick={handleResetSubmit}>Reset</button>
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

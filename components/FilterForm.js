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

export default function FilterForm({
  recipes,
  bookmarkedRecipesIDs,
  onHandleBookmarkedIcon,
}) {
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [symptomSuggestions, setSymptomSuggestions] = useState([]);
  const [searchSubmitted, setSearchSubmitted] = useState(false);

  function handleSymptomsChange(event) {
    const userInput = event.target.value;
    setSymptomSuggestions([]);

    const suggestions = recipes.reduce((acc, recipe) => {
      const matchingSymptoms = recipe.symptoms.filter((symptom) =>
        symptom.toLowerCase().startsWith(userInput.toLowerCase()),
      );
      return [...acc, ...matchingSymptoms];
    }, []);
    setSymptomSuggestions(Array.from(new Set(suggestions)));
  }

  function handleSymptomSuggestionClick(suggestion) {
    setSelectedSymptoms((prevSelectedSymptoms) => [
      ...prevSelectedSymptoms,
      suggestion,
    ]);
    setSymptomSuggestions([]);
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

  function handleSearchSubmit(event) {
    event.preventDefault();
    const filtered = filterRecipes();
    setFilteredRecipes(filtered);
    setSearchSubmitted(true);
    event.target.reset();
  }

  function handleResetSubmit(event) {
    event.preventDefault();
    setFilteredRecipes(recipes);
    setSelectedSymptoms([]);
    setSearchSubmitted(false);
  }

  return (
    <>
      <SearchBox>
        <h1>Search Recipes</h1>
        <StyledFilterForm onSubmit={handleSearchSubmit}>
          <label htmlFor="symptom">Select a symptom</label>
          <StyledFilterInfo>Please, select only one symptom.</StyledFilterInfo>
          <input
            placeholder="Type your symptom and select from the list"
            type="text"
            id="symptom"
            name="symptom"
            onChange={handleSymptomsChange}
          />
          <div>
            {selectedSymptoms.map((symptom, index) => (
              <p key={index}>
                {symptom}{" "}
                <span onClick={() => removeSelectedSymptom(index)}>✖️</span>
              </p>
            ))}
            {symptomSuggestions.map((suggestion, index) => (
              <p
                key={index}
                onClick={() => handleSymptomSuggestionClick(suggestion)}
              >
                {suggestion}
              </p>
            ))}
          </div>
          <div>
            <button>Search</button>
            <button onClick={handleResetSubmit}>Reset</button>
          </div>
        </StyledFilterForm>
      </SearchBox>
      {searchSubmitted && filteredRecipes.length === 0 && (
        <p>Ups! No recipe to be found. How about trying another criteria?</p>
      )}
      {filteredRecipes.length > 0 ? (
        <div>
          <h2>The Perfect Recipes for you</h2>
          <RecipeList
            bookmarkedRecipesIDs={bookmarkedRecipesIDs}
            recipes={filteredRecipes}
            onHandleBookmarkedIcon={onHandleBookmarkedIcon}
          />
        </div>
      ) : null}
    </>
  );
}
